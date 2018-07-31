using System;
using Core;
using Core.Utility;

namespace WebTV
{

    public class Appearances_Variety : Appearances
    {
        public Appearances_Variety()
        {
            Name = "Variety";
            Form = new Appearance_Variety_Form();
            Control = new Appearance_Variety_Control();
            TextBox = new Appearance_Variety_TextBox();
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
    public class Appearance_Variety_Form : Appearance
    {
        public Appearance_Variety_Form()
        {
            Font = "12pt Verdana";
            FontHeight = 20;
            BackFont = "12pt Verdana";
            BackFont_Color = "grey";

            BackGroundImageOut = null;
            BackGroundImageIn = null;
            BackColorOut = "Sienna";
            BackColorIn = "chocolate";
            BorderColorOut = "";
            BorderColorIn = "";
            Font_Color = "black";

            BackGroundImageOut_Hover = null;
            BackGroundImageIn_Hover = null;
            BackColorOut_Hover = "Sienna";
            BackColorIn_Hover = "chocolate";
            BorderColorOut_Hover = "";
            BorderColorIn_Hover = "";
            Font_Color_Hover = "black";

            BackGroundImageOut_Focus = null;
            BackGroundImageIn_Focus = null;
            BackColorOut_Focus = "Sienna";
            BackColorIn_Focus = "chocolate";
            BorderColorOut_Focus = "";
            BorderColorIn_Focus = "";
            Font_Color_Focus = "black";
        }
    }

    public class Appearance_Variety_Control : Appearance
    {
        public Appearance_Variety_Control()
        {
            Font = "12pt Verdana";
            FontHeight = 20;
            BackFont = "12pt Verdana";
            BackFont_Color = "grey";

            BackGroundImageOut = null;
            BackGroundImageIn = null;
            BackColorOut = "Sienna";
            BackColorIn = "chocolate";
            BorderColorOut = "";
            BorderColorIn = "";
            Font_Color = "black";

            BackGroundImageOut_Hover = null;
            BackGroundImageIn_Hover = null;
            BackColorOut_Hover = "Sienna";
            BackColorIn_Hover = "chocolate";
            BorderColorOut_Hover = "";
            BorderColorIn_Hover = "SaddleBrown ";
            Font_Color_Hover = "black";

            BackGroundImageOut_Focus = null;
            BackGroundImageIn_Focus = null;
            BackColorOut_Focus = "Sienna";
            BackColorIn_Focus = "chocolate";
            BorderColorOut_Focus = "";
            BorderColorIn_Focus = "Maroon ";
            Font_Color_Focus = "black";
        }
    }
    public class Appearance_Variety_TextBox : Appearance
    {
        public Appearance_Variety_TextBox()
        {
            Font = "12pt Edwardian Script ITC Normal";
            FontHeight = 20;
            BackFont = "12pt Blackadder ITC Normal";
            BackFont_Color = "grey";

            BackGroundImageOut = null;
            BackGroundImageIn = null;
            BackColorOut = "Peru";
            BackColorIn = "white";
            BorderColorOut = "";
            BorderColorIn = "";
            Font_Color = "black";

            BackGroundImageOut_Hover = null;
            BackGroundImageIn_Hover = null;
            BackColorOut_Hover = "Peru";
            BackColorIn_Hover = "Wheat";
            BorderColorOut_Hover = "";
            BorderColorIn_Hover = "black";
            Font_Color_Hover = "black";

            BackGroundImageOut_Focus = null;
            BackGroundImageIn_Focus = null;
            BackColorOut_Focus = "Peru";
            BackColorIn_Focus = "white";
            BorderColorOut_Focus = "";
            BorderColorIn_Focus = "black";
            Font_Color_Focus = "black";
        }
    }


    public class Appearances_Information : Appearances
    {
        public Appearances_Information()
        {
            Name = "Information";
            Form = new Appearance_Information();
            Control = new Appearance_Information();
            TextBox = new Appearance_Information();
            Templates = new TemplateJSON[]
            { 
                new TemplateJSON("Metal", 1, 1, "http://www.ressources-webdesign.com/wp-content/uploads/2010/08/metal-texture-500.png"),
                new TemplateJSON("MetalPlate", 1, 1, "http://www.psdgraphics.com/wp-content/uploads/2009/01/metal-plate.jpg"),
                new TemplateJSON("SteelMesh", 1, 1, "http://www.psdgraphics.com/wp-content/uploads/2010/07/steel-mesh.jpg"),
                new TemplateJSON("Gold", 1, 1, "http://www.psdgraphics.com/wp-content/uploads/2009/07/gold-texture.jpg"),
                new TemplateJSON("Vintage", 1, 1, "https://image.freepik.com/photos-libre/grunge-vieille-texture-vintage_19-113524.jpg"),
                new TemplateJSON("DarkMetal", 1, 1, "http://www.psdgraphics.com/wp-content/uploads/2009/01/dark-metal-texture.jpg")
            };
        }
    }
    public class Appearance_Information : Appearance
    {
        public Appearance_Information()
        {
            BackGroundImageOut = new ImageJSON("Gold", 1, 1);
            BackGroundImageIn = new ImageJSON("Vintage", 1, 1);
            BackColorOut = "chocolate";
            BackColorIn = "burlywood";
            BorderColorOut = "sienna";
            BorderColorIn = "peru";
            Font = "8pt Verdana";
            Font_Color = "";

            BackGroundImageOut_Hover = new ImageJSON("Gold", 1, 1);
            BackGroundImageIn_Hover = new ImageJSON("Vintage", 1, 1);
            BackColorOut_Hover = "darkgreen";
            BackColorIn_Hover = "green";
            BorderColorOut_Hover = "limegreen";
            BorderColorIn_Hover = "lime";
            Font_Hover = "8pt Verdana";
            Font_Color_Hover = "";

            BackGroundImageOut_Focus = new ImageJSON("Gold", 1, 1);
            BackGroundImageIn_Focus = new ImageJSON("Vintage", 1, 1);
            BackColorOut_Focus = "darkred";
            BackColorIn_Focus = "red";
            BorderColorOut_Focus = "maroon";
            BorderColorIn_Focus = "firebrick";
            Font_Focus = "8pt Verdana";
            Font_Color_Focus = "";
        }
    }
    
}
