using System;
using System.IO;
using Core.Utility;
using Editor;

namespace Core
{
    public partial class PageEditor : PageMap
    {
        private Editor3D Editor = null;

        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);

            if (Editor == null)
                Editor = new Editor3D(PageInfo.World, PageInfo.Map);
            if (!IsPostBack) { }
        }
        public override void Init_Hidden()
        {
            if (PageInfo == null) { Response.Redirect("~/Default.aspx"); }
            else ResizeInterface();
            Page.ClientScript.RegisterHiddenField("PageInfo", Info.JSONSerialize(PageInfo.JSON));
            Page.ClientScript.RegisterHiddenField("Appearance", Info.JSONSerialize(new Appearances_Editor()));
            Page.ClientScript.RegisterHiddenField("ScreenLoad", Info.JSONSerialize(ScreenAnimation.Loaded()));
        }

        public override void CallPage(string[] str)
        {
            base.CallPage(str);

            if (str[0] == "EDITOR_WORLDNAMES")
                SendWorldNames();
            else if (str[0] == "EDITOR_SELECTED_WORLD")
                Editor_Selected_World(str);
            else if (str[0] == "EDITOR_SELECTED_MAP")
                Editor_Selected_Map(str);
            else if (str[0] == "EDITOR_SAVE")
                Editor_Save();//(str);
            else if (str[0] == "EDITOR_NEW_WORLD")
                Editor_New_World(str);
            else if (str[0] == "EDITOR_NEW_MAP")
                Editor_New_Map(str);

            //else if (str[0] == "EDITOR_NEW_CUBE")
            //    Editor_New_Cube(str);
            //else if (str[0] == "EDITOR_MODIFY_CUBE")
            //    Editor_Modify_Cube(str);
            else if (str[0] == "EDITOR_MODIFY_CUBE2")
                Editor_Modify_Cube2(str);

            else if (str[0] == "EDITOR_NEW_ENTITY")
                Editor_New_Entity(str, false);
            else if (str[0] == "EDITOR_NEW_PERMANENT")
                Editor_New_Entity(str, true);

            else if (str[0] == "EDITOR_TEMPLATE")
                Editor_Template(str);
            else if (str[0] == "EDITOR_ANIMATION")
                Editor_Animation(str);
            else if (str[0] == "EDITOR_TRANSLATOR")
                Editor_Translator(str);
            else if (str[0] == "EDITOR_GENERATE")
                Editor_Generate(str);
        }

        public void SendWorldNames()
        {
            string[] worldnames = new string[Univers.Worlds.Length];
            for (int i = 0; i < Univers.Worlds.Length; i++)
                worldnames[i] = Univers.Worlds[i].Name;
            Add(new MsgJSON_List("EDITOR_WORLDNAMES", worldnames));
        }
        public void SendMapNames()
        {
            Add(new MsgJSON_List("EDITOR_MAPNAMES", Editor.MapNames()));
        }
        public void Editor_Selected_World(string[] str)
        {
            string name = str[1];
            PageInfo.Map = null;
            PageInfo.World = Univers.FindWorld(name);
            Editor.Clear();
            Editor.World = PageInfo.World;
            SendWorld();
            SendMapNames();
        }
        public virtual void Editor_Selected_Map(string[] str)
        {
            string name = str[1];
            PageInfo.Map = Editor.FindMap(name);
            SendMap();
        }
        public void Editor_Save()
        {
            Editor.Save();
        }
        public void Editor_New_World(string[] str)
        {
            string name = str[1];
            string fulltype = str[2];

            if (fulltype == "") fulltype = "Core.World";
            Editor.NewWorld(name, fulltype);
            PageInfo.World = Editor.World;

            //Temporaire!!!!!!!!!!
            //CF: WorldNames (Changez pour le placez dans Editor et ajouter une ID Administrateur)
            Univers.Add(PageInfo.World);
            //GameInfo.World = Univers.NewWorld(name, fulltype);

            SendWorld();
            SendWorldNames();
            SendMapNames();
        }
        public void Editor_New_Map(string[] str) //+Temporaire!!!
        {
            string name = str[1];
            int width = StringToInt(str[2]);
            int height = StringToInt(str[3]);
            int depth = StringToInt(str[4]);
            string fulltype = "";// str[5];
            if (fulltype == "") fulltype = "Core.Map";

            Editor.NewMap(name, fulltype, width, height, depth);
            PageInfo.Map = Editor.Map;

            SendMapNames();
            SendMap();
        }

        //public void Editor_New_Cube(string[] str)
        //{
        //    int x = StringToInt(str[1]);
        //    int y = StringToInt(str[2]);
        //    int z = StringToInt(str[3]);
        //    string fulltype = str[4];

        //    Editor.NewCube(fulltype, x, y, z);

        //    Cube c = Editor.Map.FindCube(x, y, z);
        //    if (c != null)
        //        Add(new MsgJSON_Cubes("EDITOR_NEW_CUBES", new Cube[] { c }));
        //}
        //public void Editor_Modify_Cube(string[] str)
        //{
        //    int x = StringToInt(str[1]);
        //    int y = StringToInt(str[2]);
        //    int z = StringToInt(str[3]);
        //    string key = str[4];

        //    if (str[4] == "CLIMB")
        //        Editor.Climb(x, y, z, StringToBool(str[5]));
        //    else if (str[4] == "CROSS")
        //        Editor.Cross(x, y, z, StringToBool(str[5]));
        //    else if (str[4] == "SEE")
        //        Editor.See(x, y, z, StringToBool(str[5]));
        //    else if (str[4] == "ATTACK")
        //        Editor.Attack(x, y, z, StringToBool(str[5]));
        //    else if (str[4] == "FLOORS")
        //        Editor.Floors(x, y, z, Info.JSONDeserialize<ImageJSON[]>(str[5]));
        //    else if (str[4] == "FLOORSPEED")
        //        Editor.FloorSpeed(x, y, z, StringToInt(str[5]));
        //    else if (str[4] == "VOLUMES")
        //        Editor.Volumes(x, y, z, Info.JSONDeserialize<ImageJSON[]>(str[5]));
        //    else if (str[4] == "VOLUMESPEED")
        //        Editor.VolumeSpeed(x, y, z, StringToInt(str[5]));
        //}
        public void Editor_Modify_Cube2(string[] str)
        {
            int x = StringToInt(str[1]);
            int y = StringToInt(str[2]);
            int z = StringToInt(str[3]);
            int x2 = StringToInt(str[4]);
            int y2 = StringToInt(str[5]);
            int z2 = StringToInt(str[6]);
            string fulltype = str[7];
            bool climb = StringToBool(str[8]);
            bool cross = StringToBool(str[9]);
            bool see = StringToBool(str[10]);
            bool attack = StringToBool(str[11]);

            int floorspeed = StringToInt(str[12]);
            ImageJSON[] floors = new ImageJSON[0];
            if(str[13] != "" && str[13] != "[]")
                floors = Info.JSONDeserialize<ImageJSON[]>(str[13]);
            int volumespeed = StringToInt(str[14]);
            ImageJSON[] volumes = new ImageJSON[0];
            if(str[15] != "" && str[15] != "[]")
                volumes = Info.JSONDeserialize<ImageJSON[]>(str[15]);

            if (PageInfo.Map == null || !PageInfo.Map.Contains(x, y, z)) { return; }

            Cube cube = PageInfo.Map.FindCube(x, y, z);

            if (cube == null)
            {
                if (fulltype == "") fulltype = "Core.Cube";
                cube = Info.Instance(fulltype) as Cube;
                if (cube == null) return;
                cube.X = x;
                cube.Y = y;
                cube.Z = z;
                PageInfo.Map.Add(cube);
            }

            if (cube != null)
            {
                cube.Climb = climb;
                cube.Cross = cross;
                cube.See = see;
                cube.Attack = attack;
                cube.Floors_Speed = floorspeed;
                cube.Floors = floors;
                cube.Volumes_Speed = volumespeed;
                cube.Volumes = volumes;

                Add(new MsgJSON_Cubes("CUBES", new Cube[] { cube }));
                //Add(new MsgJSON_Cubes("EDITOR_CUBES", new Cube[] { cube }));
            }
        }

        public void Editor_New_Entity(string[] str, bool permanents)
        {
            //bool permanent = StringToBool(str[1]);
            int x = StringToInt(str[2]);
            int y = StringToInt(str[3]);
            int z = StringToInt(str[4]);
            int adjx = StringToInt(str[5]);
            int adjy = StringToInt(str[6]);
            string fulltype = str[7];
            string ai = str[8];
            string id = str[9];
            string name = str[10];
            float width = StringToFloat(str[11]);
            float height = StringToFloat(str[12]);

            //int bodyspeed = StringToInt(str[12]);
            bool canmove = StringToBool(str[13]);
            bool cantarget = StringToBool(str[14]);
            bool cross = StringToBool(str[15]);
            //bool animated = StringToBool(str[16]);
            //bool turned = StringToBool(str[17]);
            int direction = StringToInt(str[16]);
            //ImageJSON[] bodys = Info.JSONDeserialize<ImageJSON[]>(str[19]);
            //BodyJSON body2 = Info.JSONDeserialize<BodyJSON>(str[20]);
            BodyJSON body_Stand = Info.JSONDeserialize<BodyJSON>(str[17]);
            BodyJSON body_Move = Info.JSONDeserialize<BodyJSON>(str[18]);
            BodyJSON body_Jump = Info.JSONDeserialize<BodyJSON>(str[19]);


            if (PageInfo.Map == null || !PageInfo.Map.Contains(x, y, z)) { return; }
            if (id == "") { return; }

            Entity entity = PageInfo.Map.FindEntity(id);

            if (entity == null)
            {
                if (fulltype == "") fulltype = "Core.Entity";
                entity = Info.Instance(fulltype) as Entity;
                if (entity == null) return;
                if (permanents)
                    PageInfo.Map.Permanents.Add(entity);
                else
                    PageInfo.Map.Entitys.Add(entity);
            }
            if (entity != null)
            {
                if (ai != "")
                {
                    entity.AI = Info.Instance(ai) as AI;
                    if (entity.AI != null)
                        entity.AI.Entity = entity;
                }
                entity.Adjustment.X = adjx;
                entity.Adjustment.Y = adjy;
                entity.ID = id;
                entity.Name = name;
                entity.Width = width;
                entity.Height = height;
                //entity.Body.Speed = bodyspeed;
                entity.CanMove = canmove;
                entity.CanTarget = cantarget;
                entity.Cross = cross;
                //entity.Body.Animated = animated;
                //entity.Body.Turned = turned;
                entity.Direction = direction;
                //entity.Body = bodys;

                entity.Body = body_Stand;
                entity.X = x;
                entity.Y = y;
                entity.Z = z;
                entity.Map = PageInfo.Map;
                //if (GameInfo.Map.Entitys.Contains(id))
                //    GameInfo.Map.Entitys.Remove(entity);
                //if (GameInfo.Map.Permanents.Contains(id))
                //    GameInfo.Map.Permanents.Remove(entity);
                Mobile mobile = entity as Mobile;
                if (mobile != null)
                {
                    mobile.Body_Stand = body_Stand;
                    mobile.Body_Move = body_Move;
                    mobile.Body_Jump = body_Jump;
                }
            }




            //GameInfo.Map.EntityJSON = GameInfo.Map.Entitys.JSON();

            //SendEntitys();
            //if (permanent)
            PageInfo.Map.CreateMessagePermanents();
            SendMap();
        }


        //public virtual void Editor_Generate(string[] str)
        //{
        //    if (PageInfo.World == null) return;
        //    EditorVolume editor = new EditorVolume();
        //    editor.Texture_Up = Info.UrlToImage(str[1]);
        //    editor.Texture_In = Info.UrlToImage(str[2]);
        //    editor.Texture_Out = Info.UrlToImage(str[3]);
        //    string name = str[4] + ".png";

        //    string p = Info.address_Images_HDD + @"/Templates/";
        //    if (!Directory.Exists(p))
        //        Directory.CreateDirectory(p);
        //    p += name;

        //    editor.OnImage(p);

        //    string URL = Info.ImageToUrl(p);

        //    TemplateJSON template = new TemplateJSON(name, 1, 1, URL);
        //    if (Editor != null && template != null)
        //        Editor.Template(template);

        //    Add(new MsgJSON_Object("TEMPLATES", template));
        //    Add(new MsgJSON_String("EDITOR_GENERATE", URL));
        //}
        public virtual void Editor_Generate(string[] str)
        {
            if (PageInfo.World == null) return;
            EditorImage editor = new EditorImage();
            editor.Texture_Z = Info.UrlToImage(str[1]);
            editor.Texture_Y = Info.UrlToImage(str[2]);
            editor.Texture_X = Info.UrlToImage(str[3]);
            string name = str[4] + ".png";

            string p = Info.address_Images_HDD + @"/Templates/";
            if (!Directory.Exists(p))
                Directory.CreateDirectory(p);
            p += name;

            editor.OnImageCube(p);

            string URL = Info.ImageToUrl(p);

            TemplateJSON template = new TemplateJSON(name, 4, 4, URL);
            if (Editor != null && template != null)
                Editor.Template(template);

            Add(new MsgJSON_Object("TEMPLATES", template));
            Add(new MsgJSON_String("EDITOR_GENERATE", URL));
        }
        public void Editor_Animation(string[] str)
        {
            Animation animation = Info.JSONDeserialize<Animation>(str[1]);
            if (Editor != null && animation != null)
                Editor.Animation(animation);
        }
        public void Editor_Translator(string[] str)
        {
            Translator translator = Info.JSONDeserialize<Translator>(str[1]);
            if (Editor != null && translator != null)
                Editor.Translator(translator);
        }
        public void Editor_Template(string[] str)
        {
            TemplateJSON template = Info.JSONDeserialize<TemplateJSON>(str[1]);
            if (Editor != null && template != null)
                Editor.Template(template);
        }
    }
}
