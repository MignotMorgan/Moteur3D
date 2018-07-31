
namespace Core
{
    public class EntityList
    {
        private Entity[] Entitys = new Entity[0];

        public Entity this[int index] { get { return Entitys[index]; } }
        public int Length { get { return Entitys.Length; } }

        public virtual void Add(Entity entity)
        {
            if(Contains(entity))return;
            Entity[] temp = new Entity[Entitys.Length + 1];
            for (int i = 0; i < Entitys.Length; i++)
                temp[i] = Entitys[i];
            temp[Entitys.Length] = entity;
            Entitys = temp;
        }
        public virtual void Remove(Entity entity)
        {
            if (!Contains(entity)) return;
            Entity[] temp = new Entity[Entitys.Length-1];
            int t = 0;
            for (int i = 0; i < Entitys.Length; i++)
                if (Entitys[i] != entity)
                {
                    temp[t] = Entitys[i];
                    t++;
                }
            Entitys = temp;
        }
        public virtual Entity Find(string id)
        {
            for (int i = 0; i < Entitys.Length; i++)
                    if (Entitys[i].ID == id)
                    return Entitys[i];
            return null;
        }
        public virtual Entity Find(int x, int y, int z)
        {
            for (int i = 0; i < Entitys.Length; i++)
                if (Entitys[i].Contains(x, y, z))
                    return Entitys[i];
            return null;
        }
        public virtual Entity Contains(int x, int y, int z)
        {
            for (int i = 0; i < Entitys.Length; i++)
                if (Entitys[i].Contains(x, y, z))
                    return Entitys[i];
            return null;
        }
        public virtual bool Contains(Entity entity)
        {
            for (int i = 0; i < Entitys.Length; i++)
                if (Entitys[i] == entity)
                    return true;
            return false;
        }
        public virtual bool Contains(string id)
        {
            for (int i = 0; i < Entitys.Length; i++)
                if (Entitys[i].ID == id)
                    return true;
            return false;
        }
        public virtual EntityList Range(int x, int y, int z, int range)
        {
            EntityList list = new EntityList();
            for (int i = 0; i < Entitys.Length; i++)
                if (Info.Range(Entitys[i], x, y, z) <= range)
                    list.Add(Entitys[i]);
            return list;
        }
        public virtual EntityJSON[] JSON()
        {
            EntityJSON[] array = new EntityJSON[Entitys.Length];
            for (int i = 0; i < Entitys.Length; i++)
                array[i] = Entitys[i].JSON;
            return array;
        }
        public virtual void Save(SerializationWriter SW)
        {
            SW.WriteStartElement("EntityList");
            SW.WriteVersion(0);

            SW.Write("Length", Entitys.Length);
            for (int i = 0; i < Entitys.Length; i++)
                Entitys[i].Save(SW);

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
                        int length = SR.ReadInt();
                        Entitys = new Entity[length];
                        for (int i = 0; i < length; i++)
                        {
                            Entity entity = SR.ReadType() as Entity;
                            entity.Load(SR);
                            Entitys[i] = entity;
                        }
                        break;
                    }
            }
            SR.ReadEndElement();
        }
    }
}
