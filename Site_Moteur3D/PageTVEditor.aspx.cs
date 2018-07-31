using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;




using System.IO;
using Core.Utility;
using Core;
using Forum;
namespace WebTV
{
    public partial class PageTVEditor : PageBase
    {
        Channel Channel = null;
        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);

            if (!IsPostBack) { }
        }
        protected override PageInfo CreatePageInfo() { return new WebTVInfo(); }
        protected override void FindPageInfo()
        {
            string id = Session["ID"] as string;

            if (id != null)
                PageInfo = Channels.FindPageInfo(id);

            if (PageInfo == null)
            {
                PageInfo = CreatePageInfo();
                PageInfo.ID = Info.Random.Next().ToString();
                Session["ID"] = PageInfo.ID;
                Channels.Add(PageInfo);

                //Supprimer!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                PageInfo.Templates = Info.TemplatesImages;
                PageInfo.Animations = Animations.List;
            }
        }
        public override void Appearance(string[] str)
        {
            if (str.Length < 2) return;
            string name = str[1];
            Add(new MsgJSON_Object("APPEARANCE", new Appearances_Variety()));
        }
        public override void Loop(string[] str)
        {
            base.Loop(str);
        }
        public override void Init_Hidden()
        {
            base.Init_Hidden();
        }
        public override void CallPage(string[] str)
        {
            base.CallPage(str);

            if (str[0] == "HOME")
                Home(str);
            else if (str[0] == "WEBTV_TITLE")
                CallTitle(str);
            else if (str[0] == "HOURLY")
                WebTV_Hourly(str);
            //else if (str[0] == "WEBTVNEXT")
            //    CallWebTVNext(str);
            //else if (str[0] == "CHANNELTV")
            //    ChannelTV(str);
            //else if (str[0] == "FORUM_LOAD")
            //    Forum_Load(str);
            //else if (str[0] == "FORUM_MESSAGE_NEW")
            //    Forum_Message_New(str);
            //else if (str[0] == "FORUM_RESPONSE_NEW")
            //    Forum_Response_New(str);
            else if (str[0] == "NEWWEBTV")
                New_WebTV(str);
            else if (str[0] == "EDITOR_TRANSLATOR")
                Editor_Translator(str);
        }
        //public void Home(string[] str)
        //{
        //    Redirect("Default.aspx");
        //}
        public void CallTitle(string[] str)
        {
            if (str.Length < 2) return;
            string title = str[1];
            string category = str[2];
            string subcategory = str[3];
            ToTitle(title, category, subcategory);
        }
        public void WebTV_Hourly(string[] str)
        {
            if (str.Length < 2) return;
            string category = str[1];
            ToHourly(category);
        }
        public void New_WebTV(string[] str)
        {
            if (str.Length < 17) return;

            //WebTVJSON webtvjson = new WebTVJSON();
            //int i = 1;
            //webtvjson.Media.VideoPlayer = str[i++];
            //webtvjson.Media.Source = str[i++];
            //webtvjson.Hourly.Title = str[i++];
            //webtvjson.Hourly.Category = str[i++];
            //webtvjson.Hourly.Subcategory = str[i++];
            //webtvjson.Hourly.Description = str[i++];
            //webtvjson.Media.Duration = StringToInt(str[i++]);
            //webtvjson.Hourly.ImageUrl = str[i++];
            //webtvjson.Hourly.BackGroundUrl = str[i++];
            //webtvjson.Social.WebSite = str[i++];
            //webtvjson.Social.Youtube = str[i++];
            //webtvjson.Social.Facebook = str[i++];
            //webtvjson.Social.Twitter = str[i++];
            //webtvjson.Social.Google = str[i++];
            //webtvjson.Social.Dailymotion = str[i++];
            //webtvjson.Social.Vimeo = str[i++];
            //webtvjson.Social.Email = str[i++];

            //Channels.SaveFileWebTVJSON(webtvjson, Info.address_WebTV + @"WebTVJSON\" + webtvjson.Hourly.Category + @"\" + webtvjson.Hourly.Subcategory + @"\");

            //Add(new MsgJSON_Object("WEBTV_TITLE", webtvjson));
            //ToHourly(webtvjson.Hourly.Category);
        }
        public void Editor_Translator(string[] str)
        {
            Translator translator = Info.JSONDeserialize<Translator>(str[1]);
            if (translator != null)
                Translator(translator);
        }

        public void ToTitle(string title, string category, string subcategory)
        {
            string path = Info.address_WebTV + @"WebTVJSON\" + category + @"\" + subcategory + @"\" + title + Info.extension; ;
            WebTVJSON webtvjson = Channels.LoadFileWebTVJSON(path);
            if (webtvjson != null) Add(new MsgJSON_Object("WEBTV_TITLE", webtvjson));
        }
        public void ToHourly(string category)
        {
            Channel = new Channel();
            string path = Info.address_WebTV + @"WebTVJSON\" + category + @"\";
            Channels.LoadAllDirectory(path, Channel);
            Add(new MsgJSON_Object("HOURLY", Channel.FindInfo()));
        }

        public void Translator(Translator translator)
        {
            if (translator == null) return;

            int index = -1;
            for (int i = 0; i < Channels.Translators.Length; i++)
                if (Channels.Translators[i].Name == translator.Name)
                { index = i; break; }

            if (index == -1) Channels.Add(translator);
            else Channels.Translators[index] = translator;

            string path = Info.address_WebTV;
            if (!Directory.Exists(path + @"Translators\"))
                Directory.CreateDirectory(path + @"Translators\");
            Info.SaveFileTranslator(translator, path + @"Translators\" + translator.Name + Info.extension);
        }








        public void CallWebTVJSON(string[] str)
        {
            string channelname = str[1];
            Channel channel = Channels.Find(channelname);
            if (channel != null) Add(new MsgJSON_Object("CHANNEL", channel));
        }
    
    }
}