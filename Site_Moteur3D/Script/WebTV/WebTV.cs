using System;
using System.IO;
using Core;
using Core.Utility;
using Forum;

using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;

namespace WebTV
{
    public class Msg_WebTV : MessageJSON { public string ID = ""; public object Value = null; public Msg_WebTV(string command, string id, object value) : base(command) { ID = id; Value = value; } }

    [DataContract]
    public class WebTV_Date_File
    {
        [DataMember]
        public Date_File[] List { get; set; } = new Date_File[0];
        public void Add(Date_File date_file)
        {
            Date_File[] temp = new Date_File[List.Length + 1];
            for (int i = 0; i < List.Length; i++)
                temp[i] = List[i];

            temp[List.Length] = date_file;
            List = temp;
        }
        [IgnoreDataMember]
        public string Current
        {
            get
            {
                long time = DateTime.Now.Ticks;
                for (int i = 0; i < List.Length; i++)
                    if (List[i].Date.Ticks < time && List[i].Date.Ticks + new TimeSpan(0, 0, List[i].Duration).Ticks > time)
                        return List[i].Path;
                return string.Empty;
            }
        }
        [IgnoreDataMember]
        public string Next
        {
            get
            {
                long time = DateTime.Now.Ticks;
                for (int i = 0; i < List.Length; i++)
                    if (List[i].Date.Ticks < time && List[i].Date.Ticks + new TimeSpan(0, 0, List[i].Duration).Ticks > time)
                    {
                        if (i + 1 < List.Length)
                            return List[i + 1].Path;
                        else
                            return string.Empty;
                    }
                return string.Empty;
            }
        }
        [DataContract]
        public class Date_File
        {
            [DataMember]
            public DateTime Date { get; set; }
            [DataMember]
            public int Duration { get; set; }
            [DataMember]
            public string Path { get; set; }
        }
    }
    //[DataContract]
    //public class WebTV_Hourly_Date
    //{
    //    [DataMember]
    //    public DateTime Date { get; set; }
    //    //[DataMember]
    //    //public string Proprietary = string.Empty;
    //    [DataMember]
    //    public string Name { get; set; }
    //    [DataMember]
    //    public int Duration { get; set; }
    //}
    //[DataContract]
    //public class WebTV_Media_Date
    //{
    //    [DataMember]
    //    public DateTime Date = DateTime.Now;
    //    [DataMember]
    //    public string Proprietary = string.Empty;
    //    [DataMember]
    //    public string Name = string.Empty;
    //    [DataMember]
    //    public int Duration = 0;
    //}
    [DataContract]
    public class WebTV_Channel
    {
        [DataMember]
        public string Name { get; set; } //PrimaryKey
        [DataMember]
        public string Appearances { get; set; } //= "Default";//new Appearances();
        [IgnoreDataMember]
        public ForumList ForumList { get; set; } // = new ForumList();
        [DataMember]
        public string Description { get; set; } //= string.Empty;
        [DataMember]
        public WebTV_Date_File Hourly = new WebTV_Date_File();
        //public void Add(WebTV_Date_File hourly)
        //{
        //    WebTV_Date_File[] temp = new WebTV_Date_File[Hourly.Length + 1];
        //    for (int i = 0; i < Hourly.Length; i++)
        //        temp[i] = Hourly[i];

        //    temp[Hourly.Length] = hourly;
        //    Hourly = temp;
        //}
        public WebTV_Hourly Current
        {
            get
            {
                return WebTV_Serialization.Load_Hourly(Hourly.Current);
            }
        }
        public WebTV_Hourly Next
        {
            get
            {
                return WebTV_Serialization.Load_Hourly(Hourly.Next);
            }
        }
    }
    [DataContract]
    public class WebTV_Hourly
    {
        [DataMember]
        public string Name { get; set; } //= string.Empty; //PrimaryKey
        [DataMember]
        public string Channel { get; set; }
        [DataMember]
        public string Category { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public WebTV_Date_File Media = new WebTV_Date_File();


        public WebTV_Media Current
        {
            get
            {
                return WebTV_Serialization.Load_Media(Media.Current);
            }
        }
        public WebTV_Media Next
        {
            get
            {
                return WebTV_Serialization.Load_Media(Media.Next);
            }
        }
        public WebTV_Media First
        {
            get
            {
                if (Media.List.Length > 0)
                    return WebTV_Serialization.Load_Media(Media.List[0].Path);
                else return null;
            }
        }

        //public void Add(WebTV_Media_Date media)
        //{
        //    WebTV_Media_Date[] temp = new WebTV_Media_Date[Media.Length + 1];
        //    for (int i = 0; i < Media.Length; i++)
        //        temp[i] = Media[i];

        //    temp[Media.Length] = media;
        //    Media = temp;
        //}
        //public WebTV_Media Find()
        //{
        //    long time = DateTime.Now.Ticks;
        //    for (int i = 0; i < Media.Length; i++)
        //        if (Media[i].DateJSON.Ticks + new TimeSpan(0, 0, Media[i].Duration).Ticks > time)
        //            return new WebTVJSON(TV[i]);
        //    return null;
        //}
        //public WebTV_Media Find(string name)
        //{
        //    for (int i = 0; i < Media.Length; i++)
        //        if (Media[i].Key == name)
        //            return Media[i];
        //    return null;
        //}
    }
    [DataContract]
    public class WebTV_Media
    {
        [DataMember]
        public string Name { get; set; } // = string.Empty;//PrimaryKey
        [DataMember]
        public string Proprietary { get; set; } // = string.Empty;
        [DataMember]
        public string VideoPlayer = "Video";// Html5, Youtube, Dailymotion, vimeo, ect.. STREAMING WebCAM
        [DataMember]
        public string Source = "";
        [DataMember]
        public int StartSeconds = 0;
        [DataMember]
        public int Duration = 0;
        [DataMember]
        public string Quality = "highres";//"large";
        [DataMember]
        public int Like = 0;
        [DataMember]
        public int Dislike = 0;
        [DataMember]
        public int NumberView = 0;
        [DataMember]
        public int Error = 0;
        [DataMember]
        public string Description = string.Empty;
    }
    [DataContract]
    public class WebTV_Proprietary
    {
        [DataMember]
        public string Name { get; set; } // = string.Empty;//PrimaryKey
        [DataMember]
        public string ImageUrl { get; set; } //= string.Empty;
        [DataMember]
        public string BackGroundUrl { get; set; } // = string.Empty;
        [DataMember]
        public string WebSite { get; set; } // = string.Empty;
        [DataMember]
        public string Youtube { get; set; } //= string.Empty;
        [DataMember]
        public string Facebook { get; set; } //= string.Empty;
        [DataMember]
        public string Twitter { get; set; } // = string.Empty;
        [DataMember]
        public string Google { get; set; } //= string.Empty;
        [DataMember]
        public string Dailymotion { get; set; } // = string.Empty;
        [DataMember]
        public string Vimeo { get; set; } // = string.Empty;
        [DataMember]
        public string Email { get; set; } //= string.Empty;
        [DataMember]
        public string Description { get; set; } //= string.Empty;
    }


    // ---- Connection
    public static class WebTV_Singleton
    {

        static WebTV_Channel[] WebTV_Channel = new WebTV_Channel[0];
        public static void Add(WebTV_Channel channel)
        {
            WebTV_Channel[] temp = new WebTV_Channel[WebTV_Channel.Length + 1];
            for (int i = 0; i < WebTV_Channel.Length; i++)
                temp[i] = WebTV_Channel[i];
            temp[WebTV_Channel.Length] = channel;
            WebTV_Channel = temp;
        }
        public static WebTV_Channel Find(string name)
        {
            for (int i = 0; i < WebTV_Channel.Length; i++)
                if (WebTV_Channel[i].Name == name)
                    return WebTV_Channel[i];
            return new WebTV_Channel();// null;
        }
        //public static WebTV_Hourly Current(WebTV_Channel channel)
        //{
        //    for (int i = 0; i < channel.Hourly.Length; i++)
        //    {
        //        WebTV_Hourly hourly =
        //        if (channel.Hourly[i].DateJSON.Ticks)
        //            return WebTV_Channel[i];
        //    }

        //    return null;

        //    if (TV[i].Hourly.DateJSON.Ticks + new TimeSpan(0, 0, TV[i].Media.Duration).Ticks > time)
        //        return new WebTVJSON(TV[i]);
        //}
        //public static WebTV_Media Current(string name)
        //{
        //    WebTV_Channel channel = Find(name);
        //    if (channel == null) return null;

        //}
    }
    // Verif utilitée sinon deplacer dans la classe
    public static class WebTV_Find
    {
        public static WebTV_Proprietary Proprietary(string name)
        {
            return WebTV_Serialization.Load_Proprietary(name);
        }
        public static WebTV_Media Current_Media(WebTV_Channel channel)
        {
            WebTV_Hourly hourly = channel.Current;
            if (hourly != null)
                return hourly.Current;
            else
                return null;
        }
        public static WebTV_Media Next_Media(WebTV_Channel channel)
        {
            WebTV_Hourly hourly = channel.Current;
            WebTV_Media media = null;

            if (hourly != null)
                media = hourly.Next;

            if (media == null)
            {
                hourly = channel.Next;
                media = hourly.First;
            }

            return media;
        }
    }
        // ---- Sauvegarde
        public static class WebTV_Serialization
    {
        public readonly static string address_WebTV = Info.address_SandBox + @"WebTV_test\";
        //public readonly static string address_WebTVJSON = address_WebTVJSON + @"WebTVJSON\";
        //public readonly static string address_WebTV_Forum = address_WebTV + @"Forum\";



        //public static void Save<T>( T t, string path, string file )
        //{
        //    if (!Directory.Exists(path))
        //        Directory.CreateDirectory(path);
        //    SerializationWriter SW = new SerializationWriter(path + file);
        //    SW.Start(t.GetType().FullName);
        //    t.Save(SW);
        //    SW.End();
        //}
        public static void SaveJSON<T>(object obj, string path)
        {
            //Person p = new Person();
            //Set up Person object...
            //T t = (T)Info.Instance(typeof(T).FullName);
            FileStream filestream = new FileStream(path,FileMode.OpenOrCreate);
            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(T));
            serializer.WriteObject(filestream, obj);
            //serializer.WriteObject(filestream, t);
            filestream.Close();
        }
        public static T LoadJSON<T>(string path)
        {
            T t = (T)Info.Instance(typeof(T).FullName);
            FileStream filestream = new FileStream(path, FileMode.OpenOrCreate);
            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(T));
            t = (T)serializer.ReadObject(filestream);
            return t;
        }
        //***********************************************************

        public static void Save_Channel(WebTV_Channel channel)
        {
            SaveJSON<WebTV_Channel>(channel, address_WebTV + @"Channel/"+ channel.Name + Info.extension);
        }
        public static WebTV_Channel Load_Channel(string name)
        {
            return LoadJSON<WebTV_Channel>(address_WebTV + @"Channel/"+ name+Info.extension);
        }

        public static void Save_Hourly(WebTV_Hourly hourly)
        {
            SaveJSON<WebTV_Hourly>(hourly, address_WebTV + @"Hourly/" + hourly.Channel + @"/"+ hourly.Name + Info.extension);
        }
        public static WebTV_Hourly Load_Hourly(string path)
        {
            return LoadJSON<WebTV_Hourly>(path);
        }
        public static WebTV_Hourly Load_Hourly(string namechannel, string name)
        {
            return LoadJSON<WebTV_Hourly>(address_WebTV + @"Hourly/" + namechannel + @"/" + name + Info.extension);
        }
        public static void Save_Media(WebTV_Media media)
        {
            SaveJSON<WebTV_Media>(media, address_WebTV + @"Media/" + media.Proprietary + @"/"+ media.Name + Info.extension);
        }
        public static WebTV_Media Load_Media(string path)
        {
            return LoadJSON<WebTV_Media>(path);
        }
        public static WebTV_Media Load_Media(string nameproprietary, string name)
        {
            return LoadJSON<WebTV_Media>(address_WebTV + @"Media/" + nameproprietary + @"/" + name + Info.extension);
        }
        public static void Save_Proprietary(WebTV_Proprietary proprietary)
        {
            SaveJSON<WebTV_Proprietary>(proprietary, address_WebTV + @"Proprietary/"+ proprietary.Name + Info.extension);
        }
        public static WebTV_Proprietary Load_Proprietary(string name)
        {
            return LoadJSON<WebTV_Proprietary>(address_WebTV + @"Proprietary/"+ name + Info.extension);
        }
        //public static WebTV_Hourly Load_Hourly(string channelname, string hourlyname)
        //{
        //    string path = address_WebTV + channelname + @"/Hourly/";
        //    return LoadJSON<WebTV_Hourly>(path, hourlyname + Info.extension);
        //}


        //public static void Save(WebTV_Channel channel)
        //{
        //    string path = address_WebTV + @"Channel\";
        //    //string path = address_WebTV + channel.Name + @"\";
        //    if (!Directory.Exists(path))
        //        Directory.CreateDirectory(path);
        //    SerializationWriter SW = new SerializationWriter(path + channel.Name + Info.extension);
        //    SW.Start("Channel");
        //    //channel.Save(SW);
        //    SW.WriteVersion(0);
        //    SW.Write("Name", channel.Name);
        //    SW.Write("Appearances", channel.Appearances);
        //    SW.Write("Description", channel.Description);

        //    SW.End();

        //    //Info.SaveFileAppearances(channel.Appearances, path + "Appearances" + Info.extension);

        //    //if (!Directory.Exists(path + @"Channel\"))
        //    //    Directory.CreateDirectory(path + @"Channel\");

        //    //if (!Directory.Exists(path + @"Forum\"))
        //    //    Directory.CreateDirectory(path + @"Forum\");
        //    //channel.ForumList.Save(path + @"Forum\");

        //}
        //public static WebTV_Channel Load(string path)
        //{
        //    if (!File.Exists(path)) return null;
        //    SerializationReader SR = new SerializationReader(path);
        //    //if (!File.Exists(path + @"Channel" + Info.extension)) return null;
        //    //SerializationReader SR = new SerializationReader(path + @"Channel" + Info.extension);
        //    SR.Read();
        //    SR.ReadDeclaration();
        //    SR.ReadStartElement();
        //    WebTV_Channel channel = new WebTV_Channel();
        //    //channel.Load(SR);
        //    int version = SR.ReadVersion();
        //    switch (version)
        //    {
        //        case 0:
        //            {
        //                channel.Name = SR.ReadString();
        //                channel.Appearances = SR.ReadString();
        //                channel.Description = SR.ReadString();
        //                break;
        //            }
        //    }
        //    SR.Close();

        //    //channel.Appearances = Info.LoadFileAppearances(path + @"Appearances" + Info.extension);

        //    //if (!Directory.Exists(path + @"\Channel\"))
        //    //    Directory.CreateDirectory(path + @"\Channel\");
        //    //DirectoryInfo dir = new DirectoryInfo(path + @"/Channel");
        //    //foreach (FileInfo file in dir.GetFiles())
        //    //{
        //    //    WebTVJSON webjson = LoadFileWebTVJSON(file.FullName);
        //    //    channel.Add(webjson);
        //    //}

        //    //channel.ForumList.Load(path + @"/Forum");

        //    return channel;
        //}












        //public static void Save(WebTV_Proprietary proprietary)//, string path)
        //{
        //    string path = address_WebTV + @"Proprietary\";
        //    if (!Directory.Exists(path))
        //        Directory.CreateDirectory(path);
        //    SerializationWriter SW = new SerializationWriter(path + proprietary.Name + Info.extension);
        //    SW.Start("Proprietary");
        //    //SW.WriteStartElement("Proprietary");
        //    SW.WriteVersion(0);

        //    SW.Write("Name", proprietary.Name);
        //    SW.Write("ImageUrl", proprietary.ImageUrl);
        //    SW.Write("BackGroundUrl", proprietary.BackGroundUrl);
        //    SW.Write("WebSite", proprietary.WebSite);
        //    SW.Write("Youtube", proprietary.Youtube);
        //    SW.Write("Facebook", proprietary.Facebook);
        //    SW.Write("Twitter", proprietary.Twitter);
        //    SW.Write("Google", proprietary.Google);
        //    SW.Write("Dailymotion", proprietary.Dailymotion);
        //    SW.Write("Vimeo", proprietary.Vimeo);
        //    SW.Write("Email", proprietary.Email);
        //    SW.Write("Description", proprietary.Description);


        //    //SW.WriteEndElement();
        //    SW.End();
        //}
        //public static WebTVJSON LoadFileWebTVJSON(string path)
        //{
        //    WebTVJSON webtvjson = new WebTVJSON();
        //    SerializationReader SR = new SerializationReader(path);
        //    SR.Read();
        //    SR.ReadDeclaration();
        //    SR.ReadStartElement();
        //    SR.ReadStartElement();
        //    int version = SR.ReadVersion();
        //    switch (version)
        //    {
        //        case 0:
        //            {
        //                webtvjson.Hourly.Title = SR.ReadString();
        //                webtvjson.Media.VideoPlayer = SR.ReadString();
        //                webtvjson.Media.Source = SR.ReadString();
        //                webtvjson.Media.Duration = SR.ReadInt();
        //                webtvjson.Media.StartSeconds = SR.ReadInt();
        //                webtvjson.Media.Quality = SR.ReadString();
        //                webtvjson.Hourly.Category = SR.ReadString();
        //                webtvjson.Hourly.Subcategory = SR.ReadString();
        //                webtvjson.Note.Like = SR.ReadInt();
        //                webtvjson.Note.Dislike = SR.ReadInt();
        //                webtvjson.Note.NumberView = SR.ReadInt();
        //                webtvjson.Hourly.Description = SR.ReadString();
        //                webtvjson.Hourly.ImageUrl = SR.ReadString();
        //                webtvjson.Hourly.BackGroundUrl = SR.ReadString();
        //                webtvjson.Social.WebSite = SR.ReadString();
        //                webtvjson.Social.Youtube = SR.ReadString();
        //                webtvjson.Social.Facebook = SR.ReadString();
        //                webtvjson.Social.Twitter = SR.ReadString();
        //                webtvjson.Social.Google = SR.ReadString();
        //                webtvjson.Social.Dailymotion = SR.ReadString();
        //                webtvjson.Social.Vimeo = SR.ReadString();
        //                webtvjson.Social.Email = SR.ReadString();
        //                break;
        //            }
        //    }
        //    SR.ReadEndElement();
        //    SR.Close();
        //    return webtvjson;
        //}


    }
}


namespace WebTV
{
    public class MsgJSON_WebTV : MessageJSON { public string ID = ""; public WebTVJSON WebTV = null; public MsgJSON_WebTV(string command, string id, WebTVJSON webtv) : base(command) { ID = id; WebTV = webtv; } }
    //public class WebTV_Media
    //{
    //    public string VideoPlayer = "Video";// Html5, Youtube, Dailymotion, vimeo, ect.. STREAMING WebCAM
    //    public string Source = "";
    //    public int Duration = 0;
    //    //public string[] Source = new string[0];
    //    public int StartSeconds = 0;
    //    public string Quality = "highres";//"large";
    //}
    //public class WebTV_Hourly
    //{
    //    public string Title = string.Empty;
    //    public DateJSON DateJSON = null;
    //    public string Category = string.Empty;
    //    public string Subcategory = string.Empty;
    //    public string Description = string.Empty;
    //    public string ImageUrl = string.Empty;
    //    public string BackGroundUrl = string.Empty;
    //}
    //public class WebTV_Note
    //{
    //    public int Like = 0;
    //    public int Dislike = 0;
    //    public int NumberView = 0;
    //    public int Error = 0;
    //}
    //public class WebTV_Social
    //{
    //    public string WebSite = string.Empty;
    //    public string Youtube = string.Empty;
    //    public string Facebook = string.Empty;
    //    public string Twitter = string.Empty;
    //    public string Google = string.Empty;
    //    public string Dailymotion = string.Empty;
    //    public string Vimeo = string.Empty;
    //    public string Email = string.Empty;
    //};

    public class WebTVJSON
    {
        public WebTV_Media Media = new WebTV_Media();
        public WebTV_Hourly Hourly = new WebTV_Hourly();
        //public WebTV_Note Note = new WebTV_Note();
        //public WebTV_Social Social = new WebTV_Social();

        public WebTVJSON() { }
        public WebTVJSON(string title, string media, string source, int duration) 
        {
            //Hourly.Title = title;
            Media.VideoPlayer = media;
            Media.Source = source;
            Media.Duration = duration;
        }
        public WebTVJSON(WebTVJSON webtvjson)
        {
            //Hourly = webtvjson.Hourly;
            ////Note = webtvjson.Note;
            ////Social = webtvjson.Social;
            //Media = new WebTV_Media();
            //Media.VideoPlayer = webtvjson.Media.VideoPlayer;
            //Media.Source = webtvjson.Media.Source;
            //Media.StartSeconds = (int)(new TimeSpan(DateTime.Now.Ticks - webtvjson.Hourly.DateJSON.Ticks + new TimeSpan(0, 0, webtvjson.Media.StartSeconds).Ticks).TotalSeconds);
            //Media.Duration = webtvjson.Media.Duration - Media.StartSeconds;
            //Media.Quality = webtvjson.Media.Quality;
        }
    }

    
    // Design pattern Singleton & Factory
    public static class Channels
    {

        //static WebTV_Channel[] WebTV_Channel = new WebTV_Channel[0];
        //public static void Add(WebTV_Channel channel)
        //{
        //    WebTV_Channel[] temp = new WebTV_Channel[WebTV_Channel.Length + 1];
        //    for (int i = 0; i < WebTV_Channel.Length; i++)
        //        temp[i] = WebTV_Channel[i];
        //    temp[Channel.Length] = channel;
        //    WebTV_Channel = temp;
        //}
        //public static WebTV_Channel Find(string name)
        //{
        //    for (int i = 0; i < WebTV_Channel.Length; i++)
        //        if (WebTV_Channel[i].Name == name)
        //            return WebTV_Channel[i];
        //    return null;
        //}











        public static void Start()
        {
            //CreateChannels();
            //CreateVideo();
            //LoadAndSave();
            //Hourlys.LoadWebTVJSON(Info.address_WebTVJSON);
            //Load();
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
        //public static void AddWebTV(string name, WebTVJSON webtvjson)
        //{
        //    Channel channel = Find(name);
        //    if (channel == null) return;
        //    channel.Add(webtvjson);
        //}
        //public static WebTVJSON FindChannel(string name)
        //{
            //Channel channel = Find(name);
            //if (channel == null) return null;
            //return channel.Find();
        //}
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
            //if (Directory.Exists(path))
            //{
            //    DirectoryInfo d = new DirectoryInfo(path);

            //    foreach (FileInfo f in d.GetFiles())
            //    {
            //        WebTVJSON webjson = LoadFileWebTVJSON(f.FullName);
            //        channel.Add(webjson);
            //    }
            //    foreach (DirectoryInfo dir in d.GetDirectories())
            //    {
            //        LoadAllDirectory(dir.FullName, channel);
            //    }
            //}
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
            //string path = Info.address_WebTV;
            //if (Directory.Exists(Info.address_WebTV))
            //{
            //    DirectoryInfo d = new DirectoryInfo(Info.address_WebTV);
            //    foreach (DirectoryInfo directory in d.GetDirectories())
            //    {
            //        if (directory.Name == "Translators")
            //        {
            //            foreach (FileInfo file in directory.GetFiles())
            //            {
            //                Translator translator = Info.LoadFileTranslator(file.FullName);
            //                Channels.Add(translator);
            //            }
            //        }
            //        else
            //        {
            //            path = directory.FullName + @"\";
            //            Channel channel = Load(path);
            //            if (channel != null)
            //                Add(channel);
            //        }
            //    }
            //}
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
        //public static Channel Load(string path)
        //{
        //    if (!File.Exists(path + @"Channel" + Info.extension)) return null;
        //    SerializationReader SR = new SerializationReader(path + @"Channel" + Info.extension);
        //    SR.Read();
        //    SR.ReadDeclaration();
        //    SR.ReadStartElement();
        //    Channel channel = new Channel();
        //    channel.Load(SR);
        //    SR.Close();

        //    channel.Appearances = Info.LoadFileAppearances(path + @"Appearances" + Info.extension);

        //    if (!Directory.Exists(path + @"\Channel\"))
        //        Directory.CreateDirectory(path + @"\Channel\");
        //    DirectoryInfo dir = new DirectoryInfo(path + @"/Channel");
        //    foreach (FileInfo file in dir.GetFiles())
        //    {
        //        WebTVJSON webjson = LoadFileWebTVJSON(file.FullName);
        //        //channel.Add(webjson);
        //    }

        //    channel.ForumList.Load(path + @"/Forum");

        //    return channel;
        //}














                
        public static void SaveFileWebTVJSON(WebTVJSON webtvjson, string path)
        {
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            //path += webtvjson.Hourly.Title + Info.extension;
            SerializationWriter SW = new SerializationWriter(path);
            SW.Start("Info");
            SW.WriteStartElement("WebTVJSON");
            SW.WriteVersion(0);

            //SW.Write("Title", webtvjson.Hourly.Title);
            //SW.Write("VideoPlayer", webtvjson.Media.VideoPlayer);
            //SW.Write("Source", webtvjson.Media.Source);
            //SW.Write("Duration", webtvjson.Media.Duration);
            //SW.Write("StartSeconds", webtvjson.Media.StartSeconds);
            //SW.Write("Quality", webtvjson.Media.Quality);
            //SW.Write("Category", webtvjson.Hourly.Category);
            //SW.Write("Subcategory", webtvjson.Hourly.Subcategory);
            //SW.Write("Like", webtvjson.Note.Like);
            //SW.Write("Dislike", webtvjson.Note.Dislike);
            //SW.Write("NumberView", webtvjson.Note.NumberView);
            //SW.Write("Description", webtvjson.Hourly.Description);
            //SW.Write("ImageUrl", webtvjson.Hourly.ImageUrl);
            //SW.Write("BackGroundUrl", webtvjson.Hourly.BackGroundUrl);
            //SW.Write("WebSite", webtvjson.Social.WebSite);
            //SW.Write("Youtube", webtvjson.Social.Youtube);
            //SW.Write("Facebook", webtvjson.Social.Facebook);
            //SW.Write("Twitter", webtvjson.Social.Twitter);
            //SW.Write("Google", webtvjson.Social.Google);
            //SW.Write("Dailymotion", webtvjson.Social.Dailymotion);
            //SW.Write("Vimeo", webtvjson.Social.Vimeo);
            //SW.Write("Email", webtvjson.Social.Email);
 

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
                        //webtvjson.Hourly.Title = SR.ReadString();
                        //webtvjson.Media.VideoPlayer = SR.ReadString();
                        //webtvjson.Media.Source = SR.ReadString();
                        //webtvjson.Media.Duration = SR.ReadInt();
                        //webtvjson.Media.StartSeconds = SR.ReadInt();
                        //webtvjson.Media.Quality = SR.ReadString();
                        //webtvjson.Hourly.Category = SR.ReadString();
                        //webtvjson.Hourly.Subcategory = SR.ReadString();
                        //webtvjson.Note.Like = SR.ReadInt();
                        //webtvjson.Note.Dislike = SR.ReadInt();
                        //webtvjson.Note.NumberView = SR.ReadInt();
                        //webtvjson.Hourly.Description = SR.ReadString();
                        //webtvjson.Hourly.ImageUrl = SR.ReadString();
                        //webtvjson.Hourly.BackGroundUrl = SR.ReadString();
                        //webtvjson.Social.WebSite = SR.ReadString();
                        //webtvjson.Social.Youtube = SR.ReadString();
                        //webtvjson.Social.Facebook = SR.ReadString();
                        //webtvjson.Social.Twitter = SR.ReadString();
                        //webtvjson.Social.Google = SR.ReadString();
                        //webtvjson.Social.Dailymotion = SR.ReadString();
                        //webtvjson.Social.Vimeo = SR.ReadString();
                        //webtvjson.Social.Email = SR.ReadString();
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
        //public void Add(WebTVJSON tv)
        //{
        //    if (TV.Length == 0) tv.Hourly.DateJSON = new DateJSON(DateTime.Now);
        //    else tv.Hourly.DateJSON = new DateJSON(TV[TV.Length - 1].Hourly.DateJSON.DateTime + new TimeSpan(0, 0, TV[TV.Length - 1].Media.Duration));

        //    WebTVJSON[] temp = new WebTVJSON[TV.Length + 1];
        //    for (int i = 0; i < TV.Length; i++)
        //        temp[i] = TV[i];

        //    temp[TV.Length] = tv;
        //    TV = temp;
        //}
        public WebTVJSON Find()
        {
            //long time = DateTime.Now.Ticks;
            //for (int i = 0; i < TV.Length; i++)
            //    if (TV[i].Hourly.DateJSON.Ticks + new TimeSpan(0, 0, TV[i].Media.Duration).Ticks > time)
            //        return new WebTVJSON(TV[i]);
            return null;
        }
        //public WebTVJSON FindNext()
        //{
        //    long time = DateTime.Now.Ticks;
        //    for (int i = 0; i < TV.Length; i++)
        //        if (TV[i].Hourly.DateJSON.Ticks > time)
        //            return TV[i];
        //    return null;
        //}
        //public WebTVJSON FindTitle(string title)
        //{
        //    for (int i = 0; i < TV.Length; i++)
        //        if (TV[i].Hourly.Title == title)
        //            return TV[i];
        //    return null;
        //}

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
