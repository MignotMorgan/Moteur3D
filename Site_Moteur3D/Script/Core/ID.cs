
namespace Core
{
    public class ID
    {

        string value = string.Empty;
        public string Value { get { return value; } }

        public ID() { }
        public ID(Entity entity)
        {
            value = entity.Name;
        }


        public override string ToString()
        {
            return Value;
        }

        //public override bool Equals(object o)
        //{
        //    ID id = o as ID;
        //    if(id == null)return false;
        //    return Value == id.Value;
        //}
        //public override int GetHashCode()
        //{
        //    return Value.GetHashCode();
        //}

        //public static bool operator ==(ID id_1, ID id_2)
        //{
        //    return id_1.Value == id_2.Value;
        //}
        //public static bool operator !=(ID id_1, ID id_2)
        //{
        //    return id_1.Value != id_2.Value;
        //}


        //public static bool operator ==(ID id_1, string str)
        //{
        //    if (id_1 == null) return false;
        //    return id_1.Value == str;
        //}
        //public static bool operator !=(ID id_1, string str)
        //{
        //    if (id_1 == null) return true;
        //    return id_1.Value != str;
        //}



        public virtual void Save(SerializationWriter SW)
        {
            SW.WriteVersion(0);
            SW.Write("Value", value);
        }

        public virtual void Load(SerializationReader SR)
        {
            int version = SR.ReadVersion();

            switch (version)
            {
                case 0:
                    {
                        value = SR.ReadString();
                        break;
                    }
            }
        }
    }
}
