using System;
using System.IO;
using Core.Utility;

namespace Core
{
    public static class Univers
    {
        public static void Start()
        {
            for (int w = 0; w < Worlds.Length; w++)
                for (int m = 0; m < Worlds[w].Maps.Length; m++)
                    Worlds[w].Maps[m].Start();
        }
        public static void Stop()
        {
            for (int w = 0; w < Worlds.Length; w++)
                for (int m = 0; m < Worlds[w].Maps.Length; m++)
                    Worlds[w].Maps[m].Stop();
        }
        public static World[] Worlds = new World[0];
        public static void Add(World world)
        {
            World[] temp = new World[Worlds.Length + 1];
            for (int i = 0; i < Worlds.Length; i++)
                temp[i] = Worlds[i];

            temp[Worlds.Length] = world;
            Worlds = temp;
        }
        public static World FindWorld(string worldname)
        {
            for (int i = 0; i < Worlds.Length; i++)
                if (Worlds[i].Name == worldname)
                    return Worlds[i];
            return null;
        }
        public static PageInfo[] GameInfos = new PageInfo[0];
        public static void Add(PageInfo gameinfo)
        {
            PageInfo[] temp = new PageInfo[GameInfos.Length + 1];
            for (int i = 0; i < GameInfos.Length; i++)
                temp[i] = GameInfos[i];
            temp[GameInfos.Length] = gameinfo;
            GameInfos = temp;
        }
        public static PageInfo FindGameInfo(string id)
        {
            for (int i = 0; i < GameInfos.Length; i++)
                if (GameInfos[i].ID == id)
                    return GameInfos[i];
            return null;
        }
        public static void SaveFiles(World world)
        {
            string p = Info.address_Editor + "Worlds" + Info.separator + world.Name + Info.separator;
            Info.SaveWorld(world, p);
        }
        public static void LoadFiles()
        {
            string p = Info.address_Editor + "Worlds" + Info.separator;
            if (!Directory.Exists(p))
                Directory.CreateDirectory(p);

            World world = null;
            //WorldName = string.Empty;
            //WorldNames = new string[0];

            DirectoryInfo directory = new DirectoryInfo(p);
            foreach (DirectoryInfo dir in directory.GetDirectories())
            {
                if (!File.Exists(dir.FullName + @"\World" + Info.extension)) continue;

                //WorldNames_Add(dir.Name);

                //if (dir.Name != name) continue;
                world = Info.LoadWorld(dir.FullName);
                Add(world);
                //WorldName = dir.Name;
            }
        }
        //public static World NewWorld(string worldname) { return NewWorld(worldname, "Core.World"); }
        public static World NewWorld(string worldname, string fulltype )
        {
            if (worldname == "") return null;
            World world = FindWorld(worldname);
            if (world != null) return world;

            if (fulltype == "") fulltype = "Core.World";
            world = Info.Instance(fulltype) as World;

            if (world != null)
            {
                world.Name = worldname;
                Add(world);
                SaveFiles(world);
                //string p = Info.address_Editor + "Worlds" + Info.separator + world.Name + Info.separator;
                //Info.SaveWorld(world, p);
            }
            return world;
        }

    }
    public class World
    {
        public DateTime Start = DateTime.Now;
        public string Name = string.Empty;
        protected bool Active = true;
        protected bool Tick = false;

        public Map[] Maps = new Map[0];
        public void Add(Map map)
        {
            Map[] temp = new Map[Maps.Length + 1];
            for (int i = 0; i < Maps.Length; i++)
                temp[i] = Maps[i];

            temp[Maps.Length] = map;
            Maps = temp;
        }
        public Map FindMap(string mapname)
        {
            for (int i = 0; i < Maps.Length; i++)
                if (Maps[i].Name == mapname)
                    return Maps[i];
            return null;
        }

        PageInfo[] GameInfos = new PageInfo[0];
        public void Add(PageInfo gameinfo)
        {
            PageInfo[] temp = new PageInfo[GameInfos.Length + 1];
            for (int i = 0; i < GameInfos.Length; i++)
                temp[i] = GameInfos[i];
            temp[GameInfos.Length] = gameinfo;
            GameInfos = temp;
        }
        public PageInfo FindGameInfo(string id)
        {
            for (int i = 0; i < GameInfos.Length; i++)
                if (GameInfos[i].ID == id)
                    return GameInfos[i];
            return null;
        }

        public Translator[] Translators = new Translator[0];
        public void Add(Translator translator)
        {
            Translator[] temp = new Translator[Translators.Length + 1];
            for (int i = 0; i < Translators.Length; i++)
                temp[i] = Translators[i];
            temp[Translators.Length] = translator;
            Translators = temp;
        }
        public Animation[] Animations = new Animation[0];
        public void Add(Animation animation)
        {
            Animation[] temp = new Animation[Animations.Length + 1];
            for (int i = 0; i < Animations.Length; i++)
                temp[i] = Animations[i];
            temp[Animations.Length] = animation;
            Animations = temp;
        }
        public TemplateJSON[] Templates = new TemplateJSON[0];
        public void Add(TemplateJSON template)
        {
            TemplateJSON[] temp = new TemplateJSON[Templates.Length + 1];
            for (int i = 0; i < Templates.Length; i++)
                temp[i] = Templates[i];
            temp[Templates.Length] = template;
            Templates = temp;
        }

        public virtual WorldJSON JSON { get { return CreateJSON(); } }
        public virtual WorldJSON CreateJSON() { return new WorldJSON(this); }

        public virtual void OnTick()
        {
            if (!Active || Tick) return;
            Tick = true;
            for (int i = 0; i < Maps.Length; i++)
                Maps[i].OnTick();
            Tick = false;
        }

        public virtual void Save(SerializationWriter SW)
        {
            SW.WriteStartElement("World");
            SW.WriteVersion(0);

            SW.Write("Name", Name);

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
                        break;
                    }
            }

            SR.ReadEndElement();
        }
    }
}
