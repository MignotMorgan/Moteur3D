
namespace Core.Utility
{
    public class Animations
    {
        public static Animation[] List = new Animation[] {Error(), Attack(), Shield(), Quake_00(), Flare_00() };
        //public static Animation[] CreateAnimations()
        //{
        //    return new Animation[] { Error() };

        //}
        public static Animation Error()
        {
            Animation animation = new Animation();
            animation.Name = "ERROR";
            animation.Duration = 5000;
            animation.Text = "ERROR!!!";

            Effect effect = new Effect();
            effect.KeyName = "ToScreen_X";
            effect.End = 1000;
            effect.Number = 200;
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "ToScreen_Y";
            effect.End = 1000;
            effect.Number = 250;
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "MoveToAxeY";
            effect.End = 1000;
            effect.Number = 250;
            animation.Add(effect);

            return animation;
        }
        public static Animation Attack()
        {
            Animation animation = new Animation();
            animation.Name = "ATTACK_01";
            animation.Image = new ImageJSON("Rock", 1, 1);
            animation.Width = 50;
            animation.Height = 50;
            animation.Duration = 1000;
            //animation.Image_Animated = true;
            //animation.Text = "ERROR!!!";

            Effect effect = new Effect();
            effect.KeyName = "ToHead_Src";
            effect.End = 1000;
            //effect.Number = 200;
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "Size_Width";
            effect.End = 1000;
            effect.Number = 0.2f;
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "Size_Height";
            effect.End = 1000;
            effect.Number = 0.2f;
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "MoveToHead_Dest";
            effect.End = 1000;
            //effect.Number = 250;
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "Size_MoveToAxeY";
            effect.End = 500;
            effect.Number = -0.5f;
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "Size_ToAxeY";
            effect.Start = 500;
            effect.End = 1000;
            effect.Number = -0.5f;
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "Size_MoveToAxeY";
            effect.Start = 500;
            effect.End = 1000;
            effect.Number = 0.5f;
            animation.Add(effect);

            return animation;
        }
        public static Animation Shield()
        {
            Animation animation = new Animation();
            animation.Name = "Shield_00";
            animation.Image = new ImageJSON("Shield_00", 1, 1);
            animation.Width = 50;
            animation.Height = 50;
            animation.Duration = 3000;
            //animation.Image_Animated = true;
            //animation.Text = "ERROR!!!";

            Effect effect = new Effect();
            effect.KeyName = "ToHead_Src";
            //effect.End = 3000;
            //effect.Number = 200;
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "Centred";
            //effect.Start = 500;
            //effect.End = 3000;
            //effect.Number = 150;
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "Zoom_Width";
            effect.Number = 150;
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "Zoom_Height";
            effect.Number = 150;
            animation.Add(effect);

            return animation;
        }
        public static Animation Quake_00()
        {
            Animation animation = new Animation();
            animation.Name = "Quake_00";
            animation.Image = new ImageJSON("Quake_00", 1, 1);
            animation.Width = 150;
            animation.Height = 100;
            animation.Duration = 750;
            animation.Image_Animated = true;

            Effect effect = new Effect();
            effect.KeyName = "ToHead_Src";
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "Centred";
            animation.Add(effect);

            return animation;
        }
        public static Animation Flare_00()
        {
            Animation animation = new Animation();
            animation.Name = "Flare_00";
            animation.Image = new ImageJSON("Flare_00", 1, 1);
            animation.Width = 100;
            animation.Height = 100;
            animation.Duration = 2000;

            Effect effect = new Effect();
            effect.KeyName = "ToHead_Src";
            animation.Add(effect);

            effect = new Effect();
            effect.KeyName = "Centred";
            animation.Add(effect);

            return animation;
        }
    }
}