
namespace Core.Utility
{
    public class AI
    {
        public Entity Entity = null;
        protected Entity Target = null;
        PathFinding Path = new PathFinding();

        //protected DamageInfo[] Damages = new DamageInfo[0];
        //public void Add(DamageInfo damage)
        //{
        //    for (int i = 0; i < Damages.Length; i++)
        //    {
        //        if (Damages[i].Attacker == damage.Attacker && Damages[i].Defender == damage.Defender)
        //        {
        //            Damages[i].Hit += damage.Hit;
        //            Damages[i].Mana += damage.Mana;
        //            Damages[i].Last = DateTime.Now;
        //            return;
        //        }
        //    }
        //    DamageInfo[] temp = new DamageInfo[Damages.Length + 1];
        //    for (int i = 0; i < Damages.Length; i++)
        //        temp[i] = Damages[i];
        //    temp[Damages.Length] = damage;
        //    Damages = temp;
        //}
        //public AI(Entity entity)
        //{
        //    Entity = entity;
        //}
        protected bool Tick = false;
        //public virtual void OnTick(Mobile entity) { Entity = entity; OnTick(); }
        public virtual void OnTick()
        {
            if (Entity == null)return;
            if (Tick) return;
            Tick = true;

            if (Target == null)
                OnTarget();
            //EscapeFromTarget();Move.Street.Length
            if (Entity.Move == null || Entity.MoveDraw.Index == -1)// || Entity.Move.Street.Length == 0)
            {
                //if (Target != null && TargetRange() < 3)
                //    OnPower();
                //EscapeFrom(Target.X, Target.Y, Target.Z);
                //EscapeFromTarget();
                //else //if (Entity.Move.Street.Length == 0)
                    MoveToRandom();
                //MoveTo(Target.X + 1, Target.Y + 1, Target.Z);
            }

            //DamageInfo[] list = Damages;
            ////Damages = new DamageInfo[0];
            //for (int i = 0; i < list.Length; i++)
            //{
            //    //if (list[i] == null) continue;

            //}

            Tick = false;
        }
        public virtual EntityList Range(int range)
        {
            return Entity.Map.Entitys.Range(Entity.X, Entity.Y, Entity.Z, range);
        }
        
        public virtual void OnPower()
        {
            //Power power = new Power();
            Animation anim = new Animation();
            anim.Name = "ANIMDEMO";//"ANIMTEST"; //
            //anim.Step = 0;
            anim.Entity_Src = Entity.ID;
            anim.Entity_Dest = Target.ID;
            anim.Cube_Src = new Point3D(0, 0, 0);
            anim.Cube_Dest = new Point3D(6, 6, 0);
            Entity.Map.PlayAnimation(anim);
        }
        public virtual void OnTarget()
        {
            Target = Entity.Map.FindEntity("Personnage");
        }
        public virtual int TargetRange()
        {
            //if (Target == null) return -1;
            return Info.Range(Entity.X, Entity.Y, Entity.Z, Target.X, Target.Y, Target.Z);
        }
        public void MoveTo(int x, int y, int z)
        {
            //Path.MoveTo(Entity, x, y, z);
            Entity.MoveTo(x, y, z);
        }
        public void MoveToRandom()
        {
            Entity.MoveToRandom();
            //Entity.MoveTo(10, 10, 0, 10, 10);
            //Path.OnStreet(Entity);
            //int random = Info.Random.Next(Path.Roads.Length);
            //Entity.Move = new MoveJSON();
            //Entity.Move.Body = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Move", 1, 1) }, true, true, 750, -1);
            //Entity.Move.Street = Path.Roads[random].Street;
            ////Entity.Move.Step = 0;
            //Entity.MoveStart();


            ////int x = Info.Random.Next(-5, 5);
            ////int y = Info.Random.Next(-5, 5);
            ////PathFinding.Path.MoveTo(Entity, Entity.X + x, Entity.Y + y, Entity.Z);// + Info.Random.Next(10));
        }
        public void EscapeFrom(int x, int y, int z)
        {
            Path.OnStreet(Entity);
            int index = -1;
            int range = -1;
            for (int i = 0; i < Path.Roads.Count; i++)
            {
                int temp = Info.Range(Path.Roads[i].X, Path.Roads[i].Y, Path.Roads[i].Z, x, y, z);
                if (temp > range)
                {
                    range = temp;
                    index = i;
                }
            }
            if (index > -1)
            {
                Entity.Move = new MoveJSON();
                Entity.Move.Body = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Move", 1, 1) }, true, true, 750, -1);
                Entity.Move.Street = Path.Roads[index].Street;
                //Entity.Move.Step = 0;
                Entity.MoveStart();
            }
        }
        public void EscapeFromTarget()
        {
            PathFinding src_path = new PathFinding();
            src_path.OnStreet(Entity);
            PathFinding from_path = new PathFinding();
            from_path.OnStreet(Target);

            Road Road = null;
            for (int src = 0; src < src_path.Roads.Count; src++)
                for (int from = 0; from < from_path.Roads.Count; from++)
                {
                    if (src_path.Roads[src].X == from_path.Roads[from].X && src_path.Roads[src].Y == from_path.Roads[from].Y && src_path.Roads[src].Z == from_path.Roads[from].Z)
                    {
                        if (Road == null || Road.Street.Length < src_path.Roads[src].Street.Length)
                            Road = src_path.Roads[src];
                    }
                }
            if (Road != null)
            {
                Entity.Move = new MoveJSON();
                Entity.Move.Body = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Move", 1, 1) }, true, true, 750, -1);
                Entity.Move.Street = Road.Street;
                //Entity.Move.Step = 0;
                Entity.MoveStart();
            }
        }

    }
}