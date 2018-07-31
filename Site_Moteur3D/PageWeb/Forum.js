
var DrawUp_Grey = function(x, y, width, height, context)
{
    context.fillStyle = "rgba(125, 125, 125, 0.3)";
    context.fillRect(x, y, width, height);
};


function BaseMessageControl(x, y, width, height)//, message)
{
    this.InheritClass = Control;
    this.InheritClass( x, y, width, height );
    delete this.InheritClass;
    this.Inherit("BaseMessageControl");

//    this.Border = {Left:25, Top:25, Right:25, Bottom:25 };
//    this.BackColor = "white";

    this.Enabled = false;

var cX = 0;
var cY = 0;
var cW = width - this.Border.Right - this.Border.Left;
var cH = Appearance.TextBox.FontHeight;
var es = 5;

    this.Author = new TextBox(cX, cY, cW/2, cH);
    this.Author.Enabled = false;
    this.Author.ReadOnly = true;
    this.Author.CanDrop = true;
    this.Author.BackText = "Auteur";
    this.Author.DrawUp = DrawUp_Grey;
    this.Add(this.Author);
    this.Create = new TextBox(cW/2, cY, cW/2, cH);
    this.Create.Enabled = false;
    this.Create.ReadOnly = true;
    this.Create.BackText = "Create";
    this.Create.DrawUp = DrawUp_Grey;
    this.Add(this.Create);
cY += cH;//+es;
    this.Message = new TextBox(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - cY);
    this.Message.Enabled = false;
    this.Message.ReadOnly = true;
    this.Message.CanDrop = true;
    this.Message.BackText = "new message ...";
    this.Message.MaxLine = 10;
    this.Message.MultiLine = true;
    this.Message.TextChanged = function(){ this.ResizeTo(this.Rectangle.Width, this.Border.Top+this.Border.Bottom+(this.Lines.length*Appearance.TextBox.FontHeight)); };
    this.Add(this.Message);

    this.OnMessage = function(message)
    {
        this.Author.SetText(message.Author);
        this.Create.SetText(message.Create);
        this.Message.SetText(message.Message);
        var es = 5;
        this.ResizeTo(this.Rectangle.Width, this.Border.Top+this.Border.Bottom+ this.Author.Rectangle.Height +es+ this.Message.Rectangle.Height);
    };
    this.OnRemplace = function(msg)
    {
        this.Message.SetText(msg.Message);
        var es = 5;
        this.ResizeTo(this.Rectangle.Width, this.Border.Top+this.Border.Bottom+ this.Author.Rectangle.Height +es+ this.Message.Rectangle.Height);
    };

    this.Equals = function(msg){ return this.Author.GetText() == msg.Author && this.Create.GetText() == msg.Create; };
    this.CompareTo = function(msg){ return this.Message.GetText() == msg.Message; };

    this.Clear = function()
    {
        this.Author.Clear();
        this.Create.Clear();
        this.Message.Clear();
    };

    this.Draw = function(x, y, width, height, context){};
    this.CallFormat = function(){ return  this.Author.GetText() +PageInfo.Separator+ this.Create.GetText(); };

//    if(message != null && message != undefined)
//        this.OnMessage(message);
};

function ResponseControl(x, y, width, height, border)//, message)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ResponseControl");

    this.Border = {Left:5, Top:5, Right:5, Bottom:5 };
//    this.BackColor = "white";
    this.CanFocus = false;

var cX = 0;
var cY = 0;
var cW = width-this.Border.Left-this.Border.Right;
var cH = Appearance.TextBox.FontHeight;

    this.Message = null;

    this.Btn_New = new ControlOnOff(cW-(cH*2), 0, cH*2, cH);
    this.Btn_New.SetText("#NEW", "#NEW");
    this.Btn_New.OnOffChanged = function(){ this.Parent.OnRemplace(this.Parent.Message); if(this.OnOff)this.Parent.NewMessage.OnFocus(); };
    this.Add(this.Btn_New);
    this.BaseMessage = new BaseMessageControl(cX, cY, cW, cH*5);
//    this.BaseMessage.Enabled = false;
    this.BaseMessage.CanFocus = false;
    this.Add(this.BaseMessage);
cY += this.BaseMessage.Rectangle.Height;
    this.Btn_Open = new Control(cX, cY, cW, cH);
    this.Btn_Open.SetText("#CLOSE");
    this.Btn_Open.ClickLeft = function()
    {
        if(this.Text == "#CLOSE") this.SetText("#OPEN");
        else if(this.Text == "#OPEN") this.SetText("#FULL");
        else if(this.Text == "#FULL") this.SetText("#CLOSE");
        this.Parent.OnRemplace(this.Parent.Message);
    };
    this.Add(this.Btn_Open);
cY += this.Btn_Open.Rectangle.Height;
    this.ResponsesCollection = new ResponsesCollection(cX, cY, cW, 150, {Left:50, Top:2, Right:50, Bottom:2} );
//    this.ResponsesCollection.BackColor = "green";
//    this.ResponsesCollection.Enabled = false;
    this.Add(this.ResponsesCollection);
cY += this.ResponsesCollection.Rectangle.Height;
    this.NewMessage = new NewMessageControl(cX, cY, cW, 100);
    this.NewMessage.CallSave = function(){ this.Parent.CallSave(); };
    this.Add(this.NewMessage);

    this.CallSave = function(){CallPage("FORUM_RESPONSE_NEW",  this.Parent.Parent.Title.GetText() +PageInfo.Separator+ this.BaseMessage.CallFormat() +PageInfo.Separator+ this.NewMessage.CallFormat() ); this.NewMessage.Clear(); };

    this.Equals = function(msg){ return this.BaseMessage.Equals(msg); };
    this.CompareTo = function(msg){ return this.BaseMessage.CompareTo(msg) && this.ResponsesCollection.Collection.length == msg.Responses.Length; };

    this.OnMessage = function(message)
    {
        this.BaseMessage.OnMessage(message);
        this.OnRemplace(message);
    
    };
    this.OnRemplace = function(msg)
    {
        this.Message = msg;
        if(!this.BaseMessage.CompareTo(msg))
            this.BaseMessage.OnRemplace(msg);

        for(var i = 0; i < msg.Responses.length; i++)
            this.ResponsesCollection.OnRemplace(msg.Responses[i]);

        this.OnReplace();
    };

    this.OnReplace = function()
    {
        var pY = this.Rectangle.Y+this.Border.Top+ this.BaseMessage.Rectangle.Height;
        var pH = this.Border.Top+this.Border.Bottom+ this.BaseMessage.Rectangle.Height;

        if( this.ResponsesCollection.Collection.length > 0 )
        {
            pH += this.Btn_Open.Rectangle.Height;
            this.ResizeTo(this.Rectangle.Width, pH);
            this.Btn_Open.Show();
            this.Btn_Open.MoveTo(this.Btn_Open.Rectangle.X, pY);
            pY += this.Btn_Open.Rectangle.Height;

            if(this.Btn_Open.GetText() == "#OPEN" || this.Btn_Open.GetText() == "#FULL")
            {
                if(this.Btn_Open.GetText() == "#OPEN")
                    this.ResponsesCollection.OnCollection(false);
                else
                    this.ResponsesCollection.OnCollection(true);

                pH += this.ResponsesCollection.Rectangle.Height;
                this.ResizeTo(this.Rectangle.Width, pH);
                this.ResponsesCollection.Show();
//                this.ResponsesCollection.Enabled = false;
                this.ResponsesCollection.MoveTo(this.ResponsesCollection.Rectangle.X, pY);
                pY += this.ResponsesCollection.Rectangle.Height;
            }
            else
            {
                this.ResponsesCollection.Hide();
            }
        }
        else
        {
            this.Btn_Open.Hide();
            this.ResponsesCollection.Hide();
        }
        if( this.Btn_New.OnOff)
        {
            pH += this.NewMessage.Rectangle.Height;
            this.ResizeTo(this.Rectangle.Width, pH);
            this.NewMessage.Show();
            this.NewMessage.MoveTo(this.NewMessage.Rectangle.X, pY);
            pY += this.NewMessage.Rectangle.Height;
        }
        else
        {
            this.NewMessage.Hide();
        }
        this.ResizeTo(this.Rectangle.Width, pH);
        this.OnCollection();
    };

    this.OnCollection = function(){ if(this.Parent != null && this.Parent.IsInherit("ResponsesCollection"))this.Parent.OnCollection(); };

    this.Draw = function(x, y, width, height, context){};

//    if(message != null && message != undefined)
//    {
//        this.BaseMessage.OnMessage(message);
//        this.OnRemplace(message);
//    };
};


function NewMessageControl(x, y, width, height)
{
    this.InheritClass = Control;
    this.InheritClass( x, y, width, height );
    delete this.InheritClass;
    this.Inherit("NewMessageControl");

//    this.BackColor = "white";

var cX = 0;
var cY = 0;
var cW = width - this.Border.Right - this.Border.Left;
var cH = Appearance.TextBox.FontHeight;
var es = 5;

    this.Author = new TextBox(cX, cY, cW, cH);
    this.Author.CanDrop = true;
    this.Author.BackText = "Auteur";
    this.Add(this.Author);
cY += cH+es;
    this.Message = new TextBox(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - ((cH+es)*2));
    this.Message.CanDrop = true;
    this.Message.BackText = "new message ...";
    this.Message.MultiLine = true;
    this.Add(this.Message);
cY += this.Message.Rectangle.Height + es;
    this.Btn_New = new Control(cX, cY, cW, cH);
    this.Btn_New.Text = "#New";
    this.Btn_New.ClickLeft = function(){ this.Parent.CallSave(); };
    this.Add(this.Btn_New);

    this.Author.Tab = this.Message;
    this.Message.Tab = this.Btn_New;
    this.Btn_New.Tab = this.Author;

    this.Focused = function(){ this.Author.OnFocus(); };

    this.Clear = function()
    {
        this.Author.Clear();
        this.Message.Clear();
        this.Btn_New.Clear();
    };

    this.CallFormat = function(){ return  this.Author.GetText() +PageInfo.Separator+ this.Message.GetText(); };
//    this.CallSave = function(){ this.Clear(); };
    this.CallSave = function(){ CallPage("FORUM_NEW", this.CallFormat() ); this.Clear(); };
    this.Draw = function(x, y, width, height, context){};
};


function ForumControl(x, y, width, height, border)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ForumControl");

//    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
//    this.BackColor = "white";
//    this.CanMove = true;
//    this.CanResize = true;
//    this.CanScale = true;

    this.Forum = null;

var cX = 0;
var cY = 0;
var cW = width-this.Border.Left-this.Border.Right;
var cH = Appearance.TextBox.FontHeight;
var es = 5;

    this.Title = new TextBox(cX, cY, cW, cH);
    this.Title.ReadOnly = true;
    this.Title.CanDrop = true;
    this.Title.BackText = "Title";
    this.Add(this.Title);
cY += cH+es;
    this.BaseMessage = new BaseMessageControl(cX, cY, cW, cH*5);
    this.Add(this.BaseMessage);
cY += this.BaseMessage.Rectangle.Height+es;
    this.ResponsesCollection = new ResponsesCollection(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - cY-100,5);
    this.ResponsesCollection.NewControl = function(){ return new ResponseControl(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, 0, 5) };
//    this.ResponsesCollection.NewControl = function(msg){ return new ResponseControl(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, 0, msg) };
    this.Add(this.ResponsesCollection);
cY = this.Rectangle.Height-this.Border.Top-this.Border.Bottom-100;
    this.NewMessage = new NewMessageControl(cX, cY, cW, 100);
    this.NewMessage.CallSave = function(){ this.Parent.CallSave(); };
    this.Add(this.NewMessage);


    this.Reorganize = function(cX, cY, cW, cH, es)//???????????????????????????????????
    {
        cX += this.Rectangle.X+this.Border.Left;
        cY += this.Rectangle.Y+this.Border.Top;
    
        this.Title.OnRectangleChanged(cX, cY, cW, cH);
cY += cH+es;
        this.BaseMessage.OnRectangleChanged(cX, cY, cW, cH*5);
cY += this.BaseMessage.Rectangle.Height+es;

        this.ResponsesCollection.OnRectangleChanged(cX, cY, cW, this.ResponsesCollection.OriginalHeight);
//        this.ResponsesCollection.OnRectangleChanged(cX+10, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - this.BaseMessage.Location.Y-this.BaseMessage.Rectangle.Height-this.NewMessage.Rectangle.Height);
//        this.ResponsesCollection.OnRectangleChanged(cX+10, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - this.BaseMessage.Rectangle.Height-es -100);
//        this.ResponsesCollection.OnRectangleChanged(cX, cY, cW, this.Rectangle.Height-this.Border.Top-this.Border.Bottom - cY-100);
cY = this.Bottom() -this.Border.Bottom-100;
//cY = this.Rectangle.Height-this.Border.Top-this.Border.Bottom-100;
        this.NewMessage.OnRectangleChanged(cX, cY, cW, 100);
    };

    this.KeyUpArrow = function(){ this.ResponsesCollection.KeyUpArrow(); };
    this.KeyDownArrow = function(){ this.ResponsesCollection.KeyDownArrow(); };
    this.OnMouseWheel = function(rolled){ if(this.Parent != null)this.ResponsesCollection.OnMouseWheel(rolled); };

    this.CallSave = function(){ CallPage("FORUM_MESSAGE_NEW",  this.Title.GetText() +PageInfo.Separator+ this.NewMessage.CallFormat() ); this.NewMessage.Clear(); };

    this.OnRemplace = function(msg)
    {
        this.Clear();
        this.Forum = msg;
        this.Title.SetText(msg.Title);
        this.BaseMessage.OnMessage(msg);
        this.ResponsesCollection.MoveTo(this.ResponsesCollection.Rectangle.X, this.BaseMessage.Bottom());


    this.ResponsesCollection.OriginalHeight = this.Rectangle.Height-this.Border.Top-this.Border.Bottom - this.BaseMessage.Location.Y-this.BaseMessage.Rectangle.Height-this.NewMessage.Rectangle.Height;

        for(var i = 0; i < msg.Responses.length; i++)
            this.ResponsesCollection.OnRemplace(msg.Responses[i]);
    };
    this.Clear = function()
    {
        this.Title.Clear();
        this.BaseMessage.Clear();
        this.ResponsesCollection.Clear();
        this.Reorganize(0, 0, width-this.Border.Left-this.Border.Right, Appearance.TextBox.FontHeight, 5)
    };
    
    
    
};


function ResponsesCollection(x, y, width, height, border)
{
    this.InheritClass = ControlCollection;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ResponsesCollection");

//    this.Border = { Left:5, Top:5, Right:5, Bottom:5 };
//    this.BackColor = "green";
    this.Minimize = true;
    
    this.NewControl = function(){ return new BaseMessageControl(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, 0) };
    this.OnRemplace = function(msg)
    {
        for(var i = 0; i < this.Collection.length; i++)
            if(this.Collection[i].Equals(msg))
            {
                if(!this.Collection[i].CompareTo(msg))this.Collection[i].OnRemplace(msg);
                return;
            }
        var control = this.NewControl();
        this.AddCollection(control);
        control.OnMessage(msg);
    };
};
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






//function CollectionForum(x, y, width, height)
//{
//    this.InheritClass = ControlCollection;
//    this.InheritClass( x, y, width, height );
//    delete this.InheritClass;
//    this.Inherit("CollectionForum");

//    this.CanMove = true;

//    this.OnForumInfo = function(foruminfo)
//    {
//        var pW = this.Rectangle.Width-this.Border.Left-this.Border.Right;
//        for(var i = 0; i < foruminfo.length; i++)
//            this.OnRemplace(foruminfo[i]);
//    };
//    this.OnRemplace = function(msg)
//    {
//        for(var i = 0; i < this.Collection.length; i++)
//            if(this.Collection[i].Title.Text == msg.Title)
//            {
//                this.Collection[i].OnInfo(msg);
//                return;
//            }
//        this.AddCollection(new ForumInfoControl(0, 0, this.Rectangle.Width-this.Border.Left-this.Border.Right, 0, msg));
//    };
//};












