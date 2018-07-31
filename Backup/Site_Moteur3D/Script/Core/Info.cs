using System;
using System.IO;
using System.Drawing;
using System.Web.Script.Serialization;
using Core.Utility;

namespace Core
{
    public static class Info
    {
        //TEMPORAIRE!!!!!!!!!!!!!!
        public static Forum.ForumList ForumList = new Forum.ForumList();
        public static void Start()
        {
            ForumList.Load(Info.address_Forum);
            WebTV.Channels.Start();
        }




        public static object Instance(string fulltype)
        {
            Type type = Type.GetType(fulltype);
            try { return Activator.CreateInstance(type); } catch { return null; }
        }
        public static Point CubeToScreen(double Case_X, double Case_Y, Point Position, int taille)
        {
            Point point = new Point();
            point.X = (int)((Case_X - Case_Y) * taille);
            point.Y = (int)((Case_X + Case_Y) * taille / 2);
            point.X += Position.X + taille;
            point.Y += Position.Y;
            return point;
        }
        public static Point ScreenToCube(int Screen_X, int Screen_Y, Point Position, int taille)
        {
            Point point = new Point();
            Screen_X = Screen_X - Position.X;
            Screen_Y = Screen_Y - Position.Y;
            double y = ((2 * Screen_Y - Screen_X) / 2);
            double x = (Screen_X + y);
            y = Math.Round(y / taille);
            x = Math.Round(x / taille) - 1;
            point.X = (int)x;
            point.Y = (int)y;
            return point;
        }
        public static string ImageToUrl(string filepath)
        {
            if (!File.Exists(filepath)) return string.Empty;
            byte[] bytes = File.ReadAllBytes(filepath);
            return "data:image/png;base64," + Convert.ToBase64String(bytes);
        }
        public static Bitmap UrlToImage(string imageUrl)
        {
            Bitmap image = null;

            try
            {
                System.Net.HttpWebRequest webRequest = (System.Net.HttpWebRequest)System.Net.HttpWebRequest.Create(imageUrl);
                webRequest.AllowWriteStreamBuffering = true;
                webRequest.Timeout = 30000;

                System.Net.WebResponse webResponse = webRequest.GetResponse();

                System.IO.Stream stream = webResponse.GetResponseStream();

                image = new Bitmap(stream);

                webResponse.Close();
            }
            catch //(Exception ex)//Sécuriser!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            {
                var base64Data = System.Text.RegularExpressions.Regex.Match(imageUrl, @"data:image/(?<type>.+?),(?<data>.+)").Groups["data"].Value;
                var binData = Convert.FromBase64String(base64Data);
                using (var stream = new MemoryStream(binData))
                {
                        image = new Bitmap(stream);
                }
            }
            return image;
        }
        public static string JSONSerialize(object obj)
        {
            JavaScriptSerializer JavaScriptSerializer = new JavaScriptSerializer();
            JavaScriptSerializer.MaxJsonLength = Int32.MaxValue;
            JavaScriptSerializer.RecursionLimit = Int32.MaxValue;
            return JavaScriptSerializer.Serialize(obj);
        }
        public static T JSONDeserialize<T>(string value)
        {
            JavaScriptSerializer JavaScriptSerializer = new JavaScriptSerializer();
            JavaScriptSerializer.MaxJsonLength = Int32.MaxValue;
            JavaScriptSerializer.RecursionLimit = Int32.MaxValue;
            return JavaScriptSerializer.Deserialize<T>(value);
        }

        public readonly static char separator = '\\'; // '/';
        public readonly static string extension = ".Xml";
        public readonly static string True = "True";
        public readonly static string False = "False";
        public readonly static string type = "Type";
        public readonly static string Culture = "fr";

        public static Random Random = new Random();

        public static int Range(Entity entity, Entity target)
        {
            return Range(entity.X, entity.Y, entity.Z, target.X, target.Y, target.Z);
        }
        public static int Range(Entity entity, int destX, int destY, int destZ)
        {
            return Range(entity.X, entity.Y, entity.Z, destX, destY, destZ);
        }
        public static int Range(int srcX, int srcY, int srcZ, int destX, int destY, int destZ)
        {
            int x = Math.Abs(srcX - destX);
            int y = Math.Abs(srcY - destY);
            int z = Math.Abs(srcZ - destZ);

            if (x >= y && x >= z) return x;
            else if (y >= x && y >= z) return y;
            else return z;
        }

        public static Direction IntToDirection(int n)
        {
            //int z = n / 9 == 2 ? -1 : (n / 9);
            //n %= 9;
            //int y = n / 3 == 2 ? -1 : n / 3;
            //n %= 3;
            //int x = n == 2 ? -1 : n;
            //return new Direction(x, y, z);

            int x = 0;
            int y = 0;
            int z = 0;
            int n2 = n % 8;
            switch (n2)
            {
                //case 0: { x = 0; y = 0; break; }    //None
                case 0: { x = 0; y = -1; break; }   //N
                case 1: { x = 1; y = 0; break; }    //E
                case 2: { x = 0; y = 1; break; }    //S
                case 3: { x = -1; y = 0; break; }   //W
                case 4: { x = -1; y = -1; break; }  //N-W
                case 5: { x = 1; y = -1; break; }   //N-E
                case 6: { x = 1; y = 1; break; }    //S-E
                case 7: { x = -1; y = 1; break; }   //S-W
            }
            if (n >= 16) z = 1;                     //Up
            else if (n >= 8) z = -1;                //Down

            return new Direction(x, y, z);
        }
        //public static Direction IntToDirection(int n)
        //{
        //    //int z = n / 9 == 2 ? -1 : (n / 9);
        //    //n %= 9;
        //    //int y = n / 3 == 2 ? -1 : n / 3;
        //    //n %= 3;
        //    //int x = n == 2 ? -1 : n;
        //    //return new Direction(x, y, z);

        //    int x = 0;
        //    int y = 0;
        //    int z = 0;
        //    int n2 = n % 9;
        //    switch (n2)
        //    {
        //        case 0: { x = 0; y = 0; break; }    //None
        //        case 1: { x = 0; y = -1; break; }   //N
        //        case 2: { x = 1; y = 0; break; }    //E
        //        case 3: { x = 0; y = 1; break; }    //S
        //        case 4: { x = -1; y = 0; break; }   //W
        //        case 5: { x = -1; y = -1; break; }  //N-W
        //        case 6: { x = 1; y = -1; break; }   //N-E
        //        case 7: { x = 1; y = 1; break; }    //S-E
        //        case 8: { x = -1; y = 1; break; }   //S-W
        //    }
        //    if (n >= 18) z = 1;                     //Up
        //    else if (n >= 9) z = -1;                //Down

        //    return new Direction(x, y, z);
        //}

        public readonly static string address_SandBox = @"C:\inetpub\SandBox\";
        public readonly static string address_WwwRoot = @"C:\inetpub\wwwroot\";
        //public readonly static String address_Web = @"http://Shariz.noip.me/";
        //public readonly static String address_Images_Web = @"http://Shariz.noip.me/Images/";
        public readonly static string address_Images_HDD = address_WwwRoot + @"Images\";
        public readonly static string address_Editor = address_SandBox + @"Editor\";
        public readonly static string address_Forum = address_SandBox + @"Forum\";
        public readonly static string address_WebTV = address_SandBox + @"WebTV\";
        public readonly static string address_WebTVJSON = address_WebTVJSON + @"WebTVJSON\";
        public readonly static string address_WebTV_Forum = address_WebTV + @"Forum\";

        public static void SaveWorld(World world, string path)
        {
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            Info.SaveFileWorld(world, path + "World" + Info.extension);

            if (!Directory.Exists(path + @"Maps\"))
                Directory.CreateDirectory(path + @"Maps\");
            for (int m = 0; m < world.Maps.Length; m++)
                SaveFileMap(world.Maps[m], path + @"Maps\" + world.Maps[m].Name + Info.extension);

            if (!Directory.Exists(path + @"Animations\"))
                Directory.CreateDirectory(path + @"Animations\");
            for (int a = 0; a < world.Animations.Length; a++)
                SaveFileAnimation(world.Animations[a], path + @"Animations\" + world.Animations[a].Name + Info.extension);

            if (!Directory.Exists(path + @"TemplateJSON\"))
                Directory.CreateDirectory(path + @"TemplateJSON\");
            for (int a = 0; a < world.Templates.Length; a++)
                SaveFileTemplateJSON(world.Templates[a], path + @"TemplateJSON\" + world.Templates[a].Name + Info.extension);

            if (!Directory.Exists(path + @"Translators\"))
                Directory.CreateDirectory(path + @"Translators\");
            for (int t = 0; t < world.Translators.Length; t++)
                SaveFileTranslator(world.Translators[t], path + @"Translators\" + world.Translators[t].Name + Info.extension);
        }
        public static World LoadWorld(string path)
        {
            if (!File.Exists(path + @"\World" + Info.extension)) return null;
            World world = LoadFileWorld(path + @"\World" + Info.extension);
            if (world == null) return null;

            if (Directory.Exists(path + @"\Maps\"))
            {
                DirectoryInfo d = new DirectoryInfo(path + @"\Maps\");
                foreach (FileInfo file in d.GetFiles())
                {
                    Map map = LoadFileMap(file.FullName);
                    world.Add(map);
                }
            }
            if (Directory.Exists(path + @"\Animations\"))
            {
                DirectoryInfo dir = new DirectoryInfo(path + @"\Animations\");
                foreach (FileInfo file in dir.GetFiles())
                {
                    Animation animation = LoadFileAnimation(file.FullName);
                    world.Add(animation);
                }
            }
            if (Directory.Exists(path + @"\TemplateJSON\"))
            {
                DirectoryInfo direct = new DirectoryInfo(path + @"\TemplateJSON\");
                foreach (FileInfo file in direct.GetFiles())
                {
                    TemplateJSON template = LoadFileTemplateJSON(file.FullName);
                    world.Add(template);
                }
            }
            if (Directory.Exists(path + @"\Translators\"))
            {
                DirectoryInfo d = new DirectoryInfo(path + @"\Translators\");
                foreach (FileInfo file in d.GetFiles())
                {
                    Translator translator = LoadFileTranslator(file.FullName);
                    world.Add(translator);
                }
            }
            return world;
        }
        public static void SaveFileWorld(World world, string path)
        {
            SerializationWriter SW = new SerializationWriter(path);

            SW.Start("Info");
            SW.WriteType(world);
            world.Save(SW);
            SW.End();        
        }
        public static World LoadFileWorld(string path)
        {
            SerializationReader SR = new SerializationReader(path);

            SR.Read();
            SR.ReadDeclaration();
            SR.ReadStartElement();
            World world = null;
            if (SR.IsType())
            {
                world = SR.ReadType() as World;
                world.Load(SR);
            }
            SR.Close();

            return world;
        }
        public static void SaveFileMap(Map map, string path)
        {
            SerializationWriter SW = new SerializationWriter(path);

            SW.Start("Info");
            SW.WriteType(map);
            map.Save(SW);
            SW.End();
        }
        public static Map LoadFileMap(string path)
        {
            SerializationReader SR = new SerializationReader(path);

            SR.Read();
            SR.ReadDeclaration();
            SR.ReadStartElement();

            Map map = null;
            if (SR.IsType())
            {
                map = SR.ReadType() as Map;
                map.Load(SR);
            }
            SR.Close();
            map.CreateMessageCubes();
            map.CreateMessagePermanents();
            return map;
        }
        public static void SaveFileAnimation(Animation animation, string path)
        {
            SerializationWriter SW = new SerializationWriter(path);

            SW.Start("Info");
            SW.Write("Animations", animation);
            SW.End();
        }
        public static Animation LoadFileAnimation(string path)
        {
            SerializationReader SR = new SerializationReader(path);
            SR.Read();
            SR.ReadDeclaration();
            SR.ReadStartElement();
            Animation animation = SR.ReadAnimation();
            SR.Close();
            return animation;
        }
        public static void SaveFileTemplateJSON(TemplateJSON template, string path)
        {
            SerializationWriter SW = new SerializationWriter(path);
            SW.Start("Info");
            SW.WriteJSON("TemplateJSON", template);
            SW.End();
        }
        public static TemplateJSON LoadFileTemplateJSON(string path)
        {
            SerializationReader SR = new SerializationReader(path);
            SR.Read();
            SR.ReadDeclaration();
            SR.ReadStartElement();
            TemplateJSON template = SR.ReadJSON<TemplateJSON>();
            SR.Close();
            return template;
        }
        public static void SaveFileTranslator(Translator translator, string path)
        {
            SerializationWriter SW = new SerializationWriter(path);

            SW.Start("Info");
            SW.WriteType(translator);
            translator.Save(SW);
            SW.End();
        }
        public static Translator LoadFileTranslator(string path)
        {
            SerializationReader SR = new SerializationReader(path);

            SR.Read();
            SR.ReadDeclaration();
            SR.ReadStartElement();

            Translator translator = null;
            if (SR.IsType())
            {
                translator = SR.ReadType() as Translator;
                translator.Load(SR);
            }
            SR.Close();
            return translator;
        }
        public static void SaveFileForum(Forum.Forum forum, string path)
        {
            SerializationWriter SW = new SerializationWriter(path);

            SW.Start("Info");
            //SW.WriteType(forum);
            forum.Save(SW);
            SW.End();
        }
        public static Forum.Forum LoadFileForum(string path)
        {
            SerializationReader SR = new SerializationReader(path);

            SR.Read();
            SR.ReadDeclaration();
            SR.ReadStartElement();

            Forum.Forum forum = null;
            if (SR.IsType())
            {
                forum = SR.ReadType() as Forum.Forum;
                forum.Load(SR);
            }
            SR.Close();
            return forum;
        }

        public static void SaveFileAppearances(Appearances appearances, string path)
        {
            SerializationWriter SW = new SerializationWriter(path);
            SW.Start("Info");
            
            SW.WriteType(appearances);
            appearances.Save(SW);

            SW.End();
        }
        public static Appearances LoadFileAppearances(string path)
        {
            SerializationReader SR = new SerializationReader(path);
            SR.Read();
            SR.ReadDeclaration();
            SR.ReadStartElement();

            Appearances appearances = SR.ReadType() as Appearances;
            appearances.Load(SR);

            SR.Close();
            return appearances;
        }
        //public static void SaveFileForum(Forum.Forum2 forum, string path)
        //{
        //    SerializationWriter SW = new SerializationWriter(path);

        //    SW.Start("Info");
        //    SW.WriteType(forum);
        //    forum.Save(SW);
        //    SW.End();
        //}
        //public static Forum.Forum2 LoadFileForum(string path)
        //{
        //    SerializationReader SR = new SerializationReader(path);

        //    SR.Read();
        //    SR.ReadDeclaration();
        //    SR.ReadStartElement();

        //    Forum.Forum2 forum = null;
        //    if (SR.IsType())
        //    {
        //        forum = SR.ReadType() as Forum.Forum2;
        //        forum.Load(SR);
        //    }
        //    SR.Close();
        //    return forum;
        //}

        public static ShortcutJSON[] Shortcut_Default = new ShortcutJSON[]
        {
            new ShortcutJSON(false,false,false,false,0,""),
            new ShortcutJSON(false,false,false,false,8,"Backspace"),
            new ShortcutJSON(false,false,false,false,9,"Selected_Last"),
            new ShortcutJSON(false,false,false,false,13,"Enter"),

            new ShortcutJSON(false,false,false,false,49,"Power_01_00"),
            new ShortcutJSON(false,false,false,false,50,"Power_01_01"),
            new ShortcutJSON(false,false,false,false,51,"Power_01_02"),
            new ShortcutJSON(false,false,false,false,52,"Power_01_03"),
            new ShortcutJSON(false,false,false,false,53,"Power_01_04"),
            new ShortcutJSON(false,false,false,false,54,"Power_01_05"),
            new ShortcutJSON(false,false,false,false,55,"Power_01_06"),
            new ShortcutJSON(false,false,false,false,56,"Power_01_07"),
            new ShortcutJSON(false,false,false,false,57,"Power_01_08"),
            new ShortcutJSON(false,false,false,false,58,"Power_01_19"),
            new ShortcutJSON(false,false,false,false,59,"Power_01_10"),
            new ShortcutJSON(false,false,false,false,60,"Power_01_11")
        };

        public static ShortcutJSON[] Keyboard_Be = new ShortcutJSON[]
        {
            new ShortcutJSON(false,false,false,false,0,""),
            new ShortcutJSON(false,false,false,false,8,"Backspace"),
            new ShortcutJSON(false,false,false,false,9,"Tab"),
            new ShortcutJSON(false,false,false,false,13,"Enter"),
            //new Shortcut(false,false,false,false,16,"Shift"),
            //new Shortcut(false,false,false,false,17,"Ctrl"),
            //new Shortcut(false,false,false,false,18,"Alt"),
            //new Shortcut(false,false,false,false,19,"Pause"),
            //new ShortcutJSON(false,false,false,false,20,"Capslock"),
            new ShortcutJSON(false,false,false,false,27,"Esc"),
            new ShortcutJSON(false,false,false,false,32,"Space"),
            new ShortcutJSON(false,false,false,false,33,"PageUp"),
            new ShortcutJSON(false,false,false,false,34,"PageDown"),
            new ShortcutJSON(false,false,false,false,35,"End"),
            new ShortcutJSON(false,false,false,false,36,"Home"),
            new ShortcutJSON(false,false,false,false,37,"LeftArrow"),
            new ShortcutJSON(false,false,false,false,38,"UpArrow"),
            new ShortcutJSON(false,false,false,false,39,"RightArrow"),
            new ShortcutJSON(false,false,false,false,40,"DownArrow"),
            new ShortcutJSON(false,false,false,false,45,"Insert"),
            new ShortcutJSON(false,false,false,false,46,"Delete"),

            new ShortcutJSON(false,false,false,false,48,"à"),
            new ShortcutJSON(false,false,false,false,49,"&"),
            new ShortcutJSON(false,false,false,false,50,"é"),
            new ShortcutJSON(false,false,false,false,51,"\""),
            new ShortcutJSON(false,false,false,false,52,"'"),
            new ShortcutJSON(false,false,false,false,53,"("),
            new ShortcutJSON(false,false,false,false,54,"§"),
            new ShortcutJSON(false,false,false,false,55,"è"),
            new ShortcutJSON(false,false,false,false,56,"!"),
            new ShortcutJSON(false,false,false,false,57,"ç"),
            new ShortcutJSON(false,false,false,false,58,":"),
            new ShortcutJSON(false,false,false,false,59,";"),
            new ShortcutJSON(false,false,false,false,60,"<"),
            new ShortcutJSON(false,false,false,false,61,"="),

            new ShortcutJSON(false,false,false,false,65,"a"),
            new ShortcutJSON(false,false,false,false,66,"b"),
            new ShortcutJSON(false,false,false,false,67,"c"),
            new ShortcutJSON(false,false,false,false,68,"d"),
            new ShortcutJSON(false,false,false,false,69,"e"),
            new ShortcutJSON(false,false,false,false,70,"f"),
            new ShortcutJSON(false,false,false,false,71,"g"),
            new ShortcutJSON(false,false,false,false,72,"h"),
            new ShortcutJSON(false,false,false,false,73,"i"),
            new ShortcutJSON(false,false,false,false,74,"j"),
            new ShortcutJSON(false,false,false,false,75,"k"),
            new ShortcutJSON(false,false,false,false,76,"l"),
            new ShortcutJSON(false,false,false,false,77,"m"),
            new ShortcutJSON(false,false,false,false,78,"n"),
            new ShortcutJSON(false,false,false,false,79,"o"),
            new ShortcutJSON(false,false,false,false,80,"p"),
            new ShortcutJSON(false,false,false,false,81,"q"),
            new ShortcutJSON(false,false,false,false,82,"r"),
            new ShortcutJSON(false,false,false,false,83,"s"),
            new ShortcutJSON(false,false,false,false,84,"t"),
            new ShortcutJSON(false,false,false,false,85,"u"),
            new ShortcutJSON(false,false,false,false,86,"v"),
            new ShortcutJSON(false,false,false,false,87,"w"),
            new ShortcutJSON(false,false,false,false,88,"x"),
            new ShortcutJSON(false,false,false,false,89,"y"),
            new ShortcutJSON(false,false,false,false,90,"z"),
            
            //new Shortcut(false,false,false,false,91,"Win"),
            new ShortcutJSON(false,false,false,false,96,"0"),//pavé numérique
            new ShortcutJSON(false,false,false,false,97,"1"),
            new ShortcutJSON(false,false,false,false,98,"2"),
            new ShortcutJSON(false,false,false,false,99,"3"),
            new ShortcutJSON(false,false,false,false,100,"4"),
            new ShortcutJSON(false,false,false,false,101,"5"),
            new ShortcutJSON(false,false,false,false,102,"6"),
            new ShortcutJSON(false,false,false,false,103,"7"),
            new ShortcutJSON(false,false,false,false,104,"8"),
            new ShortcutJSON(false,false,false,false,105,"9"),
            new ShortcutJSON(false,false,false,false,106,"*"),
            new ShortcutJSON(false,false,false,false,107,"+"),
           // new Shortcut(false,false,false,false,108,""),
            new ShortcutJSON(false,false,false,false,109,"-"),
            new ShortcutJSON(false,false,false,false,110,"."),
            new ShortcutJSON(false,false,false,false,111,"/"),

            new ShortcutJSON(false,false,false,false,112,"F1"),
            new ShortcutJSON(false,false,false,false,113,"F2"),
            new ShortcutJSON(false,false,false,false,114,"F3"),
            new ShortcutJSON(false,false,false,false,115,"F4"),
            new ShortcutJSON(false,false,false,false,116,"F5"),
            new ShortcutJSON(false,false,false,false,117,"F6"),
            new ShortcutJSON(false,false,false,false,118,"F7"),
            new ShortcutJSON(false,false,false,false,119,"F8"),
            new ShortcutJSON(false,false,false,false,120,"F9"),
            new ShortcutJSON(false,false,false,false,121,"F10"),
            new ShortcutJSON(false,false,false,false,122,"F11"),
            new ShortcutJSON(false,false,false,false,123,"F12"),

            new ShortcutJSON(false,false,false,false,144,"Numlock"),
            new ShortcutJSON(false,false,false,false,145,"Scrolllock"),

            new ShortcutJSON(false,false,false,false,160,"^"),
            new ShortcutJSON(false,false,false,false,164,"$"),
            new ShortcutJSON(false,false,false,false,165,"ù"),
            
            new ShortcutJSON(false,false,false,false,169,")"),
            new ShortcutJSON(false,false,false,false,173,"-"),
            new ShortcutJSON(false,false,false,false,187,"="),
            new ShortcutJSON(false,false,false,false,188,","),
            new ShortcutJSON(false,false,false,false,191,":"),
            new ShortcutJSON(false,false,false,false,220,"\\"),

            //Shift////////////////////////////////////
            //new ShortcutJSON(true,false,false,false,20,"Capslock"),
            new ShortcutJSON(true,false,false,false,48,"0"),
            new ShortcutJSON(true,false,false,false,49,"1"),
            new ShortcutJSON(true,false,false,false,50,"2"),
            new ShortcutJSON(true,false,false,false,51,"3"),
            new ShortcutJSON(true,false,false,false,52,"4"),
            new ShortcutJSON(true,false,false,false,53,"5"),
            new ShortcutJSON(true,false,false,false,54,"6"),
            new ShortcutJSON(true,false,false,false,55,"7"),
            new ShortcutJSON(true,false,false,false,56,"8"),
            new ShortcutJSON(true,false,false,false,57,"9"),

            
            new ShortcutJSON(true,false,false,false,58,"/"),
            new ShortcutJSON(true,false,false,false,59,"."),
            new ShortcutJSON(true,false,false,false,60,">"),
            new ShortcutJSON(true,false,false,false,61,"+"),
            
            new ShortcutJSON(true,false,false,false,65,"A"),
            new ShortcutJSON(true,false,false,false,66,"B"),
            new ShortcutJSON(true,false,false,false,67,"C"),
            new ShortcutJSON(true,false,false,false,68,"D"),
            new ShortcutJSON(true,false,false,false,69,"E"),
            new ShortcutJSON(true,false,false,false,70,"F"),
            new ShortcutJSON(true,false,false,false,71,"G"),
            new ShortcutJSON(true,false,false,false,72,"H"),
            new ShortcutJSON(true,false,false,false,73,"I"),
            new ShortcutJSON(true,false,false,false,74,"J"),
            new ShortcutJSON(true,false,false,false,75,"K"),
            new ShortcutJSON(true,false,false,false,76,"L"),
            new ShortcutJSON(true,false,false,false,77,"M"),
            new ShortcutJSON(true,false,false,false,78,"N"),
            new ShortcutJSON(true,false,false,false,79,"O"),
            new ShortcutJSON(true,false,false,false,80,"P"),
            new ShortcutJSON(true,false,false,false,81,"Q"),
            new ShortcutJSON(true,false,false,false,82,"R"),
            new ShortcutJSON(true,false,false,false,83,"S"),
            new ShortcutJSON(true,false,false,false,84,"T"),
            new ShortcutJSON(true,false,false,false,85,"U"),
            new ShortcutJSON(true,false,false,false,86,"V"),
            new ShortcutJSON(true,false,false,false,87,"W"),
            new ShortcutJSON(true,false,false,false,88,"X"),
            new ShortcutJSON(true,false,false,false,89,"Y"),
            new ShortcutJSON(true,false,false,false,90,"Z"),

            new ShortcutJSON(true,false,false,false,160,"¨"),
            new ShortcutJSON(true,false,false,false,164,"*"),
            new ShortcutJSON(true,false,false,false,165,"%"),

            new ShortcutJSON(true,false,false,false,169,"°"),
            new ShortcutJSON(true,false,false,false,173,"_"),
            new ShortcutJSON(true,false,false,false,188,"?"),

            //Ctrl//////////////////////////////////
            new ShortcutJSON(false,true,false,false,67,"Copy"),
            new ShortcutJSON(false,true,false,false,86,"Paste"),
            
            //altGr///////////////////////////////////
            new ShortcutJSON(false,true,true,false,48,"}"),
            new ShortcutJSON(false,true,true,false,49,"|"),
            new ShortcutJSON(false,true,true,false,50,"@"),
            new ShortcutJSON(false,true,true,false,51,"#"),
            //new Shortcut(false,true,true,false,52,"{"),
            //new Shortcut(false,true,true,false,53,"["),
            new ShortcutJSON(false,true,true,false,54,"^"),
            //new Shortcut(false,true,true,false,55,""),
            //new Shortcut(false,true,true,false,56,""),
            new ShortcutJSON(false,true,true,false,57,"{"),
            
            new ShortcutJSON(false,true,true,false,60,"\\"),
            new ShortcutJSON(false,true,true,false,61,"~"),
            new ShortcutJSON(false,true,true,false,69,"€"),
            new ShortcutJSON(false,true,true,false,160,"["),
            new ShortcutJSON(false,true,true,false,164,"]"),
            new ShortcutJSON(false,true,true,false,165,"´"),

            //new Shortcut(false,true,true,false,169,""),
            //new Shortcut(false,true,true,false,173,""),//{[{[}}}


            new ShortcutJSON(false,false,false,false,0,"")
        };
        
        
        //Cf : PageBase.FindGameInfo(); + ScreenAnimation.Template
        public static TemplateJSON[] TemplatesImages = new TemplateJSON[]
        {
            new TemplateJSON("FlecheLeft", 1, 1, ImageToUrl(Info.address_Images_HDD + @"\Interface\"  + "FlecheLeft.jpg")),
            new TemplateJSON("Web", 1, 1, "https://image.freepik.com/icones-gratuites/domaine_318-32028.png"),
            new TemplateJSON("Social", 8, 4, "http://www.livelygreen.com/wp-content/uploads/2014/07/horizontal-screen.png"),
            new TemplateJSON("Dailymotion", 1, 1, "http://press.dailymotion.com/fr/wp-content/uploads/sites/4/2010/06/LOGO-PRESS-BLOG.png"),
            new TemplateJSON("Email", 1, 1, "http://www.pngfactory.net/_png/_thumb/29792-kiki66-EMAIL5.png"),
            new TemplateJSON("Cube", 1, 1, ImageToUrl(Info.address_Images_HDD + @"\Default\"  + "Cube.png")),
            new TemplateJSON("Floors", 4, 4, ImageToUrl(Info.address_Images_HDD + @"\Default\"  + "Floors.png")),
            new TemplateJSON("Cubes", 4, 4, ImageToUrl(Info.address_Images_HDD + @"\Default\"  + "Cubes.png")),
            new TemplateJSON("OmbreCube", 1, 1, ImageToUrl(Info.address_Images_HDD + @"\Default\"  + "OmbreCube.png")),
            new TemplateJSON("Cubes2", 4, 4, ImageToUrl(Info.address_Images_HDD + @"\Default\"  + "Cubes2.png")),
            new TemplateJSON("Rock", 1, 1, ImageToUrl(Info.address_Images_HDD + @"\Default\"  + "Rock.png")),
            new TemplateJSON("Rocks", 1, 1, ImageToUrl(Info.address_Images_HDD + @"\Default\"  + "Rocks.png")),

            new TemplateJSON("Particules", 4, 4, ImageToUrl(Info.address_Images_HDD + @"\Default\"  + "Particules.png")),

            new TemplateJSON("Mobile_Stand", 4, 8, ImageToUrl(Info.address_Images_HDD + @"\Default\Mobile_00\" + "Mobile_Stand.png")),
            new TemplateJSON("Mobile_Move", 4, 8, ImageToUrl(Info.address_Images_HDD + @"\Default\Mobile_00\" + "Mobile_Move.png")),
            new TemplateJSON("Mobile_Jump", 1, 8, ImageToUrl(Info.address_Images_HDD + @"\Default\Mobile_00\" + "Mobile_Jump.png")),
            new TemplateJSON("Mobile_Melee", 4, 8, ImageToUrl(Info.address_Images_HDD + @"\Default\Mobile_00\" + "Mobile_Melee.png")),
            new TemplateJSON("Mobile_Throw", 4, 8, ImageToUrl(Info.address_Images_HDD + @"\Default\Mobile_00\" + "Mobile_Throw.png")),

            new TemplateJSON("Mobile_Seated", 1, 8, ImageToUrl(Info.address_Images_HDD + @"\Default\Mobile_00\" + "Mobile_Seated.png")),
            new TemplateJSON("Mobile_Aggro", 2, 8, ImageToUrl(Info.address_Images_HDD + @"\Default\Mobile_00\" + "Mobile_Aggro.png")),
            new TemplateJSON("Mobile_Archery", 2, 8, ImageToUrl(Info.address_Images_HDD + @"\Default\Mobile_00\" + "Mobile_Archery.png")),
            new TemplateJSON("Mobile_Heal", 1, 8, ImageToUrl(Info.address_Images_HDD + @"\Default\Mobile_00\" + "Mobile_Heal.png")),
            //new TemplateJSON("Mobile_Fly", 1, 8, Info.address_Images + @"\Default\Mobile_00\" + "Mobile_Fly.png"),

            //new TemplateJSON("Explosion_00", 1, 1, "http://opengameart.org/sites/default/files/explosion0.png"),
            //new TemplateJSON("Explosion_01", 1, 1, "http://opengameart.org/sites/default/files/explosion1.png"),
            //new TemplateJSON("Explosion_02", 1, 1, "http://opengameart.org/sites/default/files/explosion2.png"),
            
            
            //new TemplateJSON("Shield_00", 1, 1, "http://opengameart.org/sites/default/files/shields_0.png"),
            new TemplateJSON("Shield_00", 8, 8, ImageToUrl(Info.address_Images_HDD + @"\Default\" + "Circle.png"))


            //new TemplateJSON("Quake_00", 6, 3, "http://opengameart.org/sites/default/files/quake_0.png"),
            //new TemplateJSON("Freeze_00", 4, 6, "http://opengameart.org/sites/default/files/freeze.png"),
            //new TemplateJSON("FireBall_00", 8, 8, "http://opengameart.org/sites/default/files/fireball_0.png"),
            //new TemplateJSON("Flare_00", 1, 1, "http://opengameart.org/sites/default/files/flare_0.png"),
            //new TemplateJSON("Arbre_00", 4, 4, "http://opengameart.org/sites/default/files/flare_usable.png"),
            //new TemplateJSON("Teleport_00", 1, 5, "http://opengameart.org/sites/default/files/teleport_512.png"),
        };

        //public static TemplateJSON[] Load = new TemplateJSON[] { new TemplateJSON("Load", 1, 1, Info.ImageToUrl(Info.address_Images + @"\Default\" + "Chargement.png")) };

        //public static TemplateJSON[] LoadMap = new TemplateJSON[] { new TemplateJSON("Load", 1, 1, Info.ImageToUrl(Info.address_Images + @"\Default\" + "Histoire.png")) };



        //public static TemplateJSON[] TemplatesImages = new TemplateJSON[]
        //{
        //    new TemplateJSON("Floors", 4, 4, Info.address_Images + @"\Default\"  + "Floors.png"),
        //    new TemplateJSON("Cubes", 4, 4, Info.address_Images + @"\Default\"  + "Cubes.png"),
        //    new TemplateJSON("Cubes2", 4, 4, Info.address_Images + @"\Default\"  + "Cubes2.png"),
        //    new TemplateJSON("Rock", 1, 1, Info.address_Images + @"\Default\"  + "Rock.png"),
        //    new TemplateJSON("Rocks", 1, 1, Info.address_Images + @"\Default\"  + "Rocks.png"),

        //    new TemplateJSON("Mobile_Stand", 4, 8, Info.address_Images + @"\Default\Mobile_00\" + "Mobile_Stand.png"),
        //    new TemplateJSON("Mobile_Move", 4, 8, Info.address_Images + @"\Default\Mobile_00\" + "Mobile_Move.png"),
        //    new TemplateJSON("Mobile_Jump", 1, 8, Info.address_Images + @"\Default\Mobile_00\" + "Mobile_Jump.png"),
        //    new TemplateJSON("Mobile_Melee", 4, 8, Info.address_Images + @"\Default\Mobile_00\" + "Mobile_Melee.png"),
        //    new TemplateJSON("Mobile_Throw", 4, 8, Info.address_Images + @"\Default\Mobile_00\" + "Mobile_Throw.png"),

        //    new TemplateJSON("Mobile_Seated", 1, 8, Info.address_Images + @"\Default\Mobile_00\" + "Mobile_Seated.png"),
        //    new TemplateJSON("Mobile_Aggro", 2, 8, Info.address_Images + @"\Default\Mobile_00\" + "Mobile_Aggro.png"),
        //    new TemplateJSON("Mobile_Archery", 2, 8, Info.address_Images + @"\Default\Mobile_00\" + "Mobile_Archery.png"),
        //    new TemplateJSON("Mobile_Heal", 1, 8, Info.address_Images + @"\Default\Mobile_00\" + "Mobile_Heal.png"),
        //    //new TemplateJSON("Mobile_Fly", 1, 8, Info.address_Images + @"\Default\Mobile_00\" + "Mobile_Fly.png"),

        //    //new TemplateJSON("Explosion_00", 1, 1, "http://opengameart.org/sites/default/files/explosion0.png"),
        //    //new TemplateJSON("Explosion_01", 1, 1, "http://opengameart.org/sites/default/files/explosion1.png"),
        //    //new TemplateJSON("Explosion_02", 1, 1, "http://opengameart.org/sites/default/files/explosion2.png"),
            
            
        //    new TemplateJSON("Shield_00", 1, 1, "http://opengameart.org/sites/default/files/shields_0.png")


        //    //new TemplateJSON("Quake_00", 6, 3, "http://opengameart.org/sites/default/files/quake_0.png"),
        //    //new TemplateJSON("Freeze_00", 4, 6, "http://opengameart.org/sites/default/files/freeze.png"),
        //    //new TemplateJSON("FireBall_00", 8, 8, "http://opengameart.org/sites/default/files/fireball_0.png"),
        //    //new TemplateJSON("Flare_00", 1, 1, "http://opengameart.org/sites/default/files/flare_0.png"),
        //    //new TemplateJSON("Arbre_00", 4, 4, "http://opengameart.org/sites/default/files/flare_usable.png"),
        //    //new TemplateJSON("Teleport_00", 1, 5, "http://opengameart.org/sites/default/files/teleport_512.png"),
        //};








    }
}













        ////Direction !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //public static int NumberDirection = 27;
        //public static Direction IntToDirection(int n)//Si on modifie, modifier dans Case!!!!!!!
        //{
        //    //int z = n / 9 == 2 ? -1 : (n / 9);
        //    //n %= 9;
        //    //int y = n / 3 == 2 ? -1 : n / 3;
        //    //n %= 3;
        //    //int x = n == 2 ? -1 : n;
        //    //return new Direction(x, y, z);

        //    int x = 0;
        //    int y = 0;
        //    int z = 0;
        //    int n2 = n % 9;
        //    switch (n2)
        //    {
        //        case 0: { x = 0; y = 0; break; }
        //        case 1: { x = 1; y = 1; break; }
        //        case 2: { x = -1; y = -1; break; }
        //        case 3: { x = 1; y = -1; break; }
        //        case 4: { x = -1; y = 1; break; }
        //        case 5: { x = -1; y = 0; break; }
        //        case 6: { x = 0; y = -1; break; }
        //        case 7: { x = 0; y = 1; break; }
        //        case 8: { x = 1; y = 0; break; }
        //    }
        //    if (n >= 18) z = 1;
        //    else if (n >= 9) z = -1;

        //    return new Direction(x, y, z);
        //}
        //public static int DirectionToInt(Direction d)
        //{
        //    //int x = (d.X == -1 ? 2 : d.X);// d.X+1; //Comparer Rapidité!!!!!!!!!!!!!!cf enum!!
        //    //int y = (d.Y == -1 ? 2 : d.Y) * 3;// (d.Y + 1) * 3;
        //    //int z = (d.Z == -1 ? 2 : d.Z) * 9;// (d.Z + 1) * 9;
        //    //return x + y + z;

        //    int n = 0;
        //    if (d.X == 0 && d.Y == 0) n = 0;
        //    else if (d.X == 1 && d.Y == 1) n = 1;
        //    else if (d.X == -1 && d.Y == -1) n = 2;
        //    else if (d.X == 1 && d.Y == -1) n = 3;
        //    else if (d.X == -1 && d.Y == 1) n = 4;
        //    else if (d.X == -1 && d.Y == 0) n = 5;
        //    else if (d.X == 0 && d.Y == -1) n = 6;
        //    else if (d.X == 0 && d.Y == 1) n = 7;
        //    else if (d.X == 1 && d.Y == 0) n = 8;

        //    if (d.Z == -1) n += 9;
        //    else if (d.Z == 1) n += 18;

        //    return n;
        //}


