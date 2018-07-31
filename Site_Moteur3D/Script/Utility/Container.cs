
namespace Core.Utility
{
    public class ContainerJSON
    {
        public string Name = "";
        public string Owner = string.Empty;
        public int NbrX = 0;
        public int NbrY = 0;
        public EntityJSON[] Entitys = new EntityJSON[0];
        public ContainerJSON(Container container)
        {
            Name = container.Name;
            Owner = container.Owner;
            NbrX = container.NbrX;
            NbrY = container.NbrY;
            Entitys = new EntityJSON[container.Entitys.Length];
            for (int i = 0; i < container.Entitys.Length; i++)
                if (container.Entitys[i] != null)
                    Entitys[i] = container.Entitys[i].JSON;
        }
    }
    public class Container
    {
        public string Name = string.Empty;
        public string Owner = string.Empty;
        public int NbrX = 0;
        public int NbrY = 0;
        public Entity[] Entitys;

        public Container() { }
        public Container(string name, string owner, int nbrx, int nbry)
        {
            Name = name;
            Owner = owner;
            NbrX = nbrx;
            NbrY = nbry;
            Entitys = new Entity[NbrX * NbrY];
        }
        public bool Add(Entity entity)
        {
            for (int i = 0; i < Entitys.Length; i++)
                if (Entitys[i] == null)
                    { Entitys[i] = entity; return true; }
            return false;
        }
        public bool AddRange(Entity entity, int index)
        {
            if ( 0 > index || index >= Entitys.Length) return false;
            if (Entitys[index] != null) return false;
            Entitys[index] = entity;
            return true;
        }
        public bool Remove(int index)
        {
            if (0 > index || index >= Entitys.Length) return false;
            Entitys[index] = null;
            return true;
        }
        public bool Replace(int src, int dest)
        {
            if (0 > src || src >= Entitys.Length) return false;
            if (0 > dest || dest >= Entitys.Length) return false;
            Entity temp = Entitys[dest];
            Entitys[dest] = Entitys[src];
            Entitys[src] = temp;
            return true;
        }
        public virtual void Save(SerializationWriter SW)
        {
            SW.WriteType(this);
            SW.WriteStartElement("Container");
            SW.WriteVersion(0);
            SW.Write("Name", Name);
            SW.Write("Owner", Owner);
            SW.Write("NbrX", NbrX);
            SW.Write("NbrY", NbrY);
            for (int i = 0; i < NbrX * NbrY; i++)
                if (Entitys[i] == null)
                    SW.WriteEmpty();
                else
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
                        Name = SR.ReadString();
                        Owner = SR.ReadString();
                        NbrX = SR.ReadInt();
                        NbrY = SR.ReadInt();
                        Entitys = new Entity[NbrX * NbrY];
                        for (int i = 0; i < NbrX * NbrY; i++)
                            if (SR.IsEmptyElement)
                                SR.Read();
                            else
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





































////using Core;
//namespace Core.Utility
//{
//    public class ContentsJSON// : EntityJSON
//    {
//        public string Name = "";
//        public int NbrX = 0;
//        public int NbrY = 0;
//        public string Owner = "";
//        public EntityJSON[] Entitys = new EntityJSON[0];
//        public ContentsJSON(Container container)
//          //  : base(container)
//        {
//            Name = container.Name;
//            NbrX = container.NbrX;
//            NbrY = container.NbrY;
//            Owner = container.Owner;
//            Entitys = new EntityJSON[container.Entitys.Length];
//            for (int i = 0; i < container.Entitys.Length; i++)
//                if (container.Entitys[i] != null)
//                    Entitys[i] = container.Entitys[i].JSON;
//        }
//    }
//    public class Container : Entity
//    {
//        //protected int Maximum = 16;
//        public int NbrX = 4;
//        public int NbrY = 4;
//        public string Owner = ""; 
//        //public EntityList Entitys = new EntityList();
//        //public void Add(Entity entity) { Entitys.Add(entity); }
//        //public void Remove(Entity entity) { Entitys.Remove(entity); }
//        //public Entity Find(string id) { return Entitys.Find(id); }

//        public Container() { }
//        public Container(string e_name, int e_X, int e_Y, int e_Z, Map e_Map)
//            : base(e_name, e_X, e_Y, e_Z, e_Map)
//        {
//            Owner = ID;
//        }
//        //public override EntityJSON JSON { get { return CreateJSON(); } }//Modifiez pour utiliser une variable local
//        //public override EntityJSON CreateJSON() { return new ContainerJSON(this); }//return ContainerJSON;//

//        public override void OnTick() { base.OnTick(); }
//        public override MessageJSON[] OnSelected(Entity entity)
//        {
//            return new MessageJSON[] { new MsgJSON_Container("CONTAINER", new ContentsJSON(this)) };
//        }

//        public Entity[] Entitys = new Entity[16];
//        public bool Add(Entity entity)
//        {
//            for (int i = 0; i < Entitys.Length; i++)
//                if (Entitys[i] == null)
//                    { AddRange(entity, i); return true; }
//            return false;
//        }
//        public bool AddRange(Entity entity, int index)
//        {
//            if (index >= Entitys.Length) return false;
//            if (Entitys[index] != null) return false;
//            Entitys[index] = entity;
//            return true;
//        }
//        public bool Remove(int index)
//        {
//            if (index >= Entitys.Length) return false;
//            //if (Entitys[index] != null) return;//?????????????????????????????????Placer au sol ou Détruire???
//            Entitys[index] = null;
//            return true;
//        }
//        public bool Replace(int src, int dest)
//        {
//            if (src < 0 || src >= Entitys.Length) return false;
//            if (dest < 0 || dest >= Entitys.Length) return false;
//            Entity temp = Entitys[dest];
//            Entitys[dest] = Entitys[src];
//            Entitys[src] = temp;
//            return true;
//        }
        
//        //public Entity FindEntity(string id)
//        //{
//        //    for (int i = 0; i < Entitys.Length; i++)
//        //        if (Entitys[i] != null && Entitys[i].ID != null && Entitys[i].ID.ToString() == id)
//        //            return Entitys[i];
//        //    return null;
//        //}

//        public override void Save(SerializationWriter SW)
//        {
//            base.Save(SW);
//            SW.WriteStartElement("Container");
//            SW.WriteVersion(0);

//            //SW.Write("Maximum", Maximum);
//            //SW.Write(Items);


//            //Entitys.Save(SW);

//            //SW.WriteStartElement("Entitys");
//            //for (int i = 0; i < Entitys.Length; i++)
//            //    if (Entitys[i] != null)
//            //    {
//            //        SW.WriteStartElement("Element");
//            //        Entitys[i].Save(SW);
//            //        SW.WriteEndElement();
//            //    }
//            //SW.WriteEndElement();





//            SW.WriteEndElement();
//        }
//        public override void Load(SerializationReader SR, Map map)
//        {
//            base.Load(SR, map);
//            SR.ReadStartElement();
//            int version = SR.ReadVersion();
//            switch (version)
//            {
//                case 0:
//                    {
//                        //Maximum = SR.ReadInt();
//                        break;
//                    }
//            }
//            //SR.ReadEntitys(this, map);

//            //Entitys.Load(SR, map);

//            //if (SR.IsEmptyElement) { SR.Read(); return; }
//            //while (SR.Read())
//            //{
//            //    if (Name == "Entitys" && SR.IsEndElement()) { SR.ReadEndElement(); break; }//return; }
//            //    if (SR.IsType())
//            //    {
//            //        Entity entity = SR.ReadType() as Entity;
//            //        entity.Load(SR, map);
//            //        Add(entity);
//            //        //entity.MoveToMap(entity.X, entity.Y, entity.Z, entity.Map);
//            //    }
//            //}



//            SR.ReadEndElement();
//        }


//    }
//}













//using Core;
//namespace Games
//{
//    public class ContainerJSON : EntityJSON
//    {
//        public EntityJSON[] EntitysJSON = new EntityJSON[0];
//        public ContainerJSON(Container container)
//            : base(container)
//        {

//            int count = 0;
//            Entity[] temp = container.Entitys;
//            for (int i = 0; i < temp.Length; i++)
//                if (temp[i] != null && !temp[i].Deleted)
//                    count++;

//            EntityJSON[] array = new EntityJSON[count];
//            for (int i = 0; i < temp.Length; i++)
//                if (temp[i] != null && !temp[i].Deleted)
//                {
//                    //EntityJSON mjson = CreateEntityJSON(temp[i]);
//                    EntityJSON mjson = temp[i].CreateJSON();
//                    array[i] = mjson;
//                }
//            EntitysJSON = array;
        
//        }
//    }
//    public class Container : Entity
//    {
//        //public ContainerJSON ContainerJSON;
//        protected int Maximum = 16;

        
//        public Container() { }
//        public Container(string e_name, int e_X, int e_Y, int e_Z, Map e_Map, bool ismobile)
//            : base(e_name, e_X, e_Y, e_Z, e_Map, ismobile)
//        {
//        }
//        public override EntityJSON CreateJSON() { return new ContainerJSON(this); }//return ContainerJSON;



//        public Entity[] Entitys = new Entity[0];
//        public void Add(Entity entity)
//        {
//            Entity[] temp = new Entity[Entitys.Length + 1];
//            for (int i = 0; i < Entitys.Length; i++)
//                temp[i] = Entitys[i];
//            temp[Entitys.Length] = entity;
//            Entitys = temp;
//            //ContainerJSON = new ContainerJSON(this);
//        }
//        public void Remove(Entity entity)
//        {
//            for (int i = 0; i < Entitys.Length; i++)
//                if (Entitys[i] == entity)
//                { Entitys[i] = null; return; }
//            //ContainerJSON = new ContainerJSON(this);
//        }
//        public Entity FindEntity(string id)
//        {
//            for (int i = 0; i < Entitys.Length; i++)
//                if (Entitys[i] != null && Entitys[i].ID != null && Entitys[i].ID.ToString() == id)
//                    return Entitys[i];
//            return null;
//        }

//        public override void Save(SerializationWriter SW)
//        {
//            base.Save(SW);
//            SW.WriteStartElement("Container");
//            SW.WriteVersion(0);

//            SW.Write("Maximum", Maximum);
//            //SW.Write(Items);

//            SW.WriteStartElement("Entitys");
//            for (int i = 0; i < Entitys.Length; i++)
//                if (Entitys[i] != null)
//                {
//                    SW.WriteStartElement("Element");
//                    Entitys[i].Save(SW);
//                    SW.WriteEndElement();
//                }
//            SW.WriteEndElement();





//            SW.WriteEndElement();
//        }
//        public override void Load(SerializationReader SR, Map map)
//        {
//            base.Load(SR, map);
//            SR.ReadStartElement();
//            int version = SR.ReadVersion();
//            switch (version)
//            {
//                case 0:
//                    {
//                        Maximum = SR.ReadInt();
//                        break;
//                    }
//            }
//            //SR.ReadEntitys(this, map);


//            if (SR.IsEmptyElement) { SR.Read(); return; }
//            while (SR.Read())
//            {
//                if (Name == "Entitys" && SR.IsEndElement()) { SR.ReadEndElement(); break; }//return; }
//                if (SR.IsType())
//                {
//                    Entity entity = SR.ReadType() as Entity;
//                    entity.Load(SR, map);
//                    Add(entity);
//                    //entity.MoveToMap(entity.X, entity.Y, entity.Z, entity.Map);
//                }
//            }



//            SR.ReadEndElement();
//        }


//    }
//}
