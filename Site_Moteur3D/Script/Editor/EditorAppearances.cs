using System;
using Core;
using Core.Utility;


namespace Editor
{


    public class Appearances_Editor : Appearances
    {
        public Appearances_Editor()
        {
            Name = "Editor";
            Form = new Appearance_Editor_Form();
            Control = new Appearance_Editor_Control();
            TextBox = new Appearance_Editor_TextBox();
            //Templates = new TemplateJSON[]
            //{ 
            //    new TemplateJSON("Metal", 1, 1, "http://www.ressources-webdesign.com/wp-content/uploads/2010/08/metal-texture-500.png"),
            //    new TemplateJSON("MetalPlate", 1, 1, "http://www.psdgraphics.com/wp-content/uploads/2009/01/metal-plate.jpg"),
            //    new TemplateJSON("SteelMesh", 1, 1, "http://www.psdgraphics.com/wp-content/uploads/2010/07/steel-mesh.jpg"),
            //    new TemplateJSON("Gold", 1, 1, "http://www.psdgraphics.com/wp-content/uploads/2009/07/gold-texture.jpg"),
            //    new TemplateJSON("Vintage", 1, 1, "https://image.freepik.com/photos-libre/grunge-vieille-texture-vintage_19-113524.jpg"),
            //    new TemplateJSON("DarkMetal", 1, 1, "http://www.psdgraphics.com/wp-content/uploads/2009/01/dark-metal-texture.jpg")
            //};
        }
    }
    public class Appearance_Editor_Form : Appearance
    {
        public Appearance_Editor_Form()
        {
            Font = "16pt Verdana";
            FontHeight = 20;
            BackFont = "italic 16pt Verdana";
            BackFont_Color = "grey";

            BackGroundImageOut = null;
            BackGroundImageIn = null;
            BackColorOut = "darkgrey";
            BackColorIn = "";
            BorderColorOut = "black";
            BorderColorIn = "";
            Font_Color = "black";

            BackGroundImageOut_Hover = null;
            BackGroundImageIn_Hover = null;
            BackColorOut_Hover = "darkgrey";
            BackColorIn_Hover = "";
            BorderColorOut_Hover = "black";
            BorderColorIn_Hover = "";
            Font_Color_Hover = "black";

            BackGroundImageOut_Focus = null;
            BackGroundImageIn_Focus = null;
            BackColorOut_Focus = "darkgrey";
            BackColorIn_Focus = "";
            BorderColorOut_Focus = "black";
            BorderColorIn_Focus = "";
            Font_Color_Focus = "black";
        }
    }

    public class Appearance_Editor_Control : Appearance
    {
        public Appearance_Editor_Control()
        {
            Font = "12pt Verdana";
            FontHeight = 15;
            BackFont = "italic 12pt Verdana";
            BackFont_Color = "grey";

            BackGroundImageOut = null;
            BackGroundImageIn = null;
            BackColorOut = "darkgrey";
            BackColorIn = "lightgrey";
            BorderColorOut = "";
            BorderColorIn = "";
            Font_Color = "black";

            BackGroundImageOut_Hover = null;
            BackGroundImageIn_Hover = null;
            BackColorOut_Hover = "grey";
            BackColorIn_Hover = "lightgrey";
            BorderColorOut_Hover = "black";
            BorderColorIn_Hover = "black";
            Font_Color_Hover = "black";

            BackGroundImageOut_Focus = null;
            BackGroundImageIn_Focus = null;
            BackColorOut_Focus = "darkgrey";
            BackColorIn_Focus = "lightgrey";
            BorderColorOut_Focus = "";
            BorderColorIn_Focus = "";
            Font_Color_Focus = "black";
        }
    }
    public class Appearance_Editor_TextBox : Appearance
    {
        public Appearance_Editor_TextBox()
        {
            Font = "12pt Edwardian Script ITC Normal";
            FontHeight = 15;
            BackFont = "italic 12pt Blackadder ITC Normal";
            BackFont_Color = "grey";

            BackGroundImageOut = null;
            BackGroundImageIn = null;
            BackColorOut = "darkgrey";
            BackColorIn = "white";
            BorderColorOut = "";
            BorderColorIn = "";
            Font_Color = "black";

            BackGroundImageOut_Hover = null;
            BackGroundImageIn_Hover = null;
            BackColorOut_Hover = "darkgrey";
            BackColorIn_Hover = "white";
            BorderColorOut_Hover = "black";
            BorderColorIn_Hover = "";
            Font_Color_Hover = "black";

            BackGroundImageOut_Focus = null;
            BackGroundImageIn_Focus = null;
            BackColorOut_Focus = "darkgrey";
            BackColorIn_Focus = "white";
            BorderColorOut_Focus = "";
            BorderColorIn_Focus = "";
            Font_Color_Focus = "black";
        }
    }

}
