
var WebTV = null;
var WebTV_Info = null;
var Form_02 = null;
var WebTV_Vertical = null;

var Load = function()
{
    var windowsize = WindowSize();
    WebTV = new ControlVideo(0, 0, 300, 150, "Video01", 10);
    FormBase = WebTV;

    WebTV_Info = new FormInfo(300, 0, (windowsize.Width-300)/2, windowsize.Height, 10);

    Form_02 = new Form02(300+(windowsize.Width-300)/2, 0, (windowsize.Width-300)/2, windowsize.Height, 10 );
    WebTV_Vertical = new FormVertical(0, 150, 300, windowsize.Height-150, 10);
    FindAppearance("Variety");
};

var ResponsePage = function(message)
{
    if(message.COMMAND == "HOURLY")
    {
        WebTV_Vertical.WebTVHourly.OnHourly(message.Value);
    }
    else if(message.COMMAND == "WEBTV_TITLE")
    {
        WebTV_Info.NewWebTV.OnWebTV(message.Value);
    }
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
var ch = Appearance.TextBox.FontHeight;//height-this.Border.Top-this.Border.Bottom;//

    this.Bar_Channel = new Menu_Channel(cx, cy, cw, ch);
    this.Add(this.Bar_Channel);
cy += ch;
ch = height-this.Border.Top-this.Border.Bottom-ch;

    this.WebTVHourly = new CollectionWebTVHourly(cx, cy, cw, ch);
    this.WebTVHourly.CanMove = false;
    this.WebTVHourly.CanResize = false;
    this.Add(this.WebTVHourly);
};

function Menu_Channel(x, y, width, height, border)
{
    this.InheritClass = ControlCollection_Horizontal;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("Menu_Channel");

    this.COMMAND = "HOURLY";

var es = 5;
var cx = 0;
var cy = 0;
var cw = 100; //width-this.Border.Left-this.Border.Right;//
var ch = height-this.Border.Top-this.Border.Bottom;

    this.Btn_Variety = new Control(cx, cy, cw, ch);
    this.Btn_Variety.ClickLeft = function(){CallPage(this.Parent.COMMAND,"Variety");};
    this.AddCollection(this.Btn_Variety);
    this.Btn_Variety.SetText("Variety");

    this.Btn_Tuto = new Control(cx, cy, cw, ch);
    this.Btn_Tuto.ClickLeft = function(){CallPage(this.Parent.COMMAND,"TutorialTV");};
    this.AddCollection(this.Btn_Tuto);
    this.Btn_Tuto.SetText("TutorialTV");

    this.Btn_InforMedia = new Control(cx, cy, cw, ch);
    this.Btn_InforMedia.ClickLeft = function(){CallPage(this.Parent.COMMAND,"Informavie");};
    this.AddCollection(this.Btn_InforMedia);
    this.Btn_InforMedia.SetText("Informavie");

    this.Btn_ManGame = new Control(cx, cy, cw, ch);
    this.Btn_ManGame.ClickLeft = function(){CallPage(this.Parent.COMMAND,"Mangameek");};
    this.AddCollection(this.Btn_ManGame);
    this.Btn_ManGame.SetText("Mangameek");

    this.Btn_Mystravely = new Control(cx, cy, cw, ch);
    this.Btn_Mystravely.ClickLeft = function(){CallPage(this.Parent.COMMAND,"Mystravely");};
    this.AddCollection(this.Btn_Mystravely);
    this.Btn_Mystravely.SetText("Mystravely");
};


function CollectionWebTVHourly(x, y, width, height, border)
{
    this.InheritClass = Control;
    this.InheritClass( x, y, width, height, border );
    delete this.InheritClass;
    this.Inherit("ControlWebTVHourly");
    
//    this.Ctrl_Hourly = new ControlHourly(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, 200);// this.Rectangle.Height-this.Border.Top-this.Border.Bottom);
//    this.Add(this.Ctrl_Hourly);
    this.HourlyCollection = new ControlCollection(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, this.Rectangle.Height-this.Border.Top-this.Border.Bottom, 10);
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
    };
};


function ControlHourly_Min(x, y, width, height, border)
{
    this.InheritClass = TextBox;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ControlHourly_Min");

    this.ReadOnly = true;
    this.Hourly =null;
 
//var es = 5;
//var cx = 0;
//var cy = 0;
//var cw = width-this.Border.Left-this.Border.Right;
//var ch = height-this.Border.Top-this.Border.Bottom;

//    this.Txt_Date = new TextBox(cx, cy, 50, ch);
//    this.Txt_Date.ReadOnly = true;
//    this.Add(this.Txt_Date);
//cx += 50+es;
//    this.Txt_Title = new TextBox(cx, cy, cw-cx, ch);
//    this.Txt_Title.ReadOnly = true;
//    this.Add(this.Txt_Title);

    this.OnHourly = function(hourly)
    {
        this.Hourly = hourly;
//        this.Txt_Date.SetText(hourly.DateJSON.Hour +":"+ hourly.DateJSON.Minute);
//        this.Txt_Title.SetText(hourly.Title);
        this.SetText(hourly.Title);
    };

    this.ClickLeft = function(){CallPage("WEBTV_TITLE", this.Hourly.Title +PageInfo.Separator+ this.Hourly.Category +PageInfo.Separator+ this.Hourly.Subcategory)};



    this.CanDrag = true;
    this.OnDrag = function()
    {
        DragDrop.Control = this;
        DragDrop.Element = this.Hourly;
    };
    this.OnDragDraw = function()
    {
        var form = this.Form;
        if(MouseHover.Control != null)
            form = MouseHover.Control.Form;
        if(DragDrop.Element != null)
//            DragDrop.Control.OnDraw(form.Context, Mouse.X, Mouse.Y);    
//            DragDrop.Control.OnDraw(form.Context, Mouse.X-form.Position.X, Mouse.Y-form.Position.Y);    
            DragDrop.Control.OnDrawing(Mouse.X-form.Position.X, Mouse.Y-form.Position.Y , this.Rectangle.Width, this.Rectangle.Height, form.Context);    
//            form.Context.drawImage(DragDrop.Element, Mouse.X-form.Position.X, Mouse.Y-form.Position.Y , 50, 50);    

    };


};

//function ControlHourly_Min(x, y, width, height)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("ControlHourly_Min");

//    this.Hourly =null;
// 
//var es = 5;
//var cx = 0;
//var cy = 0;
//var cw = width-this.Border.Left-this.Border.Right;
//var ch = height-this.Border.Top-this.Border.Bottom;

//    this.Txt_Date = new TextBox(cx, cy, 50, ch);
//    this.Txt_Date.ReadOnly = true;
//    this.Add(this.Txt_Date);
//cx += 50+es;
//    this.Txt_Title = new TextBox(cx, cy, cw-cx, ch);
//    this.Txt_Title.ReadOnly = true;
//    this.Add(this.Txt_Title);

//    this.OnHourly = function(hourly)
//    {
//        this.Hourly = hourly;
//        this.Txt_Date.SetText(hourly.DateJSON.Hour +":"+ hourly.DateJSON.Minute);
//        this.Txt_Title.SetText(hourly.Title);
//    };

//    this.ClickLeft = function(){CallPage("WEBTV_TITLE", this.Hourly.Title +PageInfo.Separator+ this.Hourly.Category +PageInfo.Separator+ this.Hourly.Subcategory)};



//    this.CanDrag = true;
//    this.OnDrag = function()
//    {
//        DragDrop.Control = this;
//        DragDrop.Element = this.Hourly;
//    };
//    this.OnDragDraw = function()
//    {
//        var form = this.Form;
//        if(MouseHover.Control != null)
//            form = MouseHover.Control.Form;
//        if(DragDrop.Element != null)
//            DragDrop.Control.OnDraw(form.Context, Mouse.X-form.Position.X, Mouse.Y-form.Position.Y);    
////            DragDrop.Control.OnDrawing(Mouse.X-form.Position.X, Mouse.Y-form.Position.Y , 150, 50, form.Context);    
////            form.Context.drawImage(DragDrop.Element, Mouse.X-form.Position.X, Mouse.Y-form.Position.Y , 50, 50);    

//    };


//};


////Supprimer
//function ControlHourly(x, y, width, height)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("ControlHourly");

//    this.Border = {Left:5, Top:5, Right:5, Bottom:5 };
// 
//var es = 5;
//var cx = 0;
//var cy = 0;
//var cw = width-this.Border.Left-this.Border.Right;
//var ch = Appearance.TextBox.FontHeight;// height-this.Border.Top-this.Border.Bottom;

//    this.Txt_Date = new TextBox(cx, cy, 50, ch);
//    this.Txt_Date.ReadOnly = true;
//    this.Add(this.Txt_Date);
//cx += 50+es;
//    this.Txt_Title = new TextBox(cx, cy, cw-cx, ch);
//    this.Txt_Title.ReadOnly = true;
//    this.Add(this.Txt_Title);
//cx = 0;
//cy += ch+es;
//ch = height-this.Border.Top-this.Border.Bottom - cy;
//    this.Txt_Description = new TextBox(cx, cy, cw, ch);
//    this.Txt_Description.ReadOnly = true;
//    this.Txt_Description.MultiLine = true;
//    this.Add(this.Txt_Description);
//    
//    this.OnHourly = function(hourly)
//    {
//        this.Txt_Date.SetText(hourly.DateJSON.Hour +":"+ hourly.DateJSON.Minute);
//        this.Txt_Title.SetText(hourly.Title);
//        this.Txt_Description.SetText(hourly.Description);
//    };
//};



//#########################################################

function Form02(x, y, width, height, border)
{
    this.InheritClass = Form;
    this.InheritClass( x, y, width, height, border );
    delete this.InheritClass;
    this.Inherit("Form02");

    this.CanMove = false;
    this.CanResize = true;
    this.CanScale = true;

var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = height-this.Border.Top-this.Border.Bottom;


    this.NewHourly = new ControlNewHourly(cx, cy, cw, ch, 5);
    this.NewHourly.CanMove = false;
    this.NewHourly.CanResize = false;
    this.Add(this.NewHourly)

};


function ControlNewHourly(x, y, width, height, border)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ControlNewHourly");
    
    this.CanMove = false;

var es = 5;
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = Appearance.TextBox.FontHeight;//height-this.Border.Top-this.Border.Bottom;//

    this.Bar_Channel = new Menu_Channel(cx, cy, cw, ch);
    this.Bar_Channel.COMMAND = "NEWHOURLY";
    this.Add(this.Bar_Channel);
cy += ch;
ch = height-this.Border.Top-this.Border.Bottom-ch;
//    this.Ctrl_Hourly = new ControlHourly(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, 200);// this.Rectangle.Height-this.Border.Top-this.Border.Bottom);
//    this.Add(this.Ctrl_Hourly);
//    this.HourlyCollection = new ControlCollection(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, this.Rectangle.Height-this.Border.Top-this.Border.Bottom, 10);
    this.HourlyCollection = new CollectionHourly(cx, cy, cw, ch, 10);
//    this.HourlyCollection = new ControlCollection(cx, cy, cw, ch, 10);
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
    };
};

function CollectionHourly(x, y, width, height, border)
{
    this.InheritClass = ControlCollection;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("CollectionHourly");

    this.Maximize = true;

//    this.CanDrag = true;
//    this.OnDrag = function()
//    {
//        DragDrop.Control = this;
//        DragDrop.Element = this.Hourly;
//    };
//    this.OnDragDraw = function()
//    {
//        var form = this.Form;
//        if(MouseHover.Control != null)
//            form = MouseHover.Control.Form;
//        if(DragDrop.Element != null)
////            DragDrop.Control.OnDraw(form.Context, Mouse.X, Mouse.Y);    
////            DragDrop.Control.OnDraw(form.Context, Mouse.X-form.Position.X, Mouse.Y-form.Position.Y);    
//            DragDrop.Control.OnDrawing(Mouse.X-form.Position.X, Mouse.Y-form.Position.Y , this.Rectangle.Width, this.Rectangle.Height, form.Context);    
////            form.Context.drawImage(DragDrop.Element, Mouse.X-form.Position.X, Mouse.Y-form.Position.Y , 50, 50);    

//    };
//    this.CanDrag = false;
//    this.OnDrag = function(){};
//    this.OnDragDraw = function(){};
    
    this.CanDrop = true;
    this.OnDrop = function()
    {
//    alert();
        if(DragDrop.Control == null || DragDrop.Element == null || !DragDrop.Control.IsInherit("ControlHourly_Min"))return;
            var control = new ControlHourly_Min(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, Appearance.TextBox.FontHeight);
            control.OnHourly(DragDrop.Element);
            this.AddCollection(control);
        DragDrop.Control = null;
        DragDrop.Element = null;
    };


    this.OnDragEnter = function(){};
    this.OnDragLeave = function(){};
    this.OnDragOver = function(){};


};



function ControlHourly(x, y, width, height, border)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ControlHourly");

//    this.Border = {Left:5, Top:5, Right:5, Bottom:5 };
 
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









function FormInfo(x, y, width, height, border)
{
    this.InheritClass = Form;
    this.InheritClass( x, y, width, height, border );
    delete this.InheritClass;
    this.Inherit("FormInfo");

    this.CanMove = false;
    this.CanResize = true;
    this.CanScale = true;

var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = 25;// height-this.Border.Top-this.Border.Bottom;

    this.MenuInfo = new Menu_Info(cx, cy, cw, ch);
    this.Add(this.MenuInfo);
cy += ch;
ch = height-this.Border.Top-this.Border.Bottom-ch;

    this.NewWebTV = new ControlNewWebTV(cx, cy, cw, ch, 5);
    this.NewWebTV.CanMove = false;
    this.NewWebTV.CanResize = false;
    this.Add(this.NewWebTV);

//    this.WebTVHourly = new CollectionWebTVHourly(cx, cy, cw, ch);
//    this.WebTVHourly.CanMove = false;
//    this.WebTVHourly.CanResize = false;
//    this.Add(this.WebTVHourly);

//    this.WebTVSocial = new ControlWebTVDescription(cx, cy, cw, ch);
//    this.WebTVSocial.CanMove = false;
//    this.WebTVSocial.CanResize = false;
//    this.Add(this.WebTVSocial);

    this.WebTVTranslator = new ControlTranslator(cx, cy, cw, ch, 5);
    this.WebTVTranslator.CanMove = false;
    this.WebTVTranslator.CanResize = false;
    this.WebTVTranslator.Hide();
    this.Add(this.WebTVTranslator);

    this.MenuHide = function()
    {
//        this.Forum.Hide();
        this.NewWebTV.Hide();
//        this.WebTVHourly.Hide();
//        this.WebTVSocial.Hide();
        this.WebTVTranslator.Hide();
    };
};











function Menu_Info(x, y, width, height, border)
{
    this.InheritClass = ControlCollection_Horizontal;
    this.InheritClass( x, y, width, height, border );
    delete this.InheritClass;
    this.Inherit("Menu_Info");

var es = 5;
var cx = 0;
var cy = 0;
var cw = 75; //width-this.Border.Left-this.Border.Right;//
var ch = height-this.Border.Top-this.Border.Bottom;


//    this.Btn_Description = new Control(cx, cy, cw, ch);
//    this.Btn_Description.ClickLeft = function(){ WebTV_Info.MenuHide(); WebTV_Info.WebTVSocial.Show(); };
//    this.AddCollection(this.Btn_Description);
//    this.Btn_Description.SetText("Description");
////cx += cw +es;
//    this.Btn_Hourly = new Control(cx, cy, cw, ch);
//    this.Btn_Hourly.ClickLeft = function(){ WebTV_Info.MenuHide(); WebTV_Info.WebTVHourly.Show(); };
//    this.AddCollection(this.Btn_Hourly);
//    this.Btn_Hourly.SetText("Hourly");
////cx += cw +es;
//    this.Btn_Forum = new Control(cx, cy, cw, ch);
//    this.Btn_Forum.ClickLeft = function(){ WebTV_Info.MenuHide(); WebTV_Info.Forum.Show(); };
//    this.AddCollection(this.Btn_Forum);
//    this.Btn_Forum.SetText("Forum");
////cx += cw +es;
//    this.Btn_Contact = new Control(cx, cy, cw, ch);
////    this.Btn_Contact.ClickLeft = function(){ WebTV.Speed(0.25); };
//    this.AddCollection(this.Btn_Contact);
//    this.Btn_Contact.SetText("Contact");
////cx += cw +es;
//    this.Btn_Chat = new Control(cx, cy, cw, ch);
////    this.Btn_Chat.ClickLeft = function(){ WebTV.Speed(1); };
//    this.AddCollection(this.Btn_Chat);
//    this.Btn_Chat.SetText("Chat");
////cx += cw +es;
//    this.Btn_FAQ = new Control(cx, cy, cw, ch);
////    this.Btn_FAQ.ClickLeft = function(){ WebTV.Speed(1.25); };
//    this.AddCollection(this.Btn_FAQ);
//    this.Btn_FAQ.SetText("FAQ");

////cx += cw +es;

    this.Btn_Home = new Control(cx, cy, cw, ch);
    this.Btn_Home.ClickLeft = function(){ CallPage("HOME", ''); };
    this.AddCollection(this.Btn_Home);
    this.Btn_Home.SetText("Home");

    this.Btn_WebTV = new Control(cx, cy, cw, ch);
    this.Btn_WebTV.ClickLeft = function(){ WebTV_Info.MenuHide(); WebTV_Info.NewWebTV.Show(); };
    this.AddCollection(this.Btn_WebTV);
    this.Btn_WebTV.SetText("WebTV");
////cx += cw +es;
    this.Btn_Translator = new Control(cx, cy, cw, ch);
    this.Btn_Translator.ClickLeft = function(){ WebTV_Info.MenuHide(); WebTV_Info.WebTVTranslator.Translators_List.ChangeLines(PageInfo.Translators);     WebTV_Info.WebTVTranslator.Show(); };
    this.AddCollection(this.Btn_Translator);
    this.Btn_Translator.SetText("Translator");

};













//#########################################
//#########################################
//#########################################
//#########################################


function ControlNewWebTV(x, y, width, height, border)
{
    this.InheritClass = Control;
    this.InheritClass( x, y, width, height, border );
    delete this.InheritClass;
    this.Inherit("ControlNewWebTV");


//    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
 
var es = 5;
var cx = 0;
var cy = 0;
var cw = 100;// ((width - this.Border.Left - this.Border.Right)/6)-es;
var ch = 25;//height - this.Border.Top - this.Border.Bottom;
var cw2 = (width-this.Border.Left-this.Border.Right) - cw - es;

    this.Add(new ControlTicket(cx, cy, cw, ch, "VideoPlayer"));
cx += cw + es;
//    this.Clr_VideoPlayer = new TextBox(cx, cy, ch, ch);
//    this.Add(this.Clr_VideoPlayer);
//    this.Clr_VideoPlayer.SetText("X");
//    this.Clr_VideoPlayer.ClickLeft = function(){ this.Parent.VideoPlayer.Clear(); };
//cx += ch+es;
    this.VideoPlayer = new TextBox(cx, cy, cw2, ch);
    this.VideoPlayer.ClickRight = function(){this.Clear();};
    this.VideoPlayer.CanDrop = true;
    this.Add(this.VideoPlayer);
    this.VideoPlayer.SetText("Youtube");
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Source"));
cx += cw + es;
    this.Source = new TextBox(cx, cy, cw2, ch);
    this.Source.ClickRight = function(){this.Clear();};
    this.Source.CanDrop = true;
    this.Add(this.Source);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Title"));
cx += cw + es;
    this.Title = new TextBox(cx, cy, cw2, ch);
    this.Title.ClickRight = function(){this.Clear();};
    this.Title.CanDrop = true;
    this.Add(this.Title);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Category"));
cx += cw + es;
    this.Category = new TextBox(cx, cy, cw2, ch);
    this.Category.ClickRight = function(){this.Clear();};
    this.Category.CanDrop = true;
    this.Add(this.Category);
//    this.Category.SetText("");
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Subcategory"));
cx += cw + es;
    this.Subcategory = new TextBox(cx, cy, cw2, ch);
    this.Subcategory.ClickRight = function(){this.Clear();};
    this.Subcategory.CanDrop = true;
    this.Add(this.Subcategory);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch*2, "Description"));
cx += cw + es;
    this.Description = new TextBox(cx, cy, cw2, ch*2);
    this.Description.ClickRight = function(){this.Clear();};
    this.Description.CanDrop = true;
    this.Description.MultiLine = true;
    this.Add(this.Description);
cy += ch*2 + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Duration"));
cx += cw + es;
    this.Hours = new TextBox(cx, cy, cw, ch);
    this.Hours.ClickRight = function(){this.Clear();};
    this.Hours.KeyEsc = function(){this.Clear();};
    this.Add(this.Hours);
    this.Hours.Numeric = true;
//    this.Hours.SetText("0");
cx += cw + es;
    this.Minutes = new TextBox(cx, cy, cw, ch);
    this.Minutes.ClickRight = function(){this.Clear();};
    this.Minutes.KeyEsc = function(){this.Clear();};
    this.Add(this.Minutes);
    this.Minutes.Numeric = true;
//    this.Minutes.SetText("0");
cx += cw + es;
    this.Seconds = new TextBox(cx, cy, cw, ch);
    this.Seconds.ClickRight = function(){this.Clear();};
    this.Seconds.KeyEsc = function(){this.Clear();};
    this.Add(this.Seconds);
    this.Seconds.Numeric = true;
//    this.Seconds.SetText("0");
    this.Hours.Tab = this.Minutes;
    this.Minutes.Tab = this.Seconds;
    this.Seconds.Tab = this.Hours;
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Image"));
cx += cw + es;
    this.Image = new TextBox(cx, cy, cw2, ch);
    this.Image.ClickRight = function(){this.Clear();};
    this.Image.CanDrop = true;
    this.Add(this.Image);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "BackGround"));
cx += cw + es;
    this.BackGround = new TextBox(cx, cy, cw2, ch);
    this.BackGround.ClickRight = function(){this.Clear();};
    this.BackGround.CanDrop = true;
    this.Add(this.BackGround);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "WebSite"));
cx += cw + es;
    this.WebSite = new TextBox(cx, cy, cw2, ch);
    this.WebSite.ClickRight = function(){this.Clear();};
    this.WebSite.CanDrop = true;
    this.Add(this.WebSite);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Youtube"));
cx += cw + es;
    this.Youtube = new TextBox(cx, cy, cw2, ch);
    this.Youtube.ClickRight = function(){this.Clear();};
    this.Youtube.CanDrop = true;
    this.Add(this.Youtube);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Facebook"));
cx += cw + es;
    this.Facebook = new TextBox(cx, cy, cw2, ch);
    this.Facebook.ClickRight = function(){this.Clear();};
    this.Facebook.CanDrop = true;
    this.Add(this.Facebook);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Twitter"));
cx += cw + es;
    this.Twitter = new TextBox(cx, cy, cw2, ch);
    this.Twitter.ClickRight = function(){this.Clear();};
    this.Twitter.CanDrop = true;
    this.Add(this.Twitter);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Google"));
cx += cw + es;
    this.Google = new TextBox(cx, cy, cw2, ch);
    this.Google.ClickRight = function(){this.Clear();};
    this.Google.CanDrop = true;
    this.Add(this.Google);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Dailymotion"));
cx += cw + es;
    this.Dailymotion = new TextBox(cx, cy, cw2, ch);
    this.Dailymotion.ClickRight = function(){this.Clear();};
    this.Dailymotion.CanDrop = true;
    this.Add(this.Dailymotion);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "Vimeo"));
cx += cw + es;
    this.Vimeo = new TextBox(cx, cy, cw2, ch);
    this.Vimeo.ClickRight = function(){this.Clear();};
    this.Vimeo.CanDrop = true;
    this.Add(this.Vimeo);
cy += ch + es;
cx = 0;
    this.Add(new ControlTicket(cx, cy, cw, ch, "E-Mail"));
cx += cw + es;
    this.Email = new TextBox(cx, cy, cw2, ch);
    this.Email.ClickRight = function(){this.Clear();};
    this.Email.CanDrop = true;
    this.Add(this.Email);


cy += ch + es;
cx = 0;
    this.Btn_WebTV = new Control(cx, cy, cw, ch);
    this.Btn_WebTV.ClickLeft = function(){ this.Parent.CallPage(); };
    this.Add(this.Btn_WebTV);
    this.Btn_WebTV.SetText("Save WebTV");

//cx += cw + es;
//    this.Btn_Clear = new Control(cx, cy, cw, ch);
//    this.Btn_Clear.ClickLeft = function(){ this.Parent.Clear(); };
//    this.Add(this.Btn_Clear);
//    this.Btn_Clear.SetText("Reset WebTV");

cx += cw + es;
    this.Btn_Start = new Control(cx, cy, cw, ch);
    this.Btn_Start.ClickLeft = function(){ this.Parent.WebTVJSON(); };
    this.Add(this.Btn_Start);
    this.Btn_Start.SetText("Start WebTV");


    this.Clear = function()
    {
        this.Source.Clear();
        this.Title.Clear();
        this.Description.Clear();
        this.Hours.Clear();
        this.Minutes.Clear();
        this.Seconds.Clear();
    };

    this.OnWebTV = function(webtvjson)
    {
        var duration = webtvjson.Media.Duration;
//        alert(webtvjson.Media.Duration +" "+ Math.floor(duration % 60) +" "+ Math.floor((duration/60) % 60) +" "+ Math.floor(duration/3600));
        var second = Math.floor(duration % 60);
        var minute = Math.floor((duration/60) % 60);
        var hour = Math.floor(duration/3600);
//        var seconds =  parseInt(this.Hours.Text)*3600 + parseInt(this.Minutes.Text)*60 + parseInt(this.Seconds.Text);
//        var str = "NEWWEBTV" +PageInfo.Separator;
        this.VideoPlayer.SetText(webtvjson.Media.VideoPlayer);
        this.Source.SetText(webtvjson.Media.Source);
        this.Title.SetText(webtvjson.Hourly.Title);
        this.Category.SetText(webtvjson.Hourly.Category);
        this.Subcategory.SetText(webtvjson.Hourly.Subcategory);
        this.Description.SetText(webtvjson.Hourly.Description);
        this.Hours.SetText(hour.toString());
        this.Minutes.SetText(minute.toString());
        this.Seconds.SetText(second.toString());
        this.Image.SetText(webtvjson.Hourly.ImageUrl);
        this.BackGround.SetText(webtvjson.Hourly.BackGroundUrl);
        this.WebSite.SetText(webtvjson.Social.WebSite);
        this.Youtube.SetText(webtvjson.Social.Youtube);
        this.Facebook.SetText(webtvjson.Social.Facebook);
        this.Twitter.SetText(webtvjson.Social.Twitter);
        this.Google.SetText(webtvjson.Social.Google);
        this.Dailymotion.SetText(webtvjson.Social.Dailymotion);
        this.Vimeo.SetText(webtvjson.Social.Vimeo);
        this.Email.SetText(webtvjson.Social.Email);

        return str;
    };

    this.CallString = function()
    {
        var seconds =  parseInt(this.Hours.Text)*3600 + parseInt(this.Minutes.Text)*60 + parseInt(this.Seconds.Text);
//        var str = "NEWWEBTV" +PageInfo.Separator;
        var str = this.VideoPlayer.GetText() +PageInfo.Separator;
        str += this.Source.GetText() +PageInfo.Separator;
        str += this.Title.GetText() +PageInfo.Separator;
        str += this.Category.GetText() +PageInfo.Separator;
        str += this.Subcategory.GetText() +PageInfo.Separator;
        str += this.Description.GetText() +PageInfo.Separator;
        str += seconds +PageInfo.Separator;
        str += this.Image.GetText() +PageInfo.Separator;
        str += this.BackGround.GetText() +PageInfo.Separator;
        str += this.WebSite.GetText() +PageInfo.Separator;
        str += this.Youtube.GetText() +PageInfo.Separator;
        str += this.Facebook.GetText() +PageInfo.Separator;
        str += this.Twitter.GetText() +PageInfo.Separator;
        str += this.Google.GetText() +PageInfo.Separator;
        str += this.Dailymotion.GetText() +PageInfo.Separator;
        str += this.Vimeo.GetText() +PageInfo.Separator;
        str += this.Email.GetText() +PageInfo.Separator;

        return str;
    };
    this.CallPage = function(){ CallPage("NEWWEBTV", this.CallString()); };
    
    
    this.WebTVJSON = function()
    {
        var webtv ={ Media:{VideoPlayer:"", Source:"", StartSeconds:0, Quality:"highres", Duration:0}, Hourly:{} };
        //webtv.Media = {VideoPlayer:"", Source:"", StartSeconds:0, Quality:"highres", Duration:0, Time:0, Title:"", Category:"", Like:0, Dislike:0, NumberView:0, Description:""};
        
        var seconds =  parseInt(this.Hours.Text)*3600 + parseInt(this.Minutes.Text)*60 + parseInt(this.Seconds.Text);
          
        webtv.Media.VideoPlayer = this.VideoPlayer.GetText();
        webtv.Media.Source = this.Source.GetText();
        webtv.Media.Duration = seconds;
        webtv.Hourly.Title = this.Title.GetText();
        webtv.Hourly.Category = this.Category.GetText();
        webtv.Hourly.Description = this.Description.GetText();

        WebTV.OnWebTV(webtv);
    
    };
    
    
    
};









function ControlTranslator( x, y, width, height, border )
{
    this.InheritClass = Control;
    this.InheritClass( x, y, width, height, border );
    delete this.InheritClass;
    this.Inherit("ControlTranslator");

    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
    this.BackColor = "white";
    this.CanMove = true;

x = 0;
y = 0;
width = 100;
height = 15;
var es = 5;
    this.Btn_Save = new Control(x, y, width*2+es, height);
    this.Btn_Save.SetText("#Save");
    this.Btn_Save.ClickLeft = function() { this.Parent.Translator_Save(); };
    this.Add(this.Btn_Save);

x = 0;
y += height+es;
    this.Add(new ControlTicket(x, y, width, height, "#Name"));
x += width+es;
    this.TextBox_Name = new TextBox(x, y, width, height);
    this.TextBox_Name.BackText = "#Name";
    this.TextBox_Name.TextChanged = function(){ var translator = this.Parent.Translators_List.Selected(); if(translator != null)translator.Name = this.Text; };
    this.Add(this.TextBox_Name);
x += width+es;
    this.Add(new ControlTicket(x, y, width, height, "#Culture"));
x += width+es;
    this.TextBox_Culture = new TextBox(x, y, width, height);
    this.TextBox_Culture.BackText = "#Culture";
    this.TextBox_Culture.TextChanged = function(){ var translator = this.Parent.Translators_List.Selected(); if(translator != null)translator.Culture = this.Text; };
    this.Add(this.TextBox_Culture);
x += width+es;
    this.Btn_New = new Control(x, y, width, height);
    this.Btn_New.SetText("#New");
    this.Btn_New.ClickLeft = function() { this.Parent.Translator_New(); };
    this.Add(this.Btn_New);
 
x = 0;
y += height+es;
    this.Add(new ControlTicket(x, y, width, height, "#Key"));
x += width+es;
    this.TextBox_Key = new TextBox(x, y, width, height);
    this.TextBox_Key.BackText = "#Key";
    this.TextBox_Key.TextChanged = function(){ var translate = this.Parent.Translate_List.Selected(); if(translate != null)translate.Key = this.Text; };
    this.Add(this.TextBox_Key);
x += width+es;
    this.Add(new ControlTicket(x, y, width, height, "#Text"));
x += width+es;
    this.TextBox_Text = new TextBox(x, y, width, height);
    this.TextBox_Text.BackText = "#Text";
    this.TextBox_Text.TextChanged = function(){ var translate = this.Parent.Translate_List.Selected(); if(translate != null)translate.Text = this.Text; };
    this.Add(this.TextBox_Text);
x += width+es;
    this.Btn_Add = new Control(x, y, width, height);
    this.Btn_Add.SetText("#Add");
    this.Btn_Add.ClickLeft = function(){ this.Parent.Translate_Add(); };
    this.Add(this.Btn_Add);

x = 0;
y += height+es;
h = this.Rectangle.Height-this.Border.Top-this.Border.Bottom - y;
    this.Translators_List = new ControlList(x, y, width*2+es, h);
    this.Translators_List.SelectedLineChanged = function(){ this.Parent.SelectedTranslator(); };
    this.Translators_List.HeightLine = 15;
    this.Translators_List.MaxLine = this.Translators_List.Rectangle.Height/this.Translators_List.HeightLine ;
    this.Translators_List.LineDraw = function(line, x, y, context)
    {
        context.fillText(MeasureText(this.Lines[line].Name+" ["+this.Lines[line].Culture+"]", this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+this.HeightLine );
        DrawLine( {X:x, Y:y+(h*3)} , {X:x+this.Rectangle.Width-this.Border.Left-this.Border.Right, Y:y+(h*3)},context);
    };
    this.Add(this.Translators_List);

x += this.Translators_List.Rectangle.Width+es;
w = this.Rectangle.Width-this.Border.Left-this.Border.Right - x;
    this.Translate_List = new ControlList(x, y, w, h);
    this.Translate_List.SelectedLineChanged = function(){ this.Parent.SelectedTranslate(); };
    this.Translate_List.HeightLine = 15;
    this.Translate_List.LineDraw = function(line, x, y, context)
    {
        context.fillText(MeasureText(this.Lines[line].Key+" : "+this.Lines[line].Text, this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+this.HeightLine );
        DrawLine( {X:x, Y:y+(h*3)} , {X:x+this.Rectangle.Width-this.Border.Left-this.Border.Right, Y:y+(h*3)},context);
    };
    this.Add(this.Translate_List);
    //TAB 
    this.TextBox_Name.Tab = this.TextBox_Culture;
    this.TextBox_Culture.Tab = this.TextBox_Key;
    this.TextBox_Key.Tab = this.TextBox_Text;
    this.TextBox_Text.Tab = this.TextBox_Key;

    this.Translator_Save = function()
    {
        var translator = this.Translators_List.Selected();
        if(translator != null)
            CallPage("EDITOR_TRANSLATOR", JSONSerialize(translator));
    };
    this.Translator_New = function()
    {
        if(this.TextBox_Name.GetText() == "" || this.TextBox_Culture.GetText() == "" )return;
        PageInfo.Translators[PageInfo.Translators.length] = {Name:this.TextBox_Name.GetText(), Culture:this.TextBox_Culture.GetText(), Translates:[]};
        this.Translators_List.SelectedLine = PageInfo.Translators.length-1;
        this.Translate_List.ChangeLines(PageInfo.Translators[PageInfo.Translators.length-1].Translates);
    };
    this.Translate_Add = function()
    {
        if(this.TextBox_Key.GetText() == "" || this.TextBox_Text.GetText() == "")return;
        var translator = this.Translators_List.Selected();
        if(translator == null)return;
        translator.Translates[translator.Translates.length] = {Key:this.TextBox_Key.GetText(), Text:this.TextBox_Text.GetText()};
    };
    this.SelectedTranslator = function()
    {
        this.ClearTranslator();
        var translator = this.Translators_List.Selected();
        if(translator == null)return;        
        this.Translate_List.ChangeLines(translator.Translates);   
        this.TextBox_Name.SetText(translator.Name);
        this.TextBox_Culture.SetText(translator.Culture);
    };
    this.SelectedTranslate = function()
    {
        this.ClearTranslate();
        var translate = this.Translate_List.Selected();
        if(translate == null)return;
        this.TextBox_Key.SetText(translate.Key);
        this.TextBox_Text.SetText(translate.Text);
    };
    this.ClearTranslator = function()
    {
        this.TextBox_Name.Clear();
        this.TextBox_Culture.Clear();
        this.Translate_List.Clear();
        this.ClearTranslate();
    
    };
    this.ClearTranslate = function()
    {
        this.TextBox_Key.Clear();
        this.TextBox_Text.Clear();
    };

    this.Draw = function(x, y, width, height, context){};
};
















