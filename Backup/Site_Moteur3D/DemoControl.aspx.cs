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

using Core.Utility;
using System.Drawing;
namespace Core
{
    public partial class DemoControl : PageBase
    {
        //protected override void Page_Load(object sender, EventArgs e)
        //{
        //    base.Page_Load(sender, e);
        //}

        public override void CallPage(string[] str)
        {
            base.CallPage(str);
            //if (str[0] == "HOME")
            //    Home(str);
        }
        //public void Home(string[] str)
        //{
        //    Redirect("Default.aspx");
        //}
    }
}
