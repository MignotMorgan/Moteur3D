
namespace Core.Utility
{
    public class PlayerMobileJSON : MobileJSON
    {
        public PlayerMobileJSON(PlayerMobile entity)
            : base(entity)
        {

        }
    }

    public class PlayerMobile : Mobile
    {
        public PlayerMobile() { }
        //public PlayerMobile(string name, int x, int y, int z, Map map)
        //    : base(name, x, y, z, map)
        //{
        //}
        //public override EntityJSON JSON { get { return CreateJSON(); } }
        public override EntityJSON CreateJSON() { return new PlayerMobileJSON(this); }


        //public override void OnTick() { base.OnTick(); if (AI != null)AI.OnTick(this); }



        //public virtual bool OnUsePower(Power power, Entity target) { return power.OnUse(this, target); }
        //public virtual bool OnUsePower(Power power, int x, int y, int z) { return power.OnUse(this, x, y, z); }


        public override void Save(SerializationWriter SW)
        {
            base.Save(SW);
            SW.WriteStartElement("PlayerMobile");
            SW.WriteVersion(0);

            SW.WriteEndElement();
        }

        public override void Load(SerializationReader SR)
        {
            base.Load(SR);
            SR.ReadStartElement();
            int version = SR.ReadVersion();
            switch (version)
            {
                case 0:
                    {

                        break;
                    }
            }

            SR.ReadEndElement();
        }

    }
}
