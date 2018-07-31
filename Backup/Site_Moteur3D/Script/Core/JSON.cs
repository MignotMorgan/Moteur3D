using System;
using Core.Utility;

namespace Core
{
    public class MessageJSON { public string COMMAND = ""; public int Index = -1; public MessageJSON(string command) { COMMAND = command; } public MessageJSON(string command, int index) { COMMAND = command; Index = index; } public MessageJSON() { } }
    public class MsgJSON_String : MessageJSON { public string Text = ""; public MsgJSON_String(string command, string txt) : base(command) { Text = txt; } }
    public class MsgJSON_World : MessageJSON { public WorldJSON World; public MsgJSON_World(string command, World world) : base(command) { World = world.JSON; } }
    public class MsgJSON_Map : MessageJSON { public MapJSON Map; public MsgJSON_Map(string command, Map map) : base(command) { Map = map.JSON; } }
    public class MsgJSON_GameInfo : MessageJSON { public PageInfoJSON GameInfo; public MsgJSON_GameInfo(string command, PageInfoJSON gameinfo) : base(command) { GameInfo = gameinfo; } }
    public class MsgJSON_Entitys : MessageJSON { public EntityJSON[] Entitys; public MsgJSON_Entitys(string command, EntityJSON[] entitys) : base(command) { Entitys = entitys; } }
    public class MsgJSON_Container : MessageJSON { public ContainerJSON Container; public MsgJSON_Container(string command, ContainerJSON container) : base(command) { Container = container; } }

    public class MsgJSON_Roads : MessageJSON { public Road[] Roads; public MsgJSON_Roads(string command, Road[] roads) : base(command) { Roads = roads; } }
    public class MsgJSON_Chats : MessageJSON { public Chat[] Chats; public MsgJSON_Chats(string command, Chat[] chats) : base(command) { Chats = chats; } }
    public class MsgJSON_PlayAnimations : MessageJSON { public Animation[] PlayAnimations = null; public MsgJSON_PlayAnimations(Animation[] animations) : base("PLAYANIMATIONS") { PlayAnimations = animations; } }

    public class MsgJSON_Cubes : MessageJSON { public Cube[] Cubes; public MsgJSON_Cubes(string command, Cube[] cubes) : base(command) { Cubes = cubes; } }
    public class MsgJSON_Object : MessageJSON { public object Value; public MsgJSON_Object(string command, object value) : base(command) { Value = value; } }
    public class MsgJSON_List : MessageJSON { public object[] List; public MsgJSON_List(string command, object[] list) : base(command) { List = list; } }

    //public class MsgJSON_Power : MessageJSON { public string Name = ""; public string Entity = ""; public DateTime Date = DateTime.Now; public MsgJSON_Power(string command, string name, string entity) : base(command) { Name = name; Entity = entity; } }


    //public class MsgJSON_Appearance : MessageJSON
    //{
    //    public Appearance Form = new Appearance();
    //    public Appearance Control = new Appearance();
    //    public Appearance TextBox = new Appearance();
    //    public MsgJSON_Appearance() : base("APPEARANCE") { }
    //    public MsgJSON_Appearance(Appearance form, Appearance control, Appearance textbox)
    //        : base("APPEARANCE")
    //    {
    //        Form = form;
    //        Control = control;
    //        TextBox = textbox;
    //    }
    //}

    public class DateJSON
    {
        public long Ticks = 0;
        public int Year = 0;
        public int Month = 0;
        public int Day = 0;
        public int Hour = 0;
        public int Minute = 0;
        public int Second = 0;
        public int Millisecond = 0;

        public DateTime DateTime { get { return new DateTime(Ticks); } }

        public DateJSON(int year, int month, int day, int hour, int minute, int second, int millisecond) : this(new DateTime(year, month, day, hour, minute, second, millisecond)) { }
        public DateJSON(DateTime datetime)
        {
            Ticks = datetime.Ticks;
            Year = datetime.Year;
            Month = datetime.Month;
            Day = datetime.Day;
            Hour = datetime.Hour;
            Minute = datetime.Minute;
            Second = datetime.Second;
            Millisecond = datetime.Millisecond;
        }
    }
    
    public class PointJSON
    {
        public int X = 0;
        public int Y = 0;
        public PointJSON() { }
        public PointJSON(int x, int y) { X = x; Y = y; }
    }
    public class RectangleJSON
    {
        public int X = 0;
        public int Y = 0;
        public int Width = 0;
        public int Height = 0;
        public RectangleJSON() { }
        public RectangleJSON(int x, int y, int width, int height)
        {
            X = x;
            Y = y;
            Width = width;
            Height = height;
        }
    }
    public class ImageJSON
    {
        public string Name = "";
        public int NbrX = 0;
        public int NbrY = 0;
        //public bool Cover = true;
        public ImageJSON() { }
        public ImageJSON(string name, int nbrx, int nbry)
        {
            Name = name;
            NbrX = nbrx;
            NbrY = nbry;
        }
    }
    public class TemplateJSON
    {
        public string Name = "";
        public string ImageUrl = "";
        public int NbrX = 0;
        public int NbrY = 0;

        public TemplateJSON(){}
        public TemplateJSON(string name, int nbrx, int nbry, string imageurl)
        {
            Name = name;
            ImageUrl = imageurl;
            NbrX = nbrx;
            NbrY = nbry;
        }
    }
    public class BodyJSON
    {
        public ImageJSON[] Images = new ImageJSON[] { new ImageJSON("Mobile_Stand", 1, 1) };
        public bool Animated = true;
        public bool Turned = true;
        public int Speed = 1000;
        public int Duration = -1;
        public int Step = 0;
        //public int StepServer = 0;
        public BodyJSON() { }
        public BodyJSON(ImageJSON[] images, bool animated, bool turned, int speed, int duration) { Images = images; Animated = animated; Turned = turned; Speed = speed; Duration = duration; }
    }
    public class MoveJSON
    {
        public long ID = DateTime.Now.Ticks;//.ToString();
        public BodyJSON Body;
        public int Speed = 1000;
        //public int Step = 0;
        public int Step = 0;
        public PointJSON Adjustment = new PointJSON();
        //public Point3D Adjustment = new Point3D();
        public Point3D[] Street = new Point3D[0];
    }
    public class EntityJSON
    {
        public string ID = "";
        public int X = 0;
        public int Y = 0;
        public int Z = 0;
        public Point3D Adjustment = null;

        public string Name = "";
        public float Width = 1;
        public float Height = 1;
        public int Direction = 0;
        public int Flag = 0;

        public bool CanMove = false;
        public bool CanTarget = false;
        public bool Cross = false;
        public MoveJSON Move = null;

        public MoveDraw MoveDraw = null;

        public BodyJSON Body;

        public EntityJSON(Entity entity)
        {
            ID = entity.ID;
            X = entity.X;
            Y = entity.Y;
            Z = entity.Z;
            Adjustment = entity.Adjustment;

            Name = entity.Name;
            Width = entity.Width;
            Height = entity.Height;
            Direction = entity.Direction;
            Flag = entity.Flag.Value;

            CanMove = entity.CanMove;
            CanTarget = entity.CanTarget;
            Cross = entity.Cross;
            Move = entity.Move;

            MoveDraw = entity.MoveDraw;
            
            Body = entity.Body;
        }
    }
    public class WorldJSON
    {
        public string Name = string.Empty;
        public int Translators_Length = 0;
        public int Animations_Length = 0;
        public int Templates_Length = 0;

        public WorldJSON(World world)
        {
            Name = world.Name;
            Translators_Length = world.Translators.Length;
            Animations_Length = world.Animations.Length;
            Templates_Length = world.Templates.Length;
        }
    }
    public class MapJSON
    {
        public string Name = string.Empty;
        public int Width = 0;
        public int Height = 0;
        public int Depth = 0;
        public Cube[,,] Cubes = new Cube[0,0,0];
        public Rectangle3D[] NoCeiling = new Rectangle3D[0];
        public EntityJSON[] Permanents = new EntityJSON[0];
        public ScreenAnimation ScreenAnimation = null;

        public int MessageCubes_Length = 0;
        public int MessagePermanents_Length = 0;

        public MapJSON(Map map)
        {
            Name = map.Name;
            Width = map.Width;
            Height = map.Height;
            Depth = map.Depth;
            NoCeiling = map.NoCeiling;
            ScreenAnimation = map.ScreenAnimation;
            MessageCubes_Length = map.MessageCubes.Length;
            MessagePermanents_Length = map.MessagePermanents.Length;
        }
    }
    public class ShortcutJSON
    {
        public bool Shift = false;
        public bool Ctrl = false;
        public bool Alt = false;
        public bool Meta = false;
        public int KeyCode = 0;
        public string Value = string.Empty;
        public ShortcutJSON( bool shift, bool ctrl, bool alt, bool meta, int keycode, string value )
        {
            Shift = shift;
            Ctrl = ctrl;
            Alt = alt;
            Meta = meta;
            KeyCode = keycode;
            Value = value;
        }
    }



}
