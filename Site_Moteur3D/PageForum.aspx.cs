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
namespace Forum
{
    public partial class PageForum : PageBase
    {
        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);

            if (!IsPostBack) { }
        }
        public override void Loop(string[] str)
        {
            base.Loop(str);
            //Add(new MsgJSON_ForumInfo("FORUMINFO", Info.ForumList.ForumInfo()));
        }
        //public override void Init_Hidden()
        //{
        //    base.Init_Hidden();
        //    Page.ClientScript.RegisterHiddenField("ForumInfo", Info.JSONSerialize(Info.ForumList.ForumInfo()));
        //}
        public override void CallPage(string[] str)
        {
            base.CallPage(str);

            if (str[0] == "FORUMINFO")
                Forum_Info(str);
            else if (str[0] == "FORUM_NEW")
                Forum_New(str);
            else if (str[0] == "FORUM_LOAD")
                Forum_Load(str);
            else if (str[0] == "FORUM_MESSAGE_NEW")
                Forum_Message_New(str);
            else if (str[0] == "FORUM_RESPONSE_NEW")
                Forum_Response_New(str);
        }

        public void Forum_Info(string[] str)
        {
            Add(new MsgJSON_ForumInfo("FORUMINFO", Info.ForumList.ForumInfo()));
        }
        public void Forum_New(string[] str)
        {
            string title = str[1];
            string author = str[2];
            string msg = str[3];

            if (title == string.Empty || author == string.Empty || msg == string.Empty) return;

            Forum forum = new Forum();
            forum.Title = title;
            forum.Author = author;
            forum.Message = msg;

            if (!Directory.Exists(Info.address_Forum))
                Directory.CreateDirectory(Info.address_Forum);

            string path = Info.address_Forum + forum.FileName();
            Info.SaveFileForum(forum, path);

            Info.ForumList.Add(forum);

            Add(new MsgJSON_ForumInfo("FORUMINFO", Info.ForumList.ForumInfo()));
            Add(new MsgJSON_Forum("FORUM", forum));
        }
        public void Forum_Load(string[] str)
        {
            string title = str[1];
            Forum forum = Info.ForumList.Find(title);
            if(forum != null)
                Add(new MsgJSON_Forum("FORUM", forum));
        }
        public void Forum_Message_New(string[] str)
        {
            string title = str[1];
            string author = str[2];
            string message = str[3];


            Forum forum = Info.ForumList.Find(title);
            if (forum == null) return;

            ForumMessage forummessage = new ForumMessage();
            forummessage.Author = author;
            forummessage.Message = message;
            forum.Add(forummessage);

            string path = Info.address_Forum + forum.FileName();
            Info.SaveFileForum(forum, path);

            Add(new MsgJSON_Forum("FORUM", forum));
        }
        public void Forum_Response_New(string[] str)
        {
            string title = str[1];
            string src_author = str[2];
            string src_create = str[3];
            string author = str[4];
            string message = str[5];

            Forum forum = Info.ForumList.Find(title);
            if (forum == null) return;

            ForumMessage forumMessage = forum.Find(src_author, src_create);
            if (forumMessage == null) return;

            ForumMessage forummessage = new ForumMessage();
            forummessage.Author = author;
            forummessage.Message = message;
            forumMessage.Add(forummessage);

            string path = Info.address_Forum + forum.FileName();
            Info.SaveFileForum(forum, path);

            Add(new MsgJSON_Forum("FORUM", forum));
        }
    }
}
