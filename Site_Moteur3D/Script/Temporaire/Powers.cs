using System;

namespace Core.Utility
{
    public class Powers { }
    public class Power_Aggro : Power
    {
        public Power_Aggro()
        {
            Name = "Power_Aggro";
            Image = new ImageJSON("Mobile_Aggro", 1, 1);
        }
        public override MessageJSON[] OnUse(Mobile mobile, Entity target, int x, int y, int z, int Adjustment_X, int Adjustment_Y)
        {
            mobile.Body = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Aggro", 1, 1) }, true, true, 500, 1000);
            return new MessageJSON[0];
        }
    }
    public class Power_Melee : Power
    {
        public Power_Melee()
        {
            Name = "Power_Melee";
            Image = new ImageJSON("Mobile_Melee", 1, 1);
        }
        public override MessageJSON[] OnUse(Mobile mobile, Entity target, int x, int y, int z, int Adjustment_X, int Adjustment_Y)
        {
            if (target == null) return new MessageJSON[0];
            OnUse(mobile, target);
            return new MessageJSON[0];
        }
        public override void OnUse(Mobile mobile, Entity target)
        {
            mobile.ChangeDirection(target.X, target.Y, target.Z);
            DamageInfo damage = new DamageInfo();
            damage.Attacker = mobile;
            damage.Hit = -15;
            if (target is Mobile)
                ((Mobile)target).OnDamage(damage);
            mobile.MoveEnd();
            mobile.Body = mobile.Body_Melee;
            //mobile.Body.Step = 0;
            //mobile.Body.StepServer = 0;
        }
    }
    public class Power_Archery : Power
    {
        public Power_Archery()
        {
            Name = "Power_Archery";
            Image = new ImageJSON("Mobile_Archery", 1, 1);
        }
        public override MessageJSON[] OnUse(Mobile mobile, Entity target, int x, int y, int z, int Adjustment_X, int Adjustment_Y)
        {
            mobile.Body = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Archery", 1, 1) }, true, true, 500, 1000);
            return new MessageJSON[0];
        }
    }
    public class Power_Heal : Power
    {
        public Power_Heal()
        {
            Name = "Power_Heal";
            Image = new ImageJSON("Mobile_Heal", 1, 1);
            Cursor = new ImageJSON("Shield_00", 1, 1);
            Target = "Cursor";
            Size = 1;
        }
        public override MessageJSON[] OnUse(Mobile mobile, Entity target, int x, int y, int z, int Adjustment_X, int Adjustment_Y)
        {
            mobile.ChangeDirection(x, y, z);
            DamageAOE damageAOE = new DamageAOE();
            damageAOE.Attacker = mobile;
            damageAOE.Hit = 10;
            damageAOE.Rectangle = new Rectangle3D(x - 1, y - 1, z - 1, Size * 2 + 1, Size * 2 + 1, Size * 2 + 1);
            mobile.Map.Add(damageAOE);
            mobile.Body = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Heal", 1, 1) }, true, true, 2000, 2000);
            LastAction = DateTime.UtcNow;
            return new MessageJSON[0];
        }
    }
    public class Power_Jump : Power
    {
        public Power_Jump()
        {
            Name = "Power_Jump";
            Image = new ImageJSON("Mobile_Jump", 1, 1);
        }
        public override MessageJSON[] OnUse(Mobile mobile, Entity target, int x, int y, int z, int Adjustment_X, int Adjustment_Y)
        {
            mobile.Jump();
            return new MessageJSON[0];
        }
    }
    public class Power_Throw : Power
    {
        public Power_Throw()
        {
            Name = "Power_Throw";
            Image = new ImageJSON("Mobile_Throw", 1, 1);
        }
        public override MessageJSON[] OnUse(Mobile mobile, Entity target, int x, int y, int z, int Adjustment_X, int Adjustment_Y)
        {
            if (target == null) return new MessageJSON[0];
            OnUse(mobile, target);
            return new MessageJSON[0];
        }
        public override void OnUse(Mobile mobile, Entity target)
        {
            mobile.ChangeDirection(target.X, target.Y, target.Z);
            DamageInfo damage = new DamageInfo();
            damage.Attacker = mobile;
            damage.Hit = -5;
            if (target is Mobile)
                ((Mobile)target).OnDamage(damage);

            mobile.MoveEnd();
            mobile.Body = mobile.Body_Throw;
            //mobile.Body.Step = 0;
            //mobile.Body.StepServer = 0;

            Animation anim = new Animation();
            anim.Name = "ATTACK_01";
            anim.Entity_Src = mobile.ID;
            anim.Entity_Dest = target.ID;
            mobile.Map.PlayAnimation(anim);
        }
    }
}
