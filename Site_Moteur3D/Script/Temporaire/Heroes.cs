using System;
using Core.Utility;

namespace Core.Temporaire
{
    public class Heroes : Mobile
    {
        public string Team = "TeamA";
        public int ArcheryNbr = 10;
    }
    public class Idole : Heroes
    {
        DateTime LastSpawn = DateTime.Now;
        int nbr = 0;
        public Idole()
        {
            AI = new AIBatiment();
            Width = 4;
            Height = 4;
            CanTarget = true;
            Hit = 100;
            Hit_Min = 0;
            Hit_Max = 100;
            Mana = 100;
            Mana_Min = 0;
            Mana_Max = 100;
        }
        public override void OnTick()
        {
            base.OnTick();

            if (((Int32)(DateTime.Now - LastSpawn).TotalMilliseconds) > 1000)//((Int32)(DateTime.Now - Now).TotalMilliseconds)DateTime.Now - Now).TotalMilliseconds)
                Spawn();
        }
        public void Spawn()
        {
            LastSpawn = DateTime.Now;
            Soldat soldat = new Soldat();
            soldat.ID = Team + "_" + nbr++;
            soldat.Name = "Soldat";
            soldat.Team = Team;
            //if (nbr % 2 == 0) soldat.Team = "TeamB";
            soldat.MoveToMap(X + 4, Y + 4, Z, Map);
            //Entity.Map.Add(soldat);
        }
    }
    public class Temple : Heroes
    {
        public Temple()
        {
            AI = new AIBatiment();
            Width = 4;
            Height = 2;
            CanTarget = true;
            Hit = 100;
            Hit_Min = 0;
            Hit_Max = 100;
            Mana = 100;
            Mana_Min = 0;
            Mana_Max = 100;
        }

    }
    public class Tour : Heroes
    {
        public Tour()
        {
            AI = new AIBatiment();
            Width = 2;
            Height = 4;
            CanTarget = true;
            Hit = 100;
            Hit_Min = 0;
            Hit_Max = 100;
            Mana = 100;
            Mana_Min = 0;
            Mana_Max = 100;
        }

    }
    public class Soldat : Heroes
    {
        public Soldat()
        {
            AI = new AISoldat();
            AI.Entity = this;
            Width = 0.75F;
            Height = 0.75f;
            CanTarget = true;
            CanMove = true;
            Hit = 100;
            Hit_Min = 0;
            Hit_Max = 100;
            Mana = 100;
            Mana_Min = 0;
            Mana_Max = 100;
            Add(new Power_Melee());
            Add(new Power_Throw());
        }

    }

    public class AIBatiment : AI
    {
        public override void OnTick()
        {
            if (Entity == null) return;
            if (Tick) return;
            Tick = true;
            //if (((Int32)(DateTime.Now - LastSpawn).TotalMilliseconds) > 5000)//((Int32)(DateTime.Now - Now).TotalMilliseconds)DateTime.Now - Now).TotalMilliseconds)
            //    Spawn();
            if (Target == null)
                OnTarget();

            Tick = false;
        }
    }
    public class AISoldat : AI
    {
        public override void OnTick()
        {
            if (Entity == null) return;
            if (Tick) return;
            Tick = true;

            Heroes hero = Entity as Heroes;
            Heroes target = null;
            Heroes target_Archery = null;
            if (hero != null)
            {
                EntityList Melees = Range(1);
                if (Melees.Length > 0)
                    for (int i = 0; i < Melees.Length; i++)
                    {
                        Heroes temp_target = Melees[i] as Heroes;
                        if (temp_target == null) continue;
                        if (hero.Team == temp_target.Team) continue;
                        if (target == null || target.Hit > temp_target.Hit)
                            target = temp_target;
                    }
                if (target == null)
                {
                    EntityList Archerys = Range(2);
                    if (Archerys.Length > 0)
                        for (int i = 0; i < Archerys.Length; i++)
                        {
                            Heroes temp_target = Archerys[i] as Heroes;
                            if (temp_target == null) continue;
                            if (hero.Team == temp_target.Team) continue;
                            if (target_Archery == null || target_Archery.Hit > temp_target.Hit)
                                target_Archery = temp_target;
                        }
                }
            }
            if (target != null)
            {
                hero.OnUsePower("Power_Melee", target);
            }
            else if (target_Archery != null)
            {
                if (hero.ArcheryNbr > 0)
                {
                    hero.ArcheryNbr--;
                    hero.OnUsePower("Power_Throw", target_Archery);
                }
                else
                {
                    //Direction direction = target_Archery.ToDestination(hero.X, hero.Y, hero.Z);
                    //MoveTo(target_Archery.X + direction.X, target_Archery.Y + direction.Y, target_Archery.Z + direction.Z);
                }
            }
            else if (Entity.Move == null)//(Entity.Move.Street.Length == 0)
            {
                MoveToRandom();
            }

            Tick = false;
        }
    }

    public class IdoleA : Idole { }
    public class TempleA : Temple { }
    public class TourA : Tour { }
    public class SoldatA : Soldat { }
    public class IdoleB : Idole { public IdoleB() { Team = "TeamB"; } }
    public class TempleB : Temple { public TempleB() { Team = "TeamB"; } }
    public class TourB : Tour { public TourB() { Team = "TeamB"; } }
    public class SoldatB : Soldat { public SoldatB() { Team = "TeamB"; } }

}
