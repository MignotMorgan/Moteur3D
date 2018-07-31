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
    public partial class PageTV : PageBase
    {
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
            else if (str[0] == "WEBTV")
                CallWebTV(str);
            else if (str[0] == "WEBTVNEXT")
                CallWebTVNext(str);
            else if (str[0] == "CHANNELTV")
                ChannelTV(str);
            else if (str[0] == "FORUM_LOAD")
                Forum_Load(str);
            else if (str[0] == "FORUM_MESSAGE_NEW")
                Forum_Message_New(str);
            else if (str[0] == "FORUM_RESPONSE_NEW")
                Forum_Response_New(str);
            else if (str[0] == "NEWWEBTV")
                New_WebTV(str);
            else if (str[0] == "HOURLY")
                WebTV_Hourly(str);
        }
        //public override void Loop(string[] str)
        //{
        //    base.Loop(str);
        //}
        public void Home(string[] str)
        {
            Redirect("Default.aspx");
        }
        public override void Appearance(string[] str)
        {
            if (str.Length < 2) return;
            string name = str[1];
            Channel channel = Channels.Find(name);
            if (channel != null)
                Add(new MsgJSON_Object("APPEARANCE", channel.Appearances));
        }

        public void CallWebTV(string[] str)
        {
            if (str.Length < 3) return;
            string channel = str[1];
            string id = str[2];
            //webtvjson = new WebTVJSON();
            WebTVJSON webtvjson = WebTV.Channels.FindChannel(channel);
            if (webtvjson != null) Add(new MsgJSON_WebTV("WEBTV",id, webtvjson));
        }
        public void CallWebTVNext(string[] str)
        {
            if (str.Length < 3) return;
            string channelname = str[1];
            string id = str[2];
            Channel channel = Channels.Find(channelname);
            if (channel != null)
            {
                WebTVJSON webtvjson = channel.FindNext();
                if (webtvjson != null) Add(new MsgJSON_WebTV("WEBTVNEXT", id, webtvjson));
            }
        }
        public void ChannelTV(string[] str)
        {
            if (str.Length < 3) return;
            string channelname = str[1];
            string id = str[2];
            WebTVJSON webtvjson = WebTV.Channels.FindChannel(channelname);
            ((WebTVInfo)PageInfo).Channel = channelname;
            Add(new MsgJSON_String("CHANNEL", channelname));
            //Add(new MsgJSON_Channel("CHANNEL", id, channelname));
            if (webtvjson != null)
            {
                Add(new MsgJSON_WebTV("WEBTV", id, webtvjson));
            }
        }
        public void WebTV_Hourly(string[] str)
        {
            if (str.Length < 2) return;
            Channel channel = Channels.Find(str[1]);
            if (channel == null) return;
            Add(new MsgJSON_Object("HOURLY", channel.FindInfo()));
        }

        public void Forum_Load(string[] str)
        {
            if (str.Length < 2) return;
            string title = str[1];
            Forum.Forum forum = Channels.FindForum(((WebTVInfo)PageInfo).Channel, title);
            if (forum != null)
                Add(new MsgJSON_Forum("FORUM", forum));
        }
        public void Forum_Message_New(string[] str)
        {
            if (str.Length < 4) return;
            string title = str[1];
            string author = str[2];
            string message = str[3];

            string channel = ((WebTVInfo)PageInfo).Channel;
            string path = Info.address_WebTV + channel + @"\";

            Forum.Forum forum = Channels.FindForum(channel, title);
            if (forum == null) return;

            ForumMessage forummessage = new ForumMessage();
            forummessage.Author = author;
            forummessage.Message = message;
            forum.Add(forummessage);

            Info.SaveFileForum(forum, path + @"\Forum\" + title + Info.extension);

            Add(new MsgJSON_Forum("FORUM", forum));
        }
        public void Forum_Response_New(string[] str)
        {
            if (str.Length < 6) return;
            string title = str[1];
            string src_author = str[2];
            string src_create = str[3];
            string author = str[4];
            string message = str[5];

            string channel = ((WebTVInfo)PageInfo).Channel;
            string path = Info.address_WebTV + channel + @"\";

            Forum.Forum forum = Channels.FindForum(channel, title);
            if (forum == null) return;

            ForumMessage forumMessage = forum.Find(src_author, src_create);
            if (forumMessage == null) return;

            ForumMessage forummessage = new ForumMessage();
            forummessage.Author = author;
            forummessage.Message = message;
            forumMessage.Add(forummessage);

            Info.SaveFileForum(forum, path + @"\Forum\" + title + Info.extension);

            Add(new MsgJSON_Forum("FORUM", forum));
        }
        public void New_WebTV(string[] str)
        {
            if (str.Length < 17) return;


            WebTVJSON webtvjson = new WebTVJSON();
            int i = 1;
            webtvjson.Media.VideoPlayer = str[i++];
            webtvjson.Media.Source = str[i++];


            //webtvjson.VideoPlayer = str[1];// "Youtube";// Video, Html5, Youtube, Dailymotion, vimeo, ect.. STREAMING WebCAM
            //webtvjson.Source = str[2];// "5Y2F-j2SASc";

            webtvjson.Hourly.Title = str[i++];// "Sophie's Tips Trailer";
            webtvjson.Hourly.Category = str[i++];// "Tutorial";
            webtvjson.Hourly.Subcategory = str[i++];
            webtvjson.Hourly.Description = str[i++];// "Sophie's Tips tutorial de maquillages décoratifs.";
            webtvjson.Media.Duration = StringToInt(str[i++]);// 0;
            webtvjson.Hourly.ImageUrl = str[i++];
            webtvjson.Hourly.BackGroundUrl = str[i++];
            webtvjson.Social.WebSite = str[i++];
            webtvjson.Social.Youtube = str[i++];
            webtvjson.Social.Facebook = str[i++];
            webtvjson.Social.Twitter = str[i++];
            webtvjson.Social.Google = str[i++];
            webtvjson.Social.Dailymotion = str[i++];
            webtvjson.Social.Vimeo = str[i++];
            webtvjson.Social.Email = str[i++];

            Channels.SaveFileWebTVJSON(webtvjson, Info.address_WebTV + @"WebTVJSON\" + webtvjson.Hourly.Category + @"\" + webtvjson.Hourly.Subcategory + @"\");








        }
    }
}
