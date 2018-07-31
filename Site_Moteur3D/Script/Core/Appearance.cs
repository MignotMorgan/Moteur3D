using System;


namespace Core
{
    public class Appearances
    {
        public string Name = "Default";
        public TemplateJSON[] Templates = new TemplateJSON[0];
        public Appearance Form = new Appearance();
        public Appearance Control = new Appearance();
        public Appearance TextBox = new Appearance();


        public virtual void Save(SerializationWriter SW)
        {
            SW.WriteStartElement("Appearances");
            SW.WriteVersion(0);
            SW.Write("Name", Name);

            SW.WriteJSONList("TemplateJSON", Templates);
            SW.WriteJSON("Form", Form);
            SW.WriteJSON("Control", Control);
            SW.WriteJSON("TextBox", TextBox);
            //Form.Save(SW);
            //Control.Save(SW);
            //TextBox.Save(SW);
            SW.WriteEndElement();
        }
        public virtual void Load(SerializationReader SR)
        {
            SR.ReadStartElement();
            int version = SR.ReadVersion();
            switch (version)
            {
                case 0:
                    {
                        Name = SR.ReadString();
                        Templates = SR.ReadJSONList<TemplateJSON>();
                        Form = SR.ReadJSON<Appearance>();
                        Control = SR.ReadJSON<Appearance>();
                        TextBox = SR.ReadJSON<Appearance>();
                        //Form.Load(SR);
                        //Control.Load(SR);
                        //TextBox.Load(SR);
                        break;
                    }
            }
            SR.ReadEndElement();
        }
    }
    public class Appearance
    {

        public string Font = "12pt Verdana";
        //public int ButtonHeight = 25;
        public int FontHeight = 15;
        public string BackFont = "italic 10pt Verdana";
        public string BackFont_Color = "grey";

        public ImageJSON BackGroundImageOut = null;
        public ImageJSON BackGroundImageIn = null;
        public string BackColorOut = "chocolate";// "lightgrey"; 
        public string BackColorIn = "burlywood";//"beige";
        public string BorderColorOut = "sienna";
        public string BorderColorIn = "peru";
        public string Font_Color = "";

        public ImageJSON BackGroundImageOut_Hover = null;
        public ImageJSON BackGroundImageIn_Hover = null;
        public string BackColorOut_Hover = "darkgreen";
        public string BackColorIn_Hover = "green";
        public string BorderColorOut_Hover = "limegreen";
        public string BorderColorIn_Hover = "lime";
        public string Font_Hover = "10pt Verdana";//Suppriemr
        public string Font_Color_Hover = "";

        public ImageJSON BackGroundImageOut_Focus = null;
        public ImageJSON BackGroundImageIn_Focus = null;
        public string BackColorOut_Focus = "darkred";
        public string BackColorIn_Focus = "red";
        public string BorderColorOut_Focus = "maroon";
        public string BorderColorIn_Focus = "firebrick";
        public string Font_Focus = "8pt Verdana";//Supprieme
        public string Font_Color_Focus = "";

        //public virtual void Save(SerializationWriter SW)
        //{
        //    SW.WriteStartElement("Appearance");
        //    SW.WriteVersion(0);


        //    //SW.WriteJSON("TemplateJSON", Templates);
        //    //SW.Write(Templates);
        //    //SW.WriteJSONList("TemplateJSON", Templates);

        //    SW.Write("BackGroundImageOut", BackGroundImageOut);
        //    SW.Write("BackGroundImageIn", BackGroundImageIn);
        //    SW.Write("BackColorOut", BackColorOut);
        //    SW.Write("BackColorIn", BackColorIn);
        //    SW.Write("BorderColorOut", BorderColorOut);
        //    SW.Write("BorderColorIn", BorderColorIn);
        //    SW.Write("Font_Default", Font_Default);
        //    SW.Write("Font_Color", Font_Color);

        //    SW.Write("BackGroundImageOut_Hover", BackGroundImageOut_Hover);
        //    SW.Write("BackGroundImageIn_Hover", BackGroundImageIn_Hover);
        //    SW.Write("BackColorOut_Hover", BackColorOut_Hover);
        //    SW.Write("BackColorIn_Hover", BackColorIn_Hover);
        //    SW.Write("BorderColorOut_Hover", BorderColorOut_Hover);
        //    SW.Write("BorderColorIn_Hover", BorderColorIn_Hover);
        //    SW.Write("Font_Default_Hover", Font_Default_Hover);
        //    SW.Write("Font_Color_Hover", Font_Color_Hover);

        //    SW.Write("BackGroundImageOut_Focus", BackGroundImageOut_Focus);
        //    SW.Write("BackGroundImageIn_Focus", BackGroundImageIn_Focus);
        //    SW.Write("BackColorOut_Focus", BackColorOut_Focus);
        //    SW.Write("BackColorIn_Focus", BackColorIn_Focus);
        //    SW.Write("BorderColorOut_Focus", BorderColorOut_Focus);
        //    SW.Write("BorderColorIn_Focus", BorderColorIn_Focus);
        //    SW.Write("Font_Default_Focus", Font_Default_Focus);
        //    SW.Write("Font_Color_Focus", Font_Color_Focus);

        //    SW.WriteEndElement();
        //}
        //public virtual void Load(SerializationReader SR)
        //{
        //    SR.ReadStartElement();
        //    int version = SR.ReadVersion();
        //    switch (version)
        //    {
        //        case 0:
        //            {
        //                //TemplateJSON Templates = SR.ReadJSON<TemplateJSON>();
        //                //Templates = SR.ReadTemplates();
        //                //Templates = SR.ReadJSONList<TemplateJSON>();

        //                BackGroundImageOut = SR.ReadImageJSON();
        //                BackGroundImageIn = SR.ReadImageJSON();
        //                BackColorOut = SR.ReadString();
        //                BackColorIn = SR.ReadString();
        //                BorderColorOut = SR.ReadString();
        //                BorderColorIn = SR.ReadString();
        //                Font_Default = SR.ReadString();
        //                Font_Color = SR.ReadString();

        //                BackGroundImageOut_Hover = SR.ReadImageJSON();
        //                BackGroundImageIn_Hover = SR.ReadImageJSON();
        //                BackColorOut_Hover = SR.ReadString();
        //                BackColorIn_Hover = SR.ReadString();
        //                BorderColorOut_Hover = SR.ReadString();
        //                BorderColorIn_Hover = SR.ReadString();
        //                Font_Default_Hover = SR.ReadString();
        //                Font_Color_Hover = SR.ReadString();

        //                BackGroundImageOut_Focus = SR.ReadImageJSON();
        //                BackGroundImageIn_Focus = SR.ReadImageJSON();
        //                BackColorOut_Focus = SR.ReadString();
        //                BackColorIn_Focus = SR.ReadString();
        //                BorderColorOut_Focus = SR.ReadString();
        //                BorderColorIn_Focus = SR.ReadString();
        //                Font_Default_Focus = SR.ReadString();
        //                Font_Color_Focus = SR.ReadString();

        //                break;
        //            }
        //    }

        //    SR.ReadEndElement();
        //}   




    }





    public class Appearances_Default : Appearances
    {
        public Appearances_Default()
        {
            Name = "Default";
            Form = new Appearance_Default_Form();
            Control = new Appearance_Default_Control();
            TextBox = new Appearance_Default_TextBox();
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
    public class Appearance_Default_Form : Appearance
    {
        public Appearance_Default_Form()
        {
            Font = "16pt Verdana";
            FontHeight = 20;
            BackFont = "italic 16pt Verdana";
            BackFont_Color = "grey";

            BackGroundImageOut = null;
            BackGroundImageIn = null;
            BackColorOut = "darkgrey";
            BackColorIn = "lightgrey";
            BorderColorOut = "black";
            BorderColorIn = "";
            Font_Color = "black";

            BackGroundImageOut_Hover = null;
            BackGroundImageIn_Hover = null;
            BackColorOut_Hover = "darkgrey";
            BackColorIn_Hover = "lightgrey";
            BorderColorOut_Hover = "black";
            BorderColorIn_Hover = "";
            Font_Color_Hover = "black";

            BackGroundImageOut_Focus = null;
            BackGroundImageIn_Focus = null;
            BackColorOut_Focus = "darkgrey";
            BackColorIn_Focus = "lightgrey";
            BorderColorOut_Focus = "black";
            BorderColorIn_Focus = "";
            Font_Color_Focus = "black";
        }
    }

    public class Appearance_Default_Control : Appearance
    {
        public Appearance_Default_Control()
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
            BorderColorIn_Hover = "";
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
    public class Appearance_Default_TextBox : Appearance
    {
        public Appearance_Default_TextBox()
        {
            Font = "14pt Edwardian Script ITC Normal";
            FontHeight = 18;
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
