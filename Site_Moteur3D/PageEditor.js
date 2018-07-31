

var EditorTarget = {Entity:null, Case:null, Cube:null};
var EditorLocation = {X:0,Y:0,Z:0};


var Editor_Menu;
var Editor_World;
var Editor_Map;
var Editor_ControlCube;
var Editor_ControlEntity;
var Editor_World2;
var Editor_ControlAnimations;
var Editor_ControlTemplate;
var Editor_ControlTranslator;
var Editor_PlayAnimation;
var Editor_Volume;
var Editor_ControlGame;

//{ID:"", Left:0, Top:0, Right:0, Bottom:0}
function Load()
{
    Editor_Menu = new ControlEditor(0,0,600,200, {ID:"ControlEditor", Border:10});
//    Editor_Menu = new ControlEditor(0,0,600,200, {ID:"ControlEditor", Left:10, Top:10, Right:10, Bottom:10});
    FormBase.Add(Editor_Menu);
    Editor_World = new ControlWorld(0, 150, 500, 300, {ID:"ControlWorld", Border:10});
    FormBase.Add(Editor_World);
    Editor_World.Hide();
    Editor_Map = new ControlMap(250, 250, 500, 300, {ID:"ControlMap", Border:10});
    FormBase.Add(Editor_Map);
    Editor_Map.Hide();
    Editor_ControlGame = new ControlGame(0, 250, 250, 500, {ID:"ControlGame", Border:10});
    FormBase.Add(Editor_ControlGame);
    Editor_ControlGame.Hide();
    
var x = PageInfo.Frame.Width-435;
var y = 0;
var w = 435;
var h = 650;

x += 10;
y += (12*15)+(5*12) +10;
h = 350; 
    Editor_ControlCube = new ControlCube(x, y, 450, h, {ID:"ControlCube", Border:10});
    Editor_ControlCube.Hide();
    FormBase.Add(Editor_ControlCube);
    
    Editor_ControlEntity = new ControlEntity(x, y, 475, h, {ID:"ControlEntity", Border:10});
    Editor_ControlEntity.Hide();
    FormBase.Add(Editor_ControlEntity);

    Editor_ControlTemplate =  new ControlTemplate(25, 25, 500, 500, {ID:"ControlTemplate", Left:10, Top:100, Right:10, Bottom:10});
    Editor_ControlTemplate.Text = "Editor_ControlTemplate";
    Editor_ControlTemplate.Hide();
    FormBase.Add( Editor_ControlTemplate );

    Editor_ControlTranslator = new ControlTranslator(25, 25, 650, 500, {ID:"ControlTranslator", Border:10});
    Editor_ControlTranslator.Hide();
    FormBase.Add(Editor_ControlTranslator); 

    Editor_ControlAnimations = new ControlAnimation(10, 10, 745, 500, {ID:"ControlAnimation", Border:10});
    Editor_ControlAnimations.Hide();
    FormBase.Add(Editor_ControlAnimations);

    Editor_PlayAnimation = new ControlPlayAnimation(550, 50, 435, 155, {ID:"ControlPlayAnimation", Border:10});
    Editor_PlayAnimation.Hide();
    FormBase.Add(Editor_PlayAnimation); 
    
    //Créer btn!!!!!!!!!
    Editor_Volume = new ControlVolume(10, 100, 300, 500, {ID:"ControlVolume", Border:10});
    Editor_Volume.Hide();
    FormBase.Add(Editor_Volume);
    
    FormBase.Add(new ControlDownload(PageInfo.Frame.Width-250, 0, 250, 350 ));
//    Editor_Volume.OnRectangleChanged(10, 100, 300, 500);
//    Editor_Volume.MoveTo(10, 100);
    
//    FormBase.OnMouseWheel = function(rolled)
//    {
//        if(rolled > 0){ SetMaxZ(MaxZ+1); if(MaxZ > PageInfo.Map.Depth)MaxZ = PageInfo.Map.Depth; }
//        else if(rolled < 0){ SetMaxZ(MaxZ-1); if(MaxZ < 0)MaxZ = 0; }
//    }

    FormBase.Add( new ControlImageList(Editor_Menu.Rectangle.Width+10, 0, 200, 50, {Border:10, ImgNumber:5}) );

    CallWorldNames();
};

MouseMove = function(e){};
MouseDownLeft = function(e) 
{
    if(PageInfo.Map == null)return false;

    EditorTarget.Case = Target.Case;

    if(Target.ID == "") EditorTarget.Entity = null;
    else EditorTarget.Entity = FindEntityID(Target.ID);

    Editor_OnTarget();

//    EditorTarget.Case = Target.Case;
////    EditorTarget.Cube = null;
//    if(Target.ID == "") EditorTarget.Entity = null;
//    else EditorTarget.Entity = FindEntityID(Target.ID);

//    Editor_ControlCube.OnTarget();



//    if(EditorTarget.Case != null)
//        for(var i = 0; i < EditorTarget.Case.Cubes.length; i++)
//            if(EditorTarget.Case.Cubes[i].Z == Editor_ControlCube.Txt_Z.GetNumber())
//                EditorTarget.Cube = EditorTarget.Case.Cubes[i];


//    EditorLocation.X = Location.X + EditorTarget.Case.X - Location.Z + EditorLocation.Z;
//    EditorLocation.Y = Location.Y + EditorTarget.Case.Y - Location.Z + EditorLocation.Z;





//    var tmp_Z = EditorLocation.Z;
//    if(EditorTarget.Cube != null)
//    {
//        tmp_Z =EditorLocation.Z - EditorTarget.Cube.Z;
//    }
//    else
//    {
//    
//    }


//    OnTargetMap();
//    OnTarget();
//    if(Editor_ControlCube.Visible)
//        Editor_ControlCube.OnTarget();
//    {
//        if(Editor_ControlCube.Btn_Selected.OnOff)
//        {
////            Editor_ControlCube.OnTarget(Target.X, Target.Y, Target.Z);
//        }
//        else
//        {
////            Editor_ControlCube.CallSave();
//        }
//    }
    return false; 
};

function CallWorldNames(){ CallPage("EDITOR_WORLDNAMES", ""); };

var ResponsePage = function(msg)
{
    if (msg.COMMAND == "EDITOR_WORLDNAMES")
    {
        Editor_Menu.World_List.ChangeLines(msg.List);
    }
    else if (msg.COMMAND == "EDITOR_MAPNAMES")
    {
        Editor_Menu.Map_List.ChangeLines(msg.List);
    }
    else if(msg.COMMAND == "EDITOR_GENERATE")
    {
        var image = new Image(); 
        image.src = msg.Text;
        image.onload = function(){ Editor_Volume.Image = this; };
        Editor_ControlTemplate.Img_Index = PageInfo.Templates.length-1;
        Editor_ControlTemplate.Img_Index_Modified();
    }
    else if( msg.COMMAND == "ENTITYS" )
    {
        Editor_ControlEntity.Entitys_List.ChangeLines(Entitys);
    }
    else if( msg.COMMAND == "PERMANENTS" )
    {
        if(PageInfo.Map != null)
            Editor_ControlEntity.Permanents_List.ChangeLines(PageInfo.Map.Permanents);
    }
//    else if( msg.COMMAND == "EDITOR_NEW_CUBES" )
//    {
//        if(PageInfo.Map == null)return;
//        for(var i = 0; i < msg.Cubes.length; i++)
//            if( msg.Cubes[i] != null && msg.Cubes[i] != undefined)
//                PageInfo.Map.Cubes[msg.Cubes[i].X][msg.Cubes[i].Y][msg.Cubes[i].Z] = msg.Cubes[i];
////        CreateEntityDraw = true;
//        CreateCase = true;
////            Editor_ControlCube.OnTarget();//(msg.Cubes[i].X, msg.Cubes[i].Y, msg.Cubes[i].Z);
//    }
//    else if( msg.COMMAND == "EDITOR_CUBES" )
//    {
//        if(PageInfo.Map == null)return;
//        for(var i = 0; i < msg.Cubes.length; i++)
//            if( msg.Cubes[i] != null && msg.Cubes[i] != undefined)
//                PageInfo.Map.Cubes[msg.Cubes[i].X][msg.Cubes[i].Y][msg.Cubes[i].Z] = msg.Cubes[i];
////        CreateEntityDraw = true;
//        CreateCase = true;
////            Editor_ControlCube.OnTarget();//(msg.Cubes[i].X, msg.Cubes[i].Y, msg.Cubes[i].Z);
//    }







};



Draw = function()
{
//        FormBase.Context.fillText( EditorLocation.X +"."+ EditorLocation.Y +"."+ EditorLocation.Z, 100, 25 );
    if(Target.Case != null)
    {

//        FormBase.Context.fillText( EditorLocation.X +"."+ EditorLocation.Y +"."+ EditorLocation.Z, Target.Case.Screen.X, Target.Case.Screen.Y );

//        if(Target.Case != null)
//        {
            var size = PageInfo.MapInfo.SizeCube;
            var p11 = {X:Target.Case.Screen.X+Grap.X, Y:Target.Case.Screen.Y+Grap.Y+PageInfo.MapInfo.SizeCube};
            var p21 = {X:p11.X, Y:p11.Y+(PageInfo.MapInfo.SizeCube*Editor_ControlCube.Txt_Z.GetNumber())};
            DrawTemplateImage( {Name:"Cube", NbrX:1, NbrY:1}, Target.Case.Screen.X+Grap.X - size, Target.Case.Screen.Y+Grap.Y - size, size*2, size*2, FormBase.Context );
            DrawLine(p11, p21, FormBase.Context);
//        }
    }
    if(EditorTarget.Case != null)
    {

        FormBase.Context.fillText( EditorLocation.X +"."+ EditorLocation.Y +"."+ EditorLocation.Z, EditorTarget.Case.Screen.X, EditorTarget.Case.Screen.Y );

//        if(EditorTarget.Case != null)
//        {
//            var size = PageInfo.MapInfo.SizeCube;
            var p1 = {X:EditorTarget.Case.Screen.X+Grap.X, Y:EditorTarget.Case.Screen.Y+Grap.Y+PageInfo.MapInfo.SizeCube};
            var p2 = {X:p1.X, Y:p1.Y+(PageInfo.MapInfo.SizeCube*Editor_ControlCube.Txt_Z.GetNumber())};
            DrawTemplateImage( {Name:"Cube", NbrX:1, NbrY:1}, EditorTarget.Case.Screen.X+Grap.X - size, EditorTarget.Case.Screen.Y+Grap.Y - size, size*2, size*2, FormBase.Context );
            DrawLine(p1, p2, FormBase.Context);
//        }
    }
};
var Editor_OnTarget = function()
{
//    EditorTarget.Case = Target.Case;

//    if(Target.ID == "") EditorTarget.Entity = null;
//    else EditorTarget.Entity = FindEntityID(Target.ID);


//        EditorLocation.Z = this.Txt_Z.GetNumber();
    EditorLocation.X = Location.X + EditorTarget.Case.X - Location.Z + EditorLocation.Z;
    EditorLocation.Y = Location.Y + EditorTarget.Case.Y - Location.Z + EditorLocation.Z;

    if(EditorTarget.Case != null)
    {
        EditorTarget.Cube = null;
        for(var i = 0; i < EditorTarget.Case.Cubes.length; i++)
            if(EditorTarget.Case.Cubes[i].Z == EditorLocation.Z)
                EditorTarget.Cube = EditorTarget.Case.Cubes[i];
    }


    Editor_ControlCube.OnTarget();

};





function ControlEditor(x, y, width, height, params)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, params);
    delete this.InheritClass;
    this.Inherit("ControlEditor");

//    this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
    this.BackColor = "white";
    this.CanMove = true;
    this.CanResize = true;
x = 0;
y = 0;
height = 15;
var es = 5;

width = this.Rectangle.Width-this.Border.Left-this.Border.Right;
    this.Add(new ControlTicket(x, y, this.Rectangle.Width-this.Border.Left-this.Border.Right, height, "#EDITOR"));
y += (height+es)*2;
x = 0;
    this.World_List = new TextList(x, y, (width-es)/2, height);
    this.World_List.SetText("#World");
    this.World_List.SelectedLineChanged = function(){ CallPage("EDITOR_SELECTED_WORLD", this.Lines[this.SelectedLine]); };
    this.Add(this.World_List);
x += ((width-es)/2)+es;
    this.Map_List = new TextList(x, y, (width-es)/2, height);
    this.Map_List.SetText("#Map");
    this.Map_List.SelectedLineChanged = function(){ CallPage("EDITOR_SELECTED_MAP", this.Lines[this.SelectedLine]); };
    this.Add(this.Map_List);
x = 0;
y += height+es;
width = 100;
    this.Btn_World = new Control(x, y, width, height);
    this.Btn_World.SetText("#WORLD");
    this.Btn_World.ClickLeft = function(){if(Editor_World.Visible)Editor_World.Hide(); else Editor_World.Show();};
    this.Add(this.Btn_World);
x += width+es;
    this.Btn_Map = new Control(x, y, width, height);
    this.Btn_Map.SetText("#MAP");
    this.Btn_Map.ClickLeft = function(){if(Editor_Map.Visible)Editor_Map.Hide(); else Editor_Map.Show();};
    this.Add(this.Btn_Map);
x += width+es;
    this.Btn_Cube = new Control(x, y, width, height);
    this.Btn_Cube.SetText("#CUBE");
    this.Btn_Cube.ClickLeft = function(){ if(Editor_ControlCube.Visible)Editor_ControlCube.Hide(); else Editor_ControlCube.Show(); };
    this.Add(this.Btn_Cube);
x += width+es;
    this.Btn_Entity = new Control(x, y, width, height);
    this.Btn_Entity.SetText("#ENTITY");
    this.Btn_Entity.ClickLeft = function(){ if(Editor_ControlEntity.Visible)Editor_ControlEntity.Hide(); else Editor_ControlEntity.Show(); };
    this.Add(this.Btn_Entity);
x = 0;
y += height+es;
    this.Btn_Save = new Control(x,y,width,height);
    this.Btn_Save.ClickLeft = function(){CallPage("EDITOR_SAVE", "");};
    this.Btn_Save.SetText("#Save");
    this.Add(this.Btn_Save);
x += width+es;
    this.Btn_ControlGame = new Control(x, y, width, height);
    this.Btn_ControlGame.SetText("#Control Game");
    this.Btn_ControlGame.ClickLeft = function(){ if(Editor_ControlGame.Visible)Editor_ControlGame.Hide(); else Editor_ControlGame.Show(); };
    this.Add(this.Btn_ControlGame);
//x += width+es;
//    this.Btn_Grid = new Control(x, y, width, height);
//    this.Btn_Grid.SetText("#Grid");
//    this.Btn_Grid.ClickLeft = function(){ PageInfo.MapInfo.Grid = !PageInfo.MapInfo.Grid; };
//    this.Add(this.Btn_Grid);
//x += width+es;
//    this.Num_NbrCube = new ControlNumber(x,y,width,height);
////    this.Num_NbrCube.Number.SetText(PageInfo.MapInfo.NbrCube.toString());
//    this.Num_NbrCube.Step = 1;
//    this.Num_NbrCube.Number.ReadOnly = true;
//    this.Num_NbrCube.Down = function()
//    {
//        if(PageInfo.MapInfo.NbrCube > 1)
//            PageInfo.MapInfo.NbrCube--;
//        this.SetNumber( PageInfo.MapInfo.NbrCube);
//        ResizeCases3D();
//        ResizeEntitysDraw();
//        CreateEntityDraw = true;
//        CreateCase = true;
//    };
//    this.Num_NbrCube.Up = function()
//    {
//            PageInfo.MapInfo.NbrCube++;
//        this.SetNumber( PageInfo.MapInfo.NbrCube);
//        ResizeCases3D();
//        ResizeEntitysDraw();
//        CreateEntityDraw = true;
//        CreateCase = true;
//    };
//    this.Add(this.Num_NbrCube);
x += width+es;
    this.Num_SizeCube = new ControlNumber(x,y,width,height);
    this.Num_SizeCube.Number.SetText(PageInfo.MapInfo.SizeCube.toString());
    this.Num_SizeCube.Step = 1;
    this.Num_SizeCube.Number.ReadOnly = true;
    this.Num_SizeCube.Down = function()
    {
        if(PageInfo.MapInfo.SizeCube > 10)
            PageInfo.MapInfo.SizeCube = PageInfo.MapInfo.SizeCube-5;
        this.SetNumber( PageInfo.MapInfo.SizeCube);
        ResizeCases3D();
        ResizeEntitysDraw();
        CreateEntityDraw = true;
        CreateCase = true;
    };
    this.Num_SizeCube.Up = function()
    {
            PageInfo.MapInfo.SizeCube += 5;
        this.SetNumber( PageInfo.MapInfo.SizeCube);
        ResizeCases3D();
        ResizeEntitysDraw();
        CreateEntityDraw = true;
        CreateCase = true;
    };
    this.Add(this.Num_SizeCube);
x = 0;
y += height+es;
    this.Btn_Template = new Control(x,y,width,height);
    this.Btn_Template.ClickLeft = function(){if(Editor_ControlTemplate.Visible){Editor_ControlTemplate.Hide(); }else{ Editor_ControlTemplate.Show(); Editor_ControlTemplate.Img_Index_Modified(); } };
    this.Btn_Template.SetText("#Template");
    this.Add(this.Btn_Template);
x += width+es;
    this.OnMouseEnter = function(){};
    this.Btn_Animations = new Control(x,y,width,height);
    this.Btn_Animations.ClickLeft = function(){if(Editor_ControlAnimations.Visible){Editor_ControlAnimations.Hide();} else {Editor_ControlAnimations.Images_List.ChangeLines(PageInfo.Animations);Editor_ControlAnimations.Show();} };
    this.Btn_Animations.SetText("#Animations");
    this.Add(this.Btn_Animations);
x += width+es;
    this.Btn_PlayAnimationr = new Control(x,y,width,height);
    this.Btn_PlayAnimationr.ClickLeft = function(){if(Editor_PlayAnimation.Visible){Editor_PlayAnimation.Hide();} else {Editor_PlayAnimation.Show();} };
    this.Btn_PlayAnimationr.SetText("#PlayAnimation");
    this.Add(this.Btn_PlayAnimationr);
x += width+es;
    this.Btn_Translator = new Control(x,y,width,height);
    this.Btn_Translator.ClickLeft = function(){if(Editor_ControlTranslator.Visible)Editor_ControlTranslator.Hide(); else {Editor_ControlTranslator.Translators_List.ChangeLines(PageInfo.Translators); Editor_ControlTranslator.Show();} };
    this.Btn_Translator.SetText("#Translator");
    this.Add(this.Btn_Translator);
x += width+es;
    this.Btn_Volume = new Control(x,y,width,height);
    this.Btn_Volume.ClickLeft = function(){if(Editor_Volume.Visible)Editor_Volume.Hide(); else  Editor_Volume.Show(); };
    this.Btn_Volume.SetText("#Volume");
    this.Add(this.Btn_Volume);

    this.Rectangle.Height = this.Border.Top + this.Border.Bottom + y + height;
    this.Draw = function(x, y, width, height, context)
    {
        var px = x+this.Border.Right  +10;
        var py = y+this.Border.Top +10 +20;
        var txt = "World : ";
        if(PageInfo.World == null) txt += "Aucun";
        else txt += PageInfo.World.Name;
        txt += "  |  ";
        txt += "Map : ";
        if(PageInfo.Map == null) txt += "Aucune";
        else txt += PageInfo.Map.Name;
        txt += "  |  ";
        txt += "Selected { X:" +Target.X+ " Y:" +Target.Y+ " Z:" +Target.Z+ " }";
        txt += "  |  ";
        txt += "Entity : " +Selected.Entity;
        txt += "  |  ";
        txt += "Target : " +Selected.Target;

        context.fillText( txt, px, py );
    };
};

function ControlWorld(x, y, width, height, params)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, params);
    delete this.InheritClass;
    this.Inherit("ControlWorld");

    //this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
    this.BackColor = "white";
    this.CanMove = true;
    this.CanResize = true;
x = 0;
y = 0;
width = 100;
height = 15;
var es = 5;
    this.Add(new ControlTicket(x, y, this.Rectangle.Width-this.Border.Left-this.Border.Right, height, "#WORLD"));
y += height+es;
width = this.Rectangle.Width-this.Border.Left-this.Border.Right;
    this.Add(new ControlTicket(x, y, (width-es)/2, height, "#Name"));
x += ((width-es)/2)+es;
    this.Add(new ControlTicket(x, y, (width-es)/2, height, "#Type"));
x = 0;
y += height+es;
    this.World_Name = new TextBox(x, y, (width-es)/2, height);
    this.World_Name.BackText = "#Name";
    this.Add(this.World_Name);
x = ((width-es)/2)+es;
    this.World_Type = new TextBox(x, y, (width-es)/2, height);
    this.World_Type.SetText("Core.World");
    this.Add(this.World_Type);
x = 0;
y += height+es;
    this.World_New = new Control(x, y, width, height);
    this.World_New.SetText("#New");
    this.World_New.ClickLeft = function(){CallPage("EDITOR_NEW_WORLD", this.Parent.World_Name.GetText() +PageInfo.Separator+ this.Parent.World_Type.GetText() );}; 
    this.Add(this.World_New);

    this.Rectangle.Height = this.Border.Top + this.Border.Bottom + y + height;
    this.Draw = function(x, y, width, height, context){};
};
function ControlMap(x, y, width, height, params)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, params);
    delete this.InheritClass;
    this.Inherit("ControlMap");

    //this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
    this.BackColor = "white";
    this.CanMove = true;
    this.CanResize = true;
x = 0;
y = 0;
width = 100;
height = 15;
var es = 5;
    this.Add(new ControlTicket(x, y, this.Rectangle.Width-this.Border.Left-this.Border.Right, height, "#MAP"));
y += height+es;
width = this.Rectangle.Width-this.Border.Left-this.Border.Right;
    this.Add(new ControlTicket(x, y, (width-es)/2, height, "#Name"));
x += ((width-es)/2)+es;
    this.Add(new ControlTicket(x, y, (width-es)/2, height, "#Type"));
x = 0;
y += height+es;
    this.Map_Name = new TextBox(x, y, (width-es)/2, height);
    this.Map_Name.BackText = "#Name";
    this.Add(this.Map_Name);
x += ((width-es)/2)+es;
    this.Map_Type = new TextBox(x, y, (width-es)/2, height);
    this.Map_Type.SetText("Core.Map");
    this.Add(this.Map_Type);
x = 0;
y += height+es;
    this.Add(new ControlTicket(x, y, width, height, "#Size"));
x = 0;
y += height+es;
    this.Map_Size = new ControlPoint3D(x, y, width, height );
    this.Map_Size.SetMinValue(1);
    this.Map_Size.SetPoint3D( {X:1,Y:1,Z:1} );
    this.Add(this.Map_Size);
x = 0;
y += height+es;
    this.Map_New = new Control(x, y, width, height);
    this.Map_New.SetText("#NEW");
    this.Map_New.ClickLeft = function(){ var p3D = this.Parent.Map_Size.GetPoint3D(); CallPage("EDITOR_NEW_MAP", this.Parent.Map_Name.GetText() +PageInfo.Separator+ p3D.X +PageInfo.Separator+ p3D.Y +PageInfo.Separator+ p3D.Z); };
    this.Add(this.Map_New);

    this.Rectangle.Height = this.Border.Top + this.Border.Bottom + y + height;
    this.Draw = function(x, y, width, height, context){};
};

function ControlCube(x, y, width, height, params)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, params);
    delete this.InheritClass;
    this.Inherit("ControlCube");
    
    this.BackColor = "white";
    //this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
    this.CanMove = true;
    
    this.Cube = null;
    
x = 0;
y = 0;
height = 20;
var es = 5;
width = this.Rectangle.Width-this.Border.Left-this.Border.Right;
var width2 = (width-es)/2;
var width4 = (width2-es)/2;
    this.Add(new ControlTicket(x, y, width, height, "#Cube"));
x = 0;
y += height+es;
    this.Btn_Selected = new ControlOnOff(x,y,width4,height);
    this.Btn_Selected.OnOff = true;
    this.Btn_Selected.SetText("#Selected");
    this.Add(this.Btn_Selected);

x += this.Btn_Selected.Rectangle.Width + es;

    this.Txt_Z = new ControlNumber(x, y, width4, height);
    this.Txt_Z.SetNumber(0);
    this.Txt_Z.Step = 1;
    this.Txt_Z.Number.ReadOnly = false;
    this.Txt_Z.NumberChanged = function(){EditorLocation.Z = this.GetNumber(); Editor_OnTarget();};
    this.Txt_Z.DownChanged = function()
    {
        EditorTarget.Case = FindCase(EditorTarget.Case.X+1, EditorTarget.Case.Y+1);
        this.NumberChanged();
    };
    this.Txt_Z.UpChanged = function()
    {
        EditorTarget.Case = FindCase(EditorTarget.Case.X-1, EditorTarget.Case.Y-1);
        this.NumberChanged();
    };
   this.Add(this.Txt_Z);

x += this.Txt_Z.Rectangle.Width + es;

    this.Btn_New = new Control( x, y, width4, height);
    this.Btn_New.SetText("#NEW");
    this.Btn_New.ClickLeft = function(){ this.Parent.OnModify2(); };
    this.Add(this.Btn_New);

x = 0;
y += height+es;
    this.Climb = new ControlOnOff( x, y, width4, height );
    this.Climb.SetText("#Climb");
    this.Climb.OnOffChanged = function(){ this.Parent.OnModify2(); };
    this.Add(this.Climb);
x += width4+es;
    this.Cross = new ControlOnOff( x, y, width4, height );
    this.Cross.SetText("#Cross");
    this.Cross.OnOffChanged = function(){ this.Parent.OnModify2(); };
    this.Add(this.Cross);
x += width4+es;
    this.See = new ControlOnOff( x, y, width4, height );
    this.See.SetText("#See");
    this.See.OnOffChanged = function(){ this.Parent.OnModify2(); };
    this.Add(this.See);
x += width4+es;
    this.Attack = new ControlOnOff( x, y, width4, height );
    this.Attack.SetText("#Attack");
    this.Attack.OnOffChanged = function(){ this.Parent.OnModify2(); };
    this.Add(this.Attack);
x = 0;
y += height+es;
    this.Add(new ControlTicket(x, y, width4, height, "#Speed"));
x += width4+es;
    this.Txt_Floors_Speed = new ControlNumber( x, y, width4, height );
    this.Txt_Floors_Speed.Number.Text = "0";
    this.Txt_Floors_Speed.Step = 100;
    this.Txt_Floors_Speed.MaxValue = 1000000000;
    this.Txt_Floors_Speed.Number.ReadOnly = false;
    this.Txt_Floors_Speed.NumberChanged = function(){ this.Parent.OnModify2(); };
    this.Add(this.Txt_Floors_Speed);
x = 0;
y += height+es;
    this.Floors = new ControlImage( x, y, width2, 5 );
    this.Floors.ImagesChanged = function(){ this.Parent.OnModify2(); };
    this.Add(this.Floors);
x = 0;
y += this.Floors.Rectangle.Height + es;
    this.Add(new ControlTicket(x, y, width4, height, "#Speed"));
x += width4+es;
    this.Txt_Volumes_Speed = new ControlNumber( x, y, width4, height );
    this.Txt_Volumes_Speed.Number.Text = "0";
    this.Txt_Volumes_Speed.Step = 100;
    this.Txt_Volumes_Speed.MaxValue = 1000000000;
    this.Txt_Volumes_Speed.Number.ReadOnly = false;
    this.Txt_Volumes_Speed.NumberChanged = function(){ this.Parent.OnModify2(); };
    this.Add(this.Txt_Volumes_Speed);
x = 0;
y += height+es;
    this.Volumes = new ControlImage( x, y, width2, 5 );
    this.Volumes.ImagesChanged = function(){ this.Parent.OnModify2(); };
    this.Add(this.Volumes);
    
    this.Rectangle.Height = this.Border.Top + this.Border.Bottom + y + this.Volumes.Rectangle.Height ;

    this.OnClear = function(x, y, z)
    {
        this.Cube = null;
        this.Climb.OnOff = false;
        this.Cross.OnOff = false;
        this.See.OnOff = false;
        this.Attack.OnOff = false;
        this.Floors.Images = [];
        this.Volumes.Images = [];
        this.Txt_Floors_Speed.Number.SetText("0");
        this.Txt_Volumes_Speed.Number.SetText("0");

        this.Btn_New.Show();
    };
    this.OnCube = function(cube)
    {
        if(cube == null){this.OnClear(); return;};
        this.Cube = cube;
        this.Climb.OnOff = this.Cube.Climb;
        this.Cross.OnOff = this.Cube.Cross;
        this.See.OnOff = this.Cube.See;
        this.Attack.OnOff = this.Cube.Attack;
        this.Floors.Images = this.Cube.Floors;
        this.Volumes.Images = this.Cube.Volumes;
        this.Txt_Floors_Speed.Number.SetText(this.Cube.Floors_Speed.toString());
        this.Txt_Volumes_Speed.Number.SetText(this.Cube.Volumes_Speed.toString());

        this.Btn_New.Hide();
    };
    this.OnModify2 = function()
    {
        var temp = EditorLocation.X +PageInfo.Separator+ EditorLocation.Y +PageInfo.Separator+ EditorLocation.Z +PageInfo.Separator;
        temp += EditorLocation.X +PageInfo.Separator+ EditorLocation.Y +PageInfo.Separator+ EditorLocation.Z +PageInfo.Separator;
        temp += "Core.Cube" +PageInfo.Separator;
        temp += this.Climb.OnOff +PageInfo.Separator+ this.Cross.OnOff +PageInfo.Separator+ this.See.OnOff +PageInfo.Separator+ this.Attack.OnOff +PageInfo.Separator;
        temp += this.Txt_Floors_Speed.GetNumber() +PageInfo.Separator+ JSONSerialize(this.Floors.Images) +PageInfo.Separator;
        temp += this.Txt_Volumes_Speed.GetNumber() +PageInfo.Separator+ JSONSerialize(this.Volumes.Images);
    
        CallPage("EDITOR_MODIFY_CUBE2", temp);
        this.Btn_New.Hide();
    };
    this.OnTarget = function()
    {
        if(this.Btn_Selected.OnOff)
        {
            if( EditorTarget.Cube == null) this.OnClear();
            else this.OnCube(EditorTarget.Cube);
        }
        else
        {
            this.OnModify2();
        }
    };
    this.Draw = function(x, y, width, height, context)
    {
        var size = PageInfo.MapInfo.SizeCube;
        var px = x+this.Border.Left + ((width-this.Border.Left-this.Border.Right)/2) + 50;
        var py = y+this.Border.Top +100;
        var floorspeed =  parseInt(this.Txt_Floors_Speed.Number.Text);
        if ( floorspeed == 0 )
        {
            for( var i = 0; i < this.Floors.Images.length; i++)
                DrawTemplateImage( this.Floors.Images[i], px - size, py - size, size*2, size*2, context );
        }
        else
        {
            var j = Math.floor( this.Floors.Images.length * ((DrawTime % floorspeed)/floorspeed) );
            DrawTemplateImage( this.Floors.Images[j], px - size, py - size, size*2, size*2, context );
        }
    
        var volumespeed = parseInt(this.Txt_Volumes_Speed.Number.Text);
        if ( volumespeed == 0 )
        {
            for( var k = 0; k < this.Volumes.Images.length; k++)
                DrawTemplateImage( this.Volumes.Images[k], px - size, py - size, size*2, size*2, context );
        }
        else
        {
            var l = Math.floor( this.Volumes.Images.length * ((DrawTime % volumespeed)/volumespeed) );
            DrawTemplateImage( this.Volumes.Images[l], px - size, py - size, size*2, size*2, context );
        }
    };   
};


function ControlBody(x, y, width, height, params)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, params);
    delete this.InheritClass;
    this.Inherit("ControlBody");

    this.BackColor = "white";
    this.Body = null;
x = 0;
y = 0;
width = 100;
height = 15;
var es = 5;

    this.Images = new ControlImage( x, y, (width*2)+es, 5 );
    this.Images.ImagesChanged = function(){ this.Parent.OnBody(); };
    this.Add(this.Images);
x += this.Images.Rectangle.Width + es;    
    this.Btn_Animated = new ControlOnOff( x, y, width, height );
    this.Btn_Animated.SetText("#Animated");
    this.Btn_Animated.OnOffChanged = function(){ this.Parent.OnBody(); };
    this.Add(this.Btn_Animated);
x += width+es;
    this.Btn_Turned = new ControlOnOff( x, y, width, height );
    this.Btn_Turned.SetText("#Turned");
    this.Btn_Turned.OnOffChanged= function(){ this.Parent.OnBody(); };
    this.Add(this.Btn_Turned);
x = this.Images.Rectangle.Width + es; 
y += height+es;
    this.Txt_Speed = new ControlNumber( x, y, width, height );
    this.Txt_Speed.Number.Text = "1000";
    this.Txt_Speed.Step = 100;
    this.Txt_Speed.MaxValue = 1000000000;
    this.Txt_Speed.Number.ReadOnly = false;
    this.Txt_Speed.NumberChanged = function(){ this.Parent.OnBody(); };
    this.Add(this.Txt_Speed);
x += width+es;
    this.Txt_Duration = new ControlNumber( x, y, width, height );
    this.Txt_Duration.Number.Text = "-1";
    this.Txt_Duration.Step = 100;
    this.Txt_Duration.MaxValue = 1000000000;
    this.Txt_Duration.Number.ReadOnly = false;
    this.Txt_Duration.NumberChanged = function(){ this.Parent.OnBody(); };
    this.Add(this.Txt_Duration);
    
    this.Rectangle.Width = this.Border.Left + this.Border.Right + x + width;
    this.Rectangle.Height = this.Border.Top + this.Border.Bottom + y + height;
    this.Draw = function(x, y, width, height, context){};
    
    this.OnBody = function()
    {
        if(this.Images.Images.length == 0)return;
        this.Parent.Body = this.GetBody();
    };
    this.GetBody = function()
    {
        var body = {Images:[],Animated:false,Turned:false,Speed:0,Duration:0,Step:0,StepServer:0};
        body.Images = this.Images.Images;
        body.Animated = this.Btn_Animated.OnOff;
        body.Turned = this.Btn_Turned.OnOff;
        body.Speed = this.Txt_Speed.GetNumber();;
        body.Duration = this.Txt_Duration.GetNumber();
        return body;
    };
    this.Clear = function()
    {
        this.Images.Clear();
        this.Btn_Animated.OnOff = false;
        this.Btn_Turned.OnOff = false;
        this.Txt_Speed.Clear();
        this.Txt_Duration.Clear();
    };
    this.OnSelected = function(body)
    {
        this.Images.Images = body.Images;
        this.Btn_Animated.OnOff = body.Animated;
        this.Btn_Turned.OnOff = body.Turned;
        this.Txt_Speed.SetNumber(body.Speed);
        this.Txt_Duration.SetNumber(body.Duration);
    };
};
function ControlEntity(x, y, width, height, params)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, params);
    delete this.InheritClass;
    this.Inherit("ControlEntity");

    //this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
    this.BackColor = "white";
    this.CanMove = true;
    this.Direction = 1;
    this.Body = null;
x = 0;
y = 0;
width = 100;
height = 15;
var es = 5;
    this.Add(new ControlTicket(x, y, this.Rectangle.Width-this.Border.Left-this.Border.Right, height, "#Entity"));
x = 0;
y += height+es; 
    this.Permanents_List = new TextList(x, y, width, height);
    this.Permanents_List.SetText("#Permanents");
    this.Permanents_List.SelectedLineChanged = function(){this.Parent.OnSelected(this.Lines[this.SelectedLine]) };
    this.Permanents_List.LinesToString = function(i){return this.Lines[i].Name +" ["+ this.Lines[i].ID +"]";};
    this.Add(this.Permanents_List);
x += width+es;
    this.Entitys_List = new TextList(x, y, width, height);
    this.Entitys_List.SetText("#Entitys");
    this.Entitys_List.SelectedLineChanged = function(){this.Parent.OnSelected(this.Lines[this.SelectedLine]) };
    this.Entitys_List.LinesToString = function(i){return this.Lines[i].Name +" ["+ this.Lines[i].ID +"]";};
    this.Entitys_List.ChangeLines = function(lines){ this.Lines = lines; this.ChangeStyle(); if( this.SelectedLine >= this.Lines.length)this.SelectedLine = -1; };
    this.Add(this.Entitys_List);
x = 0;
y += height+es; 
    this.Btn_Left = new Control( x, y, width, height );
    this.Btn_Left.SetText("#Left");
    this.Btn_Left.ClickLeft = function(){this.Parent.Direction--; if(this.Parent.Direction < 1)this.Parent.Direction = 8; };
    this.Add(this.Btn_Left);
x += width+es;
    this.Btn_Rigth = new Control( x, y, width, height );
    this.Btn_Rigth.SetText("#Rigth");
    this.Btn_Rigth.ClickLeft = function(){this.Parent.Direction++; if(this.Parent.Direction > 8)this.Parent.Direction = 1; };
    this.Add(this.Btn_Rigth);
x = 0;
y += height+es; 
    this.Add(new ControlTicket(x, y, width, height, "#Type"));
x += width+es;
    this.Txt_Type = new TextBox( x, y, width, height );
    this.Txt_Type.SetText("Core.Entity");
    this.Add(this.Txt_Type);
x = 0;
y += height+es; 
    this.Add(new ControlTicket(x, y, width, height, "#AI"));
x += width+es;
    this.Txt_AI = new TextBox( x, y, width, height );
    this.Txt_AI.SetText("Core.Utility.AI");
    this.Add(this.Txt_AI);
x = 0;
y += height+es; 
    this.Add(new ControlTicket(x, y, width, height, "#ID"));
x += width+es;
    this.Txt_ID = new TextBox( x, y, width, height );
    this.Txt_ID.BackText = "#ID";
    this.Add(this.Txt_ID);
x = 0;
y += height+es; 
    this.Add(new ControlTicket(x, y, width, height, "#Name"));
x += width+es;
    this.Txt_Name = new TextBox( x, y, width, height );
    this.Txt_Name.BackText = "#Name";
    this.Add(this.Txt_Name);
x = 0;
y += height+es; 
    this.Add(new ControlTicket(x, y, width, height, "#Width"));
x += width+es;
    this.Txt_Width = new ControlNumber( x, y, width, height );
    this.Txt_Width.Number.Text = "1.0";
    this.Txt_Width.Number.ReadOnly = false;
    this.Add(this.Txt_Width);
x = 0;
y += height+es; 
    this.Add(new ControlTicket(x, y, width, height, "#Height"));
x += width+es;
    this.Txt_Height = new ControlNumber( x, y, width, height );
    this.Txt_Height.Number.Text = "1.0";
    this.Txt_Height.Number.ReadOnly = false;
    this.Add(this.Txt_Height);
x = 0;
y += height+es;
    this.Btn_Cross = new ControlOnOff( x, y, width, height );
    this.Btn_Cross.SetText("#Cross");
    this.Add(this.Btn_Cross);
x += width+es;
    this.Btn_Street = new ControlOnOff( x, y, width, height );
    this.Btn_Street.SetText("#Street");
    this.Add(this.Btn_Street);
x = 0;
y += height+es;
    this.Btn_CanMove = new ControlOnOff( x, y, width, height );
    this.Btn_CanMove.SetText("#CanMove");
    this.Add(this.Btn_CanMove);
x += width+es;
    this.Btn_CanTarget = new ControlOnOff( x, y, width, height );
    this.Btn_CanTarget.SetText("#CanTarget");
    this.Add(this.Btn_CanTarget);
x = 0;
y += height+es;
    this.Add(new ControlTicket(x, y, this.Rectangle.Width-this.Border.Left-this.Border.Right, height, "#Stand"));
y += height+es;
    this.Btn_Stand = new Control( x, y, (height*2)+es, (height*2)+es );
    this.Btn_Stand.SetText("#Stand");
    this.Btn_Stand.ClickLeft = function(){ this.Parent.Body = this.Parent.Body_Stand.GetBody(); };
    this.Add(this.Btn_Stand);
x += (height+es)*2;
//y += height+es;
    this.Body_Stand = new ControlBody(x, y, 0, 0);
    this.Add(this.Body_Stand);
x = 0;
y += height+es;
y += height+es;
    this.Add(new ControlTicket(x, y, this.Rectangle.Width-this.Border.Left-this.Border.Right, height, "#Move"));
y += height+es;
    this.Btn_Move = new Control( x, y, (height*2)+es, (height*2)+es );
    this.Btn_Move.SetText("#Move");
    this.Btn_Move.ClickLeft = function(){ this.Parent.Body = this.Parent.Body_Move.GetBody(); };
    this.Add(this.Btn_Move);
x += (height+es)*2;
    this.Body_Move = new ControlBody(x, y, 0, 0);
    this.Add(this.Body_Move);
x = 0;
y += height+es;
y += height+es;
    this.Add(new ControlTicket(x, y, this.Rectangle.Width-this.Border.Left-this.Border.Right, height, "#Jump"));
y += height+es;
    this.Btn_Jump = new Control( x, y, (height*2)+es, (height*2)+es );
    this.Btn_Jump.SetText("#Jump");
    this.Btn_Jump.ClickLeft = function(){ this.Parent.Body = this.Parent.Body_Jump.GetBody(); };
    this.Add(this.Btn_Jump);
x += (height+es)*2;
    this.Body_Jump = new ControlBody(x, y, 0, 0);
    this.Add(this.Body_Jump);
x = 0;
y += height+es;
y += height+es;
    this.Btn_Save_Permanents = new Control( x, y, (width*2)+es, height );
    this.Btn_Save_Permanents.SetText("#SAVEPERMANENTS");
    this.Btn_Save_Permanents.ClickLeft = function(){ this.Parent.CallSave(true); };
    this.Add(this.Btn_Save_Permanents);
x += (width+es)*2;
    this.Btn_Save_Entitys = new Control( x, y, (width*2)+es, height );
    this.Btn_Save_Entitys.SetText("#SAVEENTITYS");
    this.Btn_Save_Entitys.ClickLeft = function(){ this.Parent.CallSave(false); };
    this.Add(this.Btn_Save_Entitys);

    this.Rectangle.Height = this.Border.Top + this.Border.Bottom + y + height;
    this.OnClear = function()
    {
        this.Txt_ID.SetText("");
        this.Txt_Name.SetText("");
        this.Txt_Width.Number.SetText("1.0");
        this.Txt_Height.Number.SetText("1.0");
        this.Btn_CanMove.OnOff = false;
        this.Btn_CanTarget.OnOff = false;
        this.Btn_Cross.OnOff = false;
        this.Direction = 0;
        this.Body = null;
        this.Body_Stand.Clear();
        this.Body_Move.Clear();
        this.Body_Jump.Clear();
    };
    this.OnTarget = function(){ this.OnSelected(Selected_Target()); }
    this.OnSelected = function(entity)
    {
        if(entity == null){ this.OnClear(); return; }
        this.Txt_ID.SetText(entity.ID);
        this.Txt_Name.SetText(entity.Name);
        this.Txt_Width.Number.SetText(entity.Width.toString());
        this.Txt_Height.Number.SetText(entity.Height.toString());
        this.Btn_CanMove.OnOff = entity.CanMove;
        this.Btn_CanTarget.OnOff = entity.CanTarget;
        this.Btn_Cross.OnOff = entity.Cross;
        this.Body_Stand.OnSelected(entity.Body_Stand);
        this.Body_Move.OnSelected(entity.Body_Move);
        this.Body_Jump.OnSelected(entity.Body_Jump);
        this.Body_Stand.OnBody(); 
    };
    this.CallSave = function(permanents)
    {
        var temp = "" +PageInfo.Separator;
        temp += Target.X +PageInfo.Separator+ Target.Y +PageInfo.Separator+ Target.Z +PageInfo.Separator;
        temp += Target.Adjustment.X +PageInfo.Separator + Target.Adjustment.Y +PageInfo.Separator; 
        temp += this.Txt_Type.GetText() +PageInfo.Separator;
        temp += this.Txt_AI.GetText() +PageInfo.Separator;
        temp += this.Txt_ID.GetText() +PageInfo.Separator;
        temp += this.Txt_Name.GetText() +PageInfo.Separator;
        temp += this.Txt_Width.Number.GetText() +PageInfo.Separator;
        temp += this.Txt_Height.Number.GetText() +PageInfo.Separator;
        temp += this.Btn_CanMove.OnOff.toString() +PageInfo.Separator;
        temp += this.Btn_CanTarget.OnOff.toString() +PageInfo.Separator;
        temp += this.Btn_Cross.OnOff.toString() +PageInfo.Separator;
        temp += this.Direction.toString() +PageInfo.Separator;
        temp += JSONSerialize(this.Body_Stand.GetBody()) +PageInfo.Separator;
        temp += JSONSerialize(this.Body_Move.GetBody()) +PageInfo.Separator;
        temp += JSONSerialize(this.Body_Jump.GetBody()) +PageInfo.Separator;
        if(permanents)
            CallPage("EDITOR_NEW_PERMANENT", temp);
        else
            CallPage("EDITOR_NEW_ENTITY", temp);
    };
    this.Draw = function(x, y, width, height, context)
    {
        context.fillText( this.Direction, 5, 15 );
        if(this.Body == null)return;
        var eX = x + 210;
        var eY = y +20; 
        var eWidth = PageInfo.MapInfo.SizeCube * 2 * parseFloat(this.Txt_Width.Number.Text);
        var eHeight = PageInfo.MapInfo.SizeCube * 2 *parseFloat(this.Txt_Height.Number.Text);

        if(!this.Body.Animated && !this.Body.Turned)
        {
            for(var j = 0; j < this.Body.Images.length; j++)
                DrawTemplateImage(this.Body.Images[j], eX, eY, eWidth, eHeight, context);
        }
        else
        {
            var ratio = (DrawTime % parseInt( this.Body.Speed)) / parseInt(this.Body.Speed);
            for(var i = 0; i < this.Body.Images.length; i++)
            {
                var template = FindTemplatesImages(this.Body.Images[i].Name);
                if(template == null || template.Image == null) continue;
                var tW = template.Image.width / template.NbrX;
                var tH = template.Image.height / template.NbrY;
                var tX = 0;
                var tY = 0;
                if(this.Body.Animated)
                    tX = Math.floor( template.NbrX * ratio ) * tW;
                else
                    tX = (this.Body.Images[i].NbrX-1) * tW;
                
                if(this.Body.Turned)
                    tY = (this.Direction-1) * tH;
                else
                    tY = (this.Body.Images[i].NbrY-1) * tH;

                context.drawImage(template.Image, tX, tY, tW, tH, eX, eY, eWidth, eHeight );
            } 
        }
    }; 
};

function ControlTemplate(x, y, width, height, params)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, params);
    delete this.InheritClass;
    this.Inherit("ControlTemplate");

    //this.Border = {Left:10, Top:100, Right:10, Bottom:10 };
    this.CanResize = false;
    this.BackColor = "grey";
    this.CanMove = true;
    this.Size_Default = {Width:width, Height:height};
    
    this.TemplateImage = null;
    this.Img_Index = 0;
    this.NbrX = 0;
    this.NbrY = 0;   

    this.Add(new ControlBack());
    this.Add(new ControlForward());
    this.Add(new ControlClose());
    this.OnBack = function(){ if(this.Img_Index > 0){this.Img_Index--; this.Img_Index_Modified();} };
    this.OnForward = function(){ if(this.Img_Index < PageInfo.Templates.length-1 ){this.Img_Index++; this.Img_Index_Modified();} };

x = 0;
y = -80;
height = 15;
var es = 5;
width = this.Rectangle.Width-this.Border.Left-this.Border.Right;

    this.Txt_ImageUrl = new TextBox(x, y, width, height);
//    this.Txt_ImageUrl.ParentRectangleChanged = function()
//    {
//        this.Rectangle.X = this.Parent.Rectangle.X + this.Location.X;
//        this.Rectangle.Y = this.Parent.Rectangle.Y + this.Location.Y;
//        this.OnRectangleChanged(this.Rectangle.X, this.Rectangle.Y, this.Parent.Rectangle.Width-this.Parent.Border.Left-this.Parent.Border.Right, this.Rectangle.Height);
//    };
    this.Txt_ImageUrl.TextChanged = function(){ if(this.Parent.TemplateImage != null)this.Parent.TemplateImage.ImageUrl = this.Text  };
    this.Add(this.Txt_ImageUrl);
y += height+es;
    this.Txt_Name = new TextBox(x, y, width, height);
    this.Txt_Name.BackText = "#Name";
//    this.Txt_Name.ParentRectangleChanged = function()
//    {
//        this.Rectangle.X = this.Parent.Rectangle.X + this.Location.X;
//        this.Rectangle.Y = this.Parent.Rectangle.Y + this.Location.Y;
//        this.OnRectangleChanged(this.Rectangle.X, this.Rectangle.Y, this.Parent.Rectangle.Width-this.Parent.Border.Left-this.Parent.Border.Right, this.Rectangle.Height);
//    };
    this.Txt_Name.TextChanged = function(){ if(this.Parent.TemplateImage != null)this.Parent.TemplateImage.Name = this.Text  };
    this.Add(this.Txt_Name);
width = 100;
x = 0;
y += height+es;
    this.Txt_NbrX = new ControlNumber(x, y, width, height);
    this.Txt_NbrX.MinValue = 1;
    this.Txt_NbrX.NumberChanged = function(){ if(this.Parent.TemplateImage != null)this.Parent.TemplateImage.NbrX = this.GetNumber(); };
    this.Add(this.Txt_NbrX);
x += width+es;

    this.Txt_NbrY = new ControlNumber(x, y, width, height);
    this.Txt_NbrY.MinValue = 1;
    this.Txt_NbrY.NumberChanged = function(){ this.Parent.TemplateImage.NbrY = this.GetNumber(); };
    this.Add(this.Txt_NbrY);
x = 0;
y += height+es;
    this.Btn_Save = new Control(x, y, width, height);
    this.Btn_Save.ClickLeft = function(){ if(this.Parent.TemplateImage != null)CallPage("EDITOR_TEMPLATE", JSONSerialize(this.Parent.TemplateImage)); };
    this.Btn_Save.SetText("#Save");
    this.Add(this.Btn_Save);

x += width+es;
    this.Btn_Size = new ControlOnOff(x, y, width, height);
    this.Btn_Size.OnOffChanged = function(){ this.Parent.Img_Index_Modified(); };
    this.Btn_Size.SetText("#Size");
    this.Add(this.Btn_Size);

    this.Img_Index_Modified = function()
    {
        if(PageInfo.Templates.length == 0)return;
        this.TemplateImage = PageInfo.Templates[this.Img_Index];
        this.NbrX = 1;
        this.NbrY = 1;

        this.Txt_ImageUrl.SetText(this.TemplateImage.ImageUrl);
        this.Txt_Name.SetText(this.TemplateImage.Name);
        this.Txt_NbrX.SetNumber(this.TemplateImage.NbrX);
        this.Txt_NbrY.SetNumber(this.TemplateImage.NbrY);
        
        if(this.Btn_Size.OnOff)
        {
            var w = this.TemplateImage.Image.width + this.Border.Left + this.Border.Right;
            var h = this.TemplateImage.Image.height + this.Border.Top + this.Border.Bottom;

            if(w < 205 + this.Border.Left+this.Border.Right)w = 205 + this.Border.Left+this.Border.Right;
//            this.OnRectangleChanged(this.Rectangle.X, this.Rectangle.Y, w, h);
            this.ResizeTo(w, h);
        }
        else
        {
//            this.OnRectangleChanged(this.Rectangle.X, this.Rectangle.Y, this.Size_Default.Width, this.Size_Default.Height);
            this.ResizeTo( this.Size_Default.Width, this.Size_Default.Height);
        }
    };    
    this.ClickLeft = function() 
    {
        if(this.TemplateImage == null)return;
        if(this.Btn_Size.OnOff)
        {
            var tW = this.TemplateImage.Image.width / this.TemplateImage.NbrX;
            var tH = this.TemplateImage.Image.height / this.TemplateImage.NbrY;
            this.NbrX = Math.ceil((Mouse.X - this.Form.Position.X - this.Rectangle.X - this.Border.Left)/tW);
            this.NbrY = Math.ceil((Mouse.Y - this.Form.Position.Y - this.Rectangle.Y - this.Border.Top)/tH);

            if(this.NbrX < 1)this.NbrX = 1; else if(this.NbrX > this.TemplateImage.NbrX)this.NbrX=this.TemplateImage.NbrX;
            if(this.NbrY < 1)this.NbrY = 1; else if(this.NbrY > this.TemplateImage.NbrY)this.NbrY=this.TemplateImage.NbrY;
        }
        else
        {
            var tW = (this.Rectangle.Width-this.Border.Left-this.Border.Right) / this.TemplateImage.NbrX;
            var tH = (this.Rectangle.Height-this.Border.Top-this.Border.Bottom) / this.TemplateImage.NbrY;
            this.NbrX = Math.ceil((Mouse.X - this.Form.Position.X - this.Rectangle.X - this.Border.Left)/tW);
            this.NbrY = Math.ceil((Mouse.Y - this.Form.Position.Y - this.Rectangle.Y - this.Border.Top)/tH);

            if(this.NbrX < 1)this.NbrX = 1; else if(this.NbrX > this.TemplateImage.NbrX)this.NbrX=this.TemplateImage.NbrX;
            if(this.NbrY < 1)this.NbrY = 1; else if(this.NbrY > this.TemplateImage.NbrY)this.NbrY=this.TemplateImage.NbrY;
        
        }
    };
    this.Draw = function(x, y, width, height, context)
    {
        if(this.TemplateImage == null)return;
        if(this.Btn_Size.OnOff)
        {
            var tW = this.TemplateImage.Image.width / this.TemplateImage.NbrX;
            var tH = this.TemplateImage.Image.height / this.TemplateImage.NbrY;
            context.drawImage(this.TemplateImage.Image, x+this.Border.Left, y+this.Border.Top, this.TemplateImage.Image.width, this.TemplateImage.Image.height);
            context.strokeRect(x+this.Border.Left + (tW*(this.NbrX-1)), y+this.Border.Top + (tH*(this.NbrY-1)), tW, tH);
        }
        else
        {
            var tW = (width-this.Border.Left-this.Border.Right) / this.TemplateImage.NbrX;
            var tH = (height-this.Border.Top-this.Border.Bottom) / this.TemplateImage.NbrY;
            context.drawImage(this.TemplateImage.Image, x+this.Border.Left, y+this.Border.Top, width-this.Border.Left-this.Border.Right, height-this.Border.Top-this.Border.Bottom);
            context.strokeRect(x+this.Border.Left + (tW*(this.NbrX-1)), y+this.Border.Top + (tH*(this.NbrY-1)), tW, tH);
        }
    };

    this.CanDrag = true;
    this.OnDrag = function()
    {
        DragDrop.Control = this;
        DragDrop.Element = {Name:this.TemplateImage.Name, NbrX:this.NbrX, NbrY:this.NbrY };
    };
    this.OnDragDraw = function()
    {
        var form = this.Form;
        if(MouseHover.Control != null)
            form = MouseHover.Control.Form;

        DrawTemplateImage( DragDrop.Element, Mouse.X-form.Position.X, Mouse.Y-form.Position.Y , 50, 50, form.Context )     
    };
    this.CanDrop = true;
    this.ReadFileDropped = function(evt)
    {
        var files = evt.dataTransfer.files;
        if(files.length == 0)
        {
            var img = new Image();
            img.src = evt.dataTransfer.getData("text")
            img.onload =  function()
            {
                var template = { Name:"", ImageUrl:"", NbrX:1, NbrY:1 };
                template.ImageUrl = this.src;
                template.Image = this;
                template.Name = "Template_" +PageInfo.Templates.length.toString();
                PageInfo.Templates[PageInfo.Templates.length] = template;
            }
        }
        else
        {
            for (var f = 0; f < files.length; f++)
            {
                if (files[f].type.match('image.*')) 
                {
                    var reader = new FileReader();
                    reader.onload = function(e) 
                    {
                        var img = new Image();
                        img.src = e.target.result;
                        img.onload =  function()
                        {
                            var template = { Name:"", ImageUrl:"", NbrX:1, NbrY:1 };
                            template.ImageUrl = this.src;
                            template.Image = this;
                            template.Name = "Template_" +PageInfo.Templates.length.toString();
                            PageInfo.Templates[PageInfo.Templates.length] = template;
                        }
                    };
                    reader.readAsDataURL(files[f]);
                }
            }
        }
    };
};

function ControlTranslator(x, y, width, height, params)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, params);
    delete this.InheritClass;
    this.Inherit("ControlTranslator");

    //this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
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

function ControlAnimation(x, y, width, height, params)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, params);
    delete this.InheritClass;
    this.Inherit("ControlAnimation");

    this.BackColor = "wheat";
    this.CanMove = true;
    this.CanResize = true;
    this.CanScale = true;

    this.Animation = null;

x = 0;
y = 0;
width = this.Rectangle.Width-this.Border.Left-this.Border.Right;
height = 15;
var es = 5;

    this.Add(new ControlTicket(x, y, width, height, "#Animation"));
y += height+es;
var h = this.Rectangle.Height-this.Border.Top-this.Border.Bottom - y;

width = 100;
    this.Images_List = new ControlList(x, y, 200, h);
    this.Images_List.ClickRight = function(){ this.Parent.ClearAnimation(); };
    this.Images_List.SelectedLineChanged = function(){ this.Parent.SelectedAnimation(); };
    this.Images_List.CanDrop = true;
    this.Images_List.HeightLine = 60;
    this.Images_List.OnDrop = function()
    {
        if(DragDrop.Control == null || !DragDrop.Control.IsInherit("ControlTemplate"))return;
        this.Parent.NewAnimation();
        this.Parent.Animation.Image = DragDrop.Element;
    };
    this.Images_List.LineDraw = function(line, x, y, context)
    {
        var h = this.HeightLine /4;
        if(this.Lines[line].Image != null)
        {
            DrawTemplateImage( this.Lines[line].Image, x, y, h*3, h*3, context);
            context.strokeRect(x, y, h*3, h*3);
        }
        context.fillText( MeasureText(Translate("#Name")+": "+ this.Lines[line].Name, this.Rectangle.Width-this.Border.Left-this.Border.Right-(h*3), context), x+(h*3), y+h );
        context.fillText( MeasureText(Translate("#Duration")+": "+ this.Lines[line].Duration, this.Rectangle.Width-this.Border.Left-this.Border.Right-(h*3), context), x+(h*3), y+(h*2) );
        context.fillText( MeasureText(Translate("#Rectangle")+": "+ this.Lines[line].X +"."+ this.Lines[line].Y +"."+ this.Lines[line].Width +"."+ this.Lines[line].Height, this.Rectangle.Width-this.Border.Left-this.Border.Right-(h*3), context), x+(h*3), y+(h*3) );
        context.fillText( MeasureText(Translate("#Text")+": "+ this.Lines[line].Text, this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+(h*4) );
    };    
    this.Add(this.Images_List);

x += this.Images_List.Rectangle.Width+es;
    this.Add(new ControlTicket(x, y, width, height, "#Name"));
x += width+es;
//    this.Animation_Name = new TextBox(x, y, width*3+es*2, height);
    this.Animation_Name = new TextBox(x, y, width, height);
    this.Animation_Name.BackText = "#Name";
    this.Animation_Name.TextChanged = function(){ if (this.Parent.Animation != null)this.Parent.Animation.Name = this.Text; };
    this.Animation_Name.KeyEnter = function(){};
    this.Add(this.Animation_Name);

var x2 = x + width*3+es*2 + es;
//x = x2;
x += width+es;
    this.Btn_Save = new Control(x, y, width, height, {Border:5});
    this.Btn_Save.SetText("#Save");
    this.Btn_Save.ClickLeft = function(){if(this.Parent.Animation != null && this.Parent.Animation.Name != "")CallPage("EDITOR_ANIMATION", JSONSerialize(this.Parent.Animation)); };
    this.Add(this.Btn_Save);

x += width+es;
    this.Btn_New = new Control(x, y, width, height, {Border:5});
    this.Btn_New.SetText("#New");
    this.Btn_New.ClickLeft = function(){ this.Parent.NewAnimation(); };
    this.Add(this.Btn_New);



x = this.Images_List.Rectangle.Width+es;
y += height+es; 
    this.Add(new ControlTicket(x, y, width, height, "#Start"));
x += width+es;
    this.Animation_Start = new ControlNumber(x, y, width, height);
    this.Animation_Start.NumberChanged = function(){ if (this.Parent.Animation != null)this.Parent.Animation.Start = this.GetNumber(); };
    this.Animation_Start.Step = 100;
    this.Add(this.Animation_Start);
x += width+es;
    this.Add(new ControlTicket(x, y, width, height, "#Duration"));
x += width+es;
    this.Animation_Duration = new ControlNumber(x, y, width, height);
    this.Animation_Duration.NumberChanged = function(){ if (this.Parent.Animation != null)this.Parent.Animation.Duration = this.Number.Text; };
    this.Animation_Duration.Step = 100;
    this.Add(this.Animation_Duration);

//x = x2;
//    this.Btn_New = new Control(x, y, width, height);
//    this.Btn_New.SetText("#New");
//    this.Btn_New.ClickLeft = function(){ this.Parent.NewAnimation(); };
//    this.Add(this.Btn_New);

x = this.Images_List.Rectangle.Width+es;
y += height+es;
    this.Add(new ControlTicket(x, y, width, height, "#Rectangle"));
x += width+es;
    this.Animation_Rectangle = new ControlRectangle(x, y, (width*3)+(es*2), height);
    this.Animation_Rectangle.KeyEnter = function(){ if (this.Parent.Animation != null){ var rec = this.GetRectangle(); this.Parent.Animation.X = rec.X; this.Parent.Animation.Y = rec.Y; this.Parent.Animation.Width = rec.Width; this.Parent.Animation.Height = rec.Height;}; };
    this.Add(this.Animation_Rectangle);

x = x2;
    this.Animation_Image = new Control(x, height+es, width, (height*4)+(es*3));
    this.Animation_Image.Controls = [];
    this.Animation_Image.BackColor = "grey";
    this.Animation_Image.CanDrop = true;
    this.Animation_Image.OnDrop = function()
    {
        if(DragDrop.Control == null || !DragDrop.Control.IsInherit("ControlTemplate"))return;
        if(this.Parent.Animation == null)
            this.Parent.NewAnimation();
        this.Parent.Animation.Image = DragDrop.Element;
    };
    this.Animation_Image.Draw = function(x, y, width, height, context)//(context)
    {
        var anim = this.Parent.Images_List.Selected();
        if(anim == null || anim.Image == null)return;
        DrawTemplateImage( anim.Image, this.Rectangle.X, this.Rectangle.Y, this.Rectangle.Width, this.Rectangle.Height, context );        
    };
    this.Add(this.Animation_Image);

x = this.Images_List.Rectangle.Width+es;
y += height+es;
    this.Add(new ControlTicket(x, y, width, height, "#Text"));
x += width+es;
    this.Animation_Text = new TextBox(x, y, (width*3)+(es*2), height);
    this.Animation_Text.BackText = "#Text";
    this.Animation_Text.TextChanged = function(){ if (this.Parent.Animation != null)this.Parent.Animation.Text = this.Text; };
    this.Add(this.Animation_Text);


x = this.Images_List.Rectangle.Width+es;
y += height+es;

    this.Animation_Images = new ControlImage( x, y, (width*5)+(es*4), 10 );
//    this.Animation_Images.ImagesChanged = function(){ this.Parent.OnModify2(); };
    this.Add(this.Animation_Images);



//####### Effect #######
x = this.Images_List.Rectangle.Width+es;
y += this.Animation_Images.Rectangle.Height+es;
//y = this.Animation_Images.Rectangle.Y+this.Animation_Images.Rectangle.Height+es;
//y += height+es;    
    this.Add(new ControlTicket(x, y, (width*5)+(es*4), height, "#Effect"));
x += (width*4)+(es*3) + es;

y += height+es;  

x = this.Images_List.Rectangle.Width+es;
    this.Add(new ControlTicket(x, y, width, height, "#KeyName"));
x += width+es;
    this.Effect_KeyName = new TextBox(x, y, width*3+es*2, height);
    this.Effect_KeyName.ReadOnly = true;
    this.Effect_KeyName.BackText = "#KeyName";
    this.Effect_KeyName.TextChanged = function(){ var effect = this.Parent.Effect_List.Selected(); if(effect != null)effect.KeyName = this.GetNumber(); };
    this.Effect_KeyName.KeyEnter = function(){};
    this.Add(this.Effect_KeyName);

x = this.Images_List.Rectangle.Width+es;
y += height+es; 
    this.Add(new ControlTicket(x, y, width, height, "#Start"));
x += width+es;
    this.Effect_Start = new ControlNumber(x, y, width, height);
    this.Effect_Start.NumberChanged = function(){ var effect = this.Parent.Effect_List.Selected(); if(effect != null)effect.Start = this.GetNumber(); };
    this.Effect_Start.Step = 100;
    this.Add(this.Effect_Start);
x += width+es;    
    this.Add(new ControlTicket(x, y, width, height, "#End"));
x += width+es;
    this.Effect_End = new ControlNumber(x, y, width, height);
    this.Effect_End.NumberChanged = function(){ var effect = this.Parent.Effect_List.Selected(); if(effect != null)effect.End = this.GetNumber(); };
    this.Effect_End.Step = 100;
    this.Add(this.Effect_End);

x = this.Images_List.Rectangle.Width+es;
y += height+es;
    this.Add(new ControlTicket(x, y, width, height, "#Number"));
x += width+es;
    this.Effect_Number = new ControlNumber(x, y, width, height);
    this.Effect_Number.MinValue = -10000;
    this.Effect_Number.NumberChanged = function(){ var effect = this.Parent.Effect_List.Selected(); if(effect != null)effect.Number = this.GetNumber(); };
    this.Add(this.Effect_Number);
x += width+es;
    this.Add(new ControlTicket(x, y, width, height, "#Text"));
x += width+es;
    this.Effect_Text = new TextBox(x, y, (width*2)+es, height);
    this.Effect_Text.Numeric = true;
    this.Effect_Text.BackText = "#Text";
    this.Effect_Text.TextChanged = function(){ var effect = this.Parent.Effect_List.Selected(); if(effect != null)effect.Text = this.GetText(); };
    this.Effect_Text.KeyEnter = function(){};
    this.Add(this.Effect_Text);

x = this.Images_List.Rectangle.Width+es;
y += height+es;
h = this.Rectangle.Height-this.Border.Top-this.Border.Bottom - y;
    this.Effect_List = new ControlList(x, y, width*2+es, h);
    this.Effect_List.ClickRight = function(){ this.Parent.ClearEffect(); };
    this.Effect_List.SelectedLineChanged = function(){ this.Parent.SelectedEffect(); };
    this.Effect_List.HeightLine = 60;
    this.Effect_List.LineDraw = function(line, x, y, context)
    {
        var h = this.HeightLine/3;
        context.fillText(MeasureText("KeyName: "+ this.Lines[line].KeyName, this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+h );
        context.fillText(MeasureText("Start: "+ this.Lines[line].Start +", End: "+ this.Lines[line].End, this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+(h*2) );
        if(this.Lines[line].Text != "")
            context.fillText(MeasureText("Text:" +this.Lines[line].Text , this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+(h*3) );
        else
            context.fillText(MeasureText("Number:"+ this.Lines[line].Number, this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+(h*3) );
        DrawLine( {X:x, Y:y+(h*3)} , {X:x+this.Rectangle.Width-this.Border.Left-this.Border.Right, Y:y+(h*3)},context);
    };
    this.Add(this.Effect_List);

x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
    this.ToHead_Src = new Control(x, y, width, height);
    this.ToHead_Src.SetText("#ToHead_Src");
    this.ToHead_Src.ClickLeft = function(){ this.Parent.NewEffect("ToHead_Src"); };
    this.Add(this.ToHead_Src);

x += width+es;
    this.MoveToHead_Src = new Control(x, y, width, height);
    this.MoveToHead_Src.SetText("#MoveToHead_Src");
    this.MoveToHead_Src.ClickLeft = function(){ this.Parent.NewEffect("MoveToHead_Src"); };
    this.Add(this.MoveToHead_Src);

x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
y += height+es; 
    this.ToHead_Dest = new Control(x, y, width, height);
    this.ToHead_Dest.SetText("#ToHead_Dest");
    this.ToHead_Dest.ClickLeft = function(){ this.Parent.NewEffect("ToHead_Dest"); };
    this.Add(this.ToHead_Dest);

x += width+es;
    this.MoveToHead_Dest = new Control(x, y, width, height);
    this.MoveToHead_Dest.SetText("#MoveToHead_Dest");
    this.MoveToHead_Dest.ClickLeft = function(){ this.Parent.NewEffect("MoveToHead_Dest"); };
    this.Add(this.MoveToHead_Dest);

x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
y += height+es; 
    this.ToCube_Src = new Control(x, y, width, height);
    this.ToCube_Src.SetText("#ToCube_Src");
    this.ToCube_Src.ClickLeft = function(){ this.Parent.NewEffect("ToCube_Src"); };
    this.Add(this.ToCube_Src);

x += width+es;
    this.MoveToCube_Src = new Control(x, y, width, height);
    this.MoveToCube_Src.SetText("#MoveToCube_Src");
    this.MoveToCube_Src.ClickLeft = function(){ this.Parent.NewEffect("MoveToCube_Src"); };
    this.Add(this.MoveToCube_Src);

x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
y += height+es; 
    this.ToCube_Dest = new Control(x, y, width, height);
    this.ToCube_Dest.SetText("#ToCube_Dest");
    this.ToCube_Dest.ClickLeft = function(){ this.Parent.NewEffect("ToCube_Dest"); };
    this.Add(this.ToCube_Dest);

x += width+es;
    this.MoveToCube_Dest = new Control(x, y, width, height);
    this.MoveToCube_Dest.SetText("#MoveToCube_Dest");
    this.MoveToCube_Dest.ClickLeft = function(){ this.Parent.NewEffect("MoveToCube_Dest"); };
    this.Add(this.MoveToCube_Dest);

x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
y += height+es; 
    this.ToScreen_X = new Control(x, y, width, height);
    this.ToScreen_X.SetText("#ToScreen_X");
    this.ToScreen_X.ClickLeft = function(){ this.Parent.NewEffect("ToScreen_X"); };
    this.Add(this.ToScreen_X);

x += width+es;
    this.MoveToScreen_X = new Control(x, y, width, height);
    this.MoveToScreen_X.SetText("#MoveToScreen_X");
    this.MoveToScreen_X.ClickLeft = function(){ this.Parent.NewEffect("MoveToScreen_X"); };
    this.Add(this.MoveToScreen_X);

x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
y += height+es; 
    this.ToScreen_Y = new Control(x, y, width, height);
    this.ToScreen_Y.SetText("#ToScreen_Y");
    this.ToScreen_Y.ClickLeft = function(){ this.Parent.NewEffect("ToScreen_Y"); };
    this.Add(this.ToScreen_Y);

x += width+es; 
    this.MoveToScreen_Y = new Control(x, y, width, height);
    this.MoveToScreen_Y.SetText("#MoveToScreen_Y");
    this.MoveToScreen_Y.ClickLeft = function(){ this.Parent.NewEffect("MoveToScreen_Y"); };
    this.Add(this.MoveToScreen_Y);


x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;y += height+es; 
    this.ToAxeX = new Control(x, y, width, height);
    this.ToAxeX.SetText("#ToAxeX");
    this.ToAxeX.ClickLeft = function(){ this.Parent.NewEffect("ToAxeX"); };
    this.Add(this.ToAxeX);

x += width+es;
    this.MoveToAxeX = new Control(x, y, width, height);
    this.MoveToAxeX.SetText("#MoveToAxeX");
    this.MoveToAxeX.ClickLeft = function(){ this.Parent.NewEffect("MoveToAxeX"); };
    this.Add(this.MoveToAxeX);

x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
y += height+es; 
    this.ToAxeY = new Control(x, y, width, height);
    this.ToAxeY.SetText("#ToAxeY");
    this.ToAxeY.ClickLeft = function(){ this.Parent.NewEffect("ToAxeY"); };
    this.Add(this.ToAxeY);

x += width+es; 
    this.MoveToAxeY = new Control(x, y, width, height);
    this.MoveToAxeY.SetText("#MoveToAxeY");
    this.MoveToAxeY.ClickLeft = function(){ this.Parent.NewEffect("MoveToAxeY"); };
    this.Add(this.MoveToAxeY);

x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
y += height+es; 
    this.Size_Width = new Control(x, y, width, height);
    this.Size_Width.SetText("#Size_Width");
    this.Size_Width.ClickLeft = function(){ this.Parent.NewEffect("Size_Width"); };
    this.Add(this.Size_Width);

x += width+es; 
    this.Size_Height = new Control(x, y, width, height);
    this.Size_Height.SetText("#Size_Height");
    this.Size_Height.ClickLeft = function(){ this.Parent.NewEffect("Size_Height"); };
    this.Add(this.Size_Height);

x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
y += height+es; 
    this.Zoom_Width = new Control(x, y, width, height);
    this.Zoom_Width.SetText("#Zoom_Width");
    this.Zoom_Width.ClickLeft = function(){ this.Parent.NewEffect("Zoom_Width"); };
    this.Add(this.Zoom_Width);

x += width+es;
    this.Zoom_Height = new Control(x, y, width, height);
    this.Zoom_Height.SetText("#Zoom_Height");
    this.Zoom_Height.ClickLeft = function(){ this.Parent.NewEffect("Zoom_Height"); };
    this.Add(this.Zoom_Height);

x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
y += height+es; 
    this.FullScreen = new Control(x, y, width, height);
    this.FullScreen.SetText("#FullScreen");
    this.FullScreen.ClickLeft = function(){ this.Parent.NewEffect("FullScreen"); };
    this.Add(this.FullScreen);

x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
y += height+es; 
    this.Centred = new Control(x, y, width, height);
    this.Centred.SetText("#Centred");
    this.Centred.ClickLeft = function(){ this.Parent.NewEffect("Centred"); };
    this.Add(this.Centred);

    this.Draw = function(x, y, width, height, context){};

    this.NewAnimation = function()
    {
        PageInfo.Animations[PageInfo.Animations.length] = Create_Animation();
        this.Images_List.Lines = PageInfo.Animations;
        this.Images_List.SelectedLine = this.Images_List.Lines.length-1;
        this.Images_List.Start_Lines = 0;
        this.SelectedAnimation();
    };
    this.NewEffect = function(keyname)
    {
        if(this.Animation == null)return;
        this.Animation.Effects[this.Animation.Effects.length] = Create_Effect(keyname);
        this.Effect_List.Lines = this.Animation.Effects;
        this.Effect_List.SelectedLine = this.Effect_List.Lines.length-1;
        this.Effect_List.Start_Lines = 0;
        this.SelectedEffect();
    };
    this.SelectedAnimation = function()
    {
        this.Animation = this.Images_List.Selected();
        if(this.Animation == null){ this.ClearEffect(); return; }
        this.Animation_Name.SetText(this.Animation.Name);
        this.Animation_Start.SetNumber(this.Animation.Start);
        this.Animation_Duration.SetNumber(this.Animation.Duration);
        this.Animation_Rectangle.SetRectangle( {X:this.Animation.X, Y:this.Animation.Y, Width:this.Animation.Width, Height:this.Animation.Height} );
        this.Animation_Text.SetText(this.Animation.Text);
        this.ClearEffect();
    };
    this.SelectedEffect = function()
    {
        var effect = this.Effect_List.Selected();
        if(effect == null)return;
        this.Effect_KeyName.SetText(effect.KeyName);
        this.Effect_Start.SetNumber(effect.Start);
        this.Effect_End.SetNumber(effect.End);
        this.Effect_Number.SetNumber(effect.Number);
        this.Effect_Text.SetText(effect.Text);
    };
    this.ClearAnimation = function()
    {
        this.Animation = null;
        this.Animation_Name.Clear();
        this.Animation_Start.Clear();
        this.Animation_Duration.Clear();
        this.Animation_Rectangle.Clear();
        this.Animation_Text.Clear();
        this.Images_List.Clear();
        if( PageInfo != null)
            this.Images_List.ChangeLines(PageInfo.Animations);
        this.ClearEffect();
    };
    this.ClearEffect = function()
    {
        this.Effect_KeyName.Clear();
        this.Effect_Start.Clear();
        this.Effect_End.Clear();
        this.Effect_Number.Clear();
        this.Effect_Text.Clear();
            this.Effect_List.Clear();
        
        if(this.Animation != null)
            this.Effect_List.ChangeLines(this.Animation.Effects);
    };
};
function ControlPlayAnimation(x, y, width, height, params)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, params, params);
    delete this.InheritClass;
    this.Inherit("ControlPlayAnimation");
    
    //this.Border = {Left:10, Top:10, Right:10, Bottom:10 };
    this.BackColor = "white";
    this.CanMove = true;

x = 0;
y = 0;
width = this.Rectangle.Width-this.Border.Left-this.Border.Right;
height = 15;
var es = 5;

    this.Add(new ControlTicket(x, y, width, height, "#PlayAnimation"));
width = 100;
x = 0;
y += height+es;
    this.TxtList = new TextList(x, y, width, height);
    this.TxtList.SetText("#Animations");
    this.TxtList.OnMouseEnter = function(){ if(PageInfo != null){ this.ChangeLines(PageInfo.Animations); this.ListOpen = true; this.OnFocus(); } };
    this.TxtList.LinesToString = function(i){return this.Lines[i].Name;};
    this.TxtList.ChangeStyle();
    this.Add(this.TxtList);
x += width+es;  
    this.Btn_Play = new Control(x,y,width,height);
    this.Btn_Play.ClickLeft = function(){ this.Parent.PlayAnimation(); };
    this.Btn_Play.SetText("#Play");
    this.Add(this.Btn_Play);
x = 0;
y += height+es; 
    this.Add(new ControlTicket(x, y, width, height, "#Entity_Src"));
x += width+es;
    this.Entity_Src = new TextBox(x, y, (width*2)+es, height);
    this.Entity_Src.BackText = "#Null";
    this.Add(this.Entity_Src);
x += (width*2)+(es*2);
    this.Selected_Src = new Control(x,y,width,height);
    this.Selected_Src.ClickLeft = function(){ if(Selected.Target != "")this.Parent.Entity_Src.SetText(Selected.Target); };
    this.Selected_Src.SetText("#Selected");
    this.Add(this.Selected_Src);
x = 0;
y += height+es; 
    this.Add(new ControlTicket(x, y, width, height, "#Entity_Dest"));
x += width+es;
    this.Entity_Dest = new TextBox(x, y, (width*2)+es, height);
    this.Entity_Dest.BackText = "#Null";
    this.Add(this.Entity_Dest);
x += (width*2)+(es*2);
    this.Selected_Dest = new Control(x,y,width,height);
    this.Selected_Dest.ClickLeft = function(){ if(Selected.Target != "")this.Parent.Entity_Dest.SetText(Selected.Target); };
    this.Selected_Dest.SetText("#Selected");
    this.Add(this.Selected_Dest);
x = 0;
y += height+es;
    this.Add(new ControlTicket(x, y, width, height, "#Cube_Src"));
x += width+es;
    this.Cube_Src = new ControlPoint3D(x, y, (width*2)+es, height )
    this.Add(this.Cube_Src);
x += (width*2)+(es*2);
    this.Selected_Cube_Src = new Control(x,y,width,height);
    this.Selected_Cube_Src.ClickLeft = function(){ this.Parent.Cube_Src.SetPoint3D( {X:Target.X, Y:Target.Y, Z:Target.Z} ); };
    this.Selected_Cube_Src.SetText("#Selected");
    this.Add(this.Selected_Cube_Src);
x = 0;
y += height+es;
    this.Add(new ControlTicket(x, y, width, height, "#Cube_Dest"));
x += width+es;
    this.Cube_Dest = new ControlPoint3D(x, y, (width*2)+es, height )
    this.Add(this.Cube_Dest);
x += (width*2)+(es*2);
    this.Selected_Cube_Dest = new Control(x,y,width,height);
    this.Selected_Cube_Dest.ClickLeft = function(){this.Parent.Cube_Dest.SetPoint3D( {X:Target.X, Y:Target.Y, Z:Target.Z} ); };
    this.Selected_Cube_Dest.SetText("#Selected");
    this.Add(this.Selected_Cube_Dest);
x = 0;
y += height+es; 
    this.Add(new ControlTicket(x, y, width, height, "##Text"));
x += width+es;
    this.Anim_Text = new TextBox(x, y, (width*3)+(es*2), height);
    this.Anim_Text.BackText = "#PlayText";
    this.Add(this.Anim_Text);

    this.PlayAnimation = function()
    {
        var anim = FindAnimation(this.TxtList.Lines[this.TxtList.SelectedLine].Name);
        var animation =  Create_Animation();
        if(anim == null)return;
        if(animation == null)return;

        animation.Entity_Src = this.Entity_Src.GetText();
        animation.Entity_Dest = this.Entity_Dest.GetText();
        animation.Cube_Src = this.Cube_Src.GetPoint3D();
        animation.Cube_Dest = this.Cube_Dest.GetPoint3D();
        animation.Duration = anim.Duration;
        animation.Image = anim.Image;
        animation.X = anim.X;
        animation.Y = anim.Y;
        animation.Width = anim.Width;
        animation.Height = anim.Height;
        animation.Effects = anim.Effects;
        animation.Text = anim.Text;
        if(this.Anim_Text.GetText() != "")
            animation.Text = this.Anim_Text.Text;
        
        PlayAnimations.push(animation);
    };
    this.Draw = function(x, y, width, height, context){};
};
function ControlVolume(x, y, width, height, params)
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height, params);
    delete this.InheritClass;
    this.Inherit("ControlVolume");

    //this.Border = {Left:10, Top:110, Right:10, Bottom:10 };
    this.CanMove = true;
    this.BackColor = "grey";

    this.Image = null;

    this.Txt_Name = new TextBox(10, -this.Border.Top, 100, 15);
    this.Txt_Name.BackText = "#Name";
    this.Add(this.Txt_Name);
    
x = (width/2)-25;
y = 0 - this.Border.Top;
width = 50;
height = 50;
var es = 5;
    this.Image_Up = new ControlImageUrl(x, y, width, height);
    this.Add(this.Image_Up);
x -= (width/2);
y += height+es; 
    this.Image_Left = new ControlImageUrl(x, y, width, height);
    this.Add(this.Image_Left);
x += width+es;
    this.Image_Right = new ControlImageUrl(x, y, width, height);
    this.Add(this.Image_Right);
x += width+es;
    this.Generate = new Control(x, y, width, height);
    this.Generate.SetText("#Generate");
    this.Generate.ClickLeft = function(){CallPage("EDITOR_GENERATE", this.Parent.Image_Up.Image.src +PageInfo.Separator+ this.Parent.Image_Left.Image.src +PageInfo.Separator+ this.Parent.Image_Right.Image.src +PageInfo.Separator+ this.Parent.Txt_Name.Text); };
    this.Add(this.Generate);
    this.Draw = function(x, y, width, height, context)
    {
        if(this.Image != null)
            context.drawImage(this.Image, x+this.Border.Left, y+this.Border.Top, width-this.Border.Left-this.Border.Right, height-this.Border.Top-this.Border.Bottom);
    };
};









//########################################################

//function ControlAnimation(x, y, width, height, params)
//{
//    this.InheritClass = Control;
//    this.InheritClass(x, y, width, height, params);
//    delete this.InheritClass;
//    this.Inherit("ControlAnimation");

//    this.BackColor = "wheat";
//    this.CanMove = true;
//    this.CanResize = true;
//    this.CanScale = true;

//    this.Animation = null;

//x = 0;
//y = 0;
//width = this.Rectangle.Width-this.Border.Left-this.Border.Right;
//height = 15;
//var es = 5;

//    this.Add(new ControlTicket(x, y, width, height, "#Animation"));
//y += height+es;
//var h = this.Rectangle.Height-this.Border.Top-this.Border.Bottom - y;

//width = 100;
//    this.Images_List = new ControlList(x, y, 200, h);
//    this.Images_List.ClickRight = function(){ this.Parent.ClearAnimation(); };
//    this.Images_List.SelectedLineChanged = function(){ this.Parent.SelectedAnimation(); };
//    this.Images_List.CanDrop = true;
//    this.Images_List.HeightLine = 60;
//    this.Images_List.OnDrop = function()
//    {
//        if(DragDrop.Control == null || !DragDrop.Control.IsInherit("ControlTemplate"))return;
//        this.Parent.NewAnimation();
//        this.Parent.Animation.Image = DragDrop.Element;
//    };
//    this.Images_List.LineDraw = function(line, x, y, context)
//    {
//        var h = this.HeightLine /4;
//        if(this.Lines[line].Image != null)
//        {
//            DrawTemplateImage( this.Lines[line].Image, x, y, h*3, h*3, context);
//            context.strokeRect(x, y, h*3, h*3);
//        }
//        context.fillText( MeasureText(Translate("#Name")+": "+ this.Lines[line].Name, this.Rectangle.Width-this.Border.Left-this.Border.Right-(h*3), context), x+(h*3), y+h );
//        context.fillText( MeasureText(Translate("#Duration")+": "+ this.Lines[line].Duration, this.Rectangle.Width-this.Border.Left-this.Border.Right-(h*3), context), x+(h*3), y+(h*2) );
//        context.fillText( MeasureText(Translate("#Rectangle")+": "+ this.Lines[line].X +"."+ this.Lines[line].Y +"."+ this.Lines[line].Width +"."+ this.Lines[line].Height, this.Rectangle.Width-this.Border.Left-this.Border.Right-(h*3), context), x+(h*3), y+(h*3) );
//        context.fillText( MeasureText(Translate("#Text")+": "+ this.Lines[line].Text, this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+(h*4) );
//    };    
//    this.Add(this.Images_List);

//x += this.Images_List.Rectangle.Width+es;
//    this.Add(new ControlTicket(x, y, width, height, "#Name"));
//x += width+es;
//    this.Animation_Name = new TextBox(x, y, width*3+es*2, height);
//    this.Animation_Name.BackText = "#Name";
//    this.Animation_Name.TextChanged = function(){ if (this.Parent.Animation != null)this.Parent.Animation.Name = this.Text; };
//    this.Animation_Name.KeyEnter = function(){};
//    this.Add(this.Animation_Name);

//var x2 = x + width*3+es*2 + es;
//x = x2;
//    this.Btn_Save = new Control(x, y, width, height);
//    this.Btn_Save.SetText("#Save");
//    this.Btn_Save.ClickLeft = function(){if(this.Parent.Animation != null && this.Parent.Animation.Name != "")CallPage("EDITOR_ANIMATION", JSONSerialize(this.Parent.Animation)); };
//    this.Add(this.Btn_Save);

//x = this.Images_List.Rectangle.Width+es;
//y += height+es; 
//    this.Add(new ControlTicket(x, y, width, height, "#Start"));
//x += width+es;
//    this.Animation_Start = new ControlNumber(x, y, width, height);
//    this.Animation_Start.NumberChanged = function(){ if (this.Parent.Animation != null)this.Parent.Animation.Start = this.GetNumber(); };
//    this.Animation_Start.Step = 100;
//    this.Add(this.Animation_Start);
//x += width+es;
//    this.Add(new ControlTicket(x, y, width, height, "#Duration"));
//x += width+es;
//    this.Animation_Duration = new ControlNumber(x, y, width, height);
//    this.Animation_Duration.NumberChanged = function(){ if (this.Parent.Animation != null)this.Parent.Animation.Duration = this.Number.Text; };
//    this.Animation_Duration.Step = 100;
//    this.Add(this.Animation_Duration);

//x = x2;
//    this.Btn_New = new Control(x, y, width, height);
//    this.Btn_New.SetText("#New");
//    this.Btn_New.ClickLeft = function(){ this.Parent.NewAnimation(); };
//    this.Add(this.Btn_New);

//x = this.Images_List.Rectangle.Width+es;
//y += height+es;
//    this.Add(new ControlTicket(x, y, width, height, "#Rectangle"));
//x += width+es;
//    this.Animation_Rectangle = new ControlRectangle(x, y, (width*3)+(es*2), height);
//    this.Animation_Rectangle.KeyEnter = function(){ if (this.Parent.Animation != null){ var rec = this.GetRectangle(); this.Parent.Animation.X = rec.X; this.Parent.Animation.Y = rec.Y; this.Parent.Animation.Width = rec.Width; this.Parent.Animation.Height = rec.Height;}; };
//    this.Add(this.Animation_Rectangle);

//x = x2;
//    this.Animation_Image = new Control(x, y, width, (height*5)+(es*4));
//    this.Animation_Image.Controls = [];
//    this.Animation_Image.BackColor = "grey";
//    this.Animation_Image.CanDrop = true;
//    this.Animation_Image.OnDrop = function()
//    {
//        if(DragDrop.Control == null || !DragDrop.Control.IsInherit("ControlTemplate"))return;
//        if(this.Parent.Animation == null)
//            this.Parent.NewAnimation();
//        this.Parent.Animation.Image = DragDrop.Element;
//    };
//    this.Animation_Image.Draw = function(x, y, width, height, context)//(context)
//    {
//        var anim = this.Parent.Images_List.Selected();
//        if(anim == null || anim.Image == null)return;
//        DrawTemplateImage( anim.Image, this.Rectangle.X, this.Rectangle.Y, this.Rectangle.Width, this.Rectangle.Height, context );        
//    };
//    this.Add(this.Animation_Image);

//x = this.Images_List.Rectangle.Width+es;
//y += height+es;
//    this.Add(new ControlTicket(x, y, width, height, "#Text"));
//x += width+es;
//    this.Animation_Text = new TextBox(x, y, (width*3)+(es*2), height);
//    this.Animation_Text.BackText = "#Text";
//    this.Animation_Text.TextChanged = function(){ if (this.Parent.Animation != null)this.Parent.Animation.Text = this.Text; };
//    this.Add(this.Animation_Text);

//x = this.Images_List.Rectangle.Width+es;
//y += height+es;    
//    this.Add(new ControlTicket(x, y, (width*4)+(es*3), height, "#Effect"));
//x += (width*4)+(es*3) + es;

//y += height+es;  

//x = this.Images_List.Rectangle.Width+es;
//    this.Add(new ControlTicket(x, y, width, height, "#KeyName"));
//x += width+es;
//    this.Effect_KeyName = new TextBox(x, y, width*3+es*2, height);
//    this.Effect_KeyName.ReadOnly = true;
//    this.Effect_KeyName.BackText = "#KeyName";
//    this.Effect_KeyName.TextChanged = function(){ var effect = this.Parent.Effect_List.Selected(); if(effect != null)effect.KeyName = this.GetNumber(); };
//    this.Effect_KeyName.KeyEnter = function(){};
//    this.Add(this.Effect_KeyName);

//x = this.Images_List.Rectangle.Width+es;
//y += height+es; 
//    this.Add(new ControlTicket(x, y, width, height, "#Start"));
//x += width+es;
//    this.Effect_Start = new ControlNumber(x, y, width, height);
//    this.Effect_Start.NumberChanged = function(){ var effect = this.Parent.Effect_List.Selected(); if(effect != null)effect.Start = this.GetNumber(); };
//    this.Effect_Start.Step = 100;
//    this.Add(this.Effect_Start);
//x += width+es;    
//    this.Add(new ControlTicket(x, y, width, height, "#End"));
//x += width+es;
//    this.Effect_End = new ControlNumber(x, y, width, height);
//    this.Effect_End.NumberChanged = function(){ var effect = this.Parent.Effect_List.Selected(); if(effect != null)effect.End = this.GetNumber(); };
//    this.Effect_End.Step = 100;
//    this.Add(this.Effect_End);

//x = this.Images_List.Rectangle.Width+es;
//y += height+es;
//    this.Add(new ControlTicket(x, y, width, height, "#Number"));
//x += width+es;
//    this.Effect_Number = new ControlNumber(x, y, width, height);
//    this.Effect_Number.MinValue = -10000;
//    this.Effect_Number.NumberChanged = function(){ var effect = this.Parent.Effect_List.Selected(); if(effect != null)effect.Number = this.GetNumber(); };
//    this.Add(this.Effect_Number);
//x += width+es;
//    this.Add(new ControlTicket(x, y, width, height, "#Text"));
//x += width+es;
//    this.Effect_Text = new TextBox(x, y, (width*2)+es, height);
//    this.Effect_Text.Numeric = true;
//    this.Effect_Text.BackText = "#Text";
//    this.Effect_Text.TextChanged = function(){ var effect = this.Parent.Effect_List.Selected(); if(effect != null)effect.Text = this.GetText(); };
//    this.Effect_Text.KeyEnter = function(){};
//    this.Add(this.Effect_Text);

//x = this.Images_List.Rectangle.Width+es;
//y += height+es;
//h = this.Rectangle.Height-this.Border.Top-this.Border.Bottom - y;
//    this.Effect_List = new ControlList(x, y, width*2+es, h);
//    this.Effect_List.ClickRight = function(){ this.Parent.ClearEffect(); };
//    this.Effect_List.SelectedLineChanged = function(){ this.Parent.SelectedEffect(); };
//    this.Effect_List.HeightLine = 60;
//    this.Effect_List.LineDraw = function(line, x, y, context)
//    {
//        var h = this.HeightLine/3;
//        context.fillText(MeasureText("KeyName: "+ this.Lines[line].KeyName, this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+h );
//        context.fillText(MeasureText("Start: "+ this.Lines[line].Start +", End: "+ this.Lines[line].End, this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+(h*2) );
//        if(this.Lines[line].Text != "")
//            context.fillText(MeasureText("Text:" +this.Lines[line].Text , this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+(h*3) );
//        else
//            context.fillText(MeasureText("Number:"+ this.Lines[line].Number, this.Rectangle.Width-this.Border.Left-this.Border.Right, context), x, y+(h*3) );
//        DrawLine( {X:x, Y:y+(h*3)} , {X:x+this.Rectangle.Width-this.Border.Left-this.Border.Right, Y:y+(h*3)},context);
//    };
//    this.Add(this.Effect_List);

//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
//    this.ToHead_Src = new Control(x, y, width, height);
//    this.ToHead_Src.SetText("#ToHead_Src");
//    this.ToHead_Src.ClickLeft = function(){ this.Parent.NewEffect("ToHead_Src"); };
//    this.Add(this.ToHead_Src);

//x += width+es;
//    this.MoveToHead_Src = new Control(x, y, width, height);
//    this.MoveToHead_Src.SetText("#MoveToHead_Src");
//    this.MoveToHead_Src.ClickLeft = function(){ this.Parent.NewEffect("MoveToHead_Src"); };
//    this.Add(this.MoveToHead_Src);

//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
//y += height+es; 
//    this.ToHead_Dest = new Control(x, y, width, height);
//    this.ToHead_Dest.SetText("#ToHead_Dest");
//    this.ToHead_Dest.ClickLeft = function(){ this.Parent.NewEffect("ToHead_Dest"); };
//    this.Add(this.ToHead_Dest);

//x += width+es;
//    this.MoveToHead_Dest = new Control(x, y, width, height);
//    this.MoveToHead_Dest.SetText("#MoveToHead_Dest");
//    this.MoveToHead_Dest.ClickLeft = function(){ this.Parent.NewEffect("MoveToHead_Dest"); };
//    this.Add(this.MoveToHead_Dest);

//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
//y += height+es; 
//    this.ToCube_Src = new Control(x, y, width, height);
//    this.ToCube_Src.SetText("#ToCube_Src");
//    this.ToCube_Src.ClickLeft = function(){ this.Parent.NewEffect("ToCube_Src"); };
//    this.Add(this.ToCube_Src);

//x += width+es;
//    this.MoveToCube_Src = new Control(x, y, width, height);
//    this.MoveToCube_Src.SetText("#MoveToCube_Src");
//    this.MoveToCube_Src.ClickLeft = function(){ this.Parent.NewEffect("MoveToCube_Src"); };
//    this.Add(this.MoveToCube_Src);

//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
//y += height+es; 
//    this.ToCube_Dest = new Control(x, y, width, height);
//    this.ToCube_Dest.SetText("#ToCube_Dest");
//    this.ToCube_Dest.ClickLeft = function(){ this.Parent.NewEffect("ToCube_Dest"); };
//    this.Add(this.ToCube_Dest);

//x += width+es;
//    this.MoveToCube_Dest = new Control(x, y, width, height);
//    this.MoveToCube_Dest.SetText("#MoveToCube_Dest");
//    this.MoveToCube_Dest.ClickLeft = function(){ this.Parent.NewEffect("MoveToCube_Dest"); };
//    this.Add(this.MoveToCube_Dest);

//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
//y += height+es; 
//    this.ToScreen_X = new Control(x, y, width, height);
//    this.ToScreen_X.SetText("#ToScreen_X");
//    this.ToScreen_X.ClickLeft = function(){ this.Parent.NewEffect("ToScreen_X"); };
//    this.Add(this.ToScreen_X);

//x += width+es;
//    this.MoveToScreen_X = new Control(x, y, width, height);
//    this.MoveToScreen_X.SetText("#MoveToScreen_X");
//    this.MoveToScreen_X.ClickLeft = function(){ this.Parent.NewEffect("MoveToScreen_X"); };
//    this.Add(this.MoveToScreen_X);

//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
//y += height+es; 
//    this.ToScreen_Y = new Control(x, y, width, height);
//    this.ToScreen_Y.SetText("#ToScreen_Y");
//    this.ToScreen_Y.ClickLeft = function(){ this.Parent.NewEffect("ToScreen_Y"); };
//    this.Add(this.ToScreen_Y);

//x += width+es; 
//    this.MoveToScreen_Y = new Control(x, y, width, height);
//    this.MoveToScreen_Y.SetText("#MoveToScreen_Y");
//    this.MoveToScreen_Y.ClickLeft = function(){ this.Parent.NewEffect("MoveToScreen_Y"); };
//    this.Add(this.MoveToScreen_Y);


//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;y += height+es; 
//    this.ToAxeX = new Control(x, y, width, height);
//    this.ToAxeX.SetText("#ToAxeX");
//    this.ToAxeX.ClickLeft = function(){ this.Parent.NewEffect("ToAxeX"); };
//    this.Add(this.ToAxeX);

//x += width+es;
//    this.MoveToAxeX = new Control(x, y, width, height);
//    this.MoveToAxeX.SetText("#MoveToAxeX");
//    this.MoveToAxeX.ClickLeft = function(){ this.Parent.NewEffect("MoveToAxeX"); };
//    this.Add(this.MoveToAxeX);

//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
//y += height+es; 
//    this.ToAxeY = new Control(x, y, width, height);
//    this.ToAxeY.SetText("#ToAxeY");
//    this.ToAxeY.ClickLeft = function(){ this.Parent.NewEffect("ToAxeY"); };
//    this.Add(this.ToAxeY);

//x += width+es; 
//    this.MoveToAxeY = new Control(x, y, width, height);
//    this.MoveToAxeY.SetText("#MoveToAxeY");
//    this.MoveToAxeY.ClickLeft = function(){ this.Parent.NewEffect("MoveToAxeY"); };
//    this.Add(this.MoveToAxeY);

//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
//y += height+es; 
//    this.Size_Width = new Control(x, y, width, height);
//    this.Size_Width.SetText("#Size_Width");
//    this.Size_Width.ClickLeft = function(){ this.Parent.NewEffect("Size_Width"); };
//    this.Add(this.Size_Width);

//x += width+es; 
//    this.Size_Height = new Control(x, y, width, height);
//    this.Size_Height.SetText("#Size_Height");
//    this.Size_Height.ClickLeft = function(){ this.Parent.NewEffect("Size_Height"); };
//    this.Add(this.Size_Height);

//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
//y += height+es; 
//    this.Zoom_Width = new Control(x, y, width, height);
//    this.Zoom_Width.SetText("#Zoom_Width");
//    this.Zoom_Width.ClickLeft = function(){ this.Parent.NewEffect("Zoom_Width"); };
//    this.Add(this.Zoom_Width);

//x += width+es;
//    this.Zoom_Height = new Control(x, y, width, height);
//    this.Zoom_Height.SetText("#Zoom_Height");
//    this.Zoom_Height.ClickLeft = function(){ this.Parent.NewEffect("Zoom_Height"); };
//    this.Add(this.Zoom_Height);

//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
//y += height+es; 
//    this.FullScreen = new Control(x, y, width, height);
//    this.FullScreen.SetText("#FullScreen");
//    this.FullScreen.ClickLeft = function(){ this.Parent.NewEffect("FullScreen"); };
//    this.Add(this.FullScreen);

//x = this.Images_List.Rectangle.Width+es + this.Effect_List.Rectangle.Width + es;
//y += height+es; 
//    this.Centred = new Control(x, y, width, height);
//    this.Centred.SetText("#Centred");
//    this.Centred.ClickLeft = function(){ this.Parent.NewEffect("Centred"); };
//    this.Add(this.Centred);

//    this.Draw = function(x, y, width, height, context){};

//    this.NewAnimation = function()
//    {
//        PageInfo.Animations[PageInfo.Animations.length] = Create_Animation();
//        this.Images_List.Lines = PageInfo.Animations;
//        this.Images_List.SelectedLine = this.Images_List.Lines.length-1;
//        this.Images_List.Start_Lines = 0;
//        this.SelectedAnimation();
//    };
//    this.NewEffect = function(keyname)
//    {
//        if(this.Animation == null)return;
//        this.Animation.Effects[this.Animation.Effects.length] = Create_Effect(keyname);
//        this.Effect_List.Lines = this.Animation.Effects;
//        this.Effect_List.SelectedLine = this.Effect_List.Lines.length-1;
//        this.Effect_List.Start_Lines = 0;
//        this.SelectedEffect();
//    };
//    this.SelectedAnimation = function()
//    {
//        this.Animation = this.Images_List.Selected();
//        if(this.Animation == null){ this.ClearEffect(); return; }
//        this.Animation_Name.SetText(this.Animation.Name);
//        this.Animation_Start.SetNumber(this.Animation.Start);
//        this.Animation_Duration.SetNumber(this.Animation.Duration);
//        this.Animation_Rectangle.SetRectangle( {X:this.Animation.X, Y:this.Animation.Y, Width:this.Animation.Width, Height:this.Animation.Height} );
//        this.Animation_Text.SetText(this.Animation.Text);
//        this.ClearEffect();
//    };
//    this.SelectedEffect = function()
//    {
//        var effect = this.Effect_List.Selected();
//        if(effect == null)return;
//        this.Effect_KeyName.SetText(effect.KeyName);
//        this.Effect_Start.SetNumber(effect.Start);
//        this.Effect_End.SetNumber(effect.End);
//        this.Effect_Number.SetNumber(effect.Number);
//        this.Effect_Text.SetText(effect.Text);
//    };
//    this.ClearAnimation = function()
//    {
//        this.Animation = null;
//        this.Animation_Name.Clear();
//        this.Animation_Start.Clear();
//        this.Animation_Duration.Clear();
//        this.Animation_Rectangle.Clear();
//        this.Animation_Text.Clear();
//        this.Images_List.Clear();
//        if( PageInfo != null)
//            this.Images_List.ChangeLines(PageInfo.Animations);
//        this.ClearEffect();
//    };
//    this.ClearEffect = function()
//    {
//        this.Effect_KeyName.Clear();
//        this.Effect_Start.Clear();
//        this.Effect_End.Clear();
//        this.Effect_Number.Clear();
//        this.Effect_Text.Clear();
//            this.Effect_List.Clear();
//        
//        if(this.Animation != null)
//            this.Effect_List.ChangeLines(this.Animation.Effects);
//    };
//};