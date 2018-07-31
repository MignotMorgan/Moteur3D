using System;

namespace Core.Utility
{
    public class Power
    {
        public string Name = "";
        public ImageJSON Image = new ImageJSON();//Changer en ImageJSON[] + ajouter Speed
        public ImageJSON Cursor = new ImageJSON();//Changer en ImageJSON[] + ajouter Speed

        public DateTime LastAction = DateTime.UtcNow;// DateTime.Now;//
        public string Target = "Automatic";// "Dynamic";// "Cursor"//
        public int Size = 1;
        //Ajouter Range pour *SelectedMouse--> PageMap.js

        //public DamageInfo Damage = new DamageInfo();
        //public int LastAction = DateTime.Now. //0;
        //public int Cast = 0;
        //public int CoolDown = 1000;

        //public int Speed = 10000;
        //public int Step = 0;

        public virtual MessageJSON[] OnUse(Mobile mobile, Entity target, int x, int y, int z, int Adjustment_X, int Adjustment_Y) { return new MessageJSON[0]; }

        public virtual void OnUse(Mobile mobile, Entity target) { }
        public virtual void OnUse(Mobile mobile, int x, int y, int z) { } 
    }
}
