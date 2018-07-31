using System;
using System.IO;
using Core;
using Core.Utility;
using Forum;


namespace WebTV
{
    public class HouryJSON
    {
        public string Title = string.Empty;
        public string Category = string.Empty;
        public string Subcategory = string.Empty;
        public DateJSON DateJSON = null;
        public int Duration = 0;
    }
    
    


    public class Hourlys
    {



        public static WebTVJSON[] WebTVJSON = new WebTVJSON[0];
        public static void Add(WebTVJSON tv)
        {
            WebTVJSON[] temp = new WebTVJSON[WebTVJSON.Length + 1];
            for (int i = 0; i < WebTVJSON.Length; i++)
                temp[i] = WebTVJSON[i];

            temp[WebTVJSON.Length] = tv;
            WebTVJSON = temp;
        }


        public static void LoadWebTVJSON(string path)
        {
            if (Directory.Exists(path))
            {
                DirectoryInfo d = new DirectoryInfo(path);

                foreach (FileInfo f in d.GetFiles())
                {
                    WebTVJSON webjson = Channels.LoadFileWebTVJSON(f.FullName);
                    Add(webjson);
                }
                foreach (DirectoryInfo dir in d.GetDirectories())
                {
                    LoadWebTVJSON(dir.FullName);
                }
            }
        }

    }
}
