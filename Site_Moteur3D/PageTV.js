//Temporaire
WebTV_Channel = null;
WebTV_Hourly = null;
WebTV_Media = null;
WebTV_Proprietary = null;

//
var WebTV = null;
var WebTV_Design = null;
var WebTV_Horizontal = null;
var WebTV_Vertical = null;
var WebTV_Info = null;


var Load = function()
{

//    var tag = document.createElement('script');
//    tag.src = "https://www.youtube.com/iframe_api";
//    var firstScriptTag = document.getElementsByTagName('script')[0];
//    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var windowsize = WindowSize();
    var w = (windowsize.Width-PageInfo.Frame.X)/3;
    PageInfo.Frame.Height = windowsize.Height-PageInfo.Frame.Y;
    if( w > 400)
    {
        PageInfo.Frame.Width = w*2;
        WebTV_Info = new FormInfo(PageInfo.Frame.X+PageInfo.Frame.Width, PageInfo.Frame.Y, w, PageInfo.Frame.Height, 5);
    }
    else
    {
        ContactDown = true;
        PageInfo.Frame.Width = windowsize.Width-PageInfo.Frame.X -20;
        WebTV_Info = new FormInfo(PageInfo.Frame.X, PageInfo.Frame.Y+PageInfo.Frame.Height, PageInfo.Frame.Width, PageInfo.Frame.Height, 5);
    }

    WebTV = new ControlVideo(PageInfo.Frame.X, PageInfo.Frame.Y, PageInfo.Frame.Width, PageInfo.Frame.Height, "Video01", 10);
    WebTV.OnWebTV_Change = function(){ WebTV_Info.WebTVSocial.OnWebTVJSON(this.WebTVJSON); };
    WebTV.ResizeEnd = function(){OnResize();}

    WebTV_Design = new FormDesign(0, 0, PageInfo.Frame.X, PageInfo.Frame.Y);

    WebTV_Horizontal = new FormHorizontal(PageInfo.Frame.X, 0, PageInfo.Frame.Width, PageInfo.Frame.Y);
    FormBase = WebTV_Horizontal;

    WebTV_Vertical = new FormVertical(0, PageInfo.Frame.Y, PageInfo.Frame.X, PageInfo.Frame.Height);

    WebTV.Volume = 50;
    WebTV_Vertical.Bar_Sound.SetValue(0.5);
    WebTV.CallChannelTV("Variety");
};
var ContactDown = false;
function ReOrganize()
{
    if(ContactDown)return;
    var windowsize = WindowSize();
    var w = (windowsize.Width-PageInfo.Frame.X)/3;
    if(WebTV_Info.Reduce.Active) PageInfo.Frame.Width = w*2;
    else PageInfo.Frame.Width = windowsize.Width-PageInfo.Frame.X;
    WebTV_Info.Reducing();
    WebTV.ResizeTo(PageInfo.Frame.Width, WebTV.Frame.Height);
};

var ResponsePage = function(message)
{
    if(message.COMMAND == "WEBTV")
    {
        WebTV_Media = message.Value;
        OnWebTV(message.ID, message.Value);
        //OnWebTV(message.ID, message.WebTV);
    }
    else if(message.COMMAND == "WEBTVNEXT")
    {
        OnWebTVNext(message.ID, message.Value);
        //OnWebTVNext(message.ID, message.WebTV);
    }
    else if(message.COMMAND == "CHANNEL")
    {
        WebTV_Channel = message.Value;
        FindAppearance(WebTV_Channel.Name);


        //************************
        //CallPage("FORUM_LOAD", message.Text);
        //FindAppearance(message.Text);
        //CallPage("HOURLY", message.Text);
    }
    else if(message.COMMAND == "HOURLY")
    {
        WebtV_Hourly = message.Value;
        WebTV_Info.WebTVHourly.OnHourly(WebtV_Hourly);


        //***********************
        //WebTV_Info.WebTVHourly.OnHourly(message.Value);
    }
    else if (message.COMMAND == "PROPRIETARY")
    {
        WebTV_Proprietary = message.Value;
    }
    else if (message.COMMAND == "FORUM") {
        WebTV_Info.Forum.OnRemplace(message.Forum);
    }
}; 

function OnResize()
{
    var w = WebTV.Frame.Width / WebTV_Horizontal.Frame.Width;
    var h = WebTV.Frame.Height / WebTV_Vertical.Frame.Height;

    WebTV_Horizontal.ScaleTo(w, 1);
    WebTV_Vertical.ScaleTo(1, h);
};

function FormDesign(x, y, width, height, border)
{
    this.InheritClass = Form;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("FormDesign");

    this.CanMove = false;
    this.CanResize = false;
    this.CanScale = false;
};

function FormVertical(x, y, width, height, border)
{
    this.InheritClass = Form;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("FormVertical");

    this.CanMove = false;

var es = 5;
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = height-this.Border.Top-this.Border.Bottom;

    this.Bar_WebTV = new Menu_WebTV(cx, cy, cw, ch);
    this.Add(this.Bar_WebTV);

    this.Bar_Sound = new Menu_Sound(cx, cy, cw, ch);
    this.Bar_Sound.SliderMove = function(){ WebTV.SetVolume(this.CurrentValue()); };
    this.Bar_Sound.Hide();
    this.Add(this.Bar_Sound);

    this.Bar_Speed = new Menu_Speed(cx, cy, cw, ch);
    this.Bar_Speed.Hide();
    this.Add(this.Bar_Speed);

    this.Bar_Quality = new Menu_Quality(cx, cy, cw, ch);
    this.Bar_Quality.Hide();
    this.Add(this.Bar_Quality);

    this.BarHide = function()
    {
        if(this.Bar_WebTV.Visible) this.Bar_WebTV.Hide();
        if(this.Bar_Sound.Visible) this.Bar_Sound.Hide();
        if(this.Bar_Speed.Visible) this.Bar_Speed.Hide();
        if(this.Bar_Quality.Visible) this.Bar_Quality.Hide();
    };
};

function FormHorizontal(x, y, width, height, border)
{
    this.InheritClass = Form;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("FormHorizontal");

    this.CanMove = false;

var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = height-this.Border.Top-this.Border.Bottom-5-Appearance.TextBox.FontHeight;
var cw = width;

    this.Bar_Channel = new Menu_Channel(cx, cy, cw, ch);
    this.Add(this.Bar_Channel);

cy += ch;
    this.Bar_Hover = new Control(cx, cy, cw, Appearance.TextBox.FontHeight);
    this.Bar_Hover.Controls = new Array();
    this.Bar_Hover.Draw = function(x, y, width, height, context)
    {
        if(MouseHover.Control != null && MouseHover.Control.Info != "")
            context.fillText(MeasureText(Translate(MouseHover.Control.Info), width, context), x, y+Appearance.TextBox.FontHeight);
        else if(this.GetText() != "")
            context.fillText(MeasureText(Translate(this.GetText()), width, context), x, y+Appearance.TextBox.FontHeight);
    };
    this.Add(this.Bar_Hover);

    this.Draw = function(x, y, width, height, context)
    {
        if(WebTV.WebTVJSON != null)
        {
            context.fillStyle = "red";
            context.fillRect(x, height-5, width, 5);
            context.fillStyle = "orange";
            context.fillRect(x, height-5, width * WebTV.GetVideoLoaded(), 5);
            context.fillStyle = "green";
            context.fillRect(x, height-5, width *( WebTV.GetCurrentTime()/WebTV.WebTVJSON.Media.Duration ), 5);

            Interface_Default(context);
        }
    };
};

function Menu_Channel(x, y, width, height, border)
{
    this.InheritClass = ControlCollection_Horizontal;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("Menu_Channel");

var es = 5;
var cx = 0;
var cy = 0;
var cw = 100; //width-this.Border.Left-this.Border.Right;//
var ch = height-this.Border.Top-this.Border.Bottom;

    this.Btn_Variety = new Control(cx, cy, cw, ch);
    this.Btn_Variety.ClickLeft = function(){WebTV.CallChannelTV("Variety");};
    this.AddCollection(this.Btn_Variety);
    this.Btn_Variety.SetText("Variety");

    this.Btn_Tuto = new Control(cx, cy, cw, ch);
    this.Btn_Tuto.ClickLeft = function(){WebTV.CallChannelTV("TutorialTV");};
    this.AddCollection(this.Btn_Tuto);
    this.Btn_Tuto.SetText("TutorialTV");

    this.Btn_InforMedia = new Control(cx, cy, cw, ch);
    this.Btn_InforMedia.ClickLeft = function(){WebTV.CallChannelTV("Informavie");};
    this.AddCollection(this.Btn_InforMedia);
    this.Btn_InforMedia.SetText("Informavie");

    this.Btn_ManGame = new Control(cx, cy, cw, ch);
    this.Btn_ManGame.ClickLeft = function(){WebTV.CallChannelTV("Mangameek");};
    this.AddCollection(this.Btn_ManGame);
    this.Btn_ManGame.SetText("Mangameek");

    this.Btn_Mystravely = new Control(cx, cy, cw, ch);
    this.Btn_Mystravely.ClickLeft = function(){WebTV.CallChannelTV("Mystravely");};
    this.AddCollection(this.Btn_Mystravely);
    this.Btn_Mystravely.SetText("Mystravely");
};

function Menu_WebTV(x, y, width, height, border)
{
    this.InheritClass = ControlCollection;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("Menu_WebTV");

var es = 5;
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = cw;//height-this.Border.Top-this.Border.Bottom;

    this.Btn_Home = new Control(cx, cy, cw, ch);
    this.Btn_Home.ClickLeft = function(){ CallPage("HOME", ''); };
    this.AddCollection(this.Btn_Home);
    this.Btn_Home.SetText("Home");

    this.Btn_Refresh = new Control(cx, cy, cw, ch);
    this.Btn_Refresh.ClickLeft = function(){ WebTV.CallChannelTV(); };
    this.AddCollection(this.Btn_Refresh);
    this.Btn_Refresh.SetText("Refresh");

    this.Btn_FullScreen = new Control(cx, cy, cw, ch);
    this.Btn_FullScreen.ClickLeft = function()
    {
        if(Control_IsFullScreen()) Control_ExitFullScreen();
        else WebTV.OnFullScreen();
    };
    this.AddCollection(this.Btn_FullScreen);
    this.Btn_FullScreen.SetText("[]");

    this.Btn_Sound = new Control(cx, cy, cw, ch);
    this.Btn_Sound.ClickLeft = function(){ WebTV_Vertical.BarHide(); WebTV_Vertical.Bar_Sound.Show(); };
    this.AddCollection(this.Btn_Sound);
    this.Btn_Sound.SetText("Sound");

    this.Btn_Speed = new Control(cx, cy, cw, ch);
    this.Btn_Speed.ClickLeft = function(){ WebTV_Vertical.BarHide(); WebTV_Vertical.Bar_Speed.Show(); };
    this.AddCollection(this.Btn_Speed);
    this.Btn_Speed.SetText("Speed");

    this.Btn_Quality = new Control(cx, cy, cw, ch);
    this.Btn_Quality.ClickLeft = function(){ WebTV_Vertical.BarHide(); WebTV_Vertical.Bar_Quality.Show(); };
    this.AddCollection(this.Btn_Quality);
    this.Btn_Quality.SetText("Quality");

    this.Btn_Menu = new Control(cx, cy, cw, ch);
    this.Btn_Menu.ClickLeft = function(){ ReOrganize(); };
    this.AddCollection(this.Btn_Menu);
    this.Btn_Menu.SetText("-->");
};

function Menu_Sound(x, y, width, height, border)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("Menu_Sound");
 
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = cw;
var es = 5;

    this.Btn_Menu = new Control(cx, cy, cw, ch);
    this.Btn_Menu.ClickLeft = function(){ WebTV_Vertical.BarHide(); WebTV_Vertical.Bar_WebTV.Show(); };
    this.Add(this.Btn_Menu);
    this.Btn_Menu.SetText("<-");
cy += ch+es;
    this.Btn_Maximum = new Control(cx, cy, cw, ch);
    this.Btn_Maximum.ClickLeft = function(){this.Parent.Btn_Slider.SetValue(1);};
    this.Add(this.Btn_Maximum);
cy += ch+es;
var slideHeight = height-this.Border.Top-this.Border.Bottom - ((ch+es)*3);
    this.Btn_Slider = new ControlSlider_Vertical(cx, cy, cw, slideHeight);
    this.Btn_Slider.SliderMove = function(){ this.Btn_Cursor.SetText(this.CurrentValue());  this.Parent.SliderMove();};
    this.Add(this.Btn_Slider);
cy = height-this.Border.Top-this.Border.Bottom-ch;
    this.Btn_Mute = new Control(cx, cy, cw, ch);
    this.Btn_Mute.ClickLeft = function(){ this.Parent.Btn_Slider.SetValue(0); };
    this.Add(this.Btn_Mute);

    this.CurrentPurcentValue = function(){return this.Btn_Slider.CurrentPurcentValue();};
    this.CurrentValue = function(){return this.Btn_Slider.CurrentValue();};
    this.SetValue = function(ratio){this.Btn_Slider.SetValue(ratio);};
    this.SliderMove = function(){};
};

function Menu_Speed(x, y, width, height, border)
{
    this.InheritClass = ControlCollection;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("Menu_Speed");
 
var es = 5;
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = cw;//height-this.Border.Top-this.Border.Bottom;

    this.Btn_Menu = new Control(cx, cy, ch, ch);
    this.Btn_Menu.ClickLeft = function(){ WebTV_Vertical.BarHide(); WebTV_Vertical.Bar_WebTV.Show(); };
    this.AddCollection(this.Btn_Menu);
    this.Btn_Menu.SetText("<-");

    this.Btn_Speed_025 = new Control(cx, cy, cw, ch);
    this.Btn_Speed_025.ClickLeft = function(){ WebTV.Speed(0.25); };
    this.AddCollection(this.Btn_Speed_025);
    this.Btn_Speed_025.SetText("0.25");

    this.Btn_Speed_05 = new Control(cx, cy, cw, ch);
    this.Btn_Speed_05.ClickLeft = function(){ WebTV.Speed(0.5); };
    this.AddCollection(this.Btn_Speed_05);
    this.Btn_Speed_05.SetText("0.5");

    this.Btn_Speed_1 = new Control(cx, cy, cw, ch);
    this.Btn_Speed_1.ClickLeft = function(){ WebTV.Speed(1); };
    this.AddCollection(this.Btn_Speed_1);
    this.Btn_Speed_1.SetText("1");

    this.Btn_Speed_125 = new Control(cx, cy, cw, ch);
    this.Btn_Speed_125.ClickLeft = function(){ WebTV.Speed(1.25); };
    this.AddCollection(this.Btn_Speed_125);
    this.Btn_Speed_125.SetText("1.25");

    this.Btn_Speed_15 = new Control(cx, cy, cw, ch);
    this.Btn_Speed_15.ClickLeft = function(){ WebTV.Speed(1.5); };
    this.AddCollection(this.Btn_Speed_15);
    this.Btn_Speed_15.SetText("1.5");

    this.Btn_Speed_2 = new Control(cx, cy, cw, ch);
    this.Btn_Speed_2.ClickLeft = function(){ WebTV.Speed(2); };
    this.AddCollection(this.Btn_Speed_2);
    this.Btn_Speed_2.SetText("2");
};

function Menu_Quality(x, y, width, height, border)
{
    this.InheritClass = ControlCollection;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("Menu_Quality");
 
var es = 5;
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = cw;//height-this.Border.Top-this.Border.Bottom;

    this.Btn_Menu = new Control(cx, cy, ch, ch);
    this.Btn_Menu.ClickLeft = function(){ WebTV_Vertical.BarHide(); WebTV_Vertical.Bar_WebTV.Show(); };
    this.AddCollection(this.Btn_Menu);
    this.Btn_Menu.SetText("<-");

    this.Btn_Quality_Auto = new Control(cx, cy, cw, ch);
    this.Btn_Quality_Auto.ClickLeft = function(){ WebTV.Quality('default'); };
    this.AddCollection(this.Btn_Quality_Auto);
    this.Btn_Quality_Auto.SetText("Auto");

    this.Btn_Quality_Small = new Control(cx, cy, cw, ch);
    this.Btn_Quality_Small.ClickLeft = function(){ WebTV.Quality('small'); };
    this.AddCollection(this.Btn_Quality_Small);
    this.Btn_Quality_Small.SetText("Small");

    this.Btn_Quality_Medium = new Control(cx, cy, cw, ch);
    this.Btn_Quality_Medium.ClickLeft = function(){ WebTV.Quality('medium'); };
    this.AddCollection(this.Btn_Quality_Medium);
    this.Btn_Quality_Medium.SetText("Medium");

    this.Btn_Quality_Large = new Control(cx, cy, cw, ch);
    this.Btn_Quality_Large.ClickLeft = function(){ WebTV.Quality('large'); };
    this.AddCollection(this.Btn_Quality_Large);
    this.Btn_Quality_Large.SetText("Large");

    this.Btn_Quality_HD720 = new Control(cx, cy, cw, ch);
    this.Btn_Quality_HD720.ClickLeft = function(){ WebTV.Quality('hd720'); };
    this.AddCollection(this.Btn_Quality_HD720);
    this.Btn_Quality_HD720.SetText("HD720");

    this.Btn_Quality_HD1080 = new Control(cx, cy, cw, ch);
    this.Btn_Quality_HD1080.ClickLeft = function(){ WebTV.Quality('hd1080'); };
    this.AddCollection(this.Btn_Quality_HD1080);
    this.Btn_Quality_HD1080.SetText("HD1080");

    this.Btn_Quality_HighRes = new Control(cx, cy, cw, ch);
    this.Btn_Quality_HighRes.ClickLeft = function(){ WebTV.Quality('highres'); };
    this.AddCollection(this.Btn_Quality_HighRes);
    this.Btn_Quality_HighRes.SetText("HighRes");
};

function FormInfo(x, y, width, height, border)
{
    this.InheritClass = Form;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("FormInfo");

    this.CanMove = false;
    this.CanResize = false;
    this.CanScale = false;

var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = 25;// height-this.Border.Top-this.Border.Bottom;

    this.MenuInfo = new Menu_Info(cx, cy, cw, ch);
    this.Add(this.MenuInfo);
cy += ch;
ch = height-this.Border.Top-this.Border.Bottom-ch;
    this.Forum = new ForumControl(cx, cy, cw, ch);
    this.Forum.CanMove = false;
    this.Forum.CanResize = false;
    this.Add(this.Forum);

    this.WebTVHourly = new CollectionWebTVHourly(cx, cy, cw, ch);
    this.WebTVHourly.CanMove = false;
    this.WebTVHourly.CanResize = false;
    this.Add(this.WebTVHourly);

    this.WebTVSocial = new ControlWebTVDescription(cx, cy, cw, ch);
    this.WebTVSocial.CanMove = false;
    this.WebTVSocial.CanResize = false;
    this.Add(this.WebTVSocial);

    this.MenuHide = function()
    {
        this.Forum.Hide();
        this.WebTVHourly.Hide();
        this.WebTVSocial.Hide();
    };
};

function Menu_Info(x, y, width, height, border)
{
    this.InheritClass = ControlCollection_Horizontal;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("Menu_Info");

var es = 5;
var cx = 0;
var cy = 0;
var cw = 75; //width-this.Border.Left-this.Border.Right;//
var ch = height-this.Border.Top-this.Border.Bottom;

    this.Btn_Description = new Control(cx, cy, cw, ch);
    this.Btn_Description.ClickLeft = function(){ WebTV_Info.MenuHide(); WebTV_Info.WebTVSocial.Show(); };
    this.AddCollection(this.Btn_Description);
    this.Btn_Description.SetText("Description");

    this.Btn_Hourly = new Control(cx, cy, cw, ch);
    this.Btn_Hourly.ClickLeft = function(){ WebTV_Info.MenuHide(); WebTV_Info.WebTVHourly.Show(); };
    this.AddCollection(this.Btn_Hourly);
    this.Btn_Hourly.SetText("Hourly");

    this.Btn_Forum = new Control(cx, cy, cw, ch);
    this.Btn_Forum.ClickLeft = function(){ WebTV_Info.MenuHide(); WebTV_Info.Forum.Show(); };
    this.AddCollection(this.Btn_Forum);
    this.Btn_Forum.SetText("Forum");

    this.Btn_Contact = new Control(cx, cy, cw, ch);
//    this.Btn_Contact.ClickLeft = function(){ WebTV.Speed(0.25); };
    this.AddCollection(this.Btn_Contact);
    this.Btn_Contact.SetText("Contact");

    this.Btn_Chat = new Control(cx, cy, cw, ch);
//    this.Btn_Chat.ClickLeft = function(){ WebTV.Speed(1); };
    this.AddCollection(this.Btn_Chat);
    this.Btn_Chat.SetText("Chat");

    this.Btn_FAQ = new Control(cx, cy, cw, ch);
//    this.Btn_FAQ.ClickLeft = function(){ WebTV.Speed(1.25); };
    this.AddCollection(this.Btn_FAQ);
    this.Btn_FAQ.SetText("FAQ");
};

function CollectionWebTVHourly(x, y, width, height, border)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ControlWebTVHourly");

    this.Ctrl_Hourly = new ControlHourly(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, 200);// this.Rectangle.Height-this.Border.Top-this.Border.Bottom);
    this.Add(this.Ctrl_Hourly);
    this.HourlyCollection = new ControlCollection(0, 200, this.Rectangle.Width-this.Border.Left-this.Border.Right, this.Rectangle.Height-this.Border.Top-this.Border.Bottom-200);
    this.Add(this.HourlyCollection);
    
    this.OnHourly = function(hourlys)
    {
        this.HourlyCollection.Clear();
        for(var i = 0; i < hourlys.length; i++)
        {
            var control = new ControlHourly_Min(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, Appearance.TextBox.FontHeight);
            control.OnHourly(hourlys[i]);
            this.HourlyCollection.AddCollection(control);
        }
        this.Ctrl_Hourly.OnHourly(WebTV.WebTVJSON.Hourly);
    };
};

function ControlHourly_Min(x, y, width, height, border)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ControlHourly_Min");

    this.Hourly =null;
 
var es = 5;
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = height-this.Border.Top-this.Border.Bottom;

    this.Txt_Date = new TextBox(cx, cy, 50, ch);
    this.Txt_Date.ReadOnly = true;
    this.Txt_Date.Enabled = false;
    this.Add(this.Txt_Date);
cx += 50+es;
    this.Txt_Title = new TextBox(cx, cy, cw-cx, ch);
    this.Txt_Title.ReadOnly = true;
    this.Txt_Title.Enabled = false;
    this.Add(this.Txt_Title);

    this.OnHourly = function(hourly)
    {
        this.Hourly = hourly;
        this.Txt_Date.SetText(hourly.DateJSON.Hour +":"+ hourly.DateJSON.Minute);
        this.Txt_Title.SetText(hourly.Title);
    };
    this.OnHourlyEnter = function(){ WebTV_Info.WebTVHourly.Ctrl_Hourly.OnHourly(this.Hourly); };
    this.OnHourlyLeave = function(){ WebTV_Info.WebTVHourly.Ctrl_Hourly.OnHourly(WebTV.WebTVJSON.Hourly); };
    this.OnMouseEnter = function(){ this.OnHourlyEnter(); };
    this.OnMouseLeave = function(){ this.OnHourlyLeave(); };
    this.DrawUp = function(x, y, width, height, context)
    {
        if(this.Hourly.Title == WebTV.WebTVJSON.Hourly.Title && this.Hourly.DateJSON.Hour == WebTV.WebTVJSON.Hourly.DateJSON.Hour && this.Hourly.DateJSON.Minute == WebTV.WebTVJSON.Hourly.DateJSON.Minute)
        {
            context.fillStyle = "rgba(125, 125, 125, 0.5)";
            context.fillRect(x, y, width, height);
        }
    };
};

function ControlHourly(x, y, width, height, border)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ControlHourly");
 
var es = 5;
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = Appearance.TextBox.FontHeight;// height-this.Border.Top-this.Border.Bottom;

    this.Txt_Date = new TextBox(cx, cy, 50, ch);
    this.Txt_Date.ReadOnly = true;
    this.Add(this.Txt_Date);
cx += 50+es;
    this.Txt_Title = new TextBox(cx, cy, cw-cx, ch);
    this.Txt_Title.ReadOnly = true;
    this.Add(this.Txt_Title);
cx = 0;
cy += ch+es;
ch = height-this.Border.Top-this.Border.Bottom - cy;
    this.Txt_Description = new TextBox(cx, cy, cw, ch);
    this.Txt_Description.ReadOnly = true;
    this.Txt_Description.MultiLine = true;
    this.Add(this.Txt_Description);
    
    this.OnHourly = function(hourly)
    {
        this.Txt_Date.SetText(hourly.DateJSON.Hour +":"+ hourly.DateJSON.Minute);
        this.Txt_Title.SetText(hourly.Title);
        this.Txt_Description.SetText(hourly.Description);
    };
};

function ControlWebTVDescription(x, y, width, height, border)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ControlWebTVDescription");
 
var es = 5;
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = Appearance.TextBox.FontHeight;//height-this.Border.Top-this.Border.Bottom;

    this.Ctrl_BackGround = new ControlImageUrl(cx, cy, cw, 100);
    this.Ctrl_BackGround.CanDrop = false;
    this.Ctrl_BackGround.CanDrag = false;
    this.Add(this.Ctrl_BackGround);
    
    this.Ctrl_Image = new ControlImageUrl(0, 25, 75, 75);
    this.Ctrl_Image.CanDrop = false;
    this.Ctrl_Image.CanDrag = false;
    this.Ctrl_BackGround.Add(this.Ctrl_Image);
    this.Ctrl_Image.Hide();
    
    this.Col_Social = new ControlSocial(cw -150, 75, 150, 25);
    this.Ctrl_BackGround.Add(this.Col_Social);
    this.Col_Social.Hide()

cy += 100+es;
    this.Ctrl_Note = new ControlNote(cx, cy, cw, 25);
    this.Add(this.Ctrl_Note);

cy += 25+es;
    this.Txt_Date = new TextBox(cx, cy, 50, ch);
    this.Txt_Date.ReadOnly = true;
    this.Add(this.Txt_Date);
cx += 50+es;
    this.Txt_Title = new TextBox(cx, cy, cw-cx, ch);
    this.Txt_Title.ReadOnly = true;
    this.Add(this.Txt_Title);

cx = 0;
cy += ch+es;
ch = height-this.Border.Top-this.Border.Bottom - cy;
    this.Txt_Description = new TextBox(cx, cy, cw, ch);
    this.Txt_Description.ReadOnly = true;
    this.Txt_Description.MultiLine = true;
    this.Add(this.Txt_Description);

    this.OnWebTVJSON = function(webtvjson)
    {
        if(webtvjson.Hourly.ImageUrl != "") { this.Ctrl_Image.ChangeUrl(webtvjson.Hourly.ImageUrl); this.Ctrl_Image.Show(); }
        else { this.Ctrl_Image.Clear(); this.Ctrl_Image.Hide();}

        if(webtvjson.Hourly.BackGroundUrl != "")
            this.Ctrl_BackGround.ChangeUrl(webtvjson.Hourly.BackGroundUrl);
        else
            this.Ctrl_BackGround.Clear();
        
        this.Col_Social.OnSocial(webtvjson.Social);
        this.Col_Social.MoveTo( (this.Ctrl_BackGround.Rectangle.X+this.Ctrl_BackGround.Rectangle.Width)-this.Ctrl_BackGround.Border.Right-this.Col_Social.Rectangle.Width, this.Col_Social.Rectangle.Y  );

        if(this.Col_Social.Controls.length > 0)this.Col_Social.Show();
        else this.Col_Social.Hide();

        this.Txt_Date.SetText(webtvjson.Hourly.DateJSON.Hour +":"+ webtvjson.Hourly.DateJSON.Minute);
        this.Txt_Title.SetText(webtvjson.Hourly.Title);
        this.Txt_Description.SetText(webtvjson.Hourly.Description);

        this.Ctrl_Note.OnNote(webtvjson.Note);
    };
};

function ControlSocial(x, y, width, height, border)
{
    this.InheritClass = ControlCollection_Horizontal;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ControlSocial");

    this.Maximize = true;

    this.OnSocial = function(social)
    {
        this.Clear();
        if(social.WebSite != "") this.AddSocial( {Name:"Web", NbrX:1, NbrY:1}, social.WebSite );
        if(social.Youtube != "") this.AddSocial( {Name:"Social", NbrX:2, NbrY:1}, social.Youtube );
        if(social.Facebook != "") this.AddSocial( {Name:"Social", NbrX:1, NbrY:1}, social.Facebook );
        if(social.Twitter != "") this.AddSocial( {Name:"Social", NbrX:6, NbrY:1}, social.Twitter );
        if(social.Google != "") this.AddSocial( {Name:"Social", NbrX:2, NbrY:2}, social.Google );
        if(social.Dailymotion != "") this.AddSocial( {Name:"Dailymotion", NbrX:1, NbrY:1}, social.Dailymotion );
        if(social.Vimeo != "") this.AddSocial( {Name:"Social", NbrX:6, NbrY:3}, social.Vimeo );
        if(social.Email != "") this.AddSocial( {Name:"Email", NbrX:1, NbrY:1}, social.Email );
    };
    this.AddSocial = function(imagejson, url)
    {
        var control = new Control(0, 0, this.Rectangle.Height-this.Border.Top-this.Border.Bottom, this.Rectangle.Height-this.Border.Top-this.Border.Bottom);
        control.BackGroundImage = imagejson;
        control.Url = url;
        control.ClickLeft = function(){ RedirectOpen(this.Url); };
        this.AddCollection(control);
     };
};

function ControlNote(x, y, width, height, border)
{
    this.InheritClass = ControlCollection_Horizontal;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ControlNote");

    this.Maximize = true;

var es = 5;
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = height-this.Border.Top-this.Border.Bottom;

    this.Btn_Error = new Control(cx, cy, 100, ch);
    this.AddCollection(this.Btn_Error);
    this.Btn_Error.SetText("Vidéo absente");
cx += 100+es;

    this.Txt_View = new TextBox(cx, cy, ch*1.5, ch);
    this.Txt_View.Numeric = true;
    this.Txt_View.ReadOnly = true;
    this.AddCollection(this.Txt_View);
cx += (ch*1.5)+es;

    this.AddCollection(new ControlTicket(cx, cy, ch*1.5, ch, "Vues"));
cx += (ch*1.5)+es;

    this.Btn_Like = new Control(cx, cy, ch, ch);
    this.AddCollection(this.Btn_Like);
    this.Btn_Like.SetText("Like");
cx += ch+es;
    this.Txt_Like = new TextBox(cx, cy, ch*1.5, ch);
    this.Txt_Like.Numeric = true;
    this.Txt_Like.ReadOnly = true;
    this.AddCollection(this.Txt_Like);
cx += (ch*1.5)+es;

    this.Btn_Dislike = new Control(cx, cy, ch, ch);
    this.AddCollection(this.Btn_Dislike);
    this.Btn_Dislike.SetText("Dislike");
cx += ch+es;
    this.Txt_Dislike = new TextBox(cx, cy, ch*1.5, ch);
    this.Txt_Dislike.Numeric = true;
    this.Txt_Dislike.ReadOnly = true;
    this.AddCollection(this.Txt_Dislike);
cx += (ch*1.5)+es;

    this.OnNote = function(note)
    {
        this.Txt_View.SetText(note.NumberView);
        this.Txt_Like.SetText(note.Like);
        this.Txt_Dislike.SetText(note.Dislike);
    };
};
