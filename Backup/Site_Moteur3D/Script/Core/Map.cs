using System;
using Core.Utility;

namespace Core
{
    public class Map
    {
        public string Name = string.Empty;
        public int Width = 0;
        public int Height = 0;
        public int Depth = 0;
        public Cube[, ,] Cubes = new Cube[0, 0, 0];
        public EntityList Permanents = new EntityList();
        public EntityList Entitys = new EntityList();
        public Rectangle3D[] NoCeiling = new Rectangle3D[0];

        public ScreenAnimation ScreenAnimation = ScreenAnimation.LoadedMap();//null;//Sauvegarder!!!!!

        public System.Timers.Timer Timer = null;
        public DateTime Now = DateTime.Now;
        public int Step = 0;

        public Map() { }
        public Map(string name, int width, int height, int depth)
        {
            Name = name;
            Width = width;
            Height = height;
            Depth = depth;
            Cubes = new Cube[width, height, depth];
            ScreenAnimation = ScreenAnimation.LoadedMap();
        }
        public virtual void OnTick() { OnDamageAOEApplied();  }
        public EntityJSON[] EntityJSON = new EntityJSON[0];
        public void Add(Entity entity) { Entitys.Add(entity); EntityJSON = Entitys.JSON(); }
        public virtual MapJSON JSON { get { return CreateJSON(); } }
        public virtual MapJSON CreateJSON() { return new MapJSON(this); }
        public virtual bool Contains(int pX, int pY, int pZ)
        {
            return (pX >= 0) && (pX < Width)
                && (pY >= 0) && (pY < Height)
                && (pZ >= 0) && (pZ < Depth);
        }

        public virtual void Add(Cube c) { Cubes[c.X, c.Y, c.Z] = c; }
        public Cube FindCube(int cX, int cY, int cZ) { if (Contains(cX, cY, cZ))return Cubes[cX, cY, cZ]; else return null; }
        public Entity FindEntity(string id)
        {
            Entity entity = Permanents.Find(id);
            if (entity != null) return entity;
            return Entitys.Find(id);
        }
        public Entity FindEntity(int x, int y, int z)
        {
            Entity entity = Permanents.Find(x,y,z);
            if (entity != null) return entity;
            return Entitys.Find(x, y, z);
        }
        public void Add(Rectangle3D rec)
        {
            Rectangle3D[] temp = new Rectangle3D[NoCeiling.Length + 1];
            for (int i = 0; i < NoCeiling.Length; i++)
                temp[i] = NoCeiling[i];
            temp[NoCeiling.Length] = rec;
            NoCeiling = temp;
        }
         public virtual bool OnEnter(Entity entity)
        {
            if (entity.Map == this) return false;
            if (entity.Map != null && !entity.Map.OnExit(entity)) return false;
            entity.Map = this;
            Add(entity);
            return true;
        }
        public virtual bool OnExit(Entity entity)
        {
            if(Entitys.Contains(entity.ID))
            Entitys.Remove(entity);
            return true;
        }
        public DamageAOE[] DamageAOE = new DamageAOE[0];
        public void Add(DamageAOE damage)
        {
            DamageAOE[] temp = new DamageAOE[DamageAOE.Length + 1];
            for (int i = 0; i < DamageAOE.Length; i++)
                temp[i] = DamageAOE[i];
            temp[DamageAOE.Length] = damage;
            DamageAOE = temp;
        }
        public virtual void OnDamageAOEApplied()
        {
            for (int d = 0; d < DamageAOE.Length; d++)
            {
                if (DamageAOE[d].Applied) continue;
                for (int e = 0; e < Entitys.Length; e++)
                    if (DamageAOE[d].Rectangle.Contains(Entitys[e].Location))
                        DamageAOE[d].OnDamage(Entitys[e]);
                DamageAOE[d].Applied = true;
            }
        }
        public Animation[] PlayAnimations = new Animation[0];
        public void PlayAnimation(Animation anim)
        {
            Animation[] playAnimations = PlayAnimations;
            Animation[] temp = new Animation[playAnimations.Length + 1];
            for (int i = 0; i < playAnimations.Length; i++)
                temp[i] = playAnimations[i];
            temp[playAnimations.Length] = anim;
            PlayAnimations = temp;
        }
        public void Start()
        {
            if (Timer == null)
            {
                Timer = new System.Timers.Timer();
                Timer.Interval = 100;
                Timer.AutoReset = true;
                Timer.Elapsed += new System.Timers.ElapsedEventHandler(OnTimedEvent);
            }
            Timer.Start();
        }
        public void Stop()
        {
            Timer.Stop();
        }
        protected virtual void OnTimedEvent(object source, System.Timers.ElapsedEventArgs e)
        {
            Step = ((Int32)(DateTime.Now - Now).TotalMilliseconds);
            Now = DateTime.Now;
            OnTick();
            for (int p = 0; p < Permanents.Length; p++)//Supprimer!!!!!!!!
                Permanents[p].OnTick();
            for (int i = 0; i < Entitys.Length; i++)
                Entitys[i].OnTick();
            EntityJSON = Entitys.JSON();
        }

        public virtual void Save(SerializationWriter SW)
        {
            SW.WriteStartElement("Map");
            SW.WriteVersion(0);
            SW.Write("Name", Name);
            SW.Write("X", Width);
            SW.Write("Y", Height);
            SW.Write("Z", Depth);
            SW.Write(Cubes);
            Permanents.Save(SW);
            Entitys.Save(SW);
            SW.Write(NoCeiling);
            SW.WriteEndElement();
        }
        public virtual void Load(SerializationReader SR)
        {
            SR.ReadStartElement();
            int version = SR.ReadVersion();
            switch (version)
            {
                case 0:
                    {
                        Name = SR.ReadString();
                        Width = SR.ReadInt();
                        Height = SR.ReadInt();
                        Depth = SR.ReadInt();
                        Cubes = new Cube[Width, Height, Depth];
                        SR.ReadCubes(this);
                        Permanents.Load(SR);
                        Entitys.Load(SR);
                        SR.ReadRectangles3D(this);
                        break;
                    }
            }
            SR.ReadEndElement();

            for (int i = 0; i < Permanents.Length; i++)
                Permanents[i].Map = this;
            for (int e = 0; e < Entitys.Length; e++)
                Entitys[e].Map = this;
        }

        public MsgJSON_Cubes[] MessageCubes = new MsgJSON_Cubes[0];
        public void CreateMessageCubes()
        {
            int max = 1000;
            int num = (Cubes.Length / max) + 1;
            MessageCubes = new MsgJSON_Cubes[num];
            for (int t = 0; t < num; t++)
                MessageCubes[t] = new MsgJSON_Cubes("LOADCUBES", new Cube[max]);

            int i = 0;
            for (int z = 0; z < Depth; z++)
                for (int y = 0; y < Height; y++)
                    for (int x = 0; x < Width; x++)
                    {
                        int mc = i / max;
                        int c = i % max;
                        MessageCubes[mc].Cubes[c] = FindCube(x, y, z);
                        i++;
                    }
        }

        public MsgJSON_Entitys[] MessagePermanents = new MsgJSON_Entitys[0];
        public void CreateMessagePermanents()
        {
            int max = 1000;
            int num = (Permanents.Length / max) + 1;
            MsgJSON_Entitys[] temp = new MsgJSON_Entitys[num];
            for (int t = 0; t < num; t++)
                temp[t] = new MsgJSON_Entitys("PERMANENTS", new EntityJSON[max]);

            for (int i = 0; i < Permanents.Length; i++)
            {
                int mp = i / max;
                int p = i % max;
                temp[mp].Entitys[p] = Permanents[i].JSON;
            }
            MessagePermanents = temp;
        }
    }
}


