using System;
using Core;
using Core.Utility;

namespace WebTV
{
    public class WebTVInfoJSON : PageInfoJSON
    {
        public string Channel = string.Empty;

        public WebTVInfoJSON(WebTVInfo webtvinfo)
            : base(webtvinfo)
        {
            Channel = webtvinfo.Channel;
        }
    }

    public class WebTVInfo : PageInfo
    {
        public string Channel = "Variety";
        public WebTVInfo()
            : base()
        {
            Frame = new RectangleJSON(50, 50, 1000, 550);
            Translators = Channels.Translators;
        }
        public override PageInfoJSON CreateJSON() { return new WebTVInfoJSON(this); }
    }

}
