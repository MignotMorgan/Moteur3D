using System;
using Core.Utility;

namespace Core
{
    public partial class PageInfoJSON
    {
        public string ID = string.Empty;
        public WorldJSON World = null;
        public MapJSON Map = null;
        public string[] Players;

        public char Separator = '*';
        public ShortcutJSON[] Keyboard = null;//Info.Keyboard_Be;
        //public ShortcutJSON[] Shortcut = null;//Info.Shortcut_Default;
        public int IntervalCallServer = 0;//1000;
        public RectangleJSON Frame = null;//new RectangleJSON(50, 50, 750, 550);

        //public Appearance Form = null;// new Appearance();
        //public Appearance Control = null;// new Appearance();
        //public Appearance TextBox = null;// new Appearance();
        //public Appearance Collection = new Appearance();
        //public Appearance Button = new Appearance();
        
        
        public string BackColor = "";
        public ImageJSON BackGroundImage = null;//new ImageJSON("Box_00", 1, 1);
        public string Font_Default = "8pt Verdana";
        public string Font_TextBox = "10pt Calibri";

        public MapInfo MapInfo = null;      
        
        //public Interface Interface;
        public Translator[] Translators = new Translator[0];
        public Animation[] Animations = new Animation[0];
        public TemplateJSON[] Templates = new TemplateJSON[0];

        public int Translators_Length = 0;
        public int Animations_Length = 0;
        public int Templates_Length = 0;

        public PageInfoJSON(PageInfo pageinfo)
        {
            ID = pageinfo.ID;
            //Interface = pageinfo.Interface;
            Players = pageinfo.Players;

            Separator = pageinfo.Separator;
            Keyboard = pageinfo.Keyboard;
            //Shortcut = pageinfo.Shortcut;
            IntervalCallServer = pageinfo.IntervalCallServer;
            Frame = pageinfo.Frame;

            //Form = pageinfo.Form;
            //Control = pageinfo.Control;
            //TextBox = pageinfo.TextBox;
            //Collection = pageinfo.Collection;
            //Button = pageinfo.Button;
            
            BackColor = pageinfo.BackColor;
            BackGroundImage = pageinfo.BackGroundImage;
            Font_Default = pageinfo.Font_Default;
            Font_TextBox = pageinfo.Font_TextBox;

            MapInfo = pageinfo.MapInfo;

            Translators_Length = pageinfo.Translators.Length;
            Animations_Length = pageinfo.Animations.Length;
            Templates_Length = pageinfo.Templates.Length;
        }
    }
    public partial class PageInfo
    {
        public string ID = string.Empty;
        public DateTime LastAction = DateTime.Now;
        public int Index_Animations = 0;
        public int Index_Chats = 0;
        public string Culture = Info.Culture;

        public int IntervalInfo = 1000;
        public char Separator = '*';
        public ShortcutJSON[] Keyboard = Info.Keyboard_Be;
        //public ShortcutJSON[] Shortcut = Info.Shortcut_Default;
        public int IntervalCallServer = 1000;
        public RectangleJSON Frame = new RectangleJSON(50, 50, 750, 550);
        public string BackColor = "";//Form + Collection + Button + (Border + Cadre intérieure)
        public ImageJSON BackGroundImage = null;//new ImageJSON("Box_00", 1, 1);
        public string Font_Default = "8pt Verdana";
        public string Font_TextBox = "10pt Calibri";


        public MapInfo MapInfo = new MapInfo();
        
        //public Interface Interface = new Interface(); 

        public DateTime LastMove = DateTime.Now;
        //public PathFinding Path = new PathFinding(30);//Supprimer!!!!!!!!!!!!!!!!!
        public World World = null;
        public Map Map = null;
        public String[] Players = new string[0];

        public Translator[] Translators = new Translator[0];
        public Animation[] Animations = new Animation[0];
        public TemplateJSON[] Templates = new TemplateJSON[0];

        public virtual PageInfoJSON JSON { get { return CreateJSON(); } }
        public virtual PageInfoJSON CreateJSON() { return new PageInfoJSON(this); }


        //public Appearances Appearances = new Appearances();

        //public Appearance Form = new WebTV.Appearance_Variety();
        //public Appearance Control = new Appearance();
        //public Appearance TextBox = new Appearance();
        //public Appearance Collection = new Appearance();
        //public Appearance Button = new Appearance();

    
    }



    public class MapInfo
    {
        public ShortcutJSON[] Shortcut = Info.Shortcut_Default;

        public bool CanGrap = true;//false;//
        public int Rolled = 5;
        //public PointJSON Centred = new PointJSON();
        //public int NbrCube = 0;// 30;
        public int SizeCube = 20;
        public int SizeCubeMin = 20;
        public int SizeCubeMax = 200;
        //public bool Grid = false;//true;//
        public bool Adjusted = true;//false;// Mobile

        public ImageJSON[] Floors_Default = new ImageJSON[] { new ImageJSON("Floors", 1, 1) };
        public int Floors_Speed_Default = 0;

        //public string Font_Default = "8pt Verdana";
        public string Font_Map = "16pt Calibri";
        //public string Font_TextBox = "10pt Calibri";

        //public string BackColor = "";
        //public ImageJSON BackGroundImage = null;//new ImageJSON("Box_00", 1, 1);

    }
//Form + Collection + Button + Textbox + Control
//(Border + Cadre intérieure) + (Default + Mousehover + Focus)
    //public class Appearances
    //{
    //    public string Name = "Default";
    //    public TemplateJSON[] Templates = new TemplateJSON[0];
    //    public Appearance Form = new Appearance();
    //    public Appearance Control = new Appearance();
    //    public Appearance TextBox = new Appearance();


    //    public virtual void Save(SerializationWriter SW)
    //    {
    //        SW.WriteStartElement("Appearances");
    //        SW.WriteVersion(0);
    //        SW.Write("Name", Name);

    //        SW.WriteJSONList("TemplateJSON", Templates);
    //        SW.WriteJSON("Form", Form);
    //        SW.WriteJSON("Control", Control);
    //        SW.WriteJSON("TextBox", TextBox);
    //        //Form.Save(SW);
    //        //Control.Save(SW);
    //        //TextBox.Save(SW);
    //        SW.WriteEndElement();
    //    }
    //    public virtual void Load(SerializationReader SR)
    //    {
    //        SR.ReadStartElement();
    //        int version = SR.ReadVersion();
    //        switch (version)
    //        {
    //            case 0:
    //                {
    //                    Name = SR.ReadString();
    //                    Templates = SR.ReadJSONList<TemplateJSON>();
    //                    Form = SR.ReadJSON<Appearance>();
    //                    Control = SR.ReadJSON<Appearance>();
    //                    TextBox = SR.ReadJSON<Appearance>();
    //                    //Form.Load(SR);
    //                    //Control.Load(SR);
    //                    //TextBox.Load(SR);
    //                    break;
    //                }
    //        }
    //        SR.ReadEndElement();
    //    }
    //}
    //public class Appearance
    //{

    //    public string Font = "12pt Verdana";
    //    //public int ButtonHeight = 25;
    //    public int FontHeight = 15;
    //    public string BackFont = "italic 10pt Verdana";
    //    public string BackFont_Color = "grey";
        
    //    //public TemplateJSON[] Templates = new TemplateJSON[0];

    //    public ImageJSON BackGroundImageOut = null;
    //    public ImageJSON BackGroundImageIn = null;
    //    public string BackColorOut = "chocolate";// "lightgrey"; 
    //    public string BackColorIn = "burlywood";//"beige";
    //    public string BorderColorOut = "sienna";
    //    public string BorderColorIn = "peru";
    //    public string Font_Color = "";

    //    public ImageJSON BackGroundImageOut_Hover = null;
    //    public ImageJSON BackGroundImageIn_Hover = null;
    //    public string BackColorOut_Hover = "darkgreen";
    //    public string BackColorIn_Hover = "green";
    //    public string BorderColorOut_Hover = "limegreen";
    //    public string BorderColorIn_Hover = "lime";
    //    public string Font_Hover = "10pt Verdana";//Suppriemr
    //    public string Font_Color_Hover = "";

    //    public ImageJSON BackGroundImageOut_Focus = null;
    //    public ImageJSON BackGroundImageIn_Focus = null;
    //    public string BackColorOut_Focus = "darkred";
    //    public string BackColorIn_Focus = "red";
    //    public string BorderColorOut_Focus = "maroon";
    //    public string BorderColorIn_Focus = "firebrick";
    //    public string Font_Focus = "8pt Verdana";//Supprieme
    //    public string Font_Color_Focus = "";

    //    //public virtual void Save(SerializationWriter SW)
    //    //{
    //    //    SW.WriteStartElement("Appearance");
    //    //    SW.WriteVersion(0);


    //    //    //SW.WriteJSON("TemplateJSON", Templates);
    //    //    //SW.Write(Templates);
    //    //    //SW.WriteJSONList("TemplateJSON", Templates);

    //    //    SW.Write("BackGroundImageOut", BackGroundImageOut);
    //    //    SW.Write("BackGroundImageIn", BackGroundImageIn);
    //    //    SW.Write("BackColorOut", BackColorOut);
    //    //    SW.Write("BackColorIn", BackColorIn);
    //    //    SW.Write("BorderColorOut", BorderColorOut);
    //    //    SW.Write("BorderColorIn", BorderColorIn);
    //    //    SW.Write("Font_Default", Font_Default);
    //    //    SW.Write("Font_Color", Font_Color);

    //    //    SW.Write("BackGroundImageOut_Hover", BackGroundImageOut_Hover);
    //    //    SW.Write("BackGroundImageIn_Hover", BackGroundImageIn_Hover);
    //    //    SW.Write("BackColorOut_Hover", BackColorOut_Hover);
    //    //    SW.Write("BackColorIn_Hover", BackColorIn_Hover);
    //    //    SW.Write("BorderColorOut_Hover", BorderColorOut_Hover);
    //    //    SW.Write("BorderColorIn_Hover", BorderColorIn_Hover);
    //    //    SW.Write("Font_Default_Hover", Font_Default_Hover);
    //    //    SW.Write("Font_Color_Hover", Font_Color_Hover);

    //    //    SW.Write("BackGroundImageOut_Focus", BackGroundImageOut_Focus);
    //    //    SW.Write("BackGroundImageIn_Focus", BackGroundImageIn_Focus);
    //    //    SW.Write("BackColorOut_Focus", BackColorOut_Focus);
    //    //    SW.Write("BackColorIn_Focus", BackColorIn_Focus);
    //    //    SW.Write("BorderColorOut_Focus", BorderColorOut_Focus);
    //    //    SW.Write("BorderColorIn_Focus", BorderColorIn_Focus);
    //    //    SW.Write("Font_Default_Focus", Font_Default_Focus);
    //    //    SW.Write("Font_Color_Focus", Font_Color_Focus);

    //    //    SW.WriteEndElement();
    //    //}
    //    //public virtual void Load(SerializationReader SR)
    //    //{
    //    //    SR.ReadStartElement();
    //    //    int version = SR.ReadVersion();
    //    //    switch (version)
    //    //    {
    //    //        case 0:
    //    //            {
    //    //                //TemplateJSON Templates = SR.ReadJSON<TemplateJSON>();
    //    //                //Templates = SR.ReadTemplates();
    //    //                //Templates = SR.ReadJSONList<TemplateJSON>();

    //    //                BackGroundImageOut = SR.ReadImageJSON();
    //    //                BackGroundImageIn = SR.ReadImageJSON();
    //    //                BackColorOut = SR.ReadString();
    //    //                BackColorIn = SR.ReadString();
    //    //                BorderColorOut = SR.ReadString();
    //    //                BorderColorIn = SR.ReadString();
    //    //                Font_Default = SR.ReadString();
    //    //                Font_Color = SR.ReadString();

    //    //                BackGroundImageOut_Hover = SR.ReadImageJSON();
    //    //                BackGroundImageIn_Hover = SR.ReadImageJSON();
    //    //                BackColorOut_Hover = SR.ReadString();
    //    //                BackColorIn_Hover = SR.ReadString();
    //    //                BorderColorOut_Hover = SR.ReadString();
    //    //                BorderColorIn_Hover = SR.ReadString();
    //    //                Font_Default_Hover = SR.ReadString();
    //    //                Font_Color_Hover = SR.ReadString();

    //    //                BackGroundImageOut_Focus = SR.ReadImageJSON();
    //    //                BackGroundImageIn_Focus = SR.ReadImageJSON();
    //    //                BackColorOut_Focus = SR.ReadString();
    //    //                BackColorIn_Focus = SR.ReadString();
    //    //                BorderColorOut_Focus = SR.ReadString();
    //    //                BorderColorIn_Focus = SR.ReadString();
    //    //                Font_Default_Focus = SR.ReadString();
    //    //                Font_Color_Focus = SR.ReadString();
   
    //    //                break;
    //    //            }
    //    //    }

    //    //    SR.ReadEndElement();
    //    //}   
    
    
    
    
    //}

}
