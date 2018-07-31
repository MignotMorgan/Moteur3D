using System;
using System.Web.UI;
using Core.Utility;

//Placer PathFinding dans cube, Info.PathFinding_Case = false; (crée un pathfinding sur chaques cases).  Entity.PathFinding_Case = false; (utilise ou non le pathfinding de la case).
//Creer tous les Pathfinding de la Map dans une liste. Pathfinding[]
//Verif Direction() + ID() + Line()
// EntityList == Container!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Fichier JavaScript telecharger dynamiquement. + Fichier Javascript sur l'ordi client(ex : interface).
//Map.ScreenAnimation : Save & Load ScreenAnimation

namespace Core
{
    public partial class PageBase : System.Web.UI.Page, ICallbackEventHandler
    {
        public PageInfo PageInfo = null;

        protected virtual void Page_Load(object sender, EventArgs e)
        {
            String CallBackReference = Page.ClientScript.GetCallbackEventReference(this, "arg", "ResponseServer", "context", "ResponseServerError", true);
            String FunctionJavaScript = "function CallServer(arg,context){" + CallBackReference + ";}";
            Page.ClientScript.RegisterClientScriptBlock(GetType(), "CallServer", FunctionJavaScript, true);

            if (PageInfo == null)
                FindPageInfo();

            if (!IsPostBack)
                Init_Hidden();
        }
        protected string CurrentIP()
        {
            //return HttpContext.Current.Request.UserHostAddress;
            return Context.Request.UserHostAddress;
        }
        protected int StringToInt(string str)
        {
            if (str == "" || str == "undefined" || str == null) return 0;
            return int.Parse(str);
        }
        protected float StringToFloat(string str)
        {
            if (str == "" || str == "undefined" || str == null) return 0;
            return Convert.ToSingle(str, new System.Globalization.CultureInfo("en-US"));
        }
        protected double StringToDouble(string str)
        {
            if (str == "" || str == "undefined" || str == null) return 0;
            return Convert.ToSingle(str, new System.Globalization.CultureInfo("en-US"));
        }
        protected bool StringToBool(string str)
        {
            return str == "true" || str == "True";
        }
        protected virtual void Redirect(string url) { Add(new MsgJSON_String("REDIRECT", url)); }
        protected virtual PageInfo CreatePageInfo() { return new PageInfo(); }
        protected virtual void FindPageInfo()
        {
            string id = Session["ID"] as string;

            if (id != null)
                PageInfo = Univers.FindGameInfo(id);

            if (PageInfo == null)
            {
                PageInfo = CreatePageInfo();
                PageInfo.ID = Info.Random.Next().ToString();
                Session["ID"] = PageInfo.ID;
                Univers.Add(PageInfo);

                //Supprimer!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                PageInfo.Templates = Info.TemplatesImages;
                PageInfo.Animations = Animations.List;
            }
        }
        protected virtual void SendChats() { Add(new MsgJSON_Chats("CHAT", new Chat[] { Chat.Default })); }
        protected virtual void SendPlayAnimations(Animation animation) { SendPlayAnimations(new Animation[]{animation}); }
        protected virtual void SendPlayAnimations(Animation[] animations) { Add(new MsgJSON_PlayAnimations(animations)); }

        public MessageJSON[] Messages = new MessageJSON[0];
        public void Add(MessageJSON msg)
        {
            MessageJSON[] temp = new MessageJSON[Messages.Length + 1];
            for (int i = 0; i < Messages.Length; i++)
                temp[i] = Messages[i];

            temp[Messages.Length] = msg;
            Messages = temp;
        }
        public string GetCallbackResult() { return Info.JSONSerialize(Messages); }
        public void RaiseCallbackEvent(string eventArgument)
        {
            //Chercher la date de reception du message!!!!!!!!!!!!!!
            if (eventArgument == null) return;
            string[] str = eventArgument.Split(PageInfo.Separator);

            if (str[0] == "LOOP")
                Loop(str);
            else if (str[0] == "HOME")
                Home(str);
            else if (str[0] == "LATENCE")
                Latence(str);
            else if (str[0] == "CHAT")
                OnChat(str);
            else if (str[0] == "LOADPAGEINFO")
                LoadPageInfo(str);
            else if (str[0] == "APPEARANCE")
                Appearance(str);
            else
                CallPage(str);
        }
        public virtual void CallPage(string[] str)
        {
            PageInfo.LastAction = DateTime.Now;
        }
        public virtual void Loop(string[] str)
        {
            SendChats();
            Add(new MessageJSON("LOOP"));
        }
        public virtual void Home(string[] str)
        {
            Redirect("Default.aspx");
        }
        public virtual void Latence(string[] str)
        {
            if (str.Length < 2) return;
            Add(new MsgJSON_String(str[0], str[1]));
        }
        public virtual void OnChat(string[] str)
        {
            if (str.Length < 3) return;
            ChatText chat = new ChatText();
            chat.Name = str[1];
            chat.Text = str[2];
            Chat.Default.Add(chat);
            SendChats();
        }
        public virtual void LoadPageInfo(string[] str)
        {
            if (str.Length < 3) return;
            string keyword = str[1];
            int index = StringToInt(str[2]);
            if (PageInfo == null) return;
            if (keyword == "TRANSLATORS")
                Add(new MsgJSON_Object(keyword, PageInfo.Translators[index]));
            else if (keyword == "ANIMATIONS")
                Add(new MsgJSON_Object(keyword, PageInfo.Animations[index]));
            else if (keyword == "TEMPLATES")
                Add(new MsgJSON_Object(keyword, PageInfo.Templates[index]));
        }
        public virtual void Appearance(string[] str)
        {
            if (str.Length < 2) return;
            string name = str[1];
            Add(new MsgJSON_Object("APPEARANCE", new Appearances_Default()));
        }
        public virtual void Init_Hidden()
        {
            if (PageInfo == null) { Response.Redirect("~/Default.aspx"); }
            Page.ClientScript.RegisterHiddenField("PageInfo", Info.JSONSerialize(PageInfo.JSON));
            Page.ClientScript.RegisterHiddenField("Appearance", Info.JSONSerialize(new Appearances_Default()));
            Page.ClientScript.RegisterHiddenField("ScreenLoad", Info.JSONSerialize(ScreenAnimation.Loaded()));
        }
    }
}