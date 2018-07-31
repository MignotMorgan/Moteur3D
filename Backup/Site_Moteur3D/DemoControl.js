var FormDemo = null
var TextInfo = null;
var MenuDemo2 = null;
var TextDemo = null;
var ImageDemo = null;

var Load = function()
{
    var windowsize = WindowSize();
    FormDemo = new Form(0, 0, windowsize.Width, windowsize.Height);
    FormDemo.BackColor = "White";
    FormDemo.CanMove = false;
    FormDemo.Text = "FormDemo";
    FormDemo.Info = "Form est un control qui contient le Canvas. Il peut contenir d'autres controls, être réduit, ou être mis en plein écran.";
    FormDemo.Info2 = "Pour déplacer ou redimensionner un control, utiliser le bouton droit de la souris.";
    FormDemo.OnMouseEnter = OnMouseEnter_Info;
    FormDemo.OnMouseLeave = OnMouseLeave_Info;
    FormDemo.KeyEsc = function()
    {
        if(this.Reduce.Active)
        {
            this.Reduce.Active = false;
            this.ReduceTo(this.Frame.X, this.Frame.Y, this.Frame.Width, this.Frame.Height);
        }
    };

    TextInfo = new TextBox(0, 0, windowsize.Width, (Appearance.TextBox.FontHeight*2)+10, 5);
    TextInfo.ReadOnly = true;
    TextInfo.MultiLine = true;
    TextInfo.BackText = "Message d'information";
    TextInfo.LastText = "";
    FormDemo.Add(TextInfo);
    
    MenuDemo2 = new Menu_Demo(0, TextInfo.Rectangle.Height, 100, windowsize.Height-TextInfo.Rectangle.Height, 10);
    FormDemo.Add(MenuDemo2);

    TextDemo = new TextBox(100, TextInfo.Rectangle.Height+100, 300, 500, 20);
    TextDemo.Info = "TextBox qui peut être déplacer, redimensionner et qui ne contient pas d'autres controls. Ce control change son comportement si il est en multi ligne, en ligne unique.";
    TextDemo.Info2 = "Il peut être positionner en lecture seul, être numérique, avoir un texte par défault et un nombre maximum de caractère. Utiliser la roulette de la souris pour faire défiler le texte.";
    TextDemo.OnMouseEnter = OnMouseEnter_Info;
    TextDemo.OnMouseLeave = OnMouseLeave_Info;
//    TextDemo.Hide();
    TextDemo.CanMove = true;
    TextDemo.CanResize = true;
    TextDemo.MultiLine = true;
    TextDemo.BackText = "écrire un texte ici.";
    FormDemo.Add(TextDemo);

    ImageDemo = new ControlImageUrl(400, TextInfo.Rectangle.Height+100, 400, 400, 20);
//    ImageDemo.Hide();
    ImageDemo.BackColor = "yellow";
    ImageDemo.CanMove = true;
    ImageDemo.CanResize = true;
    ImageDemo.SetText("controlImage");
    ImageDemo.Info = "Control Image qui peut être déplacer, redimensionner et qui ne contient pas d'autres controls.";
    ImageDemo.Info2 = "Glisser une image dans le control depuis votre disque dur ou directement d'un site Web ou encore glisser l'adresse web de l'emplacement d'une image.";
    ImageDemo.OnMouseEnter = OnMouseEnter_Info;
    ImageDemo.OnMouseLeave = OnMouseLeave_Info;
    FormDemo.Add(ImageDemo);
    
    
    ImageDemo = new ControlImageSpeedUrl(400, TextInfo.Rectangle.Height, 400, 100, {Border:10, ImgNumber:4, ImgSpeed:1000});
//    ImageDemo.Hide();
//    ImageDemo.BackColor = "yellow";
    ImageDemo.CanMove = true;
    ImageDemo.CanResize = true;
    ImageDemo.SetText("ControlImageListUrl_01");
    ImageDemo.Info = "Liste d'images qui peut être déplacer, redimensionner et qui ne contient pas d'autres controls.";
    ImageDemo.Info2 = "Glisser une image dans le control depuis votre disque dur ou directement d'un site Web ou encore glisser l'adresse web de l'emplacement d'une image.";
    ImageDemo.OnMouseEnter = OnMouseEnter_Info;
    ImageDemo.OnMouseLeave = OnMouseLeave_Info;
    FormDemo.Add(ImageDemo);

    var control = new Control(800, TextInfo.Rectangle.Height+50, 700, windowsize.Height-TextInfo.Rectangle.Height-50);
    control.Border = {Left:5, Top:20, Right:5, Bottom:10};
    control.CanMove = true;
    control.CanResize = true;
    control.SetText("control");
    control.Info = "Control de base qui peut être déplacer, redimensionner et qui contient d'autres controls.";
    control.Info2 = "Ce control ne restreint pas les déplacements des controls qu'il contient. La Couleur de fond à été modifier";
    control.OnMouseEnter = OnMouseEnter_Info;
    control.OnMouseLeave = OnMouseLeave_Info;
    control.BackColor = "wheat";
    control.OnClip();
    FormDemo.Add(control);

    var control6 = new Control(150, 200, 250, 250, 15);
    control6.CanMove = true;
    control6.CanResize = true;
    control6.SetText("control6");
    control6.Controls = [];
    control6.BackTransparent = true;
    control6.Info = "Control de base qui peut être déplacer, redimensionner et qui ne contient pas d'autres controls.";
    control6.Info2 = "Ce control est transparent. (Déplacer ce control au-dessus des autres pour voir le résultat)";
    control6.OnMouseEnter = OnMouseEnter_Info;
    control6.OnMouseLeave = OnMouseLeave_Info;
    control.Add(control6);

    var control2 = new Control(150, 10, 300, 250, 15);
    control2.CanMove = true;
    control2.CanResize = true;
    control2.SetText("control2");
    control2.Info = "Control de base qui peut être déplacer, redimensionner et qui contient d'autres controls.";
    control2.Info2 = "Ce control restreint les déplacements des controls qu'il contient. Utiliser Ctrl pour déplacer un control dans la bordure.";
    control2.OnMouseEnter = OnMouseEnter_Info;
    control2.OnMouseLeave = OnMouseLeave_Info;
    control.Add(control2);

    var control3 = new Control(10, 10, 50, 75);
    control3.CanMove = true;
    control3.CanResize = true;
    control3.SetText("control3");
    control3.Info = "Control de base qui peut être déplacer, redimensionner et qui ne contient pas d'autres controls.";
    control3.Info2 = "Ce control a automatiquement l'apparence d'un bouton.";
    control3.OnMouseEnter = OnMouseEnter_Info;
    control3.OnMouseLeave = OnMouseLeave_Info;
    control2.Add(control3);
    
    control3 = new Control(100, 10, 100, 150, 10);
    control3.CanMove = true;
    control3.CanResize = true;
    control3.CanScale = true;
    control3.SetText("control10");
    control3.Info = "Control de base qui contient d'autres controls et qui lorsqu'il est redimensionner garde les autres controls à la même échelle.";
    control3.Info2 = "Ce control ne restreint pas les déplacements des controls qu'il contient.";
    control3.OnMouseEnter = OnMouseEnter_Info;
    control3.OnMouseLeave = OnMouseLeave_Info;
//    control3.Border = {Left:10, Top:5, Right:20, Bottom:15 };
    control3.numberOfLines = 5;
    control3.nbrdraw = 0;
    control3.Draw = function(x, y, width, height, context)
    {
        x += this.Border.Left;
        y += this.Border.Top;
        width -=this.Border.Left+this.Border.Right;
        height -= this.Border.Top+this.Border.Bottom;
        for(var j=0; j<this.numberOfLines; ++j)
        {
            var offset = (this.nbrdraw+j*10)/20;
            context.lineWidth = 1+2*(this.numberOfLines-j);
            context.strokeStyle = 'rgba(80,150,240,'+(j/5+0.1)+')';
            var py = (Math.sin(offset)+1)*height/2;
            var cpy1 = (Math.cos(offset)+0.5)*height;
            var cpy2 = height - cpy1;
            context.beginPath();
            context.moveTo(x, y+py);
            context.bezierCurveTo(x +(width/3), y + cpy1, x +(2*width/3), y+cpy2, x+width, y + py);
            context.stroke();
        }
        this.nbrdraw++;
    };

    control2.Add(control3);

    var control4 = new Control(10, 10, 50, 75, "control4");
    control4.CanMove = true;
    control4.CanResize = true;
    control4.SetText("control4");
    control4.Info = "Control de base qui peut être déplacer, redimensionner et qui ne contient pas d'autres controls.";
    control4.Info2 = "Ce control a automatiquement l'apparence d'un bouton.";
    control4.OnMouseEnter = OnMouseEnter_Info;
    control4.OnMouseLeave = OnMouseLeave_Info;
    control3.Add(control4);

    var control5 = new Control(10, 250, 100, 50, 5);
//    control5.CanMove = true;
//    control5.CanResize = true;
    control5.SetText("control5");
    control5.Info = "Control de base qui ne peut pas être déplacer, redimensionner et qui ne contient pas d'autres controls.";
    control5.Info2 = "Ce control a automatiquement l'apparence d'un bouton.";
    control5.OnMouseEnter = OnMouseEnter_Info;
    control5.OnMouseLeave = OnMouseLeave_Info;
    control.Add(control5);
    
    var control7 = new Control(10, 10, 100, 40);
    control7.SetText("Invisible");
    control7.Info = "Control de base qui ne peut pas être déplacer, redimensionner et qui ne contient pas d'autres controls.";
    control7.Info2 = "ce control rend invisible le control ci-dessous.";
    control7.OnMouseEnter = OnMouseEnter_Info;
    control7.OnMouseLeave = OnMouseLeave_Info;
    control.Add(control7);
    control7.ClickLeft = function(){ if(this.ControlLink.Visible)this.ControlLink.Hide(); else this.ControlLink.Show(); }
    
    control7.ControlLink = new Control(10, 50, 100, 150, 5);
//    control7.Enabled = false;
    control7.ControlLink.SetText("ControlLink");
    control7.ControlLink.Info = "Control de base qui ne peut pas être déplacer, redimensionner et qui contient d'autres controls.";
    control7.ControlLink.Info2 = "Ce control restreint les déplacements des controls qu'il contient. Utiliser Ctrl pour déplacer un control dans la bordure.";
    control7.ControlLink.OnMouseEnter = OnMouseEnter_Info;
    control7.ControlLink.OnMouseLeave = OnMouseLeave_Info;
    control.Add(control7.ControlLink);
    
    var control8 = new Control(10, 10, 50, 50);
    control8.CanMove = true;
//    control8.CanResize = true;
    control8.SetText("control8");
    control8.Info = "Control de base qui peut être déplacer, mais ne peut pas être redimensionner et qui ne contient pas contient d'autres controls.";
    control8.Info2 = "Ce control a automatiquement l'apparence d'un bouton.";
    control8.OnMouseEnter = OnMouseEnter_Info;
    control8.OnMouseLeave = OnMouseLeave_Info;
    control7.ControlLink.Add(control8);

    var controlnumber = new ControlNumber(100, TextInfo.Rectangle.Height, 100, 50, 5);
    controlnumber.CanMove = true;
    controlnumber.CanResize = true;
    controlnumber.CanScale = true;
    controlnumber.SetText("controlnumber");
    controlnumber.Info = "Control qui permet d'incrémenter un nombre de nombre, qui peut être déplacer, redimensionner et qui ne contient pas d'autres controls.";
    controlnumber.Info2 = "Ce control a une version horitontale et verticale et change d'apparence en fonction de sa dimension.";
    controlnumber.OnMouseEnter = OnMouseEnter_Info;
    controlnumber.OnMouseLeave = OnMouseLeave_Info;
    FormDemo.Add(controlnumber);

//    var liste = new Array("element 01", "element 01", "element 01", "element 01", "element 01", "element 01", "element 01", "element 01");
    var controlList = new TextList(100, TextInfo.Rectangle.Height+50, 100, Appearance.TextBox.FontHeight, 5);
    FormDemo.Add(controlList);
    controlList.CanMove = true;
//    controlList.CanResize = true;
    controlList.SetText("Liste");
    controlList.ChangeLines( ["element 01", "element 02", "element 03", "element 04", "element 05", "element 06", "element 07", "element 08", "element 09", "element 10", "element 11"] );
    controlList.Info = "Liste de divers éléments représenter en chaîne de caractères qui peut être déplacer, mais ne peut pas être redimensionner";
    controlList.Info2 = "Ce control s'ouvre automatiquement. Clicker sur le bouton droit de la souris pour annuler le choix selectionner";
    controlList.OnMouseEnter = function()
    {
        this.ListOpen = true; this.OnFocus();
        var txt = this.Info;
        if(this.Info2 != null)
            txt += "\u000A" + this.Info2;
        TextInfo.SetText(txt);
    };
    controlList.OnMouseLeave = function()
    {
        this.ListOpen = false;
        TextInfo.Clear();
    };

    var controlSlide = new ControlSlider(200, TextInfo.Rectangle.Height, 200, 50, 10);
    controlSlide.CanMove = true;
    controlSlide.CanResize = true;
    controlSlide.SetText("controlSlide");
    controlSlide.SliderMove = function(){ this.Btn_Cursor.SetText(this.CurrentValue());};
    controlSlide.Info = "Control scrollbar de base qui peut être déplacer, redimensionner et qui ne contient pas d'autres controls.";
    controlSlide.Info2 = "Ce control existe aussi en version verticale.";
    controlSlide.OnMouseEnter = OnMouseEnter_Info;
    controlSlide.OnMouseLeave = OnMouseLeave_Info;
    FormDemo.Add(controlSlide);
    
//    TextInfo.BackText = controlList.RectangleFocus.X +" : "+ controlList.Rectangle.X +" ## "+ controlList.RectangleFocus.Y +" : "+ controlList.Rectangle.Y +" ## "+ controlList.RectangleFocus.Width +" : "+ controlList.RectangleFocus.Height;

//    var co = Control_FindID("control4");
//    alert(co.ID);

};
var OnMouseEnter_Info = function()
{
    var txt = this.Info;
    if(this.Info2 != null)
        txt += "\u000A" + this.Info2;
    TextInfo.SetText(txt);
};
var OnMouseLeave_Info = function()
{
    TextInfo.Clear();
};


function Menu_Demo(x, y, width, height, border)
{
    this.InheritClass = ControlCollection;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("Menu_Demo");

var es = 5;
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = 50;//cw;//height-this.Border.Top-this.Border.Bottom;

    this.Btn_Home = new Control(cx, cy, cw, ch);
    this.Btn_Home.ClickLeft = function(){ CallPage("HOME", ''); };
    this.AddCollection(this.Btn_Home);
    this.Btn_Home.Info = "Clicker avec le bouton gauche de la souris pour retourner à la page Home";
    this.Btn_Home.Info2 = "Ce control a automatiquement l'apparence d'un bouton.";
    this.Btn_Home.OnMouseEnter = OnMouseEnter_Info;
    this.Btn_Home.OnMouseLeave = OnMouseLeave_Info;
    this.Btn_Home.SetText("Home");

    this.Btn_FullScreen = new Control(cx, cy, cw, ch);
    this.Btn_FullScreen.ClickLeft = function()
    {
        if(Control_IsFullScreen()) Control_ExitFullScreen();
        else FormDemo.OnFullScreen();
    };
    this.AddCollection(this.Btn_FullScreen);
    this.Btn_FullScreen.Info = "Clicker avec le bouton gauche de la souris pour passer en plein écran";
    this.Btn_FullScreen.Info2 = "Ce control a automatiquement l'apparence d'un bouton.";
    this.Btn_FullScreen.OnMouseEnter = OnMouseEnter_Info;
    this.Btn_FullScreen.OnMouseLeave = OnMouseLeave_Info;
    this.Btn_FullScreen.SetText("Plein écran");

    this.Btn_Reduce = new Control(cx, cy, cw, ch);
    this.Btn_Reduce.ClickLeft = function(){ FormDemo.Reducing(); };
    this.AddCollection(this.Btn_Reduce);
    this.Btn_Reduce.Info = "Clicker avec le bouton gauche de la souris pour réduire le control Form de base, appuyer sur ESC pour revenir à un mode normal";
    this.Btn_Reduce.Info2 = "Ce control a automatiquement l'apparence d'un bouton.";
    this.Btn_Reduce.OnMouseEnter = OnMouseEnter_Info;
    this.Btn_Reduce.OnMouseLeave = OnMouseLeave_Info;
    this.Btn_Reduce.SetText("Reduire");

    this.Btn_TextBox = new Control(cx, cy, cw, ch);
    this.Btn_TextBox.ClickLeft = function(){ if(TextDemo.Visible)TextDemo.Hide(); else TextDemo.Show(); };
    this.AddCollection(this.Btn_TextBox);
    this.Btn_TextBox.Info = "Clicker avec le bouton gauche de la souris pour ouvrir un traitement de texte dans lequel vous pouvez écrire";
    this.Btn_TextBox.Info2 = "Ce control a automatiquement l'apparence d'un bouton.";
    this.Btn_TextBox.OnMouseEnter = OnMouseEnter_Info;
    this.Btn_TextBox.OnMouseLeave = OnMouseLeave_Info;
    this.Btn_TextBox.SetText("Ecrire");

    this.Btn_Image = new Control(cx, cy, cw, ch);
    this.Btn_Image.ClickLeft = function(){ if(ImageDemo.Visible)ImageDemo.Hide(); else ImageDemo.Show(); };
    this.AddCollection(this.Btn_Image);
    this.Btn_Image.Info = "Clicker avec le bouton gauche de la souris pour ouvrir un Control qui peut contenir une Image";
    this.Btn_Image.Info2 = "Ce control a automatiquement l'apparence d'un bouton.";
    this.Btn_Image.OnMouseEnter = OnMouseEnter_Info;
    this.Btn_Image.OnMouseLeave = OnMouseLeave_Info;
    this.Btn_Image.SetText("Image");


    for(var i = 5; i < 25; i++)
    {
        var control = new Control(cx, cy, cw, ch, i)
        control.Info = "Control qui peut contenir d'autres control et qui s'organise automatiquement.";
        control.Info2 = "Utiliser la roulette de la souris pour faire défiler les controls ou utiliser les touches flèché bas et haut.";
        control.OnMouseEnter = OnMouseEnter_Info;
        control.OnMouseLeave = OnMouseLeave_Info;
        control.SetText("bouton " +i);

        this.AddCollection(control);
    }
    this.Info = "Control qui peut contenir d'autres control et qui s'organise automatiquement.";
    this.Info2 = "Utiliser la roulette de la souris pour faire défiler les controls ou utiliser les touches flèché bas et haut.";
    this.OnMouseEnter = OnMouseEnter_Info;
    this.OnMouseLeave = OnMouseLeave_Info;


};



function ControlDragDrop(x, y, width, height, border)
{
    this.InheritClass = ControlCollection;
    this.InheritClass(x, y, width, height, border);
    delete this.InheritClass;
    this.Inherit("ControlDragDrop");

var es = 5;
var cx = 0;
var cy = 0;
var cw = width-this.Border.Left-this.Border.Right;
var ch = 50;//cw;//height-this.Border.Top-this.Border.Bottom;



    this.CanDrag = true;
    this.OnDrag = function()
    {
        DragDrop.Control = this.Parent;
        DragDrop.Element = this;
    };
    this.OnDragDraw = function()
    {
        var form = this.Form;
        if(MouseHover.Control != null)
            form = MouseHover.Control.Form;
        if(DragDrop.Element != null)
//            DragDrop.Control.OnDraw(form.Context, Mouse.X, Mouse.Y);    
//            DragDrop.Control.OnDraw(form.Context, Mouse.X-form.Position.X, Mouse.Y-form.Position.Y);    
            DragDrop.Element.OnDrawing(Mouse.X-form.Position.X, Mouse.Y-form.Position.Y , this.Rectangle.Width, this.Rectangle.Height, form.Context);    
//            form.Context.drawImage(DragDrop.Element, Mouse.X-form.Position.X, Mouse.Y-form.Position.Y , 50, 50);    

    };
    
    this.CanDrop = true;
    this.OnDrop = function(){};

    this.OnDragEnter = function(){};
    this.OnDragLeave = function(){};
    this.OnDragOver = function(){};

};