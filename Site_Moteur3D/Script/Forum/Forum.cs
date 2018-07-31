using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

using System.IO;
using Core;
using Core.Utility;

namespace Forum
{
    public class MsgJSON_ForumInfo : MessageJSON { public ForumInfo[] List; public MsgJSON_ForumInfo(string command, ForumInfo[] foruminfo) : base(command) { List = foruminfo; } }
    public class MsgJSON_Forum : MessageJSON { public ForumMessage Forum; public MsgJSON_Forum(string command, ForumMessage forum) : base(command) { Forum = forum; } }

    public class ForumList
    {
        public Forum[] Forums = new Forum[0];
        public void Add(Forum forum)
        {
            Forum[] temp = new Forum[Forums.Length + 1];
            for (int i = 0; i < Forums.Length; i++)
                temp[i] = Forums[i];

            temp[Forums.Length] = forum;
            Forums = temp;
        }
        public Forum Find(string title)
        {
            for (int i = 0; i < Forums.Length; i++)
                if (Forums[i].Title == title)
                    return Forums[i];
            return null;
        }
        public ForumInfo[] ForumInfo()
        {
            ForumInfo[] list = new ForumInfo[Forums.Length];
            for (int i = 0; i < Forums.Length; i++)
                list[i] = new ForumInfo(Forums[i]);
            return list;
        }
        public void Save(string path)
        {
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            for (int i = 0; i < Forums.Length; i++)
                Info.SaveFileForum(Forums[i], path + Forums[i].Title + Info.extension);
            //Info.SaveFileForum(Forums[i], path + Forums[i].FileName());
        }
        public void Load(string path)
        {
            Forums = new Forum[0];
            if (Directory.Exists(path))
            {
                DirectoryInfo d = new DirectoryInfo(path);
                foreach (FileInfo file in d.GetFiles())
                {
                    Forum forum = Info.LoadFileForum(file.FullName);
                    Add(forum);
                }
            }
        }
    }
    public class ForumInfo
    {
        public string Title = string.Empty;
        public string Author = string.Empty;
        public string Create = string.Empty;
        public int Nbr = 0;
        public ForumInfo(Forum forum)
        {
            Title = forum.Title;
            Author = forum.Author;
            Create = forum.Create;
            Nbr = forum.Responses.Length;
        }
    }

    public class ForumMessage
    {
        public string Author = string.Empty;
        public string Create = DateTime.Now.ToString();
        public string Message = string.Empty;

        public ForumMessage[] Responses = new ForumMessage[0];
        public void Add(ForumMessage forum)
        {
            ForumMessage[] temp = new ForumMessage[Responses.Length + 1];
            for (int i = 0; i < Responses.Length; i++)
                temp[i] = Responses[i];

            temp[Responses.Length] = forum;
            Responses = temp;
        }

        public virtual void Save(SerializationWriter SW)
        {
            SW.WriteType(this);

            
            SW.WriteStartElement("ForumMessage");
            SW.WriteVersion(0);

            SW.Write("Author", Author);
            SW.Write("Create", Create);
            SW.Write("Message", Message);

            SW.WriteStartElement("Forums");
            SW.Write("Length", Responses.Length);
            for (int i = 0; i < Responses.Length; i++)
                if (Responses[i] != null)
                    Responses[i].Save(SW);
            SW.WriteEndElement();


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
                        Author = SR.ReadString();
                        Create = SR.ReadString();
                        Message = SR.ReadString();

                        SR.ReadStartElement();
                        int length = SR.ReadInt();
                        for (int i = 0; i < length; i++)
                        {
                            ForumMessage baseforum = SR.ReadType() as ForumMessage;
                            if (baseforum != null)
                            {
                                baseforum.Load(SR);
                                Add(baseforum);
                            }
                        }
                        SR.ReadEndElement();
                        break;
                    }
            }
            SR.ReadEndElement();
        }

    }

    public class Forum : ForumMessage
    {

        public string Title = string.Empty;
        public ForumMessage Find(string author, string create)
        {
            for (int i = 0; i < Responses.Length; i++)
                if (Responses[i].Author == author && Responses[i].Create == create)
                    return Responses[i];
            return null;
        }
        public virtual string FileName()
        {
            DateTime tempDate = DateTime.Parse(Create);
            return tempDate.Year + "." + tempDate.Month + "." + tempDate.Day + " " + +tempDate.Hour + "." + tempDate.Minute + "." + tempDate.Second + " " + Title + Info.extension;

        }
        public override void Save(SerializationWriter SW)
        {
            base.Save(SW);
            SW.WriteStartElement("Forum");
            SW.WriteVersion(0);

            SW.Write("Title", Title);

            SW.WriteEndElement();
        }
        public override void Load(SerializationReader SR)
        {
            base.Load(SR);
            SR.ReadStartElement();
            int version = SR.ReadVersion();

            switch (version)
            {
                case 0:
                    {
                        Title = SR.ReadString();
                        
                        break;
                    }
            }
            SR.ReadEndElement();
        }
    }
}