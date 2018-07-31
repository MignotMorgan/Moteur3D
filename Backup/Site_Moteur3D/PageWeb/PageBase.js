var FormBase = null;
var Mouse = {X:0, Y:0, Down:Now(), Up:Now(), Time:0};
var IntervalCallServer = -1;
var IntervalLatence = -1;
var PageInfo;
var DrawTime = Now();
var DrawStep = 0;
var Chats = null;
var PlayAnimations = [];
var ScreenAnimation = null;
var ScreenAnimation_Load = null;

var Download = {End:false, Statut:"Start", PageInfo:{Start:false, End:false, Translators:{Nbr:0,Total:0}, Animations:{Nbr:0,Total:0}, Templates:{Nbr:0,Total:0}}};

var Latence = 0;
var TotalLatence = 0;
var NbrLatence = 0;
var MinLatence = 100000;
var MaxLatence = 0;

var Appearance_Next = null;
var Appearances = new Array();
var Appearance = null;


//####/////////////////////////////////////////////////////////////////
// à été vérifier!!! fonction utilisateur!!!
var Load = function(){};
var Downloading = function(){return true;};
var Draw = function(){};
var MouseMove = function(e) {};
var MouseDownLeft = function(e) { return false; };
var MouseUpLeft = function(e) { return false; };
var MouseDownRight = function(e) { return false; };
var MouseUpRight = function(e) { return false; };
var KeyUp = function(e) { return false; };
var KeyDown = function(e) { return false; };
var ResponsePage = function(message){ };
var ResponsePower = function(message){};
var FindTemplates = function(name){ return null; };
var FindAnim = function(id){return null;};

//** PageMap.js **\\
var PageMap_OnLoad = function(){};
var PageMap_Downloading = function(){return true;};
var PageMap_OnMouseMove = function(){};
var PageMap_ResponsePage = function(message){};
var PageMap_Draw = function(){};

//Interface.IntervalCallServer : -1 = Non; 0 = loop; +1000 = MilliSecond
//CREER ZONE + EFFET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Faire un premier passage dans DrawMap sur le Sol + Cadrillage!!!!!!!!!!!!!!!!!!!!!!!!! Cadrillage au niveau (.Z) de Selected.Entity
//Deplacement : créer une variable Point() dans Entity et EntityJSON pour l'emplacement à l'intérieure d'une Case3D
//Animation : Effect : Créer des effets sur Entity (ex: changer la direction, l'image, ect...);
//creer un fond de carte : qui bouge selon la profondeur. fond = taille de la carte en décalé selon la distance!!!!
//Faire bouger la carte avec Adustment et Centred Verif : MapCentred_ToEntity(entity)

//Placer Default_Floor dans la Map.
//Floor Animer ???
//Agrandir Floor ????

//optimiser l'affichage Case3D et Entity (si est contenu dans la Canvas) 
// Form FirstPosition javascript
//Ajouter index -1 à CallPage   this.Index +Interface.Separator+ 
//Créer envoie un ERROR:404 du Serveur.

//Drag Drop sur Entity sur la carte type pion echec
//Image Body Envelopper
//var Clip_Canvas = null;
//var Clip_Context = null;

window.onload=OnLoad_PageBase;
function OnLoad_PageBase()
{
//    Clip_Canvas = document.createElement('canvas');
////    Clip_Canvas.style.display = 'none';
//    document.body.appendChild(Clip_Canvas);
//	Clip_Canvas.style.border = "10px solid #000000";//'5px';
//    Clip_Context = Clip_Canvas.getContext("2d");
//    document.mozfullscreenchange = function(event){ alert("CHANGE"); };
//    document.addEventListener("fullscreenchange", function(event){ alert("CHANGE"); });  
//document.addEventListener('mozfullscreenchange', function(event){ alert("CHANGE : " + event); });

    document.addEventListener('mozfullscreenchange', function(event){ Control_FullScreenChange(event); });
    document.addEventListener('webkitfullscreenchange', function(event){ Control_FullScreenChange(event); });
    document.addEventListener('MSFullscreenChange', function(event){ Control_FullScreenChange(event); });
    document.addEventListener('fullscreenchange', function(event){ Control_FullScreenChange(event); });

    document.addEventListener('mozfullscreenerror', function(event){ Control_FullScreenError(event); });
    document.addEventListener('webkitfullscreenerror', function(event){ Control_FullScreenError(event); });
    document.addEventListener('MSFullscreenError', function(event){ Control_FullScreenError(event); });
    document.addEventListener('fullscreenerror', function(event){ Control_FullScreenError(event); });

    PageInfo = JSONDeserialize(document.getElementById("PageInfo").value);
    Download.PageInfo.Translators.Total = PageInfo.Translators_Length;
    Download.PageInfo.Animations.Total = PageInfo.Animations_Length;
    Download.PageInfo.Templates.Total = PageInfo.Templates_Length;
  
    ScreenAnimation_Load = JSONDeserialize(document.getElementById("ScreenLoad").value);
    for(var sa = 0; sa < ScreenAnimation_Load.Templates.length; sa++)
    {
        ScreenAnimation_Load.Templates[sa].Image = new Image(); 
        ScreenAnimation_Load.Templates[sa].Image.onload = function(){ ScreenAnimation = ScreenAnimation_Load; if(FormBase != null)DrawScreenAnimation(ScreenAnimation, FormBase.Context) };
        ScreenAnimation_Load.Templates[sa].Image.src = ScreenAnimation_Load.Templates[sa].ImageUrl;
    }

    var appearance = JSONDeserialize(document.getElementById("Appearance").value);
//    for(var f = 0; f < appearance.Form.Templates.length; f++)
//    {
//        appearance.Form.Templates[f].Image = new Image();
//        appearance.Form.Templates[f].Image.src = appearance.Form.Templates[f].ImageUrl;
//    }
//    for(var c = 0; c < appearance.Control.Templates.length; c++)
//    {
//        appearance.Control.Templates[c].Image = new Image();
//        appearance.Control.Templates[c].Image.src = appearance.Control.Templates[c].ImageUrl;
//    }
//    for(var t = 0; t < appearance.TextBox.Templates.length; t++)
//    {
//        appearance.TextBox.Templates[t].Image = new Image();
//        appearance.TextBox.Templates[t].Image.src = appearance.TextBox.Templates[t].ImageUrl;
//    }
    for(var t = 0; t < appearance.Templates.length; t++)
    {
        appearance.Templates[t].Image = new Image();
        appearance.Templates[t].Image.src = appearance.Templates[t].ImageUrl;
    }
    Appearance = appearance;
    Appearances[Appearances.length] = appearance;
//    for(var f = 0; f < PageInfo.Form.Templates.length; f++)
//    {
//        PageInfo.Form.Templates[f].Image = new Image();
//        PageInfo.Form.Templates[f].Image.src = PageInfo.Form.Templates[f].ImageUrl;
//    }
//    for(var c = 0; c < PageInfo.Control.Templates.length; c++)
//    {
//        PageInfo.Control.Templates[c].Image = new Image();
//        PageInfo.Control.Templates[c].Image.src = PageInfo.Control.Templates[c].ImageUrl;
//    }
//    for(var t = 0; t < PageInfo.TextBox.Templates.length; t++)
//    {
//        PageInfo.TextBox.Templates[t].Image = new Image();
//        PageInfo.TextBox.Templates[t].Image.src = PageInfo.TextBox.Templates[t].ImageUrl;
//    }

    window.onkeydown = OnKeyDown;
    window.onkeyup = OnKeyUp;
    window.document.onmouseup = OnMouseUp;
    window.document.onmousedown = OnMouseDown;
    window.document.onmousemove = OnMouseMove;
    window.document.oncontextmenu = OnContextMenu;

    for(var t = 0; t < PageInfo.Translators_Length; t++)
        CallLoadPageInfo("TRANSLATORS", t);
    for(var a = 0; a < PageInfo.Animations_Length; a++)
        CallLoadPageInfo("ANIMATIONS", a);
    for(var i = 0; i < PageInfo.Templates_Length; i++)
        CallLoadPageInfo("TEMPLATES", i);

    PageMap_OnLoad();
	Load();

    if( PageInfo.IntervalCallServer > 0 )
        IntervalCallServer = window.setInterval(CallLoop,PageInfo.IntervalCallServer);
    else if( PageInfo.IntervalCallServer == 0 )
        CallLoop();
        
    renderingLoop();
//    setTimeout(function() {	NbrArray--;}, 1000);
};

function RedirectOpen(url){ window.open(url); };
function Redirect(url){ document.location.href=url; };
function JSONDeserialize(JSONstring){ return typeof JSON !='undefined' ?  JSON.parse(JSONstring) : eval('('+JSONstring+')'); };
//function JSONDeserialize(JSONstring){ return eval('('+ JSONstring +')'); };
function JSONSerialize(obj){ return JSON.stringify(obj); };
function Now(){return Date.now();};
function ConvertDateTime(datetime){ return new Date(parseInt(datetime.substr(6))) };
function PlaySound(url) { new Audio(url).play(); };
function Interface_Default(ctx)
{
    if(ctx == undefined || ctx == null)return;
    
    ctx.font = PageInfo.Font_Default;
    ctx.fillStyle = "Black";
    ctx.strokeStyle = "Black";
    ctx.lineWidth = 1;
    ctx.textBaseline = "alphabetic";
};
function Translate(txt)
{
    for(var i = 0; i < PageInfo.Translators.length; i++)
        for(var t = 0; t < PageInfo.Translators[i].Translates.length; t++)
            if(PageInfo.Translators[i].Translates[t].Key == txt)
                return PageInfo.Translators[i].Translates[t].Text;
    return txt;
};
function MeasureText(text, width, context)
{
    if(text == "" || text.length == 0) return "";
    var tempwidth = 0;
    for(var i = 1; i < text.length; i++)
    {
        tempwidth = context.measureText(text.substr(0, i)).width;
        if (tempwidth > width)
            return text.substr(0, i-1);
    }
    return text;
};
function WindowSize()
{
    var w = 0;
    var h = 0;
    if(window.innerWidth)w = window.innerWidth;
    if(window.innerHeight )h = window.innerHeight;
    return {Width:w, Height:h};
};
function FindAnimation(name)
{
    for(var i = 0; i < PageInfo.Animations.length; i++)
        if( PageInfo.Animations[i].Name == name)
        return PageInfo.Animations[i];
    return FindAnim(name);
};
function NewTemplate(name, nbrX, nbrY, imageUrl)
{
    var template = {Name:name, ImageUrl:imageUrl, NbrX:nbrX, NbrY:nbrY};
    template.Image = new Image();
//    template.Image.onload = function(){Download.PageInfo.Templates.Nbr++;};
    template.Image.src = template.ImageUrl;
    PageInfo.Templates[PageInfo.Templates.length] = template;
};
function FindTemplatesImages( name )
{
    for( var i = 0; i < PageInfo.Templates.length; i++)
        if( PageInfo.Templates[i].Name == name )
            return PageInfo.Templates[i];
    return FindTemplates(name);
};
function DrawTemplateImage( imagejson, x, y, width, height, context )
{
    if(imagejson == null) return;
    var template = FindTemplatesImages(imagejson.Name);
    if(template == null || template.Image == null) return;
    if(context == null || context == undefined)return;

    var tW = template.Image.width / template.NbrX;
    var tH = template.Image.height / template.NbrY;
    var tX = (imagejson.NbrX-1) * tW;
    var tY = (imagejson.NbrY-1) * tH;

    context.drawImage(template.Image, tX, tY, tW, tH, x, y, width, height );
};
function DrawLine(src, dest, ctx)
{
    ctx.beginPath();
    ctx.moveTo(src.X,src.Y);
    ctx.lineTo(dest.X,dest.Y);
    ctx.stroke();
};

function OnContextMenu(){ return false; };
function OnMouseMove(e)
{
	var x = 0;
	var y = 0;
	if(document.all){x = window.event.x; y = window.event.y;}   // IE
	else{x = e.clientX; y = e.clientY;}                         // Mozilla
	x += document.documentElement.scrollLeft;
	y += document.documentElement.scrollTop;
	
	Mouse.X = x;
	Mouse.Y = y;
	
	PageMap_OnMouseMove();
    OnMouseMove_Control();
    MouseMove(e);
};
function OnMouseDown(e)
{
    if(ScreenAnimation != null &&  ScreenAnimation.CanInterrupt)
        { ScreenAnimation = null; return; }

    Mouse.Down = Now();

 	if ( (!document.all && e.which == 3) || (document.all && e.button==2) ) { OnMouseDownRight(e); }
	else { OnMouseDownLeft(e); }
};
function OnMouseUp(e)
{
    Mouse.Up = Now();
    Mouse.Time = Mouse.Up - Mouse.Down;

 	if ( (!document.all && e.which == 3) || (document.all && e.button==2) ){ OnMouseUpRight(e); }
	else { OnMouseUpLeft(e); }
};
function OnMouseDownLeft(e)
{
    if( MouseHover.Control != null)
    {
        MouseHover.Control.OnFocus();
        MouseHover.Control.ClickLeft();
        Control_OnDrag();
        if( !MouseHover.Control.IsInherit("Form") )return false;
    }
    return MouseDownLeft(e);
};
function OnMouseUpLeft(e)
{
    Transformation.Control = null;
    Transformation.Resize = false;
    if( MouseHover.Control != null)
        MouseHover.Control.ClickLeftUp();
    Control_OnDrop();
    return MouseUpLeft(e);
};
function OnMouseDownRight(e)
{
    if( MouseHover.Control != null)
    {
        MouseHover.Control.OnFocus();
        MouseHover.Control.ClickRight();
        Control_OnTransformation();
        if( !MouseHover.Control.IsInherit("Form") )return false;
    }
    return MouseDownRight(e);
};
function OnMouseUpRight(e)
{
    if( MouseHover.Control != null)
        MouseHover.Control.ClickRightUp();
    Control_OnClear();
    return MouseUpRight(e);
};
function OnKeyDown(e)
{
     if ( OnKeyDown_Keyboard(e) ) { return false; };
     if ( KeyDown(e) ) { return false; };
     return false;
};
function OnKeyUp(e)
{
     if ( OnKeyUp_Keyboard(e) ) { return false; };
     if ( KeyUp(e) ) { return false; };
     return false;
};

function FindAppearance(name)
{
    var app = false;
    for(var a = 0; a < Appearances.length; a++)
        if(Appearances[a].Name == name)
            { Appearance_Next = Appearances[a]; app = true; }
    if(!app)
        CallPage("APPEARANCE", name);
};


function CallLoop(){CallPage("LOOP", "" );};
function Downloading_Loop()
{
    if (!Download.PageInfo.End)
    {
        if(Download.PageInfo.Translators.Nbr == Download.PageInfo.Translators.Total && Download.PageInfo.Animations.Nbr == Download.PageInfo.Animations.Total && Download.PageInfo.Templates.Nbr == Download.PageInfo.Templates.Total)
            Download.PageInfo.End = true;
    }
    else if (PageMap_Downloading() && Downloading())
    {
        Download.End = true;
    }
};
function CallLatence() { CallPage("LATENCE", Now() ); };
function CallChat(canal, txt){ CallPage("CHAT", canal +PageInfo.Separator+ txt); };
function CallPage(COMMAND, value ){ CallServer( COMMAND +PageInfo.Separator+ value, 'context' ); };
function CallPageInfo(){ CallPage("PAGEINFO", ""); };
function CallLoadPageInfo(keyword, index){ CallPage("LOADPAGEINFO", keyword +PageInfo.Separator+ index); };
function ResponseServerError(result, context){ alert(result); };
function ResponseServer(result, context)
{
    var messages = JSONDeserialize(result);
    for(var i = 0; i < messages.length; i++)
    {
        if( messages[i].Index > -1 )
            Controls[messages[i].Index].ResponsePage(messages[i]);
        else if( messages[i].COMMAND == "LOOP" )
            MessageLoop(messages[i]);
        else if( messages[i].COMMAND == "LATENCE" )
            MessageLatence(messages[i]);
        else if( messages[i].COMMAND == "REDIRECT" )
            Redirect(messages[i].Text);
//        else if( messages[i].COMMAND == "PAGEINFO" )
//            MessagePageInfo(messages[i]);
        else if( messages[i].COMMAND == "TRANSLATORS" )
            MessageTranslators(messages[i]);
        else if( messages[i].COMMAND == "ANIMATIONS" )
            MessageAnimations(messages[i]);
        else if( messages[i].COMMAND == "TEMPLATES" )
            MessageTemplates(messages[i]);
        else if( messages[i].COMMAND == "PLAYANIMATIONS" )
            MessagePlayAnimations(messages[i]);
        else if( messages[i].COMMAND == "CHAT" )
            MessageChat(messages[i]);
        else if( messages[i].COMMAND == "APPEARANCE" )
            MessageAppearance(messages[i]);
        else
            PageMap_ResponsePage(messages[i]);
            
        ResponsePage(messages[i]);
    }
};
function MessageLatence(message)//ameliorer var Latence = {};
{
    var temp = Now() - message.Value;
    Latence =  temp;
    TotalLatence += Latence;
    NbrLatence += 1;
    if( Latence < MinLatence ) MinLatence = Latence;
    if( Latence > MaxLatence ) MaxLatence = Latence;
};
function MessageLoop( message )
{
    if(PageInfo.IntervalCallServer == 0)
        CallLoop();
};
//function MessagePageInfo(msg)
//{
//    PageInfo = msg.PageInfo;
//    ScreenAnimation = ScreenAnimation_Load;
//    Download.End = false;
//    Download.PageInfo.End = false;
//    Download.PageInfo.Translators.Nbr = 0;
//    Download.PageInfo.Animations.Nbr = 0;
//    Download.PageInfo.Templates.Nbr = 0;
//    Download.PageInfo.Translators.Total = PageInfo.Translators_Length;
//    Download.PageInfo.Animations.Total = PageInfo.Animations_Length;
//    Download.PageInfo.Templates.Total = PageInfo.Templates_Length;
//    for(var t = 0; t < PageInfo.Translators_Length; t++)
//        CallLoadPageInfo("TRANSLATORS", t);
//    for(var a = 0; a < PageInfo.Animations_Length; a++)
//        CallLoadPageInfo("ANIMATIONS", a);
//    for(var i = 0; i < PageInfo.Templates_Length; i++)
//        CallLoadPageInfo("TEMPLATES", i);
//};
function MessageTranslators(msg)
{
    PageInfo.Translators[PageInfo.Translators.length] = msg.Value;
    Download.PageInfo.Translators.Nbr++;
};
function MessageAnimations(msg)
{
    PageInfo.Animations[PageInfo.Animations.length] = msg.Value;
    Download.PageInfo.Animations.Nbr++;
};
function MessageTemplates(msg)
{
    msg.Value.Image = new Image();
    msg.Value.Image.onload = function(){Download.PageInfo.Templates.Nbr++;};
    msg.Value.Image.src = msg.Value.ImageUrl;
    PageInfo.Templates[PageInfo.Templates.length] = msg.Value;
    
};
function MessagePlayAnimations(msg)
{
    var playanimations = msg.PlayAnimations;
    for(var pa = 0; pa < playanimations.length; pa++)
    {
        var anim = FindAnimation(playanimations[pa].Name);
        if(anim != null)
        {
            if(playanimations[pa].Duration == 0)
                playanimations[pa].Duration = anim.Duration;
            if(playanimations[pa].Image == null)
                playanimations[pa].Image = anim.Image;
            if(playanimations[pa].Text == "")
                playanimations[pa].Text = anim.Text;
            playanimations[pa].Width = anim.Width;
            playanimations[pa].Height = anim.Height;
            playanimations[pa].Image_Animated = anim.Image_Animated;
            if(playanimations[pa].Effects.length == 0)
                playanimations[pa].Effects = anim.Effects;
        }
        PlayAnimations.push(playanimations[pa]);
    }
};
function MessageChat(message)
{
    Chats = message.Chats;
};
function MessageAppearance(message)
{
//    for(var f = 0; f < message.Value.Form.Templates.length; f++)
//    {
//        message.Value.Form.Templates[f].Image = new Image();
//        message.Value.Form.Templates[f].Image.src = message.Value.Form.Templates[f].ImageUrl;
//    }
//    for(var c = 0; c < message.Value.Control.Templates.length; c++)
//    {
//        message.Value.Control.Templates[c].Image = new Image();
//        message.Value.Control.Templates[c].Image.src = message.Value.Control.Templates[c].ImageUrl;
//    }
//    for(var t = 0; t < message.Value.TextBox.Templates.length; t++)
//    {
//        message.Value.TextBox.Templates[t].Image = new Image();
//        message.Value.TextBox.Templates[t].Image.src = message.Value.TextBox.Templates[t].ImageUrl;
//    }
    
    for(var t = 0; t < message.Value.Templates.length; t++)
    {
        message.Value.Templates[t].Image = new Image();
        message.Value.Templates[t].Image.src = message.Value.Templates[t].ImageUrl;
    }
    Appearance_Next = message.Value;
    Appearances[Appearances.length] = Appearance;
    
//    PageInfo.Form = message.Value.Form;
//    PageInfo.Control = message.Value.Control;
//    PageInfo.TextBox = message.Value.TextBox;
};
//function MessageAppearance(message)
//{
//    for(var f = 0; f < message.Form.Templates.length; f++)
//    {
//        message.Form.Templates[f].Image = new Image();
//        message.Form.Templates[f].Image.src = message.Form.Templates[f].ImageUrl;
//    }
//    for(var c = 0; c < message.Control.Templates.length; c++)
//    {
//        message.Control.Templates[c].Image = new Image();
//        message.Control.Templates[c].Image.src = message.Control.Templates[c].ImageUrl;
//    }
//    for(var t = 0; t < message.TextBox.Templates.length; t++)
//    {
//        message.TextBox.Templates[t].Image = new Image();
//        message.TextBox.Templates[t].Image.src = message.TextBox.Templates[t].ImageUrl;
//    }
//    PageInfo.Form = message.Form;
//    PageInfo.Control = message.Control;
//    PageInfo.TextBox = message.TextBox;
//};

var intervalID = -1;
var QueueNewFrame = function () 
{
    if (window.requestAnimationFrame)
        window.requestAnimationFrame(renderingLoop);
    else if (window.msRequestAnimationFrame)
        window.msRequestAnimationFrame(renderingLoop);
    else if (window.webkitRequestAnimationFrame)
        window.webkitRequestAnimationFrame(renderingLoop);
    else if (window.mozRequestAnimationFrame)
        window.mozRequestAnimationFrame(renderingLoop);
    else if (window.oRequestAnimationFrame)
        window.oRequestAnimationFrame(renderingLoop);
    else 
    {
        QueueNewFrame = function() { };
        intervalID = window.setInterval(renderingLoop, 16.7);
    }
};
var renderingLoop = function () 
{
    DrawStep = Now() - DrawTime;
    DrawTime = Now();

    if(Mouse.Up < Mouse.Down)
        Mouse.Time = Now() - Mouse.Down;

    ClearRec_Control();
    
    if(!Download.End)
        Downloading_Loop();

    if (Download.End && ScreenAnimation == ScreenAnimation_Load)
        ScreenAnimation = null;

    if(Appearance_Next != null)
    {
        Appearance = Appearance_Next;
        Appearance_Next = null;
    }

//    if(FormBase != null)
//    {
        if(ScreenAnimation != null)
        {
            if(FormBase != null)
                DrawScreenAnimation(ScreenAnimation, FormBase.Context)
        }
        else
        {
            PageMap_Draw();
            Draw();

            if(FormBase != null)
                OnPlayAnimations(PlayAnimations, FormBase.Context);
        }
        Draw_Control();
//    }
    QueueNewFrame();
};



//Flag!!!
var IsFlag = function(flags, flag){ return ((flags & Flags[flag]) != 0); };
function Flag(value)
{
    this.Value = value;
    this.Get = function(flag) { return ((this.Value & Flags[flag]) != 0); };
    this.Set = function(flag, value) { if (value)this.Value |= Flags[flag]; else Value &= ~Flags[flag]; };
};
var Flags = new Array
(
    0x00000000,
    0x00000001,
    0x00000002,
    0x00000004,
    0x00000008,
    0x00000010,
    0x00000020,
    0x00000040,
    0x00000080,
    0x00000100,
    0x00000200,
    0x00000400,
    0x00000800,
    0x00001000,
    0x00002000
);
