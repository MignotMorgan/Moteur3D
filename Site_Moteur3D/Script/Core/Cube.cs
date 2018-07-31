
namespace Core
{
    public class Cube
    {
        public int X = 0;
        public int Y = 0;
        public int Z = 0;

        public ImageJSON[] Floors = new ImageJSON[0];
        public ImageJSON[] Volumes = new ImageJSON[0];
        public int Floors_Speed = 0;
        public int Volumes_Speed = 0;

        public bool Climb = true;
        public bool Cross = true;
        public bool See = true;
        public bool Attack = true;

        public Cube() { }
        public Cube(int x, int y, int z, Map map)
        {
            X = x;
            Y = y;
            Z = z;
            map.Add(this);
        }

        public virtual void Save(SerializationWriter SW)
        {
            SW.WriteType(this);
            SW.WriteStartElement("Cube");
            SW.WriteVersion(0);

            SW.Write("X", X);
            SW.Write("Y", Y);
            SW.Write("Z", Z);

            SW.Write("Climb", Climb);
            SW.Write("Cross", Cross);
            SW.Write("See", See);
            SW.Write("Attack", Attack);

            SW.Write("Floors_Speed", Floors_Speed);
            SW.Write("Volumes_Speed", Volumes_Speed);

            SW.Write("Floors", Floors);
            SW.Write("Volumes", Volumes);

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
                        X = SR.ReadInt();
                        Y = SR.ReadInt();
                        Z = SR.ReadInt();

                        Climb = SR.ReadBool();
                        Cross = SR.ReadBool();
                        See = SR.ReadBool();
                        Attack = SR.ReadBool();

                        Floors_Speed = SR.ReadInt();
                        Volumes_Speed = SR.ReadInt();

                        Floors = SR.ReadImagesJSON();
                        Volumes = SR.ReadImagesJSON();

                        break;
                    }
            }
            SR.ReadEndElement();
        }
    }
}