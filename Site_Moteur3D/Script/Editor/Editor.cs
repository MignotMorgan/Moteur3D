using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.IO;
using System.Drawing;
using Core;
using Core.Utility;

namespace Editor
{
    public class Editor3D
    {
        public World World = null;
        public Map Map = null;

        public Editor3D(World world, Map map)
        {
            World = world;
            Map = map;
        }
        public void Clear()
        {
            World = null;
            Map = null;
        }
        public string[] MapNames()
        {
            if (World == null) return new string[0];
            string[] mapnames = new string[World.Maps.Length];
            for (int i = 0; i < World.Maps.Length; i++)
                mapnames[i] = World.Maps[i].Name;
            return mapnames;
        }
        public Map FindMap(string name)
        {
            if (World == null || name == null || name == string.Empty) return null;
            Map = World.FindMap(name);
            return Map;
        }
        public void Save() { Save(""); }
        public void Save(string path)
        {
            if (World == null) return;
            if(path == null || path == string.Empty)
                path = Info.address_Editor + "Worlds" + Info.separator + World.Name + Info.separator;
            Info.SaveWorld(World, path);
        }
        public void Load(string path)
        {
            if (path == null || path == string.Empty)
                path = Info.address_Editor + "Worlds" + Info.separator;
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            World = null;

            DirectoryInfo directory = new DirectoryInfo(path);
            foreach (DirectoryInfo dir in directory.GetDirectories())
            {
                if (!File.Exists(dir.FullName + @"\World" + Info.extension)) continue;
                World = Info.LoadWorld(dir.FullName);
            }
        }
        public void NewWorld(string name)
        {
            NewWorld(name, "Core.World");
        }
        public void NewWorld(string name, string fulltype)
        {
            if (name == string.Empty) return;
            if (World != null && World.Name == name) return;

            if (fulltype == string.Empty) fulltype = "Core.World";
            World = Info.Instance(fulltype) as World;

            if (World != null)
            {
                World.Name = name;
            }
        }
        public void NewMap(string name, int width, int height, int depth)
        {
            NewMap(name, "Core.Map", width, height, depth);
        }
        public void NewMap(string name, string fulltype, int width, int height, int depth)
        {
            if (fulltype == string.Empty) fulltype = "Core.Map";
            Map map = Info.Instance(fulltype) as Map;
            if (map == null) return;
            map.Name = name;
            map.Width = width;
            map.Height = height;
            map.Depth = depth;
            map.Cubes = new Cube[width, height, depth];
            map.ScreenAnimation = ScreenAnimation.LoadedMap();
            World.Add(map);
            Map = map;
            //Temporaire!!!!
            for (int y = 0; y < height; y++)
                for (int x = 0; x < width; x++)
                {
                    Cube ca = new Cube(x, y, 0, map);
                    ca.Floors = new ImageJSON[] { new ImageJSON("Floors", 3, 1) };
                    ca.Climb = false;
                }

            map.CreateMessageCubes();
            map.CreateMessagePermanents();
        }

        public void NewCube(int x, int y, int z)
        {
            NewCube("Core.Cube", x, y, z);
        }
        public void NewCube(string fulltype, int x, int y, int z)
        {
            if (Map == null && !Map.Contains(x, y, z)) return;
            if (fulltype == string.Empty) fulltype = "Core.Cube";
            Cube cube = Info.Instance(fulltype) as Cube;
            if (cube == null) return;
            cube.X = x;
            cube.Y = y;
            cube.Z = z;
            Map.Add(cube);
        }
        public void Climb(int x, int y, int z, bool climb)
        {
            if (Map == null || !Map.Contains(x, y, z)) return;
            Cube cube = Map.FindCube(x, y, z);
            if (cube == null)
            {
                NewCube(x, y, z);
                cube = Map.FindCube(x, y, z);
            }
            cube.Climb = climb;
        }
        public void Cross(int x, int y, int z, bool cross)
        {
            if (Map == null || !Map.Contains(x, y, z)) return;
            Cube cube = Map.FindCube(x, y, z);
            if (cube == null)
            {
                NewCube(x, y, z);
                cube = Map.FindCube(x, y, z);
            }
            cube.Cross = cross;
        }
        public void See(int x, int y, int z, bool see)
        {
            if (Map == null || !Map.Contains(x, y, z)) return;
            Cube cube = Map.FindCube(x, y, z);
            if (cube == null)
            {
                NewCube(x, y, z);
                cube = Map.FindCube(x, y, z);
            }
            cube.See = see;
        }
        public void Attack(int x, int y, int z, bool attack)
        {
            if (Map == null || !Map.Contains(x, y, z)) return;
            Cube cube = Map.FindCube(x, y, z);
            if (cube == null)
            {
                NewCube(x, y, z);
                cube = Map.FindCube(x, y, z);
            }
            cube.Attack = attack;
        }
        public void Floors(int x, int y, int z, ImageJSON[] floors)
        {
            if (Map == null || !Map.Contains(x, y, z)) return;
            Cube cube = Map.FindCube(x, y, z);
            if (cube == null)
            {
                NewCube(x, y, z);
                cube = Map.FindCube(x, y, z);
            }
            cube.Floors = floors;
        }
        public void FloorSpeed(int x, int y, int z, int speed)
        {
            if (Map == null || !Map.Contains(x, y, z)) return;
            Cube cube = Map.FindCube(x, y, z);
            if (cube == null)
            {
                NewCube(x, y, z);
                cube = Map.FindCube(x, y, z);
            }
            //cube.Floors = floors;
            cube.Floors_Speed = speed;
        }
        public void Volumes(int x, int y, int z, ImageJSON[] volumes)
        {
            if (Map == null || !Map.Contains(x, y, z)) return;
            Cube cube = Map.FindCube(x, y, z);
            if (cube == null)
            {
                NewCube(x, y, z);
                cube = Map.FindCube(x, y, z);
            }
            cube.Volumes = volumes;
        }
        public void VolumeSpeed(int x, int y, int z, int speed)
        {
            if (Map == null || !Map.Contains(x, y, z)) return;
            Cube cube = Map.FindCube(x, y, z);
            if (cube == null)
            {
                NewCube(x, y, z);
                cube = Map.FindCube(x, y, z);
            }
            cube.Volumes_Speed = speed;
        }

        public void Translator(Translator translator )
        {
            if (translator == null || World == null) return;

            int index = -1;
            for (int i = 0; i < World.Translators.Length; i++)
                if (World.Translators[i].Name == translator.Name)
                { index = i; break; }

            if (index == -1) World.Add(translator);
            else World.Translators[index] = translator;
        }
        public void Animation(Animation animation)
        {
            if (animation == null || World == null) return;

            int index = -1;
            for (int i = 0; i < World.Animations.Length; i++)
                if (World.Animations[i].Name == animation.Name)
                { index = i; break; }

            if (index == -1) World.Add(animation);
            else World.Animations[index] = animation;
        }

        public void Template(TemplateJSON template)
        {
            if (template == null || World == null) return;
            int index = -1;
            for (var i = 0; i < World.Templates.Length; i++)
                if (World.Templates[i].Name == template.Name)
                    index = i;
            if (index > -1)
                World.Templates[index] = template;
            else
                World.Add(template);
        }

        public void Generate(string name, Bitmap texture_X, Bitmap texture_Y, Bitmap texture_Z)
        {
            if (World == null) return;
            EditorImage editor = new EditorImage();
            editor.Texture_Z = texture_Z;
            editor.Texture_Y = texture_Y;
            editor.Texture_X = texture_X;

            string p = Info.address_Images_HDD + @"/Templates/";
            if (!Directory.Exists(p))
                Directory.CreateDirectory(p);
            
            p += name;

            editor.OnImageCube(p+".png");

            string URL = Info.ImageToUrl(p);

            TemplateJSON template = new TemplateJSON(name, 4, 4, URL);
            World.Add(template);
            //Save();
        }
    }

    public class EditorImage
    {
        public Bitmap Texture_X = null;//new Bitmap(Info.address_WwwRoot + @"\Images\Histoire.png");
        public Bitmap Texture_Y = null;//new Bitmap(Info.address_WwwRoot + @"\Images\Histoire.png");
        public Bitmap Texture_Z = null;//new Bitmap(Info.address_WwwRoot + @"\Images\Histoire.png");

        public void OnImageCube(string path)
        {
            if(Texture_X == null || Texture_Y == null || Texture_Z == null) return;

            int taille = 50;
            int size = taille / 2;// 25;// 50;//
            Point point = new Point(0, 0);

            Bitmap bmp = new Bitmap(size * 16, size * 16);//new Bitmap(size * 4, size * 4);
            bmp.MakeTransparent(Color.White);
            Graphics g = Graphics.FromImage(bmp);


            point.X = size;
            OnImageFloor_Standart(g, point, size);
            point.X += 4 * size;
            OnImageCube_Standart(new Point(0, 0), new Point(2, 0), new Point(0, 2), 2, g, point, size);
            point.X += 4 * size;
            OnImageCube_Standart(new Point(0, 0), new Point(2, 0), new Point(0, 2), 1, g, point, size);
            point.X += 4 * size;
            OnImageCube_Standart(new Point(1, 1), new Point(3, 1), new Point(1, 3), 1, g, point, size);

            point.Y += 4 * size;
            point.X = size;
            OnImageCube_Standart(new Point(0, 0), new Point(1, 0), new Point(0, 1), 2, g, point, size);
            point.X += 4 * size;
            OnImageCube_Standart(new Point(0, 1), new Point(1, 1), new Point(0, 2), 2, g, point, size);
            point.X += 4 * size;
            OnImageCube_Standart(new Point(1, 0), new Point(2, 0), new Point(1, 1), 2, g, point, size);
            point.X += 4 * size;
            OnImageCube_Standart(new Point(1, 1), new Point(2, 1), new Point(1, 2), 2, g, point, size);

            point.Y += 4 * size;
            point.X = size;
            OnImageCube_Standart(new Point(1, 0), new Point(2, 0), new Point(1, 2), 2, g, point, size);
            point.X += 4 * size;
            OnImageCube_Standart(new Point(0, 0), new Point(1, 0), new Point(0, 2), 2, g, point, size);
            point.X += 4 * size;
            OnImageCube_Standart(new Point(0, 0), new Point(2, 0), new Point(0, 1), 2, g, point, size);
            point.X += 4 * size;
            OnImageCube_Standart(new Point(0, 1), new Point(2, 1), new Point(0, 2), 2, g, point, size);

            point.Y += 4 * size;
            point.X = size;
            OnImageCoin_North(g, point, size);
            point.X += 4 * size;
            OnImageCoin_Est(g, point, size);
            point.X += 4 * size;
            OnImageCoin_South(g, point, size);
            point.X += 4 * size;
            OnImageCoin_West(g, point, size);

            bmp.Save(path, System.Drawing.Imaging.ImageFormat.Png);
            
            //bmp.Save(Info.address_Images + Info.separator + "Cubes" + Info.separator + "Cubes_TEST.png", System.Drawing.Imaging.ImageFormat.Png);
            bmp.Dispose();
        }

        public void OnImageFloor_Standart(Graphics g, Point screen, int size)
        {
            Point Point_A = Info.CubeToScreen(2, 2, screen, size);
            Point Point_B = Info.CubeToScreen(4, 2, screen, size);
            Point Point_C = Info.CubeToScreen(2, 4, screen, size);

            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C });
        }

        public void OnImageCube_Standart(Point A, Point B, Point C, int Height, Graphics g, Point screen, int size)
        {
            Point Point_A = Info.CubeToScreen(A.X, A.Y, screen, size);
            Point Point_B = Info.CubeToScreen(B.X, B.Y, screen, size);
            Point Point_C = Info.CubeToScreen(C.X, C.Y, screen, size);
            Point Point_D = Info.CubeToScreen(B.X, C.Y, screen, size);
            Point Point_E = Info.CubeToScreen(C.X+Height, C.Y+Height, screen, size);
            Point Point_F = Info.CubeToScreen(B.X+Height, C.Y+Height, screen, size);

            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C });
            g.DrawImage(Texture_Y, new Point[] { Point_C, Point_D, Point_E });
            g.DrawImage(Texture_X, new Point[] { Point_D, Point_B, Point_F });
        }
        public void OnImageCoin_North(Graphics g, Point point, int size)
        {
            Point Point_A = Info.CubeToScreen(0, 1, point, size);
            Point Point_B = Info.CubeToScreen(1, 1, point, size);
            Point Point_C = Info.CubeToScreen(0, 2, point, size);
            int x = 0;
            int y = Texture_Z.Height / 2;
            int width = Texture_Z.Width;
            int height = Texture_Z.Height / 2;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(0, 0, point, size);
            Point_B = Info.CubeToScreen(1, 0, point, size);
            Point_C = Info.CubeToScreen(0, 1, point, size);
            x = 0;
            y = 0;
            width = Texture_Z.Width / 2;
            height = Texture_Z.Height / 2;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(1, 0, point, size);
            Point_B = Info.CubeToScreen(2, 0, point, size);
            Point_C = Info.CubeToScreen(1, 1, point, size);
            x = Texture_Z.Width / 2;
            y = 0;
            width = Texture_Z.Width / 2;
            height = Texture_Z.Height;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(0, 2, point, size);
            Point_B = Info.CubeToScreen(1, 2, point, size);
            Point_C = Info.CubeToScreen(2, 4, point, size);
            g.DrawImage(Texture_Y, new Point[] { Point_A, Point_B, Point_C });

            Point_A = Info.CubeToScreen(1, 1, point, size);
            Point_B = Info.CubeToScreen(2, 1, point, size);
            Point_C = Info.CubeToScreen(3, 3, point, size);
            g.DrawImage(Texture_Y, new Point[] { Point_A, Point_B, Point_C });

            Point_A = Info.CubeToScreen(1, 2, point, size);
            Point_B = Info.CubeToScreen(1, 1, point, size);
            Point_C = Info.CubeToScreen(3, 4, point, size);
            g.DrawImage(Texture_X, new Point[] { Point_A, Point_B, Point_C });

            Point_A = Info.CubeToScreen(2, 1, point, size);
            Point_B = Info.CubeToScreen(2, 0, point, size);
            Point_C = Info.CubeToScreen(4, 3, point, size);
            g.DrawImage(Texture_X, new Point[] { Point_A, Point_B, Point_C });

        }
        public void OnImageCoin_South(Graphics g, Point screen, int size)//Point A, Point B, Point C, int Height, Graphics g, Point screen, int size)
        {
            Point Point_A = Info.CubeToScreen(0, 1, screen, size);
            Point Point_B = Info.CubeToScreen(1, 1, screen, size);
            Point Point_C = Info.CubeToScreen(0, 2, screen, size);
            int x = 0;
            int y = 0;// Texture_Z.Height / 2;
            int width = Texture_Z.Width /2;
            int height = Texture_Z.Height;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(1, 1, screen, size);
            Point_B = Info.CubeToScreen(2, 1, screen, size);
            Point_C = Info.CubeToScreen(1, 2, screen, size);
            x = Texture_Z.Width / 2;
            y = Texture_Z.Height / 2;
            width = Texture_Z.Width /2;
            height = Texture_Z.Height /2;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(1, 0, screen, size);
            Point_B = Info.CubeToScreen(2, 0, screen, size);
            Point_C = Info.CubeToScreen(1, 1, screen, size);
            x = 0;
            y = 0;
            width = Texture_Z.Width;
            height = Texture_Z.Height /2;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(0, 2, screen, size);
            Point_B = Info.CubeToScreen(2, 2, screen, size);
            Point_C = Info.CubeToScreen(2, 4, screen, size);
            g.DrawImage(Texture_Y, new Point[] { Point_A, Point_B, Point_C });

            Point_A = Info.CubeToScreen(2, 2, screen, size);
            Point_B = Info.CubeToScreen(2, 0, screen, size);
            Point_C = Info.CubeToScreen(4, 4, screen, size);
            g.DrawImage(Texture_X, new Point[] { Point_A, Point_B, Point_C });
        }
        public void OnImageCoin_Est(Graphics g, Point point, int size)
        {
            Point Point_A = Info.CubeToScreen(0, 0, point, size);
            Point Point_B = Info.CubeToScreen(1, 0, point, size);
            Point Point_C = Info.CubeToScreen(0, 1, point, size);
            int x = 0;
            int y = 0;
            int width = Texture_Z.Width / 2;
            int height = Texture_Z.Height;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(0, 1, point, size);
            Point_B = Info.CubeToScreen(1, 1, point, size);
            Point_C = Info.CubeToScreen(2, 3, point, size);
            g.DrawImage(Texture_Y, new Point[] { Point_A, Point_B, Point_C });

            Point_A = Info.CubeToScreen(1, 0, point, size);
            Point_B = Info.CubeToScreen(2, 0, point, size);
            Point_C = Info.CubeToScreen(1, 1, point, size);
            x = Texture_Z.Width / 2;
            y = 0;
            width = Texture_Z.Width / 2;
            height = Texture_Z.Height / 2;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(1, 1, point, size);
            Point_B = Info.CubeToScreen(2, 1, point, size);
            Point_C = Info.CubeToScreen(1, 2, point, size);
            x = 0;
            y = Texture_Z.Height /2;
            width = Texture_Z.Width;
            height = Texture_Z.Height /2;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(1, 2, point, size);
            Point_B = Info.CubeToScreen(2, 2, point, size);
            Point_C = Info.CubeToScreen(3, 4, point, size);
            g.DrawImage(Texture_Y, new Point[] { Point_A, Point_B, Point_C });

            Point_A = Info.CubeToScreen(2, 2, point, size);
            Point_B = Info.CubeToScreen(2, 0, point, size);
            Point_C = Info.CubeToScreen(4, 4, point, size);
            g.DrawImage(Texture_X, new Point[] { Point_A, Point_B, Point_C });
        }
        public void OnImageCoin_West(Graphics g, Point point, int size)
        {
            Point Point_A = Info.CubeToScreen(0, 0, point, size);
            Point Point_B = Info.CubeToScreen(1, 0, point, size);
            Point Point_C = Info.CubeToScreen(0, 1, point, size);
            int x = 0;
            int y = 0;
            int width = Texture_Z.Width;
            int height = Texture_Z.Height/2;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(1, 1, point, size);
            Point_B = Info.CubeToScreen(1, 0, point, size);
            Point_C = Info.CubeToScreen(3, 3, point, size);
            g.DrawImage(Texture_X, new Point[] { Point_A, Point_B, Point_C });

            Point_A = Info.CubeToScreen(0, 1, point, size);
            Point_B = Info.CubeToScreen(1, 1, point, size);
            Point_C = Info.CubeToScreen(0, 2, point, size);
            x = 0;
            y = Texture_Z.Height / 2;
            width = Texture_Z.Width / 2;
            height = Texture_Z.Height / 2;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(1, 1, point, size);
            Point_B = Info.CubeToScreen(2, 1, point, size);
            Point_C = Info.CubeToScreen(1, 2, point, size);
            x = Texture_Z.Width / 2;
            y = 0;
            width = Texture_Z.Width / 2;
            height = Texture_Z.Height;
            g.DrawImage(Texture_Z, new Point[] { Point_A, Point_B, Point_C }, new Rectangle(x, y, width, height), GraphicsUnit.Pixel);

            Point_A = Info.CubeToScreen(0, 2, point, size);
            Point_B = Info.CubeToScreen(2, 2, point, size);
            Point_C = Info.CubeToScreen(2, 4, point, size);
            g.DrawImage(Texture_Y, new Point[] { Point_A, Point_B, Point_C });

            Point_A = Info.CubeToScreen(2, 2, point, size);
            Point_B = Info.CubeToScreen(2, 1, point, size);
            Point_C = Info.CubeToScreen(4, 4, point, size);
            g.DrawImage(Texture_X, new Point[] { Point_A, Point_B, Point_C });

        }
    }








    public class EditorVolume
    {

        public Bitmap Texture_Up = null;//new Bitmap(Info.address_WwwRoot + @"\Images\Histoire.png");
        public Bitmap Texture_Out = null;//new Bitmap(Info.address_WwwRoot + @"\Images\Histoire.png");
        public Bitmap Texture_In = null;//new Bitmap(Info.address_WwwRoot + @"\Images\Histoire.png");

        //Graphics graphics = null;
        //int Size = 10;
        
        public void OnImage(string path)
        {
            if (Texture_Up == null || Texture_Out == null || Texture_In == null) return;
            
            Bitmap bmp = new Bitmap(80, 80);//new Bitmap(size * 4, size * 4);
            bmp.MakeTransparent(Color.White);
            Graphics g = Graphics.FromImage(bmp);

            OnFloor(g, 0, 0, 10, Texture_Up);

            
            
            bmp.Save(path, System.Drawing.Imaging.ImageFormat.Png);
            bmp.Dispose();
        }

        //public void OnImageCube(string path)
        //{
        //    if (Texture_Up == null || Texture_Out == null || Texture_In == null) return;

        //    int taille = 80;
        //    int size = 10;
        //    Point point = new Point(0, 0);

        //    Bitmap bmp = new Bitmap(size * 16, size * 16);//new Bitmap(size * 4, size * 4);
        //    bmp.MakeTransparent(Color.White);
        //    Graphics g = Graphics.FromImage(bmp);


        //    //point.X = size;
        //    //OnImageFloor_Standart(g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCube_Standart(new Point(0, 0), new Point(2, 0), new Point(0, 2), 2, g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCube_Standart(new Point(0, 0), new Point(2, 0), new Point(0, 2), 1, g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCube_Standart(new Point(1, 1), new Point(3, 1), new Point(1, 3), 1, g, point, size);

        //    //point.Y += 4 * size;
        //    //point.X = size;
        //    //OnImageCube_Standart(new Point(0, 0), new Point(1, 0), new Point(0, 1), 2, g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCube_Standart(new Point(0, 1), new Point(1, 1), new Point(0, 2), 2, g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCube_Standart(new Point(1, 0), new Point(2, 0), new Point(1, 1), 2, g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCube_Standart(new Point(1, 1), new Point(2, 1), new Point(1, 2), 2, g, point, size);

        //    //point.Y += 4 * size;
        //    //point.X = size;
        //    //OnImageCube_Standart(new Point(1, 0), new Point(2, 0), new Point(1, 2), 2, g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCube_Standart(new Point(0, 0), new Point(1, 0), new Point(0, 2), 2, g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCube_Standart(new Point(0, 0), new Point(2, 0), new Point(0, 1), 2, g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCube_Standart(new Point(0, 1), new Point(2, 1), new Point(0, 2), 2, g, point, size);

        //    //point.Y += 4 * size;
        //    //point.X = size;
        //    //OnImageCoin_North(g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCoin_Est(g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCoin_South(g, point, size);
        //    //point.X += 4 * size;
        //    //OnImageCoin_West(g, point, size);

        //    bmp.Save(path, System.Drawing.Imaging.ImageFormat.Png);

        //    //bmp.Save(Info.address_Images + Info.separator + "Cubes" + Info.separator + "Cubes_TEST.png", System.Drawing.Imaging.ImageFormat.Png);
        //    bmp.Dispose();
        //}



        //public void OnTexture(int x, int y, Bitmap texture, int px, int py)
        //{
        //    Point Point_A = new Point(Size * px + x, Size * py + y);
        //    Point Point_C = new Point(Size * px + x, Size * py + y + 1);
        //    Point Point_B = new Point(Size * px + x + 1, Size * py + y);

        //    graphics.DrawImage(texture, new Point[] { Point_A, Point_B, Point_C });
        //}
        public void OnFloor(Graphics g, int x, int y, int size, Bitmap texture)//(Graphics g, Point screen, int size)
        {
            //Point Point_A = new Point(size * 4 + x, size * 4 + y - 1);// Info.CubeToScreen(2, 2, screen, size);
            //Point Point_B = new Point(size * 0 + x - 1, size * 6 + y - 1);// Info.CubeToScreen(4, 2, screen, size);
            //Point Point_C = new Point(size * 8 + x + 1, size * 6 + y - 1);// Info.CubeToScreen(2, 4, screen, size);
            Point Point_A = new Point(size * 4 + x, size * 4 + y - 1);// Info.CubeToScreen(2, 2, screen, size);
            Point Point_B = new Point(size * 0 + x - 1, size * 6 + y);// Info.CubeToScreen(4, 2, screen, size);
            Point Point_C = new Point(size * 8 + x + 1, size * 6 + y);// Info.CubeToScreen(2, 4, screen, size);

            g.DrawImage(texture, new Point[] { Point_A, Point_B, Point_C });
        }
        //public void OnFloor(Graphics g, int x, int y, int size, Bitmap texture)
        //{
        //    Point Point_A = new Point(size * 4 + x, size * 4 + y-1);
        //    Point Point_B = new Point(size * 0 + x, size * 6 + y-1);
        //    Point Point_C = new Point(size * 8 + x, size * 6 + y-1);

        //    g.DrawImage(texture, new Point[] { Point_A, Point_B, Point_C });

        //    Point_A = new Point(size * 4 + x, size * 4 + y);
        //    Point_B = new Point(size * 0 + x, size * 6 + y);
        //    Point_C = new Point(size * 8 + x, size * 6 + y);

        //    g.DrawImage(texture, new Point[] { Point_A, Point_B, Point_C });
        //}

        public void OnCube(Graphics g, int x, int y, int size, Bitmap texture)
        {
            Point Point_A = new Point(size * 4 + x-1, size * 0 + y-1);
            Point Point_B = new Point(size * 8 + x + 1, size * 2 + y+1);
            Point Point_C = new Point(size * 0 + x-1, size * 2 + y + 1);

            Point Point_D = new Point(size * 0 + x, size * 2 + y);
            Point Point_E = new Point(size * 4 + x + 1, size * 4 + y);
            Point Point_F = new Point(size * 0 + x, size * 6 + y + 1);

            g.DrawImage(texture, new Point[] { Point_A, Point_B, Point_C });
            g.DrawImage(texture, new Point[] { Point_D, Point_E, Point_F });
        }

    }






}


