using System;

namespace Core.Utility
{
    public class DamageAOE : DamageInfo
    {
        public Rectangle3D Rectangle = new Rectangle3D();
        public virtual void OnDamage(Entity entity)
        {
            if (entity is Mobile)
                ((Mobile)entity).OnDamage(Damage());
        }
        public virtual DamageInfo Damage()
        {
            DamageInfo damage = new DamageInfo();
            damage.Attacker = Attacker;
            damage.Hit = Hit;
            damage.Mana = Mana;
            damage.Start = Start;
            damage.Step = Step;
            damage.Duration = Duration;
            return damage;
        }
    }
    public class DamageInfo
    {
        public Entity Attacker;
        public DateTime Create = DateTime.UtcNow;
        public int Hit, Mana = 0;
        public bool Applied = false;
        public int Start, Step, Duration = 0;
    }
    public class MobileJSON : EntityJSON
    {
        public int Hit = 10;
        public int Hit_Min = 10;
        public int Hit_Max = 10;
        public int Mana = 10;
        public int Mana_Min = 10;
        public int Mana_Max = 10;
        public Power[] Powers;
        public BodyJSON Body_Stand;
        public BodyJSON Body_Move;
        public BodyJSON Body_Jump;
        public MobileJSON(Mobile entity)
            : base(entity)
        {
            Hit = entity.Hit;
            Hit_Min = entity.Hit_Min;
            Hit_Max = entity.Hit_Max;
            Mana = entity.Mana;
            Mana_Min = entity.Mana_Min;
            Mana_Max = entity.Mana_Max;
            Powers = entity.Powers;
            Body_Stand = entity.Body_Stand;
            Body_Move = entity.Body_Move;
            Body_Jump = entity.Body_Jump;
        }
    }

    public class Mobile : Entity
    {
        public int Hit = 10;
        public int Hit_Min = 10;
        public int Hit_Max = 10;
        public int Mana = 10;
        public int Mana_Min = 10;
        public int Mana_Max = 10;

        //public BodyJSON Body_Stand = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Stand", 1, 1) }, true, true, 1250, -1);
        //public BodyJSON Body_Move = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Move", 1, 1) }, true, true, 750, -1);
        public BodyJSON Body_Jump = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Jump", 1, 1) }, true, true, 1500, 1500);
        public BodyJSON Body_Melee = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Melee", 1, 1) }, true, true, 1000, 1000);
        public BodyJSON Body_Throw = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Throw", 1, 1) }, true, true, 1000, 1000);

        public Mobile() { }
        public Mobile(string name, int x, int y, int z, Map map)
            : base(name, x, y, z, map)
        {
        }
        public override EntityJSON CreateJSON() { return new MobileJSON(this); }
        public override void OnTick()
        {
            base.OnTick();
            //if (Body != null)
            //{
            //    if (Body.Duration > -1 && Body.Duration < Body.StepServer)
            //        Body = Body_Stand;
            //    else
            //        Body.StepServer += Map.Step;
            //}
            OnDamageApplied();
        }

        public virtual void Jump()
        {
            Direction direction = Info.IntToDirection(Direction);
            if (CanMoveTo(X + direction.X * 2, Y + direction.Y * 2, Z + direction.Z, Map))
            {
                MoveJSON movejson = new MoveJSON();
                //MoveJSON movejson = Move;
                Point3D[] p = new Point3D[] { new Point3D(X, Y, Z), new Point3D(X + direction.X, Y + direction.Y, Z + direction.Z), new Point3D(X + direction.X * 2, Y + direction.Y * 2, Z + direction.Z) };
                //if (movejson == null)
                //    movejson = new MoveJSON();
                movejson.Speed = 500;
                movejson.Body = Body_Jump;
                //movejson.StepServer = 0;
                movejson.Street = p;
                //Body.Step = 0;
                //Body.StepServer = 0;
                Move = movejson;
                MoveStart();
            }
        }
        //public override void MoveStart()
        //{
        //    base.MoveStart();
        //    //Move.Body = Body_Move;
        //}
        //public override void MoveEnd()
        //{
        //    base.MoveEnd();
        //    //Body = Body_Stand;
        //}
        protected DamageInfo[] Damages = new DamageInfo[0];
        public void Add(DamageInfo damage)
        {
            DamageInfo[] temp = new DamageInfo[Damages.Length + 1];
            for (int i = 0; i < Damages.Length; i++)
                temp[i] = Damages[i];
            temp[Damages.Length] = damage;
            Damages = temp;
        }
        public virtual void OnDamage(DamageInfo damage) { Add(damage); }
        protected virtual void OnDamageApplied()
        {
            DamageInfo[] list = Damages;
            for (int i = 0; i < list.Length; i++)
            {
                if (list[i] == null || list[i].Applied) continue;
                //var time = DateTime.UtcNow - list[i].Create - list[i].Start;
                //if (time < 0 || time > list[i].Duration) continue;
                //if (DateTime.UtcNow-list[i].Create < list[i].Start || DateTime.UtcNow -list[i].Create > list[i].Start + list[i].Duration) continue;
                list[i].Applied = true;
                Hit += list[i].Hit;
                Mana += list[i].Mana;
            }
            if (Hit <= 0) OnDeath();
        }
        public Power[] Powers = new Power[0];
        public void Add(Power power)
        {
            Power[] temp = new Power[Powers.Length + 1];
            for (int i = 0; i < Powers.Length; i++)
                temp[i] = Powers[i];
            temp[Powers.Length] = power;
            Powers = temp;
        }
        public Power FindPower(string name)
        {
            for (int i = 0; i < Powers.Length; i++)
                if (Powers[i].Name == name)
                    return Powers[i];
            return null;
        }
        public virtual MessageJSON[] OnUsePower(string name, Entity target, int x, int y, int z, int Adjustment_X, int Adjustment_Y)
        {
            Power power = FindPower(name);
            if (power != null)
                return power.OnUse(this, target, x, y, z, Adjustment_X, Adjustment_Y);
            else
                return new MessageJSON[0];
        }
        public virtual void OnUsePower(string name, Entity target)
        {
            Power power = FindPower(name);
            if (power != null)
                power.OnUse(this, target);
        }
        public virtual void OnUsePower(string name, int x, int y, int z)
        {
            Power power = FindPower(name);
            if (power != null)
                power.OnUse(this, x, y, z);
        }
        public virtual void OnMelee(Mobile target)
        {
            target.OnParad(this);
        }
        public virtual void OnArchery(Mobile target)
        {
            target.OnDodge(this);
        }
        public virtual void OnParad(Mobile target)
        {

        }
        public virtual void OnDodge(Mobile target)
        {

        }
        protected virtual void CombatStart() { }
        protected virtual void CombatEnd() { }

        public virtual void OnDeath()
        {
            AI = null;
            MoveEnd();
            Map.OnExit(this);
        }

        public override void Save(SerializationWriter SW)
        {
            base.Save(SW);
            SW.WriteStartElement("Mobile");
            SW.WriteVersion(0);

            //if (AI == null) SW.Write("AI", "");
            //else SW.Write("AI", AI.GetType().ToString());
            SW.Write("Body_Stand", Body_Stand);
            SW.Write("Body_Move", Body_Move);
            SW.Write("Body_Jump", Body_Jump);

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
                        //string ai = SR.ReadString();
                        //if (ai != "") AI = Info.Instance(ai) as AI;
                        Body_Stand = SR.ReadBodyJSON();
                        Body_Move = SR.ReadBodyJSON();
                        Body_Jump = SR.ReadBodyJSON();

                        break;
                    }
            }

            SR.ReadEndElement();
        }

    }
}
