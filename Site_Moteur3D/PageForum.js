//####/////////////////////////////////////////////////////////////////
// à été vérifier!!! fonction utilisateur!!!
var Draw = function(){};
var MouseMove = function(e) {};
var MouseDownLeft = function(e) { OnTarget(); return false; };
var MouseUpLeft = function(e) { return false; };
var MouseDownRight = function(e) { MapCentred(); return false; };
var MouseUpRight = function(e) { return false; };
var KeyUp = function(e) { return false; };
var KeyDown = function(e) { return false; };
var ResponsePower = function(message){};

var HeadHeight = 50;

var MenuHead = null;
var MenuLeft = null;
var Forum_Collection = null;
var Forum_Control = null;

var WebTV = null;

var Load = function()
{
    var windowsize = WindowSize();
    var menuleftBorder = 25;
    var QuartSize = (windowsize.Width-menuleftBorder)/4;
//    FormBase = new Form( PageInfo.Frame.X, PageInfo.Frame.Y, 1000, PageInfo.Frame.Height);
    FormBase = new Form( menuleftBorder, HeadHeight, windowsize.Width-menuleftBorder, windowsize.Height-HeadHeight);
    FormBase.CanMove = false;
    FormBase.BackColor = "wheat";

    WebTV = new ControlVideo((QuartSize*3)+menuleftBorder, HeadHeight*3, QuartSize, ((windowsize.Height-HeadHeight)/2)-HeadHeight*2, "Video01", 10);
//    WebTV = new ControlVideo((QuartSize*3)+menuleftBorder, HeadHeight*3, QuartSize, QuartSize, "Video01", 10);

    MenuLeft = new Form_MenuLeft( 0, HeadHeight, QuartSize+menuleftBorder, windowsize.Height-HeadHeight,menuleftBorder);
    MenuLeft.Reducing();

    MenuHead = new Form_MenuHead( 0, 0, windowsize.Width, HeadHeight*3, 5);
    MenuHead.Reduce = {Active:false, X:0, Y:0, Width:windowsize.Width, Height:HeadHeight};
    MenuHead.Reducing();
//    FormBase.CanResize = true;
//    FormBase.CanScale = true;


//    FormBase.Add( new ControlInfo(750, 10, 250, 450) );
    var NewHeight = 250;
    Forum_Collection = new CollectionForum(0, 0, QuartSize, windowsize.Height-HeadHeight, 5);
    MenuLeft.Add(Forum_Collection);
//    FormBase.Add(Forum_Collection);

    FormBase.Add( new NewForumControl(0, windowsize.Height-HeadHeight-NewHeight, QuartSize, NewHeight,5) );

    Forum_Control = new ForumControl(QuartSize, 0, QuartSize*2, windowsize.Height-HeadHeight, 5);
    FormBase.Add( Forum_Control );
 
    var control = new TextBox(0, 0, QuartSize, Appearance.TextBox.FontHeight);
//    control.MultiLine = true;
    control.ReadOnly = true;
    control.SetText("<--- Clicker ici.");
    FormBase.Add(control);
 
    var controlImage = new ControlImageUrl(0, Appearance.TextBox.FontHeight, QuartSize, windowsize.Height-HeadHeight-NewHeight-Appearance.TextBox.FontHeight);
    controlImage.PubLeave = "http://droidsoft.fr/wordpress/wp-content/uploads/2012/10/android-wallpaper-future-room.jpeg";
    controlImage.PubEnter = "http://www.webochronik.fr/wp-content/uploads/2010/04/25-Fonds-d%C3%A9cran-%C3%A0-t%C3%A9l%C3%A9charger-wallpaper-4.jpg";
    controlImage.ChangeUrl("http://droidsoft.fr/wordpress/wp-content/uploads/2012/10/android-wallpaper-future-room.jpeg");
    controlImage.OnMouseEnter = function(){ this.ChangeUrl(this.PubEnter); };
    controlImage.OnMouseLeave = function(){ this.ChangeUrl(this.PubLeave); };
    FormBase.Add(controlImage);
    
    var controlPub = new ControlImageUrl(QuartSize*3, 0, QuartSize, HeadHeight*2);
    controlPub.PubLeave = "http://img.over-blog-kiwi.com/300x300/1/43/38/31/20151007/ob_c41719_142399554514.png";
    controlPub.PubEnter = "http://img.over-blog-kiwi.com/1/02/09/85/20140703/ob_5dd38d_votre-publicite-ici.png";
    controlPub.ChangeUrl("http://img.over-blog-kiwi.com/300x300/1/43/38/31/20151007/ob_c41719_142399554514.png");
    controlPub.OnMouseEnter = function(){ this.ChangeUrl(this.PubEnter); };
    controlPub.OnMouseLeave = function(){ this.ChangeUrl(this.PubLeave); };
    FormBase.Add(controlPub);

    var controlPubList = new Control(QuartSize*3, (windowsize.Height-HeadHeight)/2, QuartSize, (windowsize.Height-HeadHeight)/2, 15);
//    controlPubList.CanMove = true;
    controlPubList.Controls = [];
    controlPubList.IndexPub = 0;
    controlPubList.Image01 = new Image();
    controlPubList.Image01.src = "http://www.webmarketing-com.com/wp-content/uploads/2013/04/gamification-coca-cola3.jpg";
    controlPubList.Image02 = new Image();
    controlPubList.Image02.src = "http://transatfm.com/wp-content/uploads/image-pub.jpeg";
    controlPubList.Image03 = new Image();
    controlPubList.Image03.src = "http://img.decision-achats.fr/Img/BREVE/2016/1/301238/Achat-espaces-medias-plateformes-programmatiques-bousculent-F.jpg";
    controlPubList.Image04 = new Image();
    controlPubList.Image04.src = "http://legeekcestchic.eu/wp-content/uploads/2013/05/fast-food-publicite-vs-real-life-banniere.jpg";
    FormBase.Add(controlPubList);
    controlPubList.Draw = function(x, y, width, height, context)
    {
        x += this.Border.Left;
        y += this.Border.Top;
        width -= this.Border.Left+this.Border.Right;
        height -= this.Border.Top+this.Border.Bottom;
        var h = height/4;

        var timePub = 50;
        var num = 0;

        if(this.IndexPub > timePub*4){ num = 0; this.IndexPub = 0 }
        else if(this.IndexPub > timePub*3)num = 3;
        else if(this.IndexPub > timePub*2)num = 2;
        else if(this.IndexPub > timePub)num = 1;

        context.drawImage(this.Image01, x, y+(h*num), width, h-2);
        if(num == 3)num = 0; else num++
        context.drawImage(this.Image02, x, y+(h*num), width, h-2);
        if(num == 3)num = 0; else num++;
        context.drawImage(this.Image03, x, y+(h*num), width, h-2);
        if(num == 3)num = 0; else num++;
        context.drawImage(this.Image04, x, y+(h*num), width, h-2);
        
        this.IndexPub++;
    };
//    Forum_Collection.OnForumInfo( JSONDeserialize(document.getElementById("ForumInfo").value) );

//    FormBase = WebTV;


    CallPage("FORUMINFO","");
};

var ResponsePage = function(message)
{
    if(message.COMMAND == "FORUM")
    {
        Forum_Control.OnRemplace(message.Forum);
        Forum_Control.OnFocus();
        var webtvjson = { Media:{VideoPlayer:"Youtube", Source:"1iGy1Rp93o4", StartSeconds:0, Quality:"highres", Duration:0}, Hourly:{Title:"", Category:"", Description:""} };
        WebTV.OnWebTV(webtvjson);
    }
    else if(message.COMMAND == "FORUMINFO")
    {
        Forum_Collection.OnForumInfo(message.List);
        if(message.List.length > 0)
        {
            Forum_Control.Clear();
            CallPage("FORUM_LOAD", message.List[0].Title);
        };
    }
};

function Form_MenuHead(x, y, width, height, border)
{
    this.InheritClass = Form;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("Form_MenuHead");

    this.CanMove = false;

var es = 5;
var cx = 0;
var cy = 0;
var ch = HeadHeight-this.Border.Top-this.Border.Bottom;
var cw = ch*2;// height-this.Border.Top-this.Border.Bottom;//width-this.Border.Left-this.Border.Right;

//cx += cw+es;
//    this.Btn_Menu = new Control(cx, cy, cw, ch);
//    this.Btn_Menu.ClickLeft = function(){MenuLeft.Reducing();};//{ if(MenuLeft.Visible)MenuLeft.Hide(); else MenuLeft.Show(); };
//    this.Add(this.Btn_Menu);
//    this.Btn_Menu.SetText("Menu");
//cx += cw+es;
    this.Btn_Head = new Control(cx, cy, cw, ch, 10);
    this.Btn_Head.Controls = [];
    this.Btn_Head.ClickLeft = function(){ MenuHead.Reducing(); };
    this.Add(this.Btn_Head);
    this.Btn_Head.SetText("Head");
    this.Btn_Head.OnMouseEnter = function(){if(this.Parent.Reduce.Active)this.Parent.Reducing();};
    this.Btn_Head.Draw = function(x, y, width, height, context)
    {
        x += this.Border.Left;
        y += this.Border.Top;
        width -= this.Border.Left+this.Border.Right;
        height -= this.Border.Top+this.Border.Bottom;
        var ch = height/5;
        
        if (MouseHover.Control == this && this.Appearance.BackColorOut_Hover != "")
            context.fillStyle = this.Appearance.BackColorOut_Hover;
        else if(this.Appearance.BackColorOut != "")
            context.fillStyle = this.Appearance.BackColorOut;
        else
            context.fillStyle = "rgba(125, 125, 125, 0.5)";

        y += ch;
        context.fillRect(x, y, width, ch);
        y+=ch*2
        context.fillRect(x, y, width, ch);
//        y+=ch*2
//        context.fillRect(x, y, width, ch);
    };

cy += ch+this.Border.Bottom;
    this.Btn_Home = new Control(cx, cy, cw, ch);
    this.Btn_Home.ClickLeft = function(){ CallPage("HOME", ''); };
    this.Add(this.Btn_Home);
    this.Btn_Home.SetText("Home");

cy += ch+this.Border.Bottom;
    this.Btn_Video = new Control(cx, cy, cw, ch);
    this.Add(this.Btn_Video);
    this.Btn_Video.SetText("Video");
    this.Btn_Video.ClickLeft = function()
    {
        var webtvjson = { Media:{VideoPlayer:"Youtube", Source:"1iGy1Rp93o4", StartSeconds:0, Quality:"highres", Duration:0}, Hourly:{Title:"", Category:"", Description:""} };
        WebTV.OnWebTV(webtvjson);
    };



    this.OnMouseLeave = function(){if(!this.Reduce.Active && !this.ContainMouse())this.Reducing();};
};

function Form_MenuLeft(x, y, width, height, border)
{
    this.InheritClass = Form;
    this.InheritClass(x, y, width, height);
    delete this.InheritClass;
    this.Inherit("Form_MenuLeft");

    this.CanMove = false;

var rw = 25;
if(border != null)rw = border;
var rh = height-this.Border.Top-this.Border.Bottom;
var rx = width-this.Border.Left-this.Border.Right-rw;
var ry = 0;

    this.Reduce = {Active:false, X:rw-width, Y:y, Width:width, Height:height};

    this.Btn_Reduce= new Control(rx, ry, rw, rh,2);
    this.Btn_Reduce.Controls = [];
    this.Btn_Reduce.ClickLeft = function(){this.Parent.Reducing();};//{ if(MenuLeft.Visible)MenuLeft.Hide(); else MenuLeft.Show(); };
    this.Btn_Reduce.OnMouseLeave = function(){if(!this.Parent.Reduce.Active && !this.Parent.ContainMouse())this.Parent.Reducing();};
    this.Btn_Reduce.OnMouseEnter = function(){if(this.Parent.Reduce.Active)this.Parent.Reducing();};
    this.Add(this.Btn_Reduce);
    this.Btn_Reduce.LinesNumber = 1;
    this.Btn_Reduce.Draw = function(x, y, width, height, context)
    {
        x += this.Border.Left;
        y += this.Border.Top;
        width -= this.Border.Left+this.Border.Right;
        height -= this.Border.Top+this.Border.Bottom;

        context.fillStyle = "grey";
        if(this.Parent.Reduce.Active)
        {
            for(var i = 0; i < this.LinesNumber; i++)
            {
                context.beginPath();
                context.moveTo(x-width+this.LinesNumber, y);
                context.lineTo(x+this.LinesNumber, height/2);
                context.lineTo(x-width+this.LinesNumber, height);
                context.fill();
            }
        }
        else
        {
            for(var i = 0; i < this.LinesNumber; i++)
            {
                context.beginPath();
                context.moveTo(x+width+width-this.LinesNumber, y);
                context.lineTo(x+width-this.LinesNumber, height/2);
                context.lineTo(x+width+width-this.LinesNumber, height);
                context.fill();
            }
        }
        this.LinesNumber++;
        if(this.LinesNumber > width)this.LinesNumber = 1;
    };

    this.OnMouseLeave = function(){if(!this.Reduce.Active && !this.ContainMouse())this.Reducing();};
};







function NewForumControl(x, y, width, height, border)
{
    this.InheritClass = Control;
    this.InheritClass( x, y, width, height, border );
    delete this.InheritClass;
    this.Inherit("NewForumControl");

    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
    this.BackColor = "white";

var cX = 0;
var cY = 0;
var cW = width - this.Border.Right - this.Border.Left;
var cH = Appearance.TextBox.FontHeight;
var es = 5;

    this.Title = new TextBox(cX, cY, cW, cH);
    this.Title.BackText = "Title";
    this.Add(this.Title); 
cY += cH+es;
    this.NewMessage = new NewMessageControl(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - (cH+es));
    this.NewMessage.CallSave = function(){ this.Parent.CallSave(); };
    this.Add(this.NewMessage);

    this.Title.Tab = this.NewMessage.Author;
    this.NewMessage.Btn_New.Tab = this.Title;

    this.CallSave = function(){ CallPage("FORUM_NEW",  this.Title.GetText() +PageInfo.Separator+ this.NewMessage.CallFormat() ); };
};

function ForumInfoControl(x, y, width, height, foruminfo)
{
    this.InheritClass = Control;
    this.InheritClass( x, y, width, height );
    delete this.InheritClass;
    this.Inherit("ForumInfoControl");

    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
    this.BackColor = "white";
    this.CanFocus = false;

var cX = 0;
var cY = 0;
var cW = width-this.Border.Right-this.Border.Left;
var cH = Appearance.TextBox.FontHeight;
var es = 5;

    this.Rectangle.Height = this.Border.Top+this.Border.Bottom +(cH*2)+es;

    this.Title = new TextBox(cX, cY, cW, cH);
    this.Title.Enabled = false;
    this.Title.ReadOnly = true;
    this.Title.BackText = "Title";
    this.Add(this.Title);
cY += cH+es;
    this.Author = new TextBox(cX, cY, cW/2, cH);
    this.Author.Enabled = false;
    this.Author.ReadOnly = true;
    this.Author.BackText = "Auteur";
    this.Add(this.Author);
    this.Create = new TextBox(cW/2, cY, cW/2-25, cH);
    this.Create.Enabled = false;
    this.Create.ReadOnly = true;
    this.Create.BackText = "Create";
    this.Add(this.Create);
    this.Nbr = new TextBox(cW-25, cY, 25, cH);
    this.Nbr.Enabled = false;
    this.Nbr.ReadOnly = true;
    this.Nbr.BackText = "Nbr";
    this.Add(this.Nbr);

    this.OnInfo = function(foruminfo)
    {
        this.Title.SetText(foruminfo.Title);
        this.Author.SetText(foruminfo.Author);
        this.Create.SetText(foruminfo.Create);
        this.Nbr.SetText(foruminfo.Nbr.toString());
    };

    this.ClickLeft = function(){ Forum_Control.Clear(); CallPage("FORUM_LOAD", this.Title.GetText()); };
    this.OnMouseLeave = function(){if(this.Parent != null)this.Parent.OnMouseLeave();};

    this.Draw = function(x, y, width, height, context){};
    if(foruminfo != null && foruminfo != undefined)
        this.OnInfo(foruminfo);
};


function CollectionForum(x, y, width, height, border)
{
    this.InheritClass = ControlCollection;
    this.InheritClass( x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("CollectionForum");

    this.OnForumInfo = function(foruminfo)
    {
        var pW = this.Rectangle.Width-this.Border.Left-this.Border.Right;
        for(var i = 0; i < foruminfo.length; i++)
            this.OnRemplace(foruminfo[i]);
    };
    this.OnRemplace = function(msg)
    {
        for(var i = 0; i < this.Collection.length; i++)
            if(this.Collection[i].Title.Text == msg.Title)
            {
                this.Collection[i].OnInfo(msg);
                return;
            }
        this.AddCollection(new ForumInfoControl(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, 0, msg));
    };
    
    this.OnMouseLeave = function(){if(this.Parent != null)this.Parent.OnMouseLeave();};
};

//function ControlVideo(x, y, width, height)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("ControlVideo");

//    this.Border = {Left:10, Top:5, Right:20, Bottom:15 };
//    this.CanMove = true;
//    this.CanResize = true;

////    this.Add(new ControlClose());
//    this.Video = document.createElement('video');
//    this.OnVideo = function(src)
//    {
//        this.Video.src = src;
//        this.Video.load();
//        this.Video.play();
//    };
//    this.OnMouseEnter = function() { this.Menu.Show(); };
//    this.OnMouseLeave = function() { this.Menu.Hide(); };
////    this.OnMouseEnter = function() { this.Video.play(); };
////    this.OnMouseLeave = function() { this.Video.pause(); };
////    this.OnMouseWheel = function(rolled) { this.Video.currentTime += rolled; };

//    this.Menu = new Control(0+this.Border.Left, this.Bottom()-this.Border.Bottom-15, this.Rectangle.Width-this.Border.Right-this.Border.Left, 15);
////    this.Menu = new Control(0+this.Border.Left, this.Rectangle.Height-10, this.Rectangle.Width, 15);
//    this.Menu.RectangleChanged = function(){};
//    this.Menu.CanResize = true;
//    this.Menu.ParentRectangleChanged = function()
//    {
//        this.Rectangle.X = this.Parent.Rectangle.X + this.Location.X;
//        this.Rectangle.Y = this.Parent.Rectangle.Y + this.Location.Y;
//        this.OnRectangleChanged(this.Parent.Rectangle.X+this.Parent.Border.Left, this.Parent.Bottom()-this.Parent.Border.Bottom-this.Rectangle.Height, this.Parent.Rectangle.Width-this.Parent.Border.Right-this.Parent.Border.Left, this.Rectangle.Height);
////        this.OnRectangleChanged(this.Parent.Rectangle.X, this.Parent.Rectangle.Y+this.Parent.Rectangle.Height-10, this.Parent.Rectangle.Width, 15);
////        this.RectangleChanged();
//    };
//    this.Add(this.Menu);
//    
//    this.Draw = function(x, y, width, height, context)
//    {
//        if(this.Video.src != "")
//            context.drawImage(this.Video, x+this.Border.Left, y+this.Border.Top, width-this.Border.Right-this.Border.Left, height-this.Border.Top-this.Border.Bottom);
//    };
//};




//function NewMessageControl(x, y, width, height)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("NewMessageControl");

//    this.BackColor = "white";

//var cX = 0;
//var cY = 0;
//var cW = width - this.Border.Right - this.Border.Left;
//var cH = 15;
//var es = 5;

//    this.Author = new TextBox(cX, cY, cW, cH);
//    this.Author.BackText = "Auteur";
//    this.Add(this.Author);
//cY += cH+es;
//    this.Message = new TextBox(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - ((cH+es)*2));
//    this.Message.BackText = "new message ...";
//    this.Message.MultiLine = true;
//    this.Add(this.Message);
//cY += this.Message.Rectangle.Height + es;
//    this.Btn_New = new Control(cX, cY, cW, cH);
//    this.Btn_New.Text = "#New";
//    this.Btn_New.ClickLeft = function(){ this.Parent.CallSave(); };
//    this.Add(this.Btn_New);

//    this.Author.Tab = this.Message;
//    this.Message.Tab = this.Btn_New;
//    this.Btn_New.Tab = this.Author;

//    this.Focused = function(){ this.Author.OnFocus(); };

//    this.Clear = function()
//    {
//        this.Author.Clear();
//        this.Message.Clear();
//        this.Btn_New.Clear();
//    };

//    this.CallFormat = function(){ return  this.Author.GetText() +PageInfo.Separator+ this.Message.GetText(); };
//    this.CallSave = function(){ CallPage("FORUM_NEW", this.CallFormat() ); this.Clear(); };
//    this.Draw = function(x, y, width, height, context){};
//};


//function BaseMessageControl(x, y, width, height, message)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("BaseMessageControl");

//    this.BackColor = "white";

//var cX = 0;
//var cY = 0;
//var cW = width - this.Border.Right - this.Border.Left;
//var cH = 15;
//var es = 5;

//    this.Author = new TextBox(cX, cY, cW/2, cH);
//    this.Author.ReadOnly = true;
//    this.Author.BackText = "Auteur";
//    this.Add(this.Author);
//    this.Create = new TextBox(cW/2, cY, cW/2, cH);
//    this.Create.ReadOnly = true;
//    this.Create.BackText = "Create";
//    this.Add(this.Create);
//cY += cH+es;
//    this.Message = new TextBox(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - cY);
//    this.Message.ReadOnly = true;
//    this.Message.BackText = "new message ...";
//    this.Message.MaxLine = 10;
//    this.Message.MultiLine = true;
//    this.Message.TextChanged = function(){ this.ResizeTo(this.Rectangle.Width, this.Border.Top+this.Border.Bottom+(this.Lines.length*this.FontHeight)); };
//    this.Add(this.Message);

//    this.OnMessage = function(message)
//    {
//        this.Author.SetText(message.Author);
//        this.Create.SetText(message.Create);
//        this.Message.SetText(message.Message);
//        var es = 5;
//        this.ResizeTo(this.Rectangle.Width, this.Border.Top+this.Border.Bottom+ this.Author.Rectangle.Height +es+ this.Message.Rectangle.Height);
//    };

//    this.Equals = function(msg){ return this.Author.GetText() == msg.Author && this.Create.GetText() == msg.Create; };
//    this.CompareTo = function(msg){ return this.Message.GetText() == msg.Message; };
//    this.OnRemplace = function(msg)
//    {
//        this.Message.SetText(msg.Message);
//        var es = 5;
//        this.ResizeTo(this.Rectangle.Width, this.Border.Top+this.Border.Bottom+ this.Author.Rectangle.Height +es+ this.Message.Rectangle.Height);
//    };

//    this.Clear = function()
//    {
//        this.Author.Clear();
//        this.Create.Clear();
//        this.Message.Clear();
//    };

//    this.Draw = function(x, y, width, height, context){};
//    this.CallFormat = function(){ return  this.Author.GetText() +PageInfo.Separator+ this.Create.GetText(); };

//    if(message != null && message != undefined)
//        this.OnMessage(message);
//};

//function ForumControl(x, y, width, height)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("ForumControl");

//    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
//    this.BackColor = "white";
//    this.CanMove = true;
//    this.CanResize = true;

//    this.Forum = null;

//var cX = 0;
//var cY = 0;
//var cW = width-this.Border.Left-this.Border.Right
//var cH = 15;
//var es = 5;

//    this.Title = new TextBox(cX, cY, cW, cH);
//    this.Title.ReadOnly = true;
//    this.Title.BackText = "Title";
//    this.Add(this.Title);
//cY += cH+es;
//    this.BaseMessage = new BaseMessageControl(cX, cY, cW, cH*5);
//    this.Add(this.BaseMessage);
//cY += this.BaseMessage.Rectangle.Height+es;
//    this.ResponsesCollection = new ResponsesCollection(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - cY-100);
//    this.ResponsesCollection.NewControl = function(msg){ return new ResponseControl(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, 0, msg) };
//    this.Add(this.ResponsesCollection);
//cY = this.Rectangle.Height-this.Border.Top-this.Border.Bottom-100;
//    this.NewMessage = new NewMessageControl(cX, cY, cW, 100);
//    this.NewMessage.CallSave = function(){ this.Parent.CallSave(); };
//    this.Add(this.NewMessage);

//    this.KeyUpArrow = function(){ this.ResponsesCollection.KeyUpArrow(); };
//    this.KeyDownArrow = function(){ this.ResponsesCollection.KeyDownArrow(); };
//    this.OnMouseWheel = function(rolled){ if(this.Parent != null)this.ResponsesCollection.OnMouseWheel(rolled); };

//    this.CallSave = function(){ CallPage("FORUM_MESSAGE_NEW",  this.Title.GetText() +PageInfo.Separator+ this.NewMessage.CallFormat() ); this.NewMessage.Clear(); };

//    this.OnRemplace = function(msg)
//    {
//        this.Forum = msg;
//        this.Title.SetText(msg.Title);
//        this.BaseMessage.OnMessage(msg);
//        this.ResponsesCollection.MoveTo(this.ResponsesCollection.Rectangle.X, this.BaseMessage.Bottom());


//    this.ResponsesCollection.OriginalHeight = this.Rectangle.Height-this.Border.Top-this.Border.Bottom - this.BaseMessage.Location.Y-this.BaseMessage.Rectangle.Height-this.NewMessage.Rectangle.Height;

//        for(var i = 0; i < msg.Responses.length; i++)
//            this.ResponsesCollection.OnRemplace(msg.Responses[i]);
//    };
//    this.Clear = function()
//    {
//        this.Title.Clear();
//        this.BaseMessage.Clear();
//        this.ResponsesCollection.Clear();
//    };
//};

//function ResponseControl(x, y, width, height, message)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("ResponseControl");

//    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
//    this.BackColor = "white";
//    this.CanFocus = false;

//var cX = 0;
//var cY = 0;
//var cW = width-this.Border.Left-this.Border.Right;
//var cH = 15;

//    this.Message = null;

//    this.Btn_New = new ControlOnOff(cW-(cH*2), 0, cH*2, cH);
//    this.Btn_New.SetText("#NEW", "#NEW");
//    this.Btn_New.OnOffChanged = function(){ this.Parent.OnRemplace(this.Parent.Message); if(this.OnOff)this.Parent.NewMessage.OnFocus(); };
//    this.Add(this.Btn_New);
//    this.BaseMessage = new BaseMessageControl(cX, cY, cW, cH*5);
//    this.BaseMessage.CanFocus = false;
//    this.Add(this.BaseMessage);
//cY += this.BaseMessage.Rectangle.Height;
//    this.Btn_Open = new Control(cX, cY, cW, cH);
//    this.Btn_Open.SetText("#CLOSE");
//    this.Btn_Open.ClickLeft = function()
//    {
//        if(this.Text == "#CLOSE") this.SetText("#OPEN");
//        else if(this.Text == "#OPEN") this.SetText("#FULL");
//        else if(this.Text == "#FULL") this.SetText("#CLOSE");
//        this.Parent.OnRemplace(this.Parent.Message);
//    };
//    this.Add(this.Btn_Open);
//cY += this.Btn_Open.Rectangle.Height;
//    this.ResponsesCollection = new ResponsesCollection(cX, cY, cW, 150);
//    this.Add(this.ResponsesCollection);
//cY += this.ResponsesCollection.Rectangle.Height;
//    this.NewMessage = new NewMessageControl(cX, cY, cW, 100);
//    this.NewMessage.CallSave = function(){ this.Parent.CallSave(); };
//    this.Add(this.NewMessage);

//    this.CallSave = function(){CallPage("FORUM_RESPONSE_NEW",  this.Parent.Parent.Title.GetText() +PageInfo.Separator+ this.BaseMessage.CallFormat() +PageInfo.Separator+ this.NewMessage.CallFormat() ); this.NewMessage.Clear(); };

//    this.Equals = function(msg){ return this.BaseMessage.Equals(msg); };
//    this.CompareTo = function(msg){ return this.BaseMessage.CompareTo(msg) && this.ResponsesCollection.Collection.length == msg.Responses.Length; };

//    this.OnRemplace = function(msg)
//    {
//        this.Message = msg;
//        if(!this.BaseMessage.CompareTo(msg))
//            this.BaseMessage.OnRemplace(msg);

//        for(var i = 0; i < msg.Responses.length; i++)
//            this.ResponsesCollection.OnRemplace(msg.Responses[i]);

//        this.OnReplace();
//    };

//    this.OnReplace = function()
//    {
//        var pY = this.Rectangle.Y+this.Border.Top+ this.BaseMessage.Rectangle.Height;
//        var pH = this.Border.Top+this.Border.Bottom+ this.BaseMessage.Rectangle.Height;

//        if( this.ResponsesCollection.Collection.length > 0 )
//        {
//            pH += this.Btn_Open.Rectangle.Height;
//            this.ResizeTo(this.Rectangle.Width, pH);
//            this.Btn_Open.Show();
//            this.Btn_Open.MoveTo(this.Btn_Open.Rectangle.X, pY);
//            pY += this.Btn_Open.Rectangle.Height;

//            if(this.Btn_Open.GetText() == "#OPEN" || this.Btn_Open.GetText() == "#FULL")
//            {
//                if(this.Btn_Open.GetText() == "#OPEN")
//                    this.ResponsesCollection.OnCollection(false);
//                else
//                    this.ResponsesCollection.OnCollection(true);

//                pH += this.ResponsesCollection.Rectangle.Height;
//                this.ResizeTo(this.Rectangle.Width, pH);
//                this.ResponsesCollection.Show();
//                this.ResponsesCollection.MoveTo(this.ResponsesCollection.Rectangle.X, pY);
//                pY += this.ResponsesCollection.Rectangle.Height;
//            }
//            else
//            {
//                this.ResponsesCollection.Hide();
//            }
//        }
//        else
//        {
//            this.Btn_Open.Hide();
//            this.ResponsesCollection.Hide();
//        }
//        if( this.Btn_New.OnOff)
//        {
//            pH += this.NewMessage.Rectangle.Height;
//            this.ResizeTo(this.Rectangle.Width, pH);
//            this.NewMessage.Show();
//            this.NewMessage.MoveTo(this.NewMessage.Rectangle.X, pY);
//            pY += this.NewMessage.Rectangle.Height;
//        }
//        else
//        {
//            this.NewMessage.Hide();
//        }
//        this.ResizeTo(this.Rectangle.Width, pH);
//        this.OnCollection();
//    };

//    this.OnCollection = function(){ if(this.Parent != null && this.Parent.IsInherit("ResponsesCollection"))this.Parent.OnCollection(); };

//    this.Draw = function(x, y, width, height, context){};

//    if(message != null && message != undefined)
//    {
//        this.BaseMessage.OnMessage(message);
//        this.OnRemplace(message);
//    };
//};

//function ResponsesCollection(x, y, width, height)
//{
//    this.InheritClass = ControlCollection;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("ResponsesCollection");

//    this.BackColor = "green";
//    
//    this.NewControl = function(msg){ return new BaseMessageControl(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, 0, msg) };
//    this.OnRemplace = function(msg)
//    {
//        for(var i = 0; i < this.Collection.length; i++)
//            if(this.Collection[i].Equals(msg))
//            {
//                if(!this.Collection[i].CompareTo(msg))this.Collection[i].OnRemplace(msg);
//                return;
//            }
//        var control = this.NewControl(msg);
//        this.AddCollection(control);
//    };
//};




































////####/////////////////////////////////////////////////////////////////
//// à été vérifier!!! fonction utilisateur!!!
//var Draw = function(){};
//var MouseMove = function(e) {};
//var MouseDownLeft = function(e) { OnTarget(); return false; };
//var MouseUpLeft = function(e) { return false; };
//var MouseDownRight = function(e) { MapCentred(); return false; };
//var MouseUpRight = function(e) { return false; };
//var KeyUp = function(e) { return false; };
//var KeyDown = function(e) { return false; };
//var ResponsePower = function(message){};


//var Forum_Collection = null;
//var Forum_Control = null;

//var Load = function()
//{
//    FormBase = new Form( PageInfo.Frame.X, PageInfo.Frame.Y, 1000, PageInfo.Frame.Height);
//    FormBase.BackColor = "grey";
//    FormBase.CanResize = true;
//    FormBase.CanScale = true;


//    FormBase.Add( new ControlInfo(750, 10, 250, 450) );

//    Forum_Collection = new CollectionForum(500, 100, 350, 250);
//    FormBase.Add(Forum_Collection);

//    Forum_Control = new ForumControl(600,10,400,500);
//    FormBase.Add( Forum_Control );
// 
// 
//    FormBase.Add( new NewForumControl(600, 10, 250, 250) );
//    
// 
//    Forum_Collection.OnForumInfo( JSONDeserialize(document.getElementById("ForumInfo").value) );

////    var control = new Control(0, 0, 300, 300);
////    control.Border = {Left:10, Top:5, Right:20, Bottom:15 };
////    control.CanMove = true;
////    control.CanResize = true;
////    control.SetText("control");
////    control.OnClip();
////  
////    FormBase.Add(control);
////    var control2 = new Control(0, 0, 150, 150);
////    control2.CanMove = true;
////    control2.CanResize = true;
////    control2.SetText("control2");
////    control2.Border = {Left:10, Top:5, Right:20, Bottom:15 };
////    control.Add(control2);
////    var control3 = new Control(10, 10, 25, 25);
////    control3.CanMove = true;
////    control3.CanResize = true;
////    control3.SetText("control3");
////    control2.Add(control3);
////    
////    control3 = new Control(10, 10, 100, 50);
////    control3.CanMove = true;
////    control3.CanResize = true;
////    control3.CanScale = true;
////    control3.SetText("control5");
////    control3.Border = {Left:10, Top:5, Right:20, Bottom:15 };
////    control2.Add(control3);
////    var control4 = new Control(10, 10, 10, 10);
////    control4.CanMove = true;
////    control4.CanResize = true;
////    control4.SetText("control4");
////    control3.Add(control4);

//};

//var ResponsePage = function(message)
//{
//    if(message.COMMAND == "FORUM")
//    {
////        var tmp_ListIndex = Forum_Control.ResponsesCollection.ListIndex;
//        Forum_Control.OnMessage(message.Forum);
////        Forum_Control.ResponsesCollection.ListIndex = tmp_ListIndex;
////        Forum_Control.ResponsesCollection.OnRolled();
//         
//        Forum_Control.OnFocus();
//    }
//    else if(message.COMMAND == "FORUMINFO")
//    {
//        Forum_Collection.OnForumInfo(message.List);
//    }
//};

//function NewMessageControl(x, y, width, height)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("NewMessageControl");

//    this.BackColor = "white";

//var cX = 0;
//var cY = 0;
//var cW = width - this.Border.Right - this.Border.Left;
//var cH = 15;
//var es = 5;

//    this.Author = new TextBox(cX, cY, cW, cH);
//    this.Author.BackText = "Auteur";
//    this.Add(this.Author);
//cY += cH+es;
//    this.Message = new TextBox(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - ((cH+es)*2));
//    this.Message.BackText = "new message ...";
//    this.Message.MultiLine = true;
//    this.Add(this.Message);
//cY += this.Message.Rectangle.Height + es;
//    this.Btn_New = new Control(cX, cY, cW, cH);
//    this.Btn_New.Text = "#New";
//    this.Btn_New.ClickLeft = function(){ this.Parent.CallSave(); };
//    this.Add(this.Btn_New);

//    this.Author.Tab = this.Message;
//    this.Message.Tab = this.Btn_New;
//    this.Btn_New.Tab = this.Author;

//    this.Focused = function(){ this.Author.OnFocus(); };

//    this.Clear = function()
//    {
//        this.Author.Clear();
//        this.Message.Clear();
//        this.Btn_New.Clear();
//    };

//    this.CallFormat = function(){ return  this.Author.GetText() +PageInfo.Separator+ this.Message.GetText(); };
//    this.CallSave = function(){ CallPage("FORUM_NEW", this.CallFormat() ); this.Clear(); };
//    this.Draw = function(x, y, width, height, context){};
//};

//function NewForumControl(x, y, width, height)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("NewForumControl");

//    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
//    this.BackColor = "white";
//    this.CanMove = true;
//    this.CanResize = true;

//var cX = 0;
//var cY = 0;
//var cW = width - this.Border.Right - this.Border.Left;
//var cH = 15;
//var es = 5;

//    this.Title = new TextBox(cX, cY, cW, cH);
//    this.Title.BackText = "Title";
//    this.Add(this.Title); 
//cY += cH+es;
//    this.NewMessage = new NewMessageControl(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - (cH+es));
//    this.NewMessage.CallSave = function(){ this.Parent.CallSave(); };
//    this.Add(this.NewMessage);

//    this.CallSave = function(){ CallPage("FORUM_NEW",  this.Title.GetText() +PageInfo.Separator+ this.NewMessage.CallFormat() ); };
//};

//function BaseMessageControl(x, y, width, height, message)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("MessageControl");

//    this.BackColor = "white";

//var cX = 0;
//var cY = 0;
//var cW = width - this.Border.Right - this.Border.Left;
//var cH = 15;
//var es = 5;

//    this.Author = new TextBox(cX, cY, cW/2, cH);
//    this.Author.ReadOnly = true;
//    this.Author.BackText = "Auteur";
//    this.Add(this.Author);
//    this.Create = new TextBox(cW/2, cY, cW/2, cH);
//    this.Create.ReadOnly = true;
//    this.Create.BackText = "Create";
//    this.Add(this.Create);
//cY += cH+es;
//    this.Message = new TextBox(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - cY);
//    this.Message.ReadOnly = true;
//    this.Message.BackText = "new message ...";
//    this.Message.MaxLine = 10;
//    this.Message.MultiLine = true;
//    this.Message.TextChanged = function(){ this.ResizeTo(this.Rectangle.Width, this.Border.Top+this.Border.Bottom+(this.Lines.length*this.FontHeight)); };
//    this.Add(this.Message);

//    this.OnMessage = function(message)
//    {
//        this.Author.SetText(message.Author);
//        this.Create.SetText(message.Create);
//        this.Message.SetText(message.Message);
//        var es = 5;
//        this.ResizeTo(this.Rectangle.Width, this.Border.Top+this.Border.Bottom+ this.Author.Rectangle.Height +es+ this.Message.Rectangle.Height);
//    };
//    this.Draw = function(x, y, width, height, context){};
//    this.CallFormat = function(){ return  this.Author.GetText() +PageInfo.Separator+ this.Create.GetText(); };

//    this.ID = function(){ return this.Author.GetText() + this.Create.GetText(); };
//    this.Compared = function(){ return this.Message.GetText(); };

//    if(message != null && message != undefined)
//        this.OnMessage(message);
//};

//function ForumInfoControl(x, y, width, height, foruminfo)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("ForumInfoControl");

//    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
//    this.BackColor = "white";
//    this.CanFocus = false;

//var cX = 0;
//var cY = 0;
//var cW = width-this.Border.Right-this.Border.Left;
//var cH = 15;
//var es = 5;

//this.Rectangle.Height = this.Border.Top+this.Border.Bottom +(cH*2)+es;

//    this.Title = new TextBox(cX, cY, cW, cH);
//    this.Title.ReadOnly = true;
//    this.Title.BackText = "Title";
//    this.Add(this.Title);
//cY += cH+es;
//    this.Author = new TextBox(cX, cY, cW/2, cH);
//    this.Author.ReadOnly = true;
//    this.Author.BackText = "Auteur";
//    this.Add(this.Author);
//    this.Create = new TextBox(cW/2, cY, cW/2-25, cH);
//    this.Create.ReadOnly = true;
//    this.Create.BackText = "Create";
//    this.Add(this.Create);
//    this.Nbr = new TextBox(cW-25, cY, 25, cH);
//    this.Nbr.ReadOnly = true;
//    this.Nbr.BackText = "Nbr";
//    this.Add(this.Nbr);

//    this.OnInfo = function(foruminfo)
//    {
//        this.Title.SetText(foruminfo.Title);
//        this.Author.SetText(foruminfo.Author);
//        this.Create.SetText(foruminfo.Create);
//        this.Nbr.SetText(foruminfo.Nbr.toString());
//    };

//    this.ClickLeft = function(){ CallPage("FORUM_LOAD", this.Title.GetText()); };

//    this.Draw = function(x, y, width, height, context){};
//    if(foruminfo != null && foruminfo != undefined)
//        this.OnInfo(foruminfo);
//};

//function ForumControl(x, y, width, height)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("ForumControl");

//    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
//    this.BackColor = "white";
//    this.CanMove = true;
//    this.CanResize = true;

//    this.Forum = null;

//var cX = 0;
//var cY = 0;
//var cW = width-this.Border.Left-this.Border.Right
//var cH = 15;
//var es = 5;

//    this.Title = new TextBox(cX, cY, cW, cH);
//    this.Title.ReadOnly = true;
//    this.Title.BackText = "Title";
//    this.Add(this.Title);
//cY += cH+es;
//    this.Message = new BaseMessageControl(cX, cY, cW, cH*5);
//    this.Add(this.Message);
//cY += this.Message.Rectangle.Height+es;
//    this.ResponsesCollection = new ResponsesCollection(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - cY-100);
//    this.Add(this.ResponsesCollection);
//cY = this.Rectangle.Height-this.Border.Top-this.Border.Bottom-100;
//    this.NewMessage = new NewMessageControl(cX, cY, cW, 100);
//    this.NewMessage.CallSave = function(){ this.Parent.CallSave(); };
//    this.Add(this.NewMessage);

//    this.KeyUpArrow = function(){ this.ResponsesCollection.KeyUpArrow(); };
//    this.KeyDownArrow = function(){ this.ResponsesCollection.KeyDownArrow(); };
//    this.OnMouseWheel = function(rolled){ if(this.Parent != null)this.ResponsesCollection.OnMouseWheel(rolled); };

//    this.CallSave = function(){ CallPage("FORUM_MESSAGE_NEW",  this.Title.GetText() +PageInfo.Separator+ this.NewMessage.CallFormat() ); };
//    this.OnMessage = function(forum)
//    {
//        this.Forum = forum;
//        this.Title.SetText(forum.Title);
//        this.Message.OnMessage(forum);
////        this.ResponsesCollection.Clear();
//        this.ResponsesCollection.MoveTo(this.ResponsesCollection.Rectangle.X, this.Message.Bottom());
//        var pW = this.ResponsesCollection.Rectangle.Width-this.ResponsesCollection.Border.Left-this.ResponsesCollection.Border.Right;
//        for(var i = 0; i < forum.Responses.length; i++)
//            this.ResponsesCollection.AddCollection(new ResponseControl(0, 0, pW, 0, forum.Responses[i]));
//    };
//};

//function ResponseControl(x, y, width, height, message)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("ResponseControl");

//    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
//    this.BackColor = "white";
//    this.CanFocus = false;

//var cX = 0;
//var cY = 0;
//var cW = width-this.Border.Left-this.Border.Right;
//var cH = 15;

//    this.Message = null;

//    this.BaseMessage = new BaseMessageControl(cX, cY, cW, cH*5);
//    this.BaseMessage.CanFocus = false;
//    this.Add(this.BaseMessage);

//    this.Btn_New = new ControlOnOff(cW-(cH*2), 0, cH*2, cH);
//    this.Btn_New.SetText("#NEW", "#NEW");
//    this.Btn_New.OnOffChanged = function(){ this.Parent.OnMessage(this.Parent.Message); if(this.OnOff)this.Parent.NewMessage.OnFocus(); };
//    this.Add(this.Btn_New);
//cY += this.BaseMessage.Rectangle.Height;
//    this.Btn_Open = new Control(cX, cY, cW, cH);
//    this.Btn_Open.SetText("#CLOSE");
//    this.Btn_Open.ClickLeft = function()
//    {
//        if(this.Text == "#CLOSE") this.SetText("#OPEN");
//        else if(this.Text == "#OPEN") this.SetText("#FULL");
//        else if(this.Text == "#FULL") this.SetText("#CLOSE");
//        this.Parent.OnMessage(this.Parent.Message); 
//    };
//    this.Add(this.Btn_Open);
//cY += this.Btn_Open.Rectangle.Height;
//    this.ResponsesCollection = new ResponsesCollection(cX, cY, cW, 150);
//    this.Add(this.ResponsesCollection);
//cY += this.ResponsesCollection.Rectangle.Height;
//    this.NewMessage = new NewMessageControl(cX, cY, cW, 100);
//    this.NewMessage.CallSave = function(){ this.Parent.CallSave(); };
//    this.Add(this.NewMessage);

//    this.CallSave = function(){CallPage("FORUM_RESPONSE_NEW",  this.Parent.Parent.Title.GetText() +PageInfo.Separator+ this.BaseMessage.CallFormat() +PageInfo.Separator+ this.NewMessage.CallFormat() ); };

//    this.OnMessage = function(message)
//    {
//        this.Message = message;
//        this.Controls = new Array();
//        this.Add(this.Btn_New);
//        this.Add(this.BaseMessage);
//        this.BaseMessage.OnMessage(message);
//        var pY = this.BaseMessage.Rectangle.Height;
//        var pH = this.Border.Top+this.Border.Bottom+ this.BaseMessage.Rectangle.Height;
//        this.ResponsesCollection.Clear();
//        if( message.Responses.length > 0 )
//        {
//            pH += this.Btn_Open.Rectangle.Height;
//            this.ResizeTo(this.Rectangle.Width, pH);
//            this.Btn_Open.Location.Y = pY;
//            this.Add(this.Btn_Open);
//            pY += this.Btn_Open.Rectangle.Height;
//            if(this.Btn_Open.GetText() == "#OPEN" || this.Btn_Open.GetText() == "#FULL")
//            {
//                var pW = this.ResponsesCollection.Rectangle.Width-this.ResponsesCollection.Border.Left-this.ResponsesCollection.Border.Right;
//                for(var i = 0; i < message.Responses.length; i++)
//                    this.ResponsesCollection.AddCollection(new BaseMessageControl(0, 0, pW, 0, message.Responses[i]));

//                if(this.Btn_Open.GetText() == "#OPEN")
//                    this.ResponsesCollection.OnCollection(false);
//                else
//                    this.ResponsesCollection.OnCollection(true);
//        
//                pH += this.ResponsesCollection.Rectangle.Height;
//                this.ResizeTo(this.Rectangle.Width, pH);
//                this.ResponsesCollection.Location.Y = pY;
//                this.Add(this.ResponsesCollection);
//                pY += this.ResponsesCollection.Rectangle.Height;
//            }        
//        }        
//        if( this.Btn_New.OnOff)
//        {
//            pH += this.NewMessage.Rectangle.Height;

//            this.ResizeTo(this.Rectangle.Width, pH);
//            this.NewMessage.Location.Y = pY;
//            this.Add(this.NewMessage);
//            pY += this.NewMessage.Rectangle.Height;
//        }
//        this.ResizeTo(this.Rectangle.Width, pH);
//        this.OnCollection();
//    };

//    this.OnCollection = function(){ if(this.Parent != null && this.Parent.IsInherit("ResponsesCollection"))this.Parent.OnCollection(); };

//    this.Draw = function(x, y, width, height, context){};
//    this.ID = function(){ return this.BaseMessage.ID() };//+ this.ResponsesCollection.Collection.length; };
//    this.Compared = function(){ return this.BaseMessage.Compared() + this.ResponsesCollection.Collection.length; };

//    if(message != null && message != undefined)
//        this.OnMessage(message);
//};

//function ResponsesCollection(x, y, width, height)
//{
//    this.InheritClass = ControlCollection;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("ResponsesCollection");

//    this.BackColor = "green";
//    this.CanMove = true;
//    this.ResponsesCollection_AddCollection = this.AddCollection;
//    this.AddCollection = function(control)
//    {
//        for(var i = 0; i < this.Collection.length; i++)
//            if(this.Collection[i].ID() == control.ID())
//            {
//                if(this.Collection[i].Compared() == control.Compared()){alert("compared"); return; }
//                else { alert("remplaced"); this.Collection[i] = control; this.OnCollection(); return; }           
//            }
//        alert("added");
//        this.ResponsesCollection_AddCollection(control);
//    };
//};
//function CollectionForum(x, y, width, height)
//{
//    this.InheritClass = ControlCollection;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("CollectionForum");

//    this.CanMove = true;

//    this.CollectionForum_AddCollection = this.AddCollection;
//    this.AddCollection = function(control)
//    {
//        for(var i = 0; i < this.Collection.length; i++)
//            if(this.Collection[i].Title.Text == control.Title.Text)
//                return;
//        this.CollectionForum_AddCollection(control);
//    };
//    this.OnForumInfo = function(foruminfo)
//    {
//        var pW = this.Rectangle.Width-this.Border.Left-this.Border.Right;
//        for(var i = 0; i < foruminfo.length; i++)
//            this.AddCollection(new ForumInfoControl(0, 0, pW, 0, foruminfo[i]));
//    };
//};

//function ControlVideo(x, y, width, height)
//{
//    this.InheritClass = Control;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("ControlVideo");

//    this.Border = {Left:10, Top:5, Right:20, Bottom:15 };
//    this.CanMove = true;
//    this.CanResize = true;

////    this.Add(new ControlClose());
//    this.Video = document.createElement('video');
//    this.OnVideo = function(src)
//    {
//        this.Video.src = src;
//        this.Video.load();
//        this.Video.play();
//    };
//    this.OnMouseEnter = function() { this.Menu.Show(); };
//    this.OnMouseLeave = function() { this.Menu.Hide(); };
////    this.OnMouseEnter = function() { this.Video.play(); };
////    this.OnMouseLeave = function() { this.Video.pause(); };
////    this.OnMouseWheel = function(rolled) { this.Video.currentTime += rolled; };

//    this.Menu = new Control(0+this.Border.Left, this.Bottom()-this.Border.Bottom-15, this.Rectangle.Width-this.Border.Right-this.Border.Left, 15);
////    this.Menu = new Control(0+this.Border.Left, this.Rectangle.Height-10, this.Rectangle.Width, 15);
//    this.Menu.RectangleChanged = function(){};
//    this.Menu.CanResize = true;
//    this.Menu.ParentRectangleChanged = function()
//    {
//        this.Rectangle.X = this.Parent.Rectangle.X + this.Location.X;
//        this.Rectangle.Y = this.Parent.Rectangle.Y + this.Location.Y;
//        this.OnRectangleChanged(this.Parent.Rectangle.X+this.Parent.Border.Left, this.Parent.Bottom()-this.Parent.Border.Bottom-this.Rectangle.Height, this.Parent.Rectangle.Width-this.Parent.Border.Right-this.Parent.Border.Left, this.Rectangle.Height);
////        this.OnRectangleChanged(this.Parent.Rectangle.X, this.Parent.Rectangle.Y+this.Parent.Rectangle.Height-10, this.Parent.Rectangle.Width, 15);
////        this.RectangleChanged();
//    };
//    this.Add(this.Menu);
//    
//    this.Draw = function(x, y, width, height, context)
//    {
//        if(this.Video.src != "")
//            context.drawImage(this.Video, x+this.Border.Left, y+this.Border.Top, width-this.Border.Right-this.Border.Left, height-this.Border.Top-this.Border.Bottom);
//    };
//};


