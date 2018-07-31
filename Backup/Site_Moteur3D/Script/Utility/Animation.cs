
namespace Core.Utility
{
    public class Animation
    {
        public string Control = string.Empty;
        public string Name = string.Empty;
        public int Step = 0;
        public string Entity_Src = string.Empty;
        public string Entity_Dest = string.Empty;
        public Point3D Cube_Src = new Point3D();
        public Point3D Cube_Dest = new Point3D();
        public int Start = 0;

        public int Duration = 0;
        public int X, Y, Width, Height = 0;
        public ImageJSON Image = null;
        public bool Image_Animated = false;
        public string Text = string.Empty;

        public Effect[] Effects = new Effect[0];
        public void Add(Effect effect)
        {
            Effect[] temp = new Effect[Effects.Length + 1];
            for (int i = 0; i < Effects.Length; i++)
                temp[i] = Effects[i];
            temp[Effects.Length] = effect;
            if (Duration < effect.End)Duration = effect.End;
            Effects = temp;
        }
    }

    public class Effect
    {
        public string KeyName = string.Empty;
        public int Start = 0;
        public int End = -1;
        public string Text = string.Empty;
        public float Number = 0;

        public Effect() { }
    }

    public class ScreenAnimation
    {
        public string Name = string.Empty;
        public bool CanInterrupt = false;
        public TemplateJSON[] Templates;
        public Animation[] Animations;
        public Translator[] Translators;



        //Temporaire!!!!!!!!!!!!!
        public static ScreenAnimation Loaded()
        {
            ScreenAnimation screen = new ScreenAnimation();
            //screen.Templates = new TemplateJSON[] { new TemplateJSON("Load", 1, 1, @"http://Shariz.noip.me/Images/Chargement.png") };
            //screen.Templates = Info.Load;
            screen.Templates = new TemplateJSON[] { new TemplateJSON("Load", 1, 1, Info.ImageToUrl(Info.address_Images_HDD + @"\Default\" + "Chargement.png")) };
            //screen.Templates = new TemplateJSON[] { new TemplateJSON("Load", 1, 1, Info.Chargement) };

            screen.Animations = new Animation[] { new Animation() };
            screen.Animations[0].Name = "Loaded";
            screen.Animations[0].Duration = 1000000;
            screen.Animations[0].Image = new ImageJSON("Load", 1, 1);

            screen.Animations[0].X = 50;
            screen.Animations[0].Y = 50;
            screen.Animations[0].Width = 250;
            screen.Animations[0].Height = 250;

            Effect effect = new Effect();
            effect.KeyName = "FullScreen";
            effect.End = 1000000;
            screen.Animations[0].Add(effect);
            
            
            return screen;

        }

        //Temporaire!!!!!!!!!!!!!!!!!
        public static ScreenAnimation LoadedMap()
        {
            ScreenAnimation screen = new ScreenAnimation();
            screen.CanInterrupt = true;
            screen.Templates = new TemplateJSON[] { new TemplateJSON("Load", 1, 1, Info.ImageToUrl(Info.address_Images_HDD + @"\Default\" + "Histoire.png")) };

            screen.Animations = new Animation[] { new Animation() };
            screen.Animations[0].Name = "Loaded";
            screen.Animations[0].Duration = 1000000;
            screen.Animations[0].Image = new ImageJSON("Load", 1, 1);

            screen.Animations[0].X = 50;
            screen.Animations[0].Y = 50;
            screen.Animations[0].Width = 250;
            screen.Animations[0].Height = 250;

            Effect effect = new Effect();
            effect.KeyName = "FullScreen";
            effect.End = 1000000;
            screen.Animations[0].Add(effect);

            return screen;
        }
    }
}
       //public static Animation Error()
       // {
       //     Animation animation = new Animation();
       //     animation.ID = "ERROR";
       //     animation.Duration = 5000;
       //     animation.Text = "ERROR!!!";

       //     //animation.X = 500;
       //     //animation.Y = 250;
       //     Effect effect = new Effect();
       //     effect.KeyName = "ToScreen_X";
       //     effect.End = 1000;
       //     effect.Number = 200;
       //     animation.Add(effect);

       //     effect = new Effect();
       //     effect.KeyName = "ToScreen_Y";
       //     effect.End = 1000;
       //     effect.Number = 250;
       //     animation.Add(effect);

       //     effect = new Effect();
       //     effect.KeyName = "MoveToAxeY";
       //     effect.End = 1000;
       //     effect.Number = 250;
       //     animation.Add(effect);

       //     return animation;
       // }

    //public class AnimationText : Animation
    //{
    //    public string Text = string.Empty;

    //    public string Font = string.Empty;
    //    public bool Stroke = false;
    //    public bool Fill = true;
    //    public string StrokeStyle = string.Empty;
    //    public string FillStyle = string.Empty;
    //    public int LineWidth = 0;
    //    public string TextBaseline = string.Empty;
    //}
    //public class AnimationSound : Animation
    //{
    //    public string Url = string.Empty;
    //    public float Volume = 1f;
    //}




















//namespace Core.Utility
//{
//    public class AnimationList
//    {
//        public string ID = string.Empty;
//        public int Step = 0;
//        public string Entity_Src = string.Empty;
//        public string Entity_Dest = string.Empty;
//        public Point3D Cube_Src = new Point3D();
//        public Point3D Cube_Dest = new Point3D();
//        //public Point Case_Src = new Point();
//        //public Point Case_Dest = new Point();

//        public Animation[] Animations = new Animation[0];

//        public Animation() { }
//        public Animation(string id, string entity_Src, string entity_Dest, Point3D cube_Src, Point3D cube_Dest)//, Point case_Src, Point case_Dest)
//        {
//            ID = id;
//            Entity_Src = entity_Src;
//            Entity_Dest = entity_Dest;
//            Cube_Src = cube_Src;
//            Cube_Dest = cube_Dest;
//            //Case_Src = case_Src;
//            //Case_Dest = case_Dest;
//        }
//        public void Add(Animation animation)
//        {
//            Animation[] temp = new Animation[Animations.Length + 1];
//            for (int i = 0; i < Animations.Length; i++)
//                temp[i] = Animations[i];
//            temp[Animations.Length] = animation;
//            Animations = temp;
//        }
//    }

//    public class Animation
//    {
//        public int Start = 0;
//        public int End = 0;
//        public int X, Y, Width, Height = 0;
//        public ImageJSON Image = null;
//        public string Text = string.Empty;

//        public Effect[] Effects = new Effect[0];
//        public void Add(Effect effect)
//        {
//            Effect[] temp = new Effect[Effects.Length + 1];
//            for (int i = 0; i < Effects.Length; i++)
//                temp[i] = Effects[i];
//            temp[Effects.Length] = effect;
//            if (End < effect.End) End = effect.End;
//            Effects = temp;
//        }
//    }

//    //public class AnimationText : Animation
//    //{
//    //    public string Text = string.Empty;

//    //    public string Font = string.Empty;
//    //    public bool Stroke = false;
//    //    public bool Fill = true;
//    //    public string StrokeStyle = string.Empty;
//    //    public string FillStyle = string.Empty;
//    //    public int LineWidth = 0;
//    //    public string TextBaseline = string.Empty;
//    //}
//    //public class AnimationSound : Animation
//    //{
//    //    public string Url = string.Empty;
//    //    public float Volume = 1f;
//    //}



//    //public class PlayAnimation
//    //{
//    //    public string Name = string.Empty;
//    //    public int Delay = 0;
//    //    public string Entity_Src, Entity_Dest = string.Empty;
//    //    public Point3D Cube_Src, Cube_Dest = new Point3D();

//    //    public PlayAnimation(string name, string entity_Src, string entity_Dest, Point3D cube_Src, Point3D cube_Dest)
//    //    {
//    //        Name = name;
//    //        Entity_Src = entity_Src;
//    //        Entity_Dest = entity_Dest;
//    //        Cube_Src = cube_Src;
//    //        Cube_Dest = cube_Dest;
//    //    }
//    //}





//    //{ID:"", Start:0, End:0, Value:""}
//    public class Effect
//    {
//        public string ID = string.Empty;
//        public int Start = 0;
//        public int End = 0;

//        public int X, Y, Z = 0;
//        public string Text = string.Empty;
//        public bool Boolean = false;
//        public float Number = 0;

//        public Effect() { }
//        public Effect(string id, int start, int end) { ID = id; Start = start; End = end; }
//    }

//    //public class Effect_Point3D : Effect { public int X, Y, Z; public Effect_Point3D(){} public Effect_Point3D(string id, int start, int end, int x, int y, int z) : base(id, start, end) { X = x; Y = y; Z = z; } }
//    //public class Effect_Point : Effect { public int X, Y; public Effect_Point() { } public Effect_Point(string id, int start, int end, int x, int y) : base(id, start, end) { X = x; Y = y; } }
//    //public class Effect_String : Effect { public string Text; public Effect_String() { } public Effect_String(string id, int start, int end, string text) : base(id, start, end) { Text = text; } }
//    //public class Effect_Int : Effect { public int Number; public Effect_Int() { } public Effect_Int(string id, int start, int end, int number) : base(id, start, end) { Number = number; } }
//    //public class Effect_Float : Effect { public float Number; public Effect_Float() { } public Effect_Float(string id, int start, int end, float number) : base(id, start, end) { Number = number; } }
//    //public class Effect_Bool : Effect { public bool Boolean; public Effect_Bool() { } public Effect_Bool(string id, int start, int end, bool boolean) : base(id, start, end) { Boolean = boolean; } }

//    //public class Effect_Size : Effect { public int Width, Height; public Effect_Size() { } public Effect_Size(string id, int start, int end, int width, int height) : base(id, start, end) { Width = width; Height = height; } }

//}
