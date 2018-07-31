using System;
using System.IO;
using Core;
using Core.Utility;
using Forum;

namespace WebTV
{
    public class MsgJSON_WebTV : MessageJSON { public string ID = ""; public WebTVJSON WebTV = null; public MsgJSON_WebTV(string command, string id, WebTVJSON webtv) : base(command) { ID = id; WebTV = webtv; } }
    public class WebTV_Media
    {
        public string VideoPlayer = "Video";// Html5, Youtube, Dailymotion, vimeo, ect.. STREAMING WebCAM
        public string Source = "";
        public int Duration = 0;
        //public string[] Source = new string[0];
        public int StartSeconds = 0;
        public string Quality = "highres";//"large";
    }
    public class WebTV_Hourly
    {
        public string Title = string.Empty;
        public DateJSON DateJSON = null;
        public string Category = string.Empty;
        public string Subcategory = string.Empty;
        public string Description = string.Empty;
        public string ImageUrl = string.Empty;
        public string BackGroundUrl = string.Empty;
    }
    public class WebTV_Note
    {
        public int Like = 0;
        public int Dislike = 0;
        public int NumberView = 0;
        public int Error = 0;
    }
    public class WebTV_Social
    {
        public string WebSite = string.Empty;
        public string Youtube = string.Empty;
        public string Facebook = string.Empty;
        public string Twitter = string.Empty;
        public string Google = string.Empty;
        public string Dailymotion = string.Empty;
        public string Vimeo = string.Empty;
        public string Email = string.Empty;
    };

    public class WebTVJSON
    {
        public WebTV_Media Media = new WebTV_Media();
        public WebTV_Hourly Hourly = new WebTV_Hourly();
        public WebTV_Note Note = new WebTV_Note();
        public WebTV_Social Social = new WebTV_Social();

        public WebTVJSON() { }
        public WebTVJSON(string title, string media, string source, int duration) 
        {
            Hourly.Title = title;
            Media.VideoPlayer = media;
            Media.Source = source;
            Media.Duration = duration;
        }
        public WebTVJSON(WebTVJSON webtvjson)
        {
            Hourly = webtvjson.Hourly;
            Note = webtvjson.Note;
            Social = webtvjson.Social;
            Media = new WebTV_Media();
            Media.VideoPlayer = webtvjson.Media.VideoPlayer;
            Media.Source = webtvjson.Media.Source;
            Media.StartSeconds = (int)(new TimeSpan(DateTime.Now.Ticks - webtvjson.Hourly.DateJSON.Ticks + new TimeSpan(0, 0, webtvjson.Media.StartSeconds).Ticks).TotalSeconds);
            Media.Duration = webtvjson.Media.Duration - Media.StartSeconds;
            Media.Quality = webtvjson.Media.Quality;
        }
    }

    
    
    public static class Channels
    {
        public static void Start()
        {
            //CreateChannels();
            //CreateVideo();
            //LoadAndSave();
            Hourlys.LoadWebTVJSON(Info.address_WebTVJSON);
            Load();
        }
        public static PageInfo[] PageInfos = new PageInfo[0];
        public static void Add(PageInfo pageinfo)
        {
            PageInfo[] temp = new PageInfo[PageInfos.Length + 1];
            for (int i = 0; i < PageInfos.Length; i++)
                temp[i] = PageInfos[i];
            temp[PageInfos.Length] = pageinfo;
            PageInfos = temp;
        }
        public static PageInfo FindPageInfo(string id)
        {
            for (int i = 0; i < PageInfos.Length; i++)
                if (PageInfos[i].ID == id)
                    return PageInfos[i];
            return null;
        }

        public static Translator[] Translators = new Translator[0];
        public static void Add(Translator translator)
        {
            Translator[] temp = new Translator[Translators.Length + 1];
            for (int i = 0; i < Translators.Length; i++)
                temp[i] = Translators[i];
            temp[Translators.Length] = translator;
            Translators = temp;
        }






        //public static WebTVJSON[] WebTVJSON = new WebTVJSON[0];
        //public static void Add(WebTVJSON tv)
        //{
        //    WebTVJSON[] temp = new WebTVJSON[WebTVJSON.Length + 1];
        //    for (int i = 0; i < WebTVJSON.Length; i++)
        //        temp[i] = WebTVJSON[i];

        //    temp[WebTVJSON.Length] = tv;
        //    WebTVJSON = temp;
        //}







        static Channel[] Channel = new Channel[0];
        public static void Add(Channel channel)
        {
            Channel[] temp = new Channel[Channel.Length + 1];
            for (int i = 0; i < Channel.Length; i++)
                temp[i] = Channel[i];
            temp[Channel.Length] = channel;
            Channel = temp;
        }
        public static Channel Find(string name)
        {
            for (int i = 0; i < Channel.Length; i++)
                if (Channel[i].Name == name)
                    return Channel[i];
            return null;
        }
        public static void AddWebTV(string name, WebTVJSON webtvjson)
        {
            Channel channel = Find(name);
            if (channel == null) return;
            channel.Add(webtvjson);
        }
        public static WebTVJSON FindChannel(string name)
        {
            Channel channel = Find(name);
            if (channel == null) return null;
            return channel.Find();
        }
        public static Forum.Forum FindForum(string name, string title)
        {
            Channel channel = Find(name);
            if (channel == null) return null;
            return channel.ForumList.Find(title);
        }

        public static void CreateChannels()
        {
            Channel channel = new Channel();
            channel.Name = "Mystravely";
            Add(channel);

            channel.Appearances = new Appearances_Variety();

            Forum.Forum forum = new Forum.Forum();
            forum.Title = "Mystravely";
            forum.Author = "Administrator";
            forum.Message = "Partez pour un voyage mystérieux avec la chaîne Mystravely." + "\u000A"
            + "Découvrez le monde, ses merveilles et ses mystères. Sillonez parmis des créatures réelles ou légendaires." + "\u000A"
            + "Mystravely, regroupe de nombreuses vidéo sur les civilisations présentes et anciennes, sur des lieux dont vous n'avez jamais entendu parler, ainsi que de nombreux reportages sur des énigmes jamais élucidés." + "\u000A"
            + "Pénétrez les théories étonnantes et les plus cachés. Mystravely vous offre un voyage mystérieux dont vous ne reviendrez pas."; 
            channel.ForumList.Add(forum);

            Save(channel);



            //forum.Message = "Chaîne télé qui regroupe de nombreux tutoriaux artistiques, artisanaux et utilitaires." + "\u000A"
            //+ "Apprenez facilement grâce à une gamme de vidéo qui vous expliques de manière pédagogique toutes sortes de métier et d'activitées diverses." + "\u000A"
            //+ "TutorialTV vous offre la possibilité de découvrir des enseignants passionnés, ainsi qu'une facilité pour vous abonnez à leur chaîne médiatique"; 

            //forum.Message = "Retrouvez sur Informavie, la Chaîne de télé d'information, des conférences, des reportages et de nombreuses vidéo sur des sujets aussi variés que la politique, l'économie et l'histoire." + "\u000A"
            //+ "Informavie, la vérité à tout prix, vous dit tout sans tabou."; 

            //forum.Message = "Mangameek, la Chaîne de télé de manga, des jeux vidéo et du monde geek, regroupe de nombreuses vidéos comprenant aussi le monde de l'open source, ainsi que des activité insolites." + "\u000A"
            //+ "Découvrez le monde du cosplay, du jeux de rôle papier ou grandeur nature et de tout ce qui vous permet de vous aventurer dans l'univers merveilleux du fantastique."; 
        }

        public static void LoadAllDirectory(string path, Channel channel)
        {
            if (Directory.Exists(path))
            {
                DirectoryInfo d = new DirectoryInfo(path);

                foreach (FileInfo f in d.GetFiles())
                {
                    WebTVJSON webjson = LoadFileWebTVJSON(f.FullName);
                    channel.Add(webjson);
                }
                foreach (DirectoryInfo dir in d.GetDirectories())
                {
                    LoadAllDirectory(dir.FullName, channel);
                }
            }
        }
        public static void LoadAndSave()
        {
            string path = Info.address_WebTV + @"WebTVJSON\";//Info.address_SandBox

            //if (Directory.Exists(path))
            //{
            //    DirectoryInfo d = new DirectoryInfo(path);

            //    foreach (FileInfo f in d.GetFiles())
            //    {
            //        WebTVJSON webjson = LoadFileWebTVJSON(f.FullName);
            //        f.Delete();
            //        //webjson.Social.Youtube = "https://www.youtube.com/c/sophiestipps";
            //        SaveFileWebTVJSON(webjson, path);
            //    }

            //    foreach (DirectoryInfo dir in d.GetDirectories())
            //    {
            //        foreach (FileInfo file in dir.GetFiles())
            //        {
            //            WebTVJSON webjson = LoadFileWebTVJSON(file.FullName);
            //            file.Delete();
            //            //        webjson.Hourly.Category = "TutorialTV";
            //            SaveFileWebTVJSON(webjson, dir.FullName + @"\");
            //        }
            //    }
            //}
        }
        public static void LoadAndSaveDirectory(string path)
        {
            if (Directory.Exists(path))
            {
                DirectoryInfo d = new DirectoryInfo(path);

                foreach (FileInfo f in d.GetFiles())
                {
                    WebTVJSON webjson = LoadFileWebTVJSON(f.FullName);
                    f.Delete();
                    SaveFileWebTVJSON(webjson, path);
                }
                foreach (DirectoryInfo dir in d.GetDirectories())
                {
                    LoadAndSaveDirectory(d.FullName);
                }
            }
        }

        public static void Save()
        {
            string path = Info.address_WebTV;
            if (!Directory.Exists(path + @"Translators\"))
                Directory.CreateDirectory(path + @"Translators\");
            for (int t = 0; t < Channels.Translators.Length; t++)
                Info.SaveFileTranslator(Channels.Translators[t], path + @"Translators\" + Channels.Translators[t].Name + Info.extension);

            
            for (int i = 0; i < Channel.Length; i++)
            {
                Save(Channel[i]);
            }
        }
        public static void Load()
        {
            string path = Info.address_WebTV;
            if (Directory.Exists(Info.address_WebTV))
            {
                DirectoryInfo d = new DirectoryInfo(Info.address_WebTV);
                foreach (DirectoryInfo directory in d.GetDirectories())
                {
                    if (directory.Name == "Translators")
                    {
                        foreach (FileInfo file in directory.GetFiles())
                        {
                            Translator translator = Info.LoadFileTranslator(file.FullName);
                            Channels.Add(translator);
                        }
                    }
                    else
                    {
                        path = directory.FullName + @"\";
                        Channel channel = Load(path);
                        if (channel != null)
                            Add(channel);
                    }
                }
            }
        }
        
        public static void Save(Channel channel)
        {
            string path = Info.address_WebTV + channel.Name + @"\";
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            SerializationWriter SW = new SerializationWriter(path + "Channel" + Info.extension);
            SW.Start("Info");
            channel.Save(SW);
            SW.End();

            Info.SaveFileAppearances(channel.Appearances, path + "Appearances" + Info.extension);

            if (!Directory.Exists(path + @"Channel\"))
                Directory.CreateDirectory(path + @"Channel\");

            if (!Directory.Exists(path + @"Forum\"))
                Directory.CreateDirectory(path + @"Forum\");
            channel.ForumList.Save(path + @"Forum\");

        }
        public static Channel Load(string path)
        {
            if (!File.Exists(path + @"Channel" + Info.extension)) return null;
            SerializationReader SR = new SerializationReader(path + @"Channel" + Info.extension);
            SR.Read();
            SR.ReadDeclaration();
            SR.ReadStartElement();
            Channel channel = new Channel();
            channel.Load(SR);
            SR.Close();

            channel.Appearances = Info.LoadFileAppearances(path + @"Appearances" + Info.extension);

            if (!Directory.Exists(path + @"\Channel\"))
                Directory.CreateDirectory(path + @"\Channel\");
            DirectoryInfo dir = new DirectoryInfo(path + @"/Channel");
            foreach (FileInfo file in dir.GetFiles())
            {
                WebTVJSON webjson = LoadFileWebTVJSON(file.FullName);
                channel.Add(webjson);
            }

            channel.ForumList.Load(path + @"/Forum");

            return channel;
        }














                
        public static void SaveFileWebTVJSON(WebTVJSON webtvjson, string path)
        {
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            path += webtvjson.Hourly.Title + Info.extension;
            SerializationWriter SW = new SerializationWriter(path);
            SW.Start("Info");
            SW.WriteStartElement("WebTVJSON");
            SW.WriteVersion(0);

            SW.Write("Title", webtvjson.Hourly.Title);
            SW.Write("VideoPlayer", webtvjson.Media.VideoPlayer);
            SW.Write("Source", webtvjson.Media.Source);
            SW.Write("Duration", webtvjson.Media.Duration);
            SW.Write("StartSeconds", webtvjson.Media.StartSeconds);
            SW.Write("Quality", webtvjson.Media.Quality);
            SW.Write("Category", webtvjson.Hourly.Category);
            SW.Write("Subcategory", webtvjson.Hourly.Subcategory);
            SW.Write("Like", webtvjson.Note.Like);
            SW.Write("Dislike", webtvjson.Note.Dislike);
            SW.Write("NumberView", webtvjson.Note.NumberView);
            SW.Write("Description", webtvjson.Hourly.Description);
            SW.Write("ImageUrl", webtvjson.Hourly.ImageUrl);
            SW.Write("BackGroundUrl", webtvjson.Hourly.BackGroundUrl);
            SW.Write("WebSite", webtvjson.Social.WebSite);
            SW.Write("Youtube", webtvjson.Social.Youtube);
            SW.Write("Facebook", webtvjson.Social.Facebook);
            SW.Write("Twitter", webtvjson.Social.Twitter);
            SW.Write("Google", webtvjson.Social.Google);
            SW.Write("Dailymotion", webtvjson.Social.Dailymotion);
            SW.Write("Vimeo", webtvjson.Social.Vimeo);
            SW.Write("Email", webtvjson.Social.Email);
 

            SW.WriteEndElement();
            SW.End();
        }
        public static WebTVJSON LoadFileWebTVJSON(string path)
        {
            WebTVJSON webtvjson = new WebTVJSON();
            SerializationReader SR = new SerializationReader(path);
            SR.Read();
            SR.ReadDeclaration();
            SR.ReadStartElement();
            SR.ReadStartElement();
            int version = SR.ReadVersion();
            switch (version)
            {
                case 0:
                    {
                        webtvjson.Hourly.Title = SR.ReadString();
                        webtvjson.Media.VideoPlayer = SR.ReadString();
                        webtvjson.Media.Source = SR.ReadString();
                        webtvjson.Media.Duration = SR.ReadInt();
                        webtvjson.Media.StartSeconds = SR.ReadInt();
                        webtvjson.Media.Quality = SR.ReadString();
                        webtvjson.Hourly.Category = SR.ReadString();
                        webtvjson.Hourly.Subcategory = SR.ReadString();
                        webtvjson.Note.Like = SR.ReadInt();
                        webtvjson.Note.Dislike = SR.ReadInt();
                        webtvjson.Note.NumberView = SR.ReadInt();
                        webtvjson.Hourly.Description = SR.ReadString();
                        webtvjson.Hourly.ImageUrl = SR.ReadString();
                        webtvjson.Hourly.BackGroundUrl = SR.ReadString();
                        webtvjson.Social.WebSite = SR.ReadString();
                        webtvjson.Social.Youtube = SR.ReadString();
                        webtvjson.Social.Facebook = SR.ReadString();
                        webtvjson.Social.Twitter = SR.ReadString();
                        webtvjson.Social.Google = SR.ReadString();
                        webtvjson.Social.Dailymotion = SR.ReadString();
                        webtvjson.Social.Vimeo = SR.ReadString();
                        webtvjson.Social.Email = SR.ReadString();
                        break;
                    }
            }
            SR.ReadEndElement();
            SR.Close();
            return webtvjson;
        }
    }
    public class Channel
    {
        public string Name = string.Empty;
        public Appearances Appearances = new Appearances();
        public ForumList ForumList = new ForumList();

        WebTVJSON[] TV = new WebTVJSON[0];
        public void Add(WebTVJSON tv)
        {
            if (TV.Length == 0) tv.Hourly.DateJSON = new DateJSON(DateTime.Now);
            else tv.Hourly.DateJSON = new DateJSON(TV[TV.Length - 1].Hourly.DateJSON.DateTime + new TimeSpan(0, 0, TV[TV.Length - 1].Media.Duration));

            WebTVJSON[] temp = new WebTVJSON[TV.Length + 1];
            for (int i = 0; i < TV.Length; i++)
                temp[i] = TV[i];

            temp[TV.Length] = tv;
            TV = temp;
        }
        public WebTVJSON Find()
        {
            long time = DateTime.Now.Ticks;
            for (int i = 0; i < TV.Length; i++)
                if (TV[i].Hourly.DateJSON.Ticks + new TimeSpan(0, 0, TV[i].Media.Duration).Ticks > time)
                    return new WebTVJSON(TV[i]);
            return null;
        }
        public WebTVJSON FindNext()
        {
            long time = DateTime.Now.Ticks;
            for (int i = 0; i < TV.Length; i++)
                if (TV[i].Hourly.DateJSON.Ticks > time)
                    return TV[i];
            return null;
        }
        public WebTVJSON FindTitle(string title)
        {
            for (int i = 0; i < TV.Length; i++)
                if (TV[i].Hourly.Title == title)
                    return TV[i];
            return null;
        }

        public WebTV_Hourly[] FindInfo()
        {
            WebTV_Hourly[] temp = new WebTV_Hourly[TV.Length];
            for (int i = 0; i < TV.Length; i++)
                temp[i] = TV[i].Hourly;
            return temp;
        }

        public virtual void Save(SerializationWriter SW)
        {
            SW.WriteStartElement("Channel");
            SW.WriteVersion(0);
            SW.Write("Name", Name);
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
                        break;
                    }
            }
            SR.ReadEndElement();
        }
    }
}
