var Case = {X:0,Y:0, Adjustment:{X:0,Y:0}};       //Alternative de Target:   X = Location.X + Case.X; Y = Location.Y + Case.Y; Z = Location.Z;
var Location = {X:-25,Y:-5,Z:0};//{X:0,Y:0,Z:0};// CREER DES VARIABLE MapInfo
var Grap = {X:0, Y:0, Adjustment:{X:0,Y:0}, Border:25, Step:25, Modified:false, Rolled:0};

var MaxZ = 10;
var WallCeil = 0;
var SetMaxZ = function(number){ MaxZ = number; CreateCase = true; };

var Selected = { ID:"", Multi:[], Target:"" };//PLAYER
var Target = {ID:"", Case:null, Cube:null};// Mouse
var SelectedMulti = { Source:{X:0,Y:0}, Destination:{X:0,Y:0}, Active:false };

var SelectedMouse = {Power:null, Target:"",X:0,Y:0,Z:0, Range:3};

var Cases3D;
var Entitys = new Array();
var EntitysDraw = new Array();
var PermanentsDraw = [];

var Tempory_Cubes = new Array();
var Tempory_Entitys = null;
var Tempory_Entity = new Array();


var NoCeiling = new Array();
var ResizeCases = true;
var CreateCase = false;
var CreateCubes = false;
var CreateEntityDraw = true;//Verifier!!

//Verifier et modifier SelectedMouse en Power = {};
//modifier ChangeDirection pour Screen: au cas où le personnage ne se déplace que de Adjustement
PageMap_OnLoad = function()
{
    Download.World = {Start:false, End:false, Translators:{Nbr:0,Total:0}, Animations:{Nbr:0,Total:0}, Templates:{Nbr:0,Total:0}};
    Download.Map = {Start:false, End:false, Cubes:{Nbr:0,Total:0}, Permanents:{Nbr:0,Total:0}};
    
    FormBase = new Form(PageInfo.Frame.X, PageInfo.Frame.Y, PageInfo.Frame.Width, PageInfo.Frame.Height, {ID:"Map"});
    FormBase.CanMove = false;
    FormBase.CanResize = false;
    FormBase.Text = "Map";
    
    FormBase.OnDrawing = function(x, y, width, height, context){};
    FormBase.Moved = function(){ PageInfo.Frame.X = this.Frame.X; PageInfo.Frame.Y = this.Frame.Y; };
    FormBase.Resized = function(){ PageInfo.Frame.Width = this.Frame.Width; PageInfo.Frame.Height = this.Frame.Height; };
    FormBase.OnMouseWheel = function(rolled){ if(rolled > 0)Grap.Rolled += PageInfo.MapInfo.Rolled; else Grap.Rolled -= PageInfo.MapInfo.Rolled; };
    FormBase.KeyUpArrow = function(){ if(WallCeil == 1)WallCeil = 0; else SetMaxZ(MaxZ+1); if(MaxZ > PageInfo.Map.Depth)MaxZ = PageInfo.Map.Depth; };
    FormBase.KeyDownArrow = function(){ if(MaxZ == 0)WallCeil = 1; else SetMaxZ(MaxZ-1); if(MaxZ < 0)MaxZ = 0; };

    FormBase.FullScreened = function(ratio_width, ratio_height){ PageInfo.MapInfo.SizeCube *= ratio_width; ResizeCases=true;};


//FormBase.Border = {Left:10, Top:10, Right:10, Bottom:10 };
//FormBase.OnClip();

    CallWorld();
	ResizeCases3D();

//    FormBase.Add(new ControlMapInfo(850, 10, 300, 500) );
};

//function CaseFromMouse(mouse_X, mouse_Y, sizecube)
//{
//    var px = (mouse_X/sizecube)*100;
//    var py = ((mouse_Y-(sizecube/2))/sizecube)*100;
//    return CaseFrom(px,py);
//// return CaseFrom2( Math.round((adj_X/sizecube)*100), Math.round(((adj_Y+50)/sizecube)*100), sizecube ); 
//};
//function CaseToCase2(case_src, case_dest)
//{
//    var cX = case_dest.X - case_src.X;
//    var cY = case_dest.Y - case_src.Y;
//    
//    var dX = ((cX-cY)*100);
//    var dY = ((cX+cY)*50); 
//    
//    var aX = case_src.Adjustment.X + case_dest.Adjustment.X;
//    var aY = case_src.Adjustment.Y + case_dest.Adjustment.Y;

//    return {X:dX + aX, Y:dY + aY};

////    return {X:((cX-cY)*100)+case_dest.Adjustment.X+case_src.Adjustment.X,Y:((cX+cY)*50)+case_dest.Adjustment.Y+case_src.Adjustment.Y};
//};
//function CaseFromAdjustment(adj_X, adj_Y, sizecube){ return CaseFrom3( (adj_X/100)*sizecube, ((adj_Y+50)/100)*sizecube, sizecube );   };
//function CaseFrom3( x, y, sizecube)//à partir d'un point X:0 Y:0
//{
//    var c = {X:0,Y:0,Adjustment:{X:0,Y:0}};
//    y -= (sizecube/2);
//    var adj_X = (x /sizecube)*100;
//    var adj_Y = (y /sizecube)*100;
//    var pY = ((2*y-x)/2);
//    var pX = (x+pY);
//    c.Y = Math.round(pY/sizecube);
//    c.X = Math.round(pX/sizecube);
//    c.Adjustment.X = Math.round(adj_X-((c.X-c.Y)*100));
//    c.Adjustment.Y = Math.round(adj_Y-((c.X+c.Y)*50));
//    return c;
//};

//function IsCaseVisible(x, y, nbrcube){ return (Math.abs(x) + Math.abs(y) <= nbrcube); };
function Case3D(x, y)
{
    this.X = x;
    this.Y = y;
    this.Screen = {X:0,Y:0};
    this.Cubes = [];
    this.EntitysDraw = [];
    this.ToScreen = function(){ this.Screen = CaseToScreen(this.X, this.Y, PageInfo.MapInfo.SizeCube); };
    this.ToFloors = function()
    {
//        for(var i = 0; i < this.Cubes.length; i++)
        for(var i = this.Cubes.length-1; i >=  0; i--)
            if(this.Cubes[i].Cross)
                return this.Cubes[i];
        return null;
    };
};
function CaseFromMouse(mouse_X, mouse_Y, sizecube){ return CaseFrom((mouse_X/sizecube)*100,((mouse_Y-(sizecube/2))/sizecube)*100); };
function CaseFrom(x, y)
{
    var c = {X:0,Y:0,Adjustment:{X:0,Y:0}};
    var pY = ((2*y-x)/2);
    var pX = (x+pY);
    c.Y = Math.round(pY/100);
    c.X = Math.round(pX/100);
    c.Adjustment.X = Math.round(x-((c.X-c.Y)*100));
    c.Adjustment.Y = Math.round(y-((c.X+c.Y)*50));
    return c;
};
function CaseToCase(case_src, case_dest)
{
    var cX = case_dest.X - case_src.X;
    var cY = case_dest.Y - case_src.Y;
    return {X:((cX-cY)*100)+case_dest.Adjustment.X-case_src.Adjustment.X,Y:((cX+cY)*50)+case_dest.Adjustment.Y-case_src.Adjustment.Y};
};
function CaseToScreen( Case_X,  Case_Y, sizecube)
{
    var pointX = parseInt((Case_X - Case_Y) * sizecube);
    var pointY = parseInt((Case_X + Case_Y) * sizecube / 2);
    return {X:pointX,Y:pointY};
};
function LocationToScreen( L_X,  L_Y, L_Z, sizecube)
{
    var Case_X = L_X - Location.X - (L_Z - Location.Z);
    var Case_Y = L_Y - Location.Y - (L_Z - Location.Z);
    var pointX = parseInt((Case_X - Case_Y) * sizecube);
    var pointY = parseInt((Case_X + Case_Y) * sizecube / 2);
    pointX += sizecube;
    return {X:pointX,Y:pointY};
};

//???? Cette fonction sert a trouver la case sous le curseur, mais en limitant à une distance maximal
//elle sert principalement pour les AOE
//Changer X,Y, Z en Cube et supprimer Target
function OnSelectedMouse()
{
    var C3D = FindCase(Case.X,Case.Y);
    var x = 0;
    var y = 0;
    var z = 0;
    if(C3D != null && C3D.Cubes.length > 0 )
    {
        x = C3D.Cubes[C3D.Cubes.length-1].X;
        y = C3D.Cubes[C3D.Cubes.length-1].Y;
        z = C3D.Cubes[C3D.Cubes.length-1].Z;
//        if( PageInfo.MapInfo.Adjusted )
//        {
//            SelectedMouse.Adjustment.X = Math.floor( ((Mouse.X - PageInfo.Frame.X - C3D.Screen.X) / PageInfo.MapInfo.SizeCube)*100 );
//            SelectedMouse.Adjustment.Y = Math.floor( ((Mouse.Y - PageInfo.Frame.Y - (C3D.Screen.Y + (PageInfo.MapInfo.SizeCube/2))) / PageInfo.MapInfo.SizeCube)*100 );
//	    }
    }
    else
    {
        x = Location.X + Case.X;
        y = Location.Y + Case.Y;
        z = Location.Z;
    }
    if( Selected.ID != "" && SelectedMouse.Range > 0)
    {
        var entity = Selected_Entity();
        if(entity != null)
        {
            if(x-entity.X > SelectedMouse.Range)
                x = entity.X + SelectedMouse.Range;
            else if(x-entity.X < -SelectedMouse.Range)
                x = entity.X - SelectedMouse.Range;
            if(y-entity.Y > SelectedMouse.Range)
                y = entity.Y + SelectedMouse.Range;
            else if(y-entity.Y < -SelectedMouse.Range)
                y = entity.Y - SelectedMouse.Range;
            if(z-entity.Z > SelectedMouse.Range)
                z = entity.Z + SelectedMouse.Range;
            else if(z-entity.Z < -SelectedMouse.Range)
                z = entity.Z - SelectedMouse.Range;
        }
    }

    SelectedMouse.X = x;
    SelectedMouse.Y = y;
    SelectedMouse.Z = z;

    if(PageInfo.Map == null)return;
    SelectedMouse.Target = "";
    var target = null;
    for( var p = 0; p < PageInfo.Map.Permanents.length; p++)
        if( PageInfo.Map.Permanents[p] != null && PageInfo.Map.Permanents[p].CanTarget && Contains_Entity(PageInfo.Map.Permanents[p], SelectedMouse.X, SelectedMouse.Y, SelectedMouse.Z) )
            target = PageInfo.Map.Permanents[p];
    if(target == null)
        for( var t = 0; t < Entitys.length; t++)
            if( Entitys[t] != null && Entitys[t].CanTarget && Contains_Entity(Entitys[t], SelectedMouse.X, SelectedMouse.Y, SelectedMouse.Z) )
                target = Entitys[t];
    if(target != null)
    {
        SelectedMouse.Target = target.ID;
    }
    else
    {
	    var mx = Mouse.X - FormBase.Position.X;
	    var my = Mouse.Y - FormBase.Position.Y;
//	    var mx = Mouse.X - PageInfo.Frame.X;
//	    var my = Mouse.Y - PageInfo.Frame.Y;
        for(var i = 0; i < EntitysDraw.length;  i++)
        {
            if(EntitysDraw[i].Screen.X < mx && mx < EntitysDraw[i].Screen.X + EntitysDraw[i].Width && EntitysDraw[i].Screen.Y < my && my < EntitysDraw[i].Screen.Y + EntitysDraw[i].Height)
            {
                SelectedMouse.Target = EntitysDraw[i].ID;
                break;
            }
        }
    }
};

function OnTarget()
{
    var C3D = FindCase(Case.X,Case.Y);
    Target.Case = C3D;
    if(C3D != null) Target.Cube = C3D.ToFloors();
    else Target.Cube = null;

    Target.ID = "";
    var temp_EntitysDraw = EntitysDraw;
    var mx = Mouse.X - FormBase.Position.X;
    var my = Mouse.Y - FormBase.Position.Y;
//    var mx = Mouse.X - PageInfo.Frame.X;
//    var my = Mouse.Y - PageInfo.Frame.Y;

    for(var d = 0; d < temp_EntitysDraw.length; d++)
    {
        //Creer une fonction pour vérifier si le personnage est target
        //Verifier la transparence sur le Template
        //Verifier si le personnage est visible NoCeiling
        if(temp_EntitysDraw[d].Screen.X < mx && mx < temp_EntitysDraw[d].Screen.X + temp_EntitysDraw[d].Width && temp_EntitysDraw[d].Screen.Y < my && my < temp_EntitysDraw[d].Screen.Y + temp_EntitysDraw[d].Height)
        {
            Target.ID = temp_EntitysDraw[d].ID;
            break;
        }
        
    }
};
//function OnTarget()
//{
//    Target.Cube = null;
//    var C3D = FindCase(Case.X,Case.Y);
//    if(C3D != null && C3D.Cubes.length > 0 )
//        for(var i = 0; i < C3D.Cubes.length; i++)
//            if( C3D.Cubes[i].Cross)
//                Target.Cube = C3D.Cubes[i];

//    Target.Case = C3D;

//    Target.ID = "";
//    var temp_EntitysDraw = EntitysDraw;
//    var mx = Mouse.X - PageInfo.Frame.X;
//    var my = Mouse.Y - PageInfo.Frame.Y;

//    for(var d = 0; d < temp_EntitysDraw.length; d++)
//    {
//        //Creer une fonction pour vérifier si le personnage est target
//        //Verifier la transparence sur le Template
//        //Verifier si le personnage est visible NoCeiling
//        if(temp_EntitysDraw[d].Screen.X < mx && mx < temp_EntitysDraw[d].Screen.X + temp_EntitysDraw[d].Width && temp_EntitysDraw[d].Screen.Y < my && my < temp_EntitysDraw[d].Screen.Y + temp_EntitysDraw[d].Height)
//        {
//            Target.ID = temp_EntitysDraw[d].ID;
//            break;
//        }
//        
//    }
//};

function SelectedMulti_Down()
{
    SelectedMulti.Active = true;
    Selected.Multi = [];
    SelectedMulti.Source.X = Mouse.X - FormBase.Position.X;
    SelectedMulti.Source.Y = Mouse.Y - FormBase.Position.Y;
    SelectedMulti.Destination.X = Mouse.X - FormBase.Position.X;
    SelectedMulti.Destination.Y = Mouse.Y - FormBase.Position.Y;
//    SelectedMulti.Source.X = Mouse.X - PageInfo.Frame.X;
//    SelectedMulti.Source.Y = Mouse.Y - PageInfo.Frame.Y;
//    SelectedMulti.Destination.X = Mouse.X - PageInfo.Frame.X;
//    SelectedMulti.Destination.Y = Mouse.Y - PageInfo.Frame.Y;
};
function SelectedMulti_Up()
{
    SelectedMulti.Active = false;
};
function SelectedMulti_Move()
{
    Selected.Multi = [];
    SelectedMulti.Destination.X = Mouse.X - FormBase.Position.X;
    SelectedMulti.Destination.Y = Mouse.Y - FormBase.Position.Y;
//    SelectedMulti.Destination.X = Mouse.X - PageInfo.Frame.X;
//    SelectedMulti.Destination.Y = Mouse.Y - PageInfo.Frame.Y;
    for(var i = 0; i < EntitysDraw.length;  i++)
    {
        if(SelectedMulti.Source.X < SelectedMulti.Destination.X)
        {
            if(EntitysDraw[i].Screen.X > SelectedMulti.Destination.X)continue;
            if(EntitysDraw[i].Screen.X + EntitysDraw[i].Width < SelectedMulti.Source.X)continue;
        }
        else if(SelectedMulti.Source.X > SelectedMulti.Destination.X)
        {
            if(EntitysDraw[i].Screen.X > SelectedMulti.Source.X)continue;
            if(EntitysDraw[i].Screen.X + EntitysDraw[i].Width < SelectedMulti.Destination.X)continue;
        }
        if(SelectedMulti.Source.Y < SelectedMulti.Destination.Y)
        {
            if(EntitysDraw[i].Screen.Y > SelectedMulti.Destination.Y)continue;
            if(EntitysDraw[i].Screen.Y + EntitysDraw[i].Width < SelectedMulti.Source.Y)continue;
        }
        else if(SelectedMulti.Source.Y > SelectedMulti.Destination.Y)
        {
            if(EntitysDraw[i].Screen.Y > SelectedMulti.Source.Y)continue;
            if(EntitysDraw[i].Screen.Y + EntitysDraw[i].Width < SelectedMulti.Destination.Y)continue;
        }
        for(var p = 0; p < PageInfo.Players.length; p++)
        {
            if(PageInfo.Players[p] != EntitysDraw[i].ID)continue;
            Selected.Multi[Selected.Multi.length] = EntitysDraw[i].ID;
            break;
        }
    }
};

function Selected_Entity(){ return FindEntityID(Selected.ID); };
function Selected_Target(){ return FindEntityID(Selected.Target); };
function Contains_Entity(entity, pX, pY, pZ)
{
    return (pX <= entity.X) && (pX > entity.X - entity.Width)
        && (pY <= entity.Y) && (pY > entity.Y - entity.Width)
        && (pZ >= entity.Z) && (pZ < entity.Z + entity.Height);
};
//function Contains_Rectangle( pX, pY, pZ, rectangle)
//{
//    return rectangle.X <= pX && pX <= rectangle.X + rectangle.Width
//        && rectangle.Y <= pY && pY <= rectangle.Y + rectangle.Height
//        && rectangle.Z <= pZ && pZ <= rectangle.Z + rectangle.Depth;
//};
function FindCube(x, y, z)
{
    if(PageInfo.Map == null)return null;
    if(PageInfo.Map.Cubes.length == 0)return null;
    if(!Contains_Map(x,y,z, PageInfo.Map))return null;
    return PageInfo.Map.Cubes[x][y][z];
};
function Contains_Map(pX, pY, pZ, map)
{
    return 0 <= pX && pX < map.Width && 0 <= pY && pY < map.Height && 0 <= pZ && pZ < map.Depth;
};
function FindCase(x, y)
{
    for(var i = 0; i < Cases3D.length; i++)
        if ( Cases3D[i].X == x && Cases3D[i].Y == y)
            return Cases3D[i];
    return null;    
};
function FindCaseLocation(x, y, z)
{
    x = x - Location.X - (z - Location.Z);
    y = y - Location.Y - (z - Location.Z);
    return FindCase(x,y);
};
function FindEntityID(id)
{
    if(PageInfo.Map != null)
        for( var p = 0; p < PageInfo.Map.Permanents.length; p++)
            if(PageInfo.Map.Permanents[p].ID == id)
                return PageInfo.Map.Permanents[p];

    for( var ent = 0; ent < Entitys.length; ent++)
        if( id == Entitys[ent].ID )
            return Entitys[ent];
    return null;
};

function PageMap_OnMouseMove()//Supprimer!!!!!!!!!!!!!!!!!!!!!!!!
{
//	var mx = Mouse.X - PageInfo.Frame.X - Grap.X;
//	var my = Mouse.Y - PageInfo.Frame.Y - Grap.Y;

//	Case = CaseFrom(mx, my, PageInfo.MapInfo.SizeCube);
//	OnTarget();
//    if(SelectedMulti.Active)
//        SelectedMulti_Move();
};
MouseDownLeft = function(e)
{
    if(SelectedMouse.Power != null)
    {
        CallPowerMouse(SelectedMouse.Power.Name);
        SelectedMouse.Power = null;
    }
    
    SelectedMulti_Down();
    return false;
};
MouseUpLeft = function(e)
{
    SelectedMulti_Up();
    return false; 
};

var KeyDown = function(e)//OBSOLETE SUPPRIMER
{
        switch(Modifiers.Value)
        {
            case "Space" :
                EntityCentred(Selected.ID);
//                Location.X = 0;
//                Location.Y = 0;
//                Location.Z = 0;
//                
//                Grap.Adjustment.X = 0;
//                Grap.Adjustment.Y = 0;
//                Grap.Modified = true;
//                CreateCase = true;
                break;
        }
 return false; 
 };

function EntityCentred(id)//Changer en entityDraw!
{
    var entity = FindEntityID(id);
    if(entity == null)return;
    Location.X = entity.X - Math.ceil(FormBase.Rectangle.Width/(PageInfo.MapInfo.SizeCube*2));
    Location.Y = entity.Y;
    Location.Z = entity.Z;
                Grap.Adjustment.X = entity.Adjustment.X;
                Grap.Adjustment.Y = entity.Adjustment.Y;
                Grap.Modified = true;
                CreateCase = true;

};


PageMap_Downloading = function()
{
    if (Download.World.Start && !Download.World.End)
    {
        if(Download.World.Translators.Nbr == Download.World.Translators.Total && Download.World.Animations.Nbr == Download.World.Animations.Total && Download.World.Templates.Nbr == Download.World.Templates.Total)
        {
            CallMap();
            Download.World.End = true;
        }
        return false;
    }
    else if (Download.Map.Start && !Download.Map.End)
    {
        if(Download.Map.Cubes.Nbr == Download.Map.Cubes.Total && Download.Map.Permanents.Nbr == Download.Map.Permanents.Total)
        {
            if(PageInfo.Map != null && PageInfo.Map.ScreenAnimation != null)
                ScreenAnimation = PageInfo.Map.ScreenAnimation;
            Download.Map.End = true;  
            return true;
        }
    }
    return false;
};
//supprimer!!!
function CallSelected()
{
    CallPage("SELECTED", Selected.ID +PageInfo.Separator+ Selected.Target);
};
function CallMove()
{
    if(Target.Cube != null)
        CallPage("MOVE", Selected.ID +PageInfo.Separator+ Target.Cube.X +PageInfo.Separator+ Target.Cube.Y +PageInfo.Separator+ Target.Cube.Z +PageInfo.Separator+ Case.Adjustment.X.toString() +PageInfo.Separator+ Case.Adjustment.Y.toString());
};
//function CallMove()
//{
//    CallPage("MOVE", Selected.ID +PageInfo.Separator+ Target.X +PageInfo.Separator+ Target.Y +PageInfo.Separator+ Target.Z +PageInfo.Separator+ Target.Adjustment.X.toString() +PageInfo.Separator+ Target.Adjustment.Y.toString());
//};
//Modifier CallPowerToEntity, CallPowerToCube, CallPowerToMulti ect....
function CallPower(name)
{
   CallPage("POWER", name +PageInfo.Separator+ Selected.ID +PageInfo.Separator+ Target.ID +PageInfo.Separator+ Target.X +PageInfo.Separator+ Target.Y +PageInfo.Separator+ Target.Z +PageInfo.Separator+ Case.Adjustment.X.toString() +PageInfo.Separator+ Case.Adjustment.Y.toString());
};
function CallPowerMouse(name)
{
   CallPage("POWER", name +PageInfo.Separator+ Selected.ID +PageInfo.Separator+ SelectedMouse.Target +PageInfo.Separator+ SelectedMouse.X +PageInfo.Separator+ SelectedMouse.Y +PageInfo.Separator+ SelectedMouse.Z +PageInfo.Separator+ 0 +PageInfo.Separator+ 0);
};
function CallWorld(){ CallPage("WORLD", ""); };
function CallMap(){ CallPage("MAP", ""); };
function CallLoadCubes(index){ CallPage("LOADCUBES", index); };
function CallLoadPermanents(index){ CallPage("PERMANENTS", index); };
var PageMap_ResponsePage = function(message)
{
    if( message.COMMAND == "WORLD" )
        MessageWorld(message);
    else if( message.COMMAND == "MAP" )
        MessageMap(message);
    else if( message.COMMAND == "LOADCUBES" )
        LoadCubes(message);
    else if( message.COMMAND == "PERMANENTS" )
        LoadPermanents(message);
    else if( message.COMMAND == "ENTITYS" )
        MessageEntitys(message);
    else if( message.COMMAND == "ENTITY" )
        MessageEntity(message);
    else if( message.COMMAND == "CONTAINER" )
        MessageContainer(message);
    else if( message.COMMAND == "WORLD_TRANSLATORS" )
        MessageWorldTranslators(message);
    else if( message.COMMAND == "WORLD_ANIMATIONS" )
        MessageWorldAnimations(message);
    else if( message.COMMAND == "WORLD_TEMPLATES" )
        MessageWorldTemplates(message);
    else if( message.COMMAND == "CUBES" )
        MessageCubes(message);
};
function MessageWorld(msg)
{
    PageInfo.World = msg.World;
    PageInfo.Map = null;

    Download.End = false;
    Download.World = {Start:false, End:false, Translators:{Nbr:0,Total:0}, Animations:{Nbr:0,Total:0}, Templates:{Nbr:0,Total:0}};
    Download.Map = {Start:false, End:false, Cubes:{Nbr:0,Total:0}, Permanents:{Nbr:0,Total:0}};
    Download.World.Start = true;

    ResizeCases3D();
    ScreenAnimation = ScreenAnimation_Load;
    Entitys = new Array();
    EntitysDraw = [];
    PermanentsDraw = [];
//    CreateEntityDraw = true;
    CreateCase = true;

    Download.World.Translators.Total = PageInfo.World.Translators_Length;
    Download.World.Animations.Total = PageInfo.World.Animations_Length;
    Download.World.Templates.Total = PageInfo.World.Templates_Length;
    for(var t = 0; t < PageInfo.World.Translators_Length; t++)
        CallPage("WORLD_TRANSLATORS", t);
    for(var a = 0; a < PageInfo.World.Animations_Length; a++)
        CallPage("WORLD_ANIMATIONS", a);
    for(var i = 0; i < PageInfo.World.Templates_Length; i++)
        CallPage("WORLD_TEMPLATES", i);
};
function MessageWorldTranslators(msg)
{
    var index = -1
    for(var i = 0; i < PageInfo.Translators.length; i++)
        if(PageInfo.Translators[i].Name == msg.Value.Name)
            { index = i; break; }
    if(index > -1) PageInfo.Translators[index] = msg.Value;
    else PageInfo.Translators[PageInfo.Translators.length] = msg.Value;
    Download.World.Translators.Nbr++;
};
function MessageWorldAnimations(msg)
{
    var index = -1
    for(var i = 0; i < PageInfo.Animations.length; i++)
        if(PageInfo.Animations[i].Name == msg.Value.Name)
            { index = i; break; }
    if(index > -1) PageInfo.Animations[index] = msg.Value;
    else PageInfo.Animations[PageInfo.Animations.length] = msg.Value;
    Download.World.Animations.Nbr++;
};
function MessageWorldTemplates(msg)
{
    msg.Value.Image = new Image();
    msg.Value.Image.onload = function(){Download.World.Templates.Nbr++;};
    msg.Value.Image.src = msg.Value.ImageUrl;
    var index = -1
    for(var i = 0; i < PageInfo.Templates.length; i++)
        if(PageInfo.Templates[i].Name == msg.Value.Name)
            { index = i; break; }
    if(index > -1) PageInfo.Templates[index] = msg.Value;
    else PageInfo.Templates[PageInfo.Templates.length] = msg.Value;
};
function MessageMap(msg)
{
    PermanentsDraw = [];
    if(msg.Map == null)return;

    if(msg.Map.ScreenAnimation != null)
    {
        for(var msa = 0; msa < msg.Map.ScreenAnimation.Templates.length; msa++)
        {
            msg.Map.ScreenAnimation.Templates[msa].Image = new Image();
            msg.Map.ScreenAnimation.Templates[msa].Image.src = msg.Map.ScreenAnimation.Templates[msa].ImageUrl;
        }
    }

    var cubes = [msg.Map.Width];
    for(var x = 0; x < msg.Map.Width; x++)
    {
        cubes[x] = [msg.Map.Height];
        for(var y = 0; y < msg.Map.Height; y++)
        {
            cubes[x][y] = [msg.Map.Depth];
            for(var z = 0; z < msg.Map.Depth; z++)
            {
                cubes[x][y][z] = null;
            }
        }    
    }
    msg.Map.Cubes = cubes;
    PageInfo.Map = msg.Map;
    MaxZ = PageInfo.Map.Depth;
    Download.Map = {Start:true, End:false, Cubes:{Nbr:0,Total:0}, Permanents:{Nbr:0,Total:0}};
    Download.End = false;
    ScreenAnimation = ScreenAnimation_Load;

    Download.Map.Cubes.Total = PageInfo.Map.MessageCubes_Length;
    for(var i = 0; i < PageInfo.Map.MessageCubes_Length; i++)
        CallLoadCubes(i);
    Download.Map.Permanents.Total = PageInfo.Map.MessagePermanents_Length;
    for(var p = 0; p < PageInfo.Map.MessagePermanents_Length; p++)
        CallLoadPermanents(p);

};
function LoadCubes( message )
{
    if(PageInfo.Map == null)return;
    for(var i = 0; i < message.Cubes.length; i++)
        if( message.Cubes[i] != null && message.Cubes[i] != undefined)
            PageInfo.Map.Cubes[message.Cubes[i].X][message.Cubes[i].Y][message.Cubes[i].Z] = message.Cubes[i];
//    CreateEntityDraw = true;
    CreateCase = true;
    Download.Map.Cubes.Nbr++;
};
function LoadPermanents( message )
{
    if(PageInfo.Map == null)return;
    for(var i = 0; i < message.Entitys.length; i++)
        if( message.Entitys[i] != null && message.Entitys[i] != undefined)
            PageInfo.Map.Permanents[PageInfo.Map.Permanents.length] = message.Entitys[i];
    var temp = []
    for(var p = 0; p < PageInfo.Map.Permanents.length; p++)
        temp[temp.length] = new EntityDraw(PageInfo.Map.Permanents[p]);
    PermanentsDraw = temp;
    CreateEntityDraw = true;
    CreateCase = true;
    Download.Map.Permanents.Nbr++;
};
function MessageEntitys( message )
{
    Tempory_Entitys = message.Entitys;
    CreateEntityDraw = true;
};
function MessageEntity( message )
{
    Tempory_Entity[Tempory_Entity.length] = message.Value;
//    var entity = message.Value;
//    for(var j = 0; j < Entitys.length; j++)
//        if( Entitys[j].ID == entity.ID )
//            Entitys[j] = entity;
    CreateEntityDraw = true;
};
function MessageCubes( message )
{
    if(PageInfo.Map == null)return;
    for(var i = 0; i < message.Cubes.length; i++)
        if( message.Cubes[i] != null && message.Cubes[i] != undefined)
            Tempory_Cubes[Tempory_Cubes.length] = message.Cubes[i];

    CreateCubes = true;
};
//function MessageEntitys( message )
//{
//    Entitys = message.Entitys;
//    CreateEntityDraw = true;
//};
//function MessageEntity( message )
//{
//    var entity = message.Value;
//    for(var j = 0; j < Entitys.length; j++)
//        if( Entitys[j].ID == entity.ID )
//            Entitys[j] = entity;
//    CreateEntityDraw = true;
////    if(!CreateEntityDraw)
////    {
////        var entitydraw = null;
////        for(var e = 0; e < EntitysDraw.length; e++)
////            if( entity.ID == EntitysDraw[e].ID )
////            {
////                entitydraw = EntitysDraw[e];
////                if(entity.Move != null && entity.Move.ID != entitydraw.Move.ID)
////                {
////                    entitydraw.Move.ID = entity.Move.ID;
////                    entitydraw.Move.Step = 0;
////                }
////                break;
////            }
////        if(entitydraw == null)
////        {
////            entitydraw = new EntityDraw(entity);
////            EntitysDraw[EntitysDraw.length] = entitydraw;
////        }
////    }
//};
function MessageContainer( msg )
{
    for(var  i = 0; i < Containers.length; i++)
        if(Containers[i].Container.Name == msg.Container.Name && Containers[i].Container.Owner == msg.Container.Owner)
            { Containers[i].Container = msg.Container; Containers[i].Show();  return; }
            
    var c = new ControlContainer( (Containers.length*10), (Containers.length*10) ,160,160);
    c.Container = msg.Container;
    Containers[Containers.length] = c;
    FormBase.Add(c);
};
//#####################################################################



//VERIFIER MODIFIER
function SelectedMove()
{
    NoCeilingFromSelected();
    CreateCase = true;
};
function NoCeilingFromSelected()
{
//    if(PageInfo.Map == null)return;
    var select = Selected_Entity();
    if(select == null){ NoCeiling = new Array(); return; }
    else { NoCeilingFrom(select.X, select.Y, select.Z); }
};
function NoCeilingFrom(pX, pY, pZ)
{
    var temp = new Array();
    if(PageInfo.Map != null)
    for(var i = 0; i < PageInfo.Map.NoCeiling.length; i++)
//    if( PageInfo.Map.NoCeiling[i].X < pX && pX <= PageInfo.Map.NoCeiling[i].X + PageInfo.Map.NoCeiling[i].Width
//        && PageInfo.Map.NoCeiling[i].Y < pY && pY <= PageInfo.Map.NoCeiling[i].Y + PageInfo.Map.NoCeiling[i].Height
//        && PageInfo.Map.NoCeiling[i].Z < pZ && pZ <= PageInfo.Map.NoCeiling[i].Z + PageInfo.Map.NoCeiling[i].Depth)
        if( Contains_Rectangle( pX, pY, pZ, PageInfo.Map.NoCeiling[i] ) )
            temp[temp.length] = PageInfo.Map.NoCeiling[i];
    NoCeiling = temp;
};
function Contains_NoCeiling(pX, pY, pZ)
{
    for(var i = 0; i < NoCeiling.length; i++)
    if( NoCeiling[i].X+WallCeil <= pX && pX <= NoCeiling[i].X + NoCeiling[i].Width
        && NoCeiling[i].Y+WallCeil <= pY && pY <= NoCeiling[i].Y + NoCeiling[i].Height
        && NoCeiling[i].Z < pZ)// && pZ <= NoCeiling[i].Z + NoCeiling[i].Depth)
//        if( Contains_Rectangle( pX, pY, pZ, NoCeiling[i] ) )
        return true;
    return false;
};
//function Contains_NoCeiling(pX, pY, pZ)
//{
//    for(var i = 0; i < NoCeiling.length; i++)
//    if( NoCeiling[i].X < pX && pX < NoCeiling[i].X + NoCeiling[i].Width
//        && NoCeiling[i].Y < pY && pY < NoCeiling[i].Y + NoCeiling[i].Height
//        && NoCeiling[i].Z < pZ)// && pZ <= NoCeiling[i].Z + NoCeiling[i].Depth)
////        if( Contains_Rectangle( pX, pY, pZ, NoCeiling[i] ) )
//        return true;
//    return false;
//};
function Contains_Rectangle( pX, pY, pZ, rectangle)
{
    return rectangle.X <= pX && pX <= rectangle.X + rectangle.Width
        && rectangle.Y <= pY && pY <= rectangle.Y + rectangle.Height
        && rectangle.Z <= pZ && pZ <= rectangle.Z + rectangle.Depth;
};
//function NoCeilingContains( X, Y, Z )
//{
//    for(var i = 0; i < NoCeiling.length; i++)
//        if( NoCeiling[i].X < X && NoCeiling[i].X + NoCeiling[i].Width >= X && NoCeiling[i].Y < Y && NoCeiling[i].Y + NoCeiling[i].Height >= Y && NoCeiling[i].Z < Z && NoCeiling[i].Z + NoCeiling[i].Depth >= Z )
//            return true;
//    return false;
//};

function ResizeCases3D()
{
    var tmp_Cases3D = new Array();
    var nbrcube = Math.ceil(FormBase.Rectangle.Width/(PageInfo.MapInfo.SizeCube*2));
    for (var y = -1 - nbrcube; y <= nbrcube; y++)
        for (var x = -1; x <= nbrcube*2; x++)
        {
            if( x+y < -2 || x+y > nbrcube*2 || x-y < -1 || x-y > nbrcube*2+1 )continue;

            var C3D = new Case3D(x, y);
            C3D.X = x;
            C3D.Y = y;
            C3D.Screen = CaseToScreen(x, y, PageInfo.MapInfo.SizeCube);
            tmp_Cases3D[tmp_Cases3D.length] = C3D;   
        }
    Cases3D = tmp_Cases3D;
    CreateCase3D();
};
function CreateCase3D()
{
    if(PageInfo.Map == null)return;
    for(var i = 0; i < Cases3D.length; i++)
    {
        var C3D = Cases3D[i];
        C3D.Cubes = [];
        var px = Location.X + C3D.X - Location.Z;
        var py = Location.Y + C3D.Y - Location.Z;
        var c;
//        for (var z = 0; z < PageInfo.Map.Depth; z++)
        for (var z = 0; z <= MaxZ; z++)
        {
            c = FindCube(px + z, py + z, z);
            if(c != null && !Contains_NoCeiling(c.X, c.Y, c.Z))
                    C3D.Cubes[C3D.Cubes.length] = c;
        }
    }
};

var PageMap_Draw = function()
{
	var mx = Mouse.X - FormBase.Position.X;
	var my = Mouse.Y - FormBase.Position.Y;
//	var mx = Mouse.X - PageInfo.Frame.X;
//	var my = Mouse.Y - PageInfo.Frame.Y;

//	var mx = Mouse.X - PageInfo.Frame.X - Grap.X;
//	var my = Mouse.Y - PageInfo.Frame.Y - Grap.Y;

	Case = CaseFromMouse(mx-Grap.X, my-Grap.Y, PageInfo.MapInfo.SizeCube);
	OnTarget();
    if(SelectedMulti.Active)
        SelectedMulti_Move();



    if(Grap.Rolled != 0)
    {
        PageInfo.MapInfo.SizeCube += Grap.Rolled;

        if(PageInfo.MapInfo.SizeCube < PageInfo.MapInfo.SizeCubeMin)
            PageInfo.MapInfo.SizeCube = PageInfo.MapInfo.SizeCubeMin;
        if(PageInfo.MapInfo.SizeCube > PageInfo.MapInfo.SizeCubeMax)
            PageInfo.MapInfo.SizeCube = PageInfo.MapInfo.SizeCubeMax;

        for(var i = 0; i < EntitysDraw.length; i++)
        {
            var entity = FindEntityID(EntitysDraw[i].ID);
            if(entity == null)continue;
            EntitysDraw[i].Width = PageInfo.MapInfo.SizeCube * 2 * entity.Width;
            EntitysDraw[i].Height = PageInfo.MapInfo.SizeCube * entity.Height + PageInfo.MapInfo.SizeCube  * entity.Width;
        }
        Grap.Rolled = 0;
//        CreateCase = true;
        ResizeCases = true;
    }

    if(PageInfo.MapInfo.CanGrap && MouseHover.Control == FormBase)
    {
        if( 0 < mx && mx < Grap.Border){ Grap.Adjustment.X += Grap.Step; Grap.Modified = true; }
        if( FormBase.Rectangle.Width - Grap.Border < mx && mx < FormBase.Rectangle.Width ){ Grap.Adjustment.X -= Grap.Step; Grap.Modified = true; }
        if( 0 < my && my < Grap.Border){ Grap.Adjustment.Y += Grap.Step; Grap.Modified = true; }
        if( FormBase.Rectangle.Height - Grap.Border < my && my < FormBase.Rectangle.Height ){ Grap.Adjustment.Y -= Grap.Step; Grap.Modified = true; }
 
//        if( 0 < mx && mx < Grap.Border){ Grap.Adjustment.X += Grap.Step; Grap.Modified = true; }
//        if( FormBase.Frame.Width - Grap.Border < mx && mx < FormBase.Frame.Width ){ Grap.Adjustment.X -= Grap.Step; Grap.Modified = true; }
//        if( 0 < my && my < Grap.Border){ Grap.Adjustment.Y += Grap.Step; Grap.Modified = true; }
//        if( FormBase.Frame.Height - Grap.Border < my && my < FormBase.Frame.Height ){ Grap.Adjustment.Y -= Grap.Step; Grap.Modified = true; }
    }

    if(Grap.Modified)
    {
//        var c = CaseFromAdjustment(Grap.Adjustment.X, Grap.Adjustment.Y, PageInfo.MapInfo.SizeCube);
        var c = CaseFrom(Grap.Adjustment.X, Grap.Adjustment.Y);
        if(c.X != 0 || c.Y != 0)
        {
            Location.X -= c.X;
            Location.Y -= c.Y;
            Grap.Adjustment.X = c.Adjustment.X;
            Grap.Adjustment.Y = c.Adjustment.Y;
            CreateCase = true;
        }
        Grap.X = (Grap.Adjustment.X/100)*PageInfo.MapInfo.SizeCube;
        Grap.Y = (Grap.Adjustment.Y/100)*PageInfo.MapInfo.SizeCube;
        Grap.Modified = false;
    }




    if(PageInfo.Map != null)
    {
//        if(CreateCubes)
        if(Tempory_Cubes.length > 0)
        {
            if(PageInfo.Map == null)return;
            var tempory_cubes = Tempory_Cubes;
            Tempory_Cubes = new Array();
            CreateCubes = false;
            for(var i = 0; i < tempory_cubes.length; i++)
                if( tempory_cubes[i] != null && tempory_cubes[i] != undefined)
                    PageInfo.Map.Cubes[tempory_cubes[i].X][tempory_cubes[i].Y][tempory_cubes[i].Z] = tempory_cubes[i];
            CreateCase = true;
        }

        if(ResizeCases)
        {
            CreateCase = false;
            ResizeCases = false;
            ResizeCases3D();
        }
        else if( CreateCase )
        {
            CreateCase = false;
            CreateCase3D();
        }
        if(CreateEntityDraw)
        {
            if(Tempory_Entitys != null)
            {
               Entitys = Tempory_Entitys;
               Tempory_Entitys = null;
            }
            if(Tempory_Entity.length > 0)
            {
                for(var t = 0; t < Tempory_Entity.length; t++)
                    for(var j = 0; j < Entitys.length; j++)
                        if( Tempory_Entity[t].ID == Entitys[j].ID )
                            Entitys[j] = Tempory_Entity[t];

                Tempory_Entity = new Array();
            }
            
            CreateEntityDraw = false;
            RefreshEntityDraw();    
        }
        Draw_Map();
        
        if(SelectedMouse.Power != null)
        {
            var C3D = FindCaseLocation(SelectedMouse.X, SelectedMouse.Y, SelectedMouse.Z);
            if(C3D != null)
            {
                var w = PageInfo.MapInfo.SizeCube * (1+(SelectedMouse.Power.Size * 2)) * 2;
                var h = PageInfo.MapInfo.SizeCube * (1+(SelectedMouse.Power.Size * 2));
                var x = C3D.Screen.X - PageInfo.MapInfo.SizeCube * (1+(SelectedMouse.Power.Size * 2));
                var y = C3D.Screen.Y - (PageInfo.MapInfo.SizeCube * SelectedMouse.Power.Size);
                DrawTemplateImage( SelectedMouse.Power.Cursor, x, y, w, h, FormBase.Context );
                FormBase.Context.strokeRect(x, y, w, h);
            }
        }
    }









//################################### Temporaire ##################################
    if(PageInfo.Map != null)
    {
        if(Target.Case != null)
        {
            FormBase.Context.fillStyle = "yellow";//"orange";
            FormBase.Context.fillRect(Target.Case.Screen.X+Grap.X, Target.Case.Screen.Y+Grap.Y, 5, 5);
            Interface_Default(FormBase.Context);
        }        
        if(SelectedMulti.Active)
        {
            FormBase.Context.strokeStyle = "black";
            FormBase.Context.strokeRect(SelectedMulti.Source.X+Grap.X, SelectedMulti.Source.Y+Grap.Y, SelectedMulti.Destination.X-SelectedMulti.Source.X, SelectedMulti.Destination.Y-SelectedMulti.Source.Y);
        }
        Interface_Default(FormBase.Context);



//        var dist = CaseToCase2( {X:0,Y:0, Adjustment:{X:0,Y:0}} , Case );

//        var p1 = {X:(dist.X/100)*PageInfo.MapInfo.SizeCube,Y:(dist.Y/100)*PageInfo.MapInfo.SizeCube};
//        p1.Y += (PageInfo.MapInfo.SizeCube/2);
//        FormBase.Context.strokeRect(p1.X, p1.Y, 5, 5);






//        var p = {X:p1.X+  (adj.X/100)*PageInfo.MapInfo.SizeCube,Y:p1.Y+  (adj.Y/100)*PageInfo.MapInfo.SizeCube};

//        var c1 = {X:4,Y:0, Adjustment:{X:-25,Y:-25}};
//        var adj = CaseToCase( c1 , Case );
//        var adj1 = CaseToCase( {X:0,Y:0, Adjustment:{X:0,Y:0}}, c1 );
////        var adj1 = CaseToCase( {X:4,Y:0, Adjustment:{X:0,Y:0}}, {X:5,Y:1, Adjustment:{X:0,Y:0}} );

//        

////        var p1 = CaseToScreen(4, 0, PageInfo.MapInfo.SizeCube);
////        p1.X += ((c1.Adjustment.X/100)*PageInfo.MapInfo.SizeCube);
////        p1.Y += (PageInfo.MapInfo.SizeCube/2) + ((c1.Adjustment.Y/100)*PageInfo.MapInfo.SizeCube);
////        var p2 = CaseToScreen(5, 1, PageInfo.MapInfo.SizeCube);

//        var p1 = {X:(adj1.X/100)*PageInfo.MapInfo.SizeCube,Y:(adj1.Y/100)*PageInfo.MapInfo.SizeCube};
//        p1.Y += (PageInfo.MapInfo.SizeCube/2);
//        var p = {X:p1.X+  (adj.X/100)*PageInfo.MapInfo.SizeCube,Y:p1.Y+  (adj.Y/100)*PageInfo.MapInfo.SizeCube};

//        FormBase.Context.fillText(adj.X +" "+adj.Y, p1.X, p1.Y-20);
//        FormBase.Context.fillRect(p1.X, p1.Y, 5, 5);
//        DrawLine(p1,p ,FormBase.Context);







//        var C3D = FindCase(0,0);
//        if(C3D != null)
//        {
//            var cX = Mouse.X - PageInfo.Frame.X - C3D.Screen.X;
//            var cY = Mouse.Y - PageInfo.Frame.Y - C3D.Screen.Y;
//            var c = CaseFrom(cX, cY, PageInfo.MapInfo.SizeCube);

//            FormBase.Context.fillStyle = "black";
//            FormBase.Context.fillText(c.X +" "+c.Y +" # "+ c.Adjustment.X +" "+ c.Adjustment.Y, C3D.Screen.X, C3D.Screen.Y);


//            var c2 = CaseFromAdjustment(c.Adjustment.X, c.Adjustment.Y, PageInfo.MapInfo.SizeCube);
//            FormBase.Context.fillText(c2.X +" "+c2.Y +" # "+ c2.Adjustment.X +" "+ c2.Adjustment.Y, C3D.Screen.X, C3D.Screen.Y+15);
//        }

//            FormBase.Context.fillStyle = "blue";//"orange";
//            FormBase.Context.fillRect(PageInfo.MapInfo.Centred.X, PageInfo.MapInfo.Centred.Y, 5, 5);   
 
//            FormBase.Context.strokeStyle = "black";//"orange";
//            FormBase.Context.strokeRect(PageInfo.MapInfo.Centred.X, PageInfo.MapInfo.Centred.Y, FormBase.Frame.Width, FormBase.Frame.Height);


//            FormBase.Context.fillStyle = "orange";
//            FormBase.Context.fillRect(FormBase.Rectangle.Width/2, FormBase.Rectangle.Height/2, 5, 5);
            
            for(var p = 0; p < MovementInfo.Pixel.length; p++)
            {
                FormBase.Context.fillStyle = "red";
                FormBase.Context.fillRect(MovementInfo.Pixel[p].X, MovementInfo.Pixel[p].Y, 3, 3);
            }
    }
};



function Draw_Map()
{
    for(var c = 0; c < Cases3D.length; c++)
        Cases3D[c].EntitysDraw = [];
    
    Movement();
    
    var entity = Selected_Entity();
    for(var z = 0; z < PageInfo.Map.Depth; z++)
    {
        Draw_Floors(z);

        if(entity != null)
            Draw_Street(entity);
            
        Draw_Volumes(z);
    }
};
function Draw_Volumes(z)
{
    var C3D;
    var entitysdraw = EntitysDraw;
    for(var c = 0; c < Cases3D.length; c++)
    {
        C3D = Cases3D[c];
        for(var i = 0; i < C3D.Cubes.length; i++)
            if (C3D.Cubes[i] != null && C3D.Cubes[i].Z == z)
                DrawCube_Volume(C3D.Cubes[i], C3D.Screen.X +Grap.X, C3D.Screen.Y+Grap.Y, PageInfo.MapInfo.SizeCube, FormBase.Context);
        
        if(C3D.EntitysDraw.length > 0)
            for(var d = 0; d < C3D.EntitysDraw.length; d++)
                if(C3D.EntitysDraw[d].Z == z)
                    OnDrawBody(C3D.EntitysDraw[d], C3D.Screen.X +Grap.X, C3D.Screen.Y+Grap.Y, PageInfo.MapInfo.SizeCube, FormBase.Context, C3D);
    }
};
function Draw_Floors(z)
{
    var C3D;
    for(var c = 0; c < Cases3D.length; c++)
    {
        C3D = Cases3D[c];
        if (C3D.Cubes.length == 0 && 0 == z)
            DrawCube_Default(C3D.Screen.X+Grap.X, C3D.Screen.Y+Grap.Y, PageInfo.MapInfo.SizeCube, FormBase.Context);
        else 
            for(var i = 0; i < C3D.Cubes.length; i++)
                if (C3D.Cubes[i] != null && C3D.Cubes[i].Z == z)
                    DrawCube_Floor(C3D.Cubes[i], C3D.Screen.X+Grap.X, C3D.Screen.Y+Grap.Y, PageInfo.MapInfo.SizeCube, FormBase.Context);
        
    }
};

function DrawCube_Floor(Cube, x, y, size, ctx)
{
    if ( Cube.Floors_Speed == 0 )
    {
        for( var i = 0; i < Cube.Floors.length; i++)
            DrawTemplateImage( Cube.Floors[i], x - size, y - size, size*2, size*2, ctx );
    }
    else
    {
        var j = Math.floor( Cube.Floors.length * ((DrawTime % Cube.Floors_Speed)/Cube.Floors_Speed) );
        DrawTemplateImage( Cube.Floors[j], x - size, y - size, size*2, size*2, ctx );
    }
};
function DrawCube_Volume(Cube, x, y, size, ctx)
{
    if ( Cube.Volumes_Speed == 0 )
    {
        for( var i = 0; i < Cube.Volumes.length; i++)
            DrawTemplateImage( Cube.Volumes[i], x - size, y - size, size*2, size*2, ctx );
    }
    else
    {
        var j = Math.floor( Cube.Volumes.length * ((DrawTime % Cube.Volumes_Speed)/Cube.Volumes_Speed) );
        DrawTemplateImage( Cube.Volumes[j], x - size, y - size, size*2, size*2, ctx );
    }
};
function DrawCube_Default(x, y, size, ctx)
{
    if ( PageInfo.MapInfo.Floors_Speed_Default == 0 )
    {
        for( var i = 0; i < PageInfo.MapInfo.Floors_Default.length; i++)
            DrawTemplateImage( PageInfo.MapInfo.Floors_Default[i], x - size, y - size, size*2, size*2, ctx );
    }
    else
    {
        var j = Math.floor( PageInfo.MapInfo.Floors_Default.length * ((DrawTime % PageInfo.MapInfo.Floors_Speed_Default)/PageInfo.MapInfo.Floors_Speed_Default) );
        DrawTemplateImage( PageInfo.MapInfo.Floors_Default[j], x - size, y - size, size*2, size*2, ctx );
    }
};

function Draw_Street(entity)
{
    if(entity.Move == null)return;
    var index = 0;
    if(index < entity.Move.Street.length)
    for(var i = index; i < entity.Move.Street.length; i++)
    {
        var C3D = FindCaseLocation(entity.Move.Street[i].X, entity.Move.Street[i].Y, entity.Move.Street[i].Z);
        if(C3D != null)
        {
            if(entity.Move.Street[i].X == entity.X && entity.Move.Street[i].Y == entity.Y && entity.Move.Street[i].Z == entity.Z)
            FormBase.Context.fillStyle = "blue";
            else
            FormBase.Context.fillStyle = "black";
            FormBase.Context.fillRect(C3D.Screen.X+Grap.X, C3D.Screen.Y+Grap.Y, 5, 5);
        }
    }
};

//########################################################
//########################################################
//########################################################

//function RefreshEntityDraw()
//{
//    var tmp_EntitysDraw = [];
//    var tmp_Entitys = Entitys;
//    
//    for(var p = 0; p < PermanentsDraw.length; p++)
//        tmp_EntitysDraw[tmp_EntitysDraw.length] = PermanentsDraw[p];

//    for(var j = 0; j < tmp_Entitys.length; j++)
//    {
//        var entitydraw = null;
//        for(var e = 0; e < EntitysDraw.length; e++)
//            if( tmp_Entitys[j].ID == EntitysDraw[e].ID )
//            {
//                entitydraw = EntitysDraw[e];
//                if(tmp_Entitys[j].Move != null && tmp_Entitys[j].Move.ID != entitydraw.MoveDraw.ID)
//                {
//                    entitydraw.MoveDraw.ID = tmp_Entitys[j].Move.ID;
//                    entitydraw.MoveDraw.Index = 0;
//                    entitydraw.MoveDraw.DrawStep = 0;
//                    entitydraw.MoveDraw.Speed = tmp_Entitys[j].Move.Speed;
//                }
//                break;
//            }
//        if(entitydraw == null)
//            entitydraw = new EntityDraw(tmp_Entitys[j]);
//        tmp_EntitysDraw[tmp_EntitysDraw.length] = entitydraw;
//    }

//    EntitysDraw = tmp_EntitysDraw;
//};
function RefreshEntityDraw()
{
    var tmp_EntitysDraw = [];
    var tmp_Entitys = Entitys;
    
    for(var p = 0; p < PermanentsDraw.length; p++)
        tmp_EntitysDraw[tmp_EntitysDraw.length] = PermanentsDraw[p];

    for(var j = 0; j < tmp_Entitys.length; j++)
    {
        var entitydraw = null;
        for(var e = 0; e < EntitysDraw.length; e++)
            if( tmp_Entitys[j].ID == EntitysDraw[e].ID )
            {
                entitydraw = EntitysDraw[e];
                if(tmp_Entitys[j].Move != null && ( entitydraw.Move == null || entitydraw.Move.ID != tmp_Entitys[j].Move.ID ) )
                {
                    entitydraw.Move = tmp_Entitys[j].Move;

//                    entitydraw.MoveDraw.ID = tmp_Entitys[j].Move.ID;
//                    entitydraw.MoveDraw.Speed = tmp_Entitys[j].Move.Speed;
                    entitydraw.MoveDraw.Index = 0;
                    entitydraw.MoveDraw.DrawStep = 0;
                }
                break;
            }
        if(entitydraw == null)
            entitydraw = new EntityDraw(tmp_Entitys[j]);
        tmp_EntitysDraw[tmp_EntitysDraw.length] = entitydraw;
    }

    EntitysDraw = tmp_EntitysDraw;
};
function EntityDraw(entity)
{
    this.ID = entity.ID;
    this.CanMove = entity.CanMove;
    this.Body = entity.Body;
    this.Screen = LocationToScreen(entity.X, entity.Y, entity.Z, PageInfo.MapInfo.SizeCube);
    this.X = entity.X;
    this.Y = entity.Y;
    this.Z = entity.Z;
    this.Adjustment = {X:entity.Adjustment.X, Y:entity.Adjustment.Y};
    this.Direction = entity.Direction;
    this.Width = PageInfo.MapInfo.SizeCube * 2 * entity.Width;
    this.Height = PageInfo.MapInfo.SizeCube * entity.Height + PageInfo.MapInfo.SizeCube  * entity.Width;
    this.Move = entity.Move;
    this.MoveDraw = entity.MoveDraw; //{ Location:{X:entity.X,Y:entity.Y,Z:entity.Z}, Adjustment:{X:entity.Adjustment.X, Y:entity.Adjustment.Y}, Distance:{X:0,Y:0}, DrawStep:0 ,Index:0, Time:0 };
//    this.Move = null;
//    this.MoveDraw = { Location:{X:entity.X,Y:entity.Y,Z:entity.Z}, Adjustment:{X:entity.Adjustment.X, Y:entity.Adjustment.Y}, Distance:{X:0,Y:0}, DrawStep:0 ,Index:0, Time:0 };
////    this.MoveDraw = {ID:entity.Move == null ? 0 : entity.Move.ID, Location:{X:entity.X,Y:entity.Y,Z:entity.Z}, Adjustment:{X:entity.Adjustment.X, Y:entity.Adjustment.Y}, Distance:{X:0,Y:0}, DrawStep:0 ,Index:0, Time:0, Speed:0 };

    this.Location = {X: entity.X, Y:entity.Y, Z:entity.Z};

    this.ToScreen = function(x, y)//Supprimer!!!!!!!
    {
        this.Screen.X = x - (this.Width/2);
        this.Screen.Y = y - this.Height + (this.Width/2);
        if(PageInfo.MapInfo.Adjusted)
        {
            this.Screen.X += PageInfo.MapInfo.SizeCube * (this.Adjustment.X /100);
            this.Screen.Y += PageInfo.MapInfo.SizeCube * (this.Adjustment.Y /100);
        }
    }

    this.OnDistance = function(location_dest, adjustment)
    {
        this.MoveDraw.Location.X = this.X;
        this.MoveDraw.Location.Y = this.Y;
        this.MoveDraw.Location.Z = this.Z;
        this.MoveDraw.Adjustment.X = this.Adjustment.X;
        this.MoveDraw.Adjustment.Y = this.Adjustment.Y;
    
        var Case_src = {X:0,Y:0, Adjustment:{X:0,Y:0}};
        var Case_dest = {X:0,Y:0, Adjustment:{X:0,Y:0}}; 

        Case_src.X = this.MoveDraw.Location.X - this.MoveDraw.Location.Z;
        Case_src.Y = this.MoveDraw.Location.Y - this.MoveDraw.Location.Z;
        Case_src.Adjustment.X = this.MoveDraw.Adjustment.X;
        Case_src.Adjustment.Y = this.MoveDraw.Adjustment.Y;

        Case_dest.X = location_dest.X - location_dest.Z;
        Case_dest.Y = location_dest.Y - location_dest.Z;
        Case_dest.Adjustment.X = adjustment.X;
        Case_dest.Adjustment.Y = adjustment.Y;

        this.MoveDraw.Distance = CaseToCase(Case_src, Case_dest);
        this.MoveDraw.DrawStep = 0;

        var ratio_X = Math.abs( this.MoveDraw.Distance.X/100);
        var ratio_Y = Math.abs( this.MoveDraw.Distance.Y/100);

        var ratio_Speed_X = this.Move.Speed * ratio_X;
        var ratio_Speed_Y = this.Move.Speed * ratio_Y;
        if(ratio_Speed_X > ratio_Speed_Y)this.MoveDraw.Time = ratio_Speed_X;
        else this.MoveDraw.Time = ratio_Speed_Y;

        this.Direction = ScreenDirection(this.MoveDraw.Distance.X, this.MoveDraw.Distance.Y);
//        this.Direction = ScreenDirection(Case_src.X, Case_src.Y, Case_dest.X, Case_dest.Y);

//        if(this.ID == Selected.ID)
//            SelectedMove();

//MovementInfo.List[MovementInfo.List.length] = "________________________";
//MovementInfo.List[MovementInfo.List.length] = "Case_src : "+ Case_src.X + " : "+ Case_src.Y +" # "+ Case_src.Adjustment.X +" : "+ Case_src.Adjustment.Y;
//MovementInfo.List[MovementInfo.List.length] = "Case_dest : "+ Case_dest.X + " : "+ Case_dest.Y +" # "+ Case_dest.Adjustment.X +" : "+ Case_dest.Adjustment.Y;
//MovementInfo.List[MovementInfo.List.length] = "Distance : "+ this.MoveDraw.Distance.X + " : "+ this.MoveDraw.Distance.Y;



    };
//    this.OnDistance = function(location_dest, adjustment)
//    {
//        this.MoveDraw.Location.X = this.X;
//        this.MoveDraw.Location.Y = this.Y;
//        this.MoveDraw.Location.Z = this.Z;
//        this.MoveDraw.Adjustment.X = this.Adjustment.X;
//        this.MoveDraw.Adjustment.Y = this.Adjustment.Y;
//    
//        var Case_src = {X:0,Y:0, Adjustment:{X:0,Y:0}};
//        var Case_dest = {X:0,Y:0, Adjustment:{X:0,Y:0}}; 

//        Case_src.X = this.MoveDraw.Location.X - Location.X - (this.MoveDraw.Location.Z - Location.Z);
//        Case_src.Y = this.MoveDraw.Location.Y - Location.Y - (this.MoveDraw.Location.Z - Location.Z);
//        Case_src.Adjustment.X = this.MoveDraw.Adjustment.X;
//        Case_src.Adjustment.Y = this.MoveDraw.Adjustment.Y;

//        Case_dest.X = location_dest.X - Location.X - (location_dest.Z - Location.Z);
//        Case_dest.Y = location_dest.Y - Location.Y - (location_dest.Z - Location.Z);
//        Case_dest.Adjustment.X = adjustment.X;
//        Case_dest.Adjustment.Y = adjustment.Y;

//        this.MoveDraw.Distance = CaseToCase(Case_src, Case_dest);
//        this.MoveDraw.DrawStep = 0;

//        var ratio_X = Math.abs( this.MoveDraw.Distance.X/100);
//        var ratio_Y = Math.abs( this.MoveDraw.Distance.Y/100);

//        var ratio_Speed_X = this.Move.Speed * ratio_X;
//        var ratio_Speed_Y = this.Move.Speed * ratio_Y;
//        if(ratio_Speed_X > ratio_Speed_Y)this.MoveDraw.Time = ratio_Speed_X;
//        else this.MoveDraw.Time = ratio_Speed_Y;

//        this.Direction = ScreenDirection(this.MoveDraw.Distance.X, this.MoveDraw.Distance.Y);
////        this.Direction = ScreenDirection(Case_src.X, Case_src.Y, Case_dest.X, Case_dest.Y);


//MovementInfo.List[MovementInfo.List.length] = "Case_src : "+ Case_src.X + " : "+ Case_src.Y +" # "+ Case_src.Adjustment.X +" : "+ Case_src.Adjustment.Y;
//MovementInfo.List[MovementInfo.List.length] = "Case_dest : "+ Case_dest.X + " : "+ Case_dest.Y +" # "+ Case_dest.Adjustment.X +" : "+ Case_dest.Adjustment.Y;
//MovementInfo.List[MovementInfo.List.length] = "Distance : "+ this.MoveDraw.Distance.X + " : "+ this.MoveDraw.Distance.Y;



//    };
//    this.OnDistance = function(location_dest, adjustment)
//    {
//        this.MoveDraw.Location.X = this.X;
//        this.MoveDraw.Location.Y = this.Y;
//        this.MoveDraw.Location.Z = this.Z;
//        this.MoveDraw.Adjustment.X = this.Adjustment.X;
//        this.MoveDraw.Adjustment.Y = this.Adjustment.Y;
//    
//        var Case_src = {X:0,Y:0, Adjustment:{X:0,Y:0}};
//        var Case_dest = {X:0,Y:0, Adjustment:{X:0,Y:0}}; 

//        Case_src.X = this.MoveDraw.Location.X - Location.X - (this.MoveDraw.Location.Z - Location.Z);
//        Case_src.Y = this.MoveDraw.Location.Y - Location.Y - (this.MoveDraw.Location.Z - Location.Z);
//        Case_src.Adjustment.X = this.MoveDraw.Adjustment.X;
//        Case_src.Adjustment.Y = this.MoveDraw.Adjustment.Y;

//        Case_dest.X = location_dest.X - Location.X - (location_dest.Z - Location.Z);
//        Case_dest.Y = location_dest.Y - Location.Y - (location_dest.Z - Location.Z);
//        Case_dest.Adjustment.X = adjustment.X;
//        Case_dest.Adjustment.Y = adjustment.Y;

//        this.MoveDraw.Distance = CaseToCase(Case_src, Case_dest);
//        this.MoveDraw.DrawStep = 0;

//        var ratio_X = Math.abs( this.MoveDraw.Distance.X/100);
//        var ratio_Y = Math.abs( this.MoveDraw.Distance.Y/100);

//        var ratio_Speed_X = this.MoveDraw.Speed * ratio_X;
//        var ratio_Speed_Y = this.MoveDraw.Speed * ratio_Y;
//        if(ratio_Speed_X > ratio_Speed_Y)this.MoveDraw.Time = ratio_Speed_X;
//        else this.MoveDraw.Time = ratio_Speed_Y;

//        this.Direction = ScreenDirection(this.MoveDraw.Distance.X, this.MoveDraw.Distance.Y);
////        this.Direction = ScreenDirection(Case_src.X, Case_src.Y, Case_dest.X, Case_dest.Y);
//    };
    
    this.ToScreen(this.Screen.X, this.Screen.Y);
};


//Supprimer Z pour pouvoir l'utiliser avec Screen!!!!!!!!!!!!
// garder un marge égal à la taille
function ChangeDirection(x_src, y_src, z_src, x_dest, y_dest, z_dest)
{
    if ( x_src == x_dest && y_src == y_dest)return 6;           //None
    else if ( x_src == x_dest && y_src > y_dest)return 0;       //N
    else if ( x_src < x_dest && y_src == y_dest)return 1;       //E
    else if ( x_src == x_dest && y_src < y_dest)return 2;       //S
    else if ( x_src > x_dest && y_src == y_dest)return 3;       //W
    else if ( x_src > x_dest && y_src > y_dest)return 4;        //N-W
    else if ( x_src < x_dest && y_src > y_dest)return 5;        //N-E
    else if ( x_src < x_dest && y_src < y_dest)return 6;        //S-E
    else if ( x_src > x_dest && y_src < y_dest)return 7;        //S-W
    return 6;
};
function ScreenDirection(x_dest, y_dest)
{
    var x = 0;
    var y = 0;
    var size = 50;// PageInfo.MapInfo.SizeCube/2;

    if( -25 < x_dest && x_dest < 25)
    {
        if(x_dest < 0)x = -1;
        else if(x_dest > 0)x = 1;
    }
    else
    {
        if(x_dest < -25)x = -1;
        else if(x_dest > 25)x = 1;
    }

    if( -25 < y_dest && y_dest < 25)
    {
        if(y_dest < 0)y = -1;
        else if(y_dest > 0)y = 1;
    }
    else
    {
        if(y_dest < -25)y = -1;
        else if(y_dest > 25)y = 1;
    }
    
//    if(x_dest < -size)x = -1;
//    else if(x_dest > size)x = 1;
//    if(y_dest < -size)y = -1;
//    else if(y_dest > size)y = 1;

//    if(x < 0) x = -1;
//    else if(x > 0) x = 1;
//    else x = 0;
//    
//    if(y < 0) y = -1;
//    else if (y > 0) y = 1;
//    else y = 0;



    if( x == 0 && y == 0 )return 6;             //None
    else if( x == 1 && y == -1 )return 0;       //N
    else if( x == 1 && y == 1 )return 1;        //E
    else if( x == -1 && y == 1 )return 2;       //S
    else if( x == -1 && y == -1 )return 3;      //W
    else if( x == 0 && y == -1 )return 4;       //N-W
    else if( x == 1 && y == 0 )return 5;        //N-E
    else if( x == 0 && y == 1 )return 6;        //S-E
    else if( x == -1 && y == 0 )return 7;       //S-W

    return 6;
};
//function ScreenDirection(x_dest, y_dest)
//{
//    var x = 0;
//    var y = 0;
//    var size = PageInfo.MapInfo.SizeCube/2;

//    if(x_dest < -size)x = -1;
//    else if(x_dest > size)x = 1;
//    if(y_dest < -size)y = -1;
//    else if(y_dest > size)y = 1;

////    if(x < 0) x = -1;
////    else if(x > 0) x = 1;
////    else x = 0;
////    
////    if(y < 0) y = -1;
////    else if (y > 0) y = 1;
////    else y = 0;



//    if( x == 0 && y == 0 )return 6;             //None
//    else if( x == 1 && y == -1 )return 0;       //N
//    else if( x == 1 && y == 1 )return 1;        //E
//    else if( x == -1 && y == 1 )return 2;       //S
//    else if( x == -1 && y == -1 )return 3;      //W
//    else if( x == 0 && y == -1 )return 4;       //N-W
//    else if( x == 1 && y == 0 )return 5;        //N-E
//    else if( x == 0 && y == 1 )return 6;        //S-E
//    else if( x == -1 && y == 0 )return 7;       //S-W

//    return 6;
//};
//function ScreenDirection(x_src, y_src, x_dest, y_dest)//, entitydraw)
//{
//    var x = x_dest - x_src;
//    var y = y_dest - y_src;

//    if(x < 0) x = -1;
//    else if(x > 0) x = 1;
//    else x = 0;
//    
//    if(y < 0) y = -1;
//    else if (y > 0) y = 1;
//    else y = 0;

//    if( x == 0 && y == 0 )return 6;         //None
//    else if( x == 1 && y == -1 )return 0;        //N
//    else if( x == 1 && y == 1 )return 1;         //E
//    else if( x == -1 && y == 1 )return 2;         //S
//    else if( x == -1 && y == -1 )return 3;        //W
//    else if( x == 0 && y == -1 )return 4;       //N-W
//    else if( x == 1 && y == 0 )return 5;        //N-E
//    else if( x == 0 && y == 1 )return 6;         //S-E
//    else if( x == -1 && y == 0 )return 7;        //S-W

//    return 6;
//};
//function Movement()
//{
//    var entitysdraw = EntitysDraw;
//    for(var e = 0; e < entitysdraw.length; e++)
//    {
//        var entity = FindEntityID(entitysdraw[e].ID);
//        if(entity == null)continue;
//        if(!entity.CanMove || entity.Move == null || entitysdraw[e].Move.Step == -1)// || entity.Move.Street.length == 0)//entity.Move == null;
//        {
//            var C3D = FindCaseLocation(entity.X, entity.Y, entity.Z);
//            if( C3D != null)
//            {
//                C3D.EntitysDraw[C3D.EntitysDraw.length] = entitysdraw[e];
//                entitysdraw[e].ToScreen(C3D.Screen.X, C3D.Screen.Y);
//            }
//            continue;
//        }
//        var index = Math.floor( entitysdraw[e].Move.Step / entity.Move.Speed );
////        var index = Math.floor( entity.Move.Step / entity.Move.Speed );
//        if(index < entity.Move.Street.length-1)
//        {
//            var x_src = entity.Move.Street[index].X;
//            var y_src = entity.Move.Street[index].Y;
//            var z_src = entity.Move.Street[index].Z;
//            var x_dest = entity.Move.Street[index+1].X;
//            var y_dest = entity.Move.Street[index+1].Y;
//            var z_dest = entity.Move.Street[index+1].Z;

//            var C3D_src = FindCaseLocation(x_src, y_src, z_src);
//            var C3D_dest = FindCaseLocation(x_dest, y_dest, z_dest);
//            
//            if( C3D_dest != null)
//                C3D_dest.EntitysDraw[C3D_dest.EntitysDraw.length] = entitysdraw[e];
//            
//            if ( x_dest != entity.X || y_dest != entity.Y || z_dest != entity.Z )
//            {
//                entity.X = x_dest;
//                entity.Y = y_dest;
//                entity.Z = z_dest;
//                entitysdraw[e].Z = z_dest;
//                entitysdraw[e].Direction = ChangeDirection(x_src, y_src, z_src, x_dest, y_dest, z_dest);
//                if(entity.ID == Selected.ID)
//                    SelectedMove();
//            }

//            if( C3D_dest != null && C3D_src != null )
//            {
//                var distance_X = C3D_dest.Screen.X - C3D_src.Screen.X;
//                var distance_Y = C3D_dest.Screen.Y - C3D_src.Screen.Y;
//            
//                var ratio = (entitysdraw[e].Move.Step % entity.Move.Speed) / entity.Move.Speed;
////                var ratio = (entity.Move.Step % entity.Move.Speed) / entity.Move.Speed;
//                var x = C3D_src.Screen.X +( distance_X * ratio );
//                var y = C3D_src.Screen.Y +( distance_Y * ratio );

////                var tmp_screen_x = entitysdraw[e].Screen.X; 
////                var tmp_screen_y = entitysdraw[e].Screen.Y; 
//                
//                entitysdraw[e].ToScreen(x, y);

////                entitysdraw[e].Direction = ScreenDirection(tmp_screen_x, tmp_screen_y, entitysdraw[e].Screen.X, entitysdraw[e].Screen.Y);//(x_src, y_src, z_src, x_dest, y_dest, z_dest);
//            }
//        entitysdraw[e].Move.Step += DrawStep;
//        }
//        else
//        {
//            entity.X = entity.Move.Street[entity.Move.Street.length-1].X;
//            entity.Y = entity.Move.Street[entity.Move.Street.length-1].Y;
//            entity.Z = entity.Move.Street[entity.Move.Street.length-1].Z;
//            var screen = LocationToScreen(entity.X, entity.Y, entity.Z, PageInfo.MapInfo.SizeCube, PageInfo.MapInfo.Centred, Adjustment);
//            entitysdraw[e].ToScreen(screen.X, screen.Y);
//            entitysdraw[e].Z = entity.Z;

//            var C3D = FindCaseLocation(entity.X, entity.Y, entity.Z);
//            if( C3D != null)
//                C3D.EntitysDraw[C3D.EntitysDraw.length] = entitysdraw[e];

//            entitysdraw[e].Move.Step = -1;

//                if(entity.ID == Selected.ID)SelectedMove();
//        }
////        entitysdraw[e].Move.Step += DrawStep;
////        entity.Move.Step += DrawStep;
//    }
//};



//#################### Temporaire ############
function ControlMapInfo(x, y, width, height )
{
    this.InheritClass = Control;
    this.InheritClass(x, y, width, height );
    delete this.InheritClass;
    this.Inherit("ControlMapInfo");
    
    this.BackColor = "white";
    this.CanMove = true;

    this.rY = 0;
    this.Draw = function(x, y, width, height, context)
    {
        var px = x +25;
        var py = y +25;
        var es = 15;


	var mx = Mouse.X - FormBase.Position.X - Grap.X;
	var my = Mouse.Y - FormBase.Position.Y - Grap.Y;
//	var mx = Mouse.X - PageInfo.Frame.X - Grap.X;
//	var my = Mouse.Y - PageInfo.Frame.Y - Grap.Y;

        var dist = CaseToCase( {X:0,Y:0, Adjustment:{X:0,Y:0}} , Case );
        var c = CaseFrom(dist.X, dist.Y);
        var c2 = CaseFromMouse(mx, my, PageInfo.MapInfo.SizeCube);

        var p1 = {X:(dist.X/100)*PageInfo.MapInfo.SizeCube,Y:(dist.Y/100)*PageInfo.MapInfo.SizeCube};
        p1.Y += (PageInfo.MapInfo.SizeCube/2);
        FormBase.Context.strokeRect(p1.X, p1.Y, 5, 5);


    context.fillText( "Mouse : " + mx +" : "+ my, px, py+this.rY );
    py += es;
    context.fillText( "Distance : " + dist.X +" : "+ dist.Y, px, py+this.rY );
    py += es;
    context.fillText( "case : " + c.X +" : "+ c.Y +" # "+ c.Adjustment.X +" : "+ c.Adjustment.Y, px, py+this.rY );
    py += es;
    context.fillText( "case2 : " + c2.X +" : "+ c2.Y +" # "+ c2.Adjustment.X +" : "+ c2.Adjustment.Y, px, py+this.rY );





var entity = Selected_Entity();// FindEntityID(id);
var entitydraw = null;
if(entity == null) return;
for(var e = 0; e < EntitysDraw.length; e++)
    if(EntitysDraw[e].ID == entity.ID)
        entitydraw = EntitysDraw[e];
if(entitydraw == null)return;

    py += es;
    context.fillText( "Entity Distance : " + entity.MoveDraw.Distance.X +" : "+ entity.MoveDraw.Distance.Y, px, py+this.rY );
    py += es;
    context.fillText( "EntityDraw Distance : " + entitydraw.MoveDraw.Distance.X +" : "+ entitydraw.MoveDraw.Distance.Y, px, py+this.rY );
    py += es;
    context.fillText( "Entity Location : " + entity.MoveDraw.Location.X +" : "+ entity.MoveDraw.Location.Y +" : "+ entity.MoveDraw.Location.Z, px, py+this.rY );
    py += es;
    context.fillText( "EntityDraw Location : " + entitydraw.MoveDraw.Location.X +" : "+ entitydraw.MoveDraw.Location.Y +" : "+ entitydraw.MoveDraw.Location.Z, px, py+this.rY );
    py += es;
    context.fillText( "Entity Time : " + entity.MoveDraw.Time, px, py+this.rY );
    py += es;
    context.fillText( "EntityDraw Time : " + entitydraw.MoveDraw.Time, px, py+this.rY );

//var id = "monster_0";
//var entity = FindEntityID(id);
//var entitydraw = null;

//for(var e = 0; e < EntitysDraw.length; e++)
//    if(EntitysDraw[e].ID == id)
//        entitydraw = EntitysDraw[e];

//if(entity != null)
//{
//    context.fillText( "Entity : " + entity.ID, px, py+this.rY );
//    py += es;
//    context.fillText( entity.X +"."+ entity.Y +"."+ entity.Z, px, py+this.rY );
//    if(entity.Move == null)
//    {
//        py += es;
//        context.fillText( "Move : null", py+this.rY );
//        py += es;
//        context.fillText( "Body : null", py+this.rY );
//    
//    }
//    else
//    {
//        py += es;
//        if(entity.Move.Street != null)
//        context.fillText( "Move : " + entity.Move.Street.length, py+this.rY );
//        py += es;
//        if(entity.Move.Body == null)
//            context.fillText( "Body : Null", py+this.rY );
//        else
//            context.fillText( "Body : " + entity.Move.Body.Image.Name, py+this.rY );
//    }

//}
//else
//    context.fillText( "Entity : Null", px, py+this.rY );

//py += es;
//if(entitydraw != null)
//{
//    context.fillText( "EntityDraw : " + entitydraw.ID, px, py+this.rY );
//    py += es;
//    context.fillText( entitydraw.X +"."+ entitydraw.Y +"."+ entitydraw.Z, px, py+this.rY );
//    py += es;
//    context.fillText( "Screen : "+ entitydraw.Screen.X +" : "+ entitydraw.Screen.Y, px, py+this.rY );
//    py += es;
//}
//else
//    context.fillText( "EntityDraw : Null", px, py+this.rY );






//	var mx = Mouse.X - PageInfo.Frame.X - Grap.X;
//	var my = Mouse.Y - PageInfo.Frame.Y - Grap.Y;

//    mx -= FormBase.Frame.Width/2;
//    my -= FormBase.Frame.Height/2;

//    var x = my/mx;// Math.floor(my/mx);
//    var y = mx/my;// Math.floor(mx/my);

//            context.fillText("mx: "+ mx +" my: "+ my +"# X: "+ x +" Y: "+  y, px, py+this.rY );
            py += es;

        for(var i = 0; i < MovementInfo.List.length; i++)
        {
            context.fillText( MovementInfo.List[i], px, py+this.rY );
            py += es;
        }
    }
    this.OnMouseWheel = function(rolled){ if(rolled > 0)this.rY += 10; else this.rY -=10; };
    this.OnClip();
};
var MovementInfo = { List:[], Pixel:[] };
//#######################################

function Movement()
{
    var entitysdraw = EntitysDraw;
    for(var e = 0; e < entitysdraw.length; e++)
    {
        var entitydraw = entitysdraw[e];

        if(!entitydraw.CanMove || entitydraw.Move == null || entitydraw.MoveDraw.Index == -1)
        {
            var C3D = FindCaseLocation(entitydraw.X, entitydraw.Y, entitydraw.Z);
            if( C3D != null)
            {
                C3D.EntitysDraw[C3D.EntitysDraw.length] = entitydraw;
            }
            continue;
        }

//#######################################################################################################

        var move = entitydraw.Move;

        if(entitydraw.MoveDraw.Index == 0)
        {
            entitydraw.MoveDraw.Index++;
            entitydraw.OnDistance(move.Street[entitydraw.MoveDraw.Index], move.Adjustment);
        }

        var move_src = entitydraw.MoveDraw.Location;
        var move_dest = move.Street[entitydraw.MoveDraw.Index];

        var C3D_src = FindCaseLocation(move_src.X, move_src.Y, move_src.Z);
        var C3D_dest = FindCaseLocation(move_dest.X, move_dest.Y, move_dest.Z);

        entitydraw.MoveDraw.DrawStep += DrawStep;

        var ratio_Speed = entitydraw.MoveDraw.DrawStep / entitydraw.MoveDraw.Time;

        var dist_X = Math.floor( entitydraw.MoveDraw.Distance.X * ratio_Speed );
        var dist_Y = Math.floor( entitydraw.MoveDraw.Distance.Y * ratio_Speed );

        var c1 = CaseFrom(dist_X+entitydraw.MoveDraw.Adjustment.X, dist_Y+entitydraw.MoveDraw.Adjustment.Y);//, PageInfo.MapInfo.SizeCube);
//        var c1 = CaseFromAdjustment(dist_X+entitydraw.MoveDraw.Adjustment.X, dist_Y+entitydraw.MoveDraw.Adjustment.Y, PageInfo.MapInfo.SizeCube);

        if(C3D_src != null && C3D_dest != null)
        {
            if((c1.X != 0 || c1.Y != 0) && C3D_src.X + c1.X == C3D_dest.X && C3D_src.Y + c1.Y == C3D_dest.Y)
            {
                entitydraw.X = move_dest.X;
                entitydraw.Y = move_dest.Y;
                entitydraw.Z = move_dest.Z;
                entitydraw.Adjustment.X = c1.Adjustment.X;
                entitydraw.Adjustment.Y = c1.Adjustment.Y; 
                C3D_dest.EntitysDraw[C3D_dest.EntitysDraw.length] = entitysdraw[e];


                if(entitydraw.ID == Selected.ID)
                    SelectedMove();
            }
            else
            {
                entitydraw.Adjustment.X = dist_X+entitydraw.MoveDraw.Adjustment.X;
                entitydraw.Adjustment.Y = dist_Y+entitydraw.MoveDraw.Adjustment.Y;
                C3D_src.EntitysDraw[C3D_src.EntitysDraw.length] = entitysdraw[e];
            }
        }
        else
        {
            var C3D_src_X = move_src.X - Location.X - (move_src.Z - Location.Z);
            var C3D_src_Y = move_src.Y - Location.Y - (move_src.Z - Location.Z);
            var C3D_dest_X = move_dest.X - Location.X - (move_dest.Z - Location.Z);
            var C3D_dest_Y = move_dest.Y - Location.Y - (move_dest.Z - Location.Z);

            if((c1.X != 0 || c1.Y != 0) && C3D_src_X + c1.X == C3D_dest_X && C3D_src_Y + c1.Y == C3D_dest_Y)
            {
                entitydraw.X = move_dest.X;
                entitydraw.Y = move_dest.Y;
                entitydraw.Z = move_dest.Z;
                entitydraw.Adjustment.X = c1.Adjustment.X;
                entitydraw.Adjustment.Y = c1.Adjustment.Y;


                if(entitydraw.ID == Selected.ID)
                    SelectedMove();
            }
            else
            {
                entitydraw.Adjustment.X = dist_X+entitydraw.MoveDraw.Adjustment.X;
                entitydraw.Adjustment.Y = dist_Y+entitydraw.MoveDraw.Adjustment.Y;
            }
        }

        if(entitydraw.MoveDraw.DrawStep > entitydraw.MoveDraw.Time)
        {
            entitydraw.MoveDraw.Index++;
            if(entitydraw.MoveDraw.Index < move.Street.length)
                entitydraw.OnDistance(move.Street[entitydraw.MoveDraw.Index], move.Adjustment);
            else
                entitydraw.MoveDraw.Index = -1;
        }

//        //##### ligne de points rouge!
//        var C3D_e = FindCaseLocation(entitydraw.X, entitydraw.Y, entitydraw.Z);
//        if(C3D_e != null)
//        {
//            var eX = C3D_e.Screen.X;
//            eX += ((entitydraw.Adjustment.X/100)*PageInfo.MapInfo.SizeCube)
//            var eY = C3D_e.Screen.Y;
//            eY += PageInfo.MapInfo.SizeCube/2;
//            eY += ((entitydraw.Adjustment.Y/100)*PageInfo.MapInfo.SizeCube)
//            MovementInfo.Pixel[MovementInfo.Pixel.length] = {X:eX , Y:eY };
//        }
    }
};

function OnDrawBody(entitydraw, eX, eY, sizecube, context, C3D)
{
    var eWidth = entitydraw.Width;
    var eHeight = entitydraw.Height;

eX -= (eWidth/2);
eY -= eHeight;
eY += eWidth/2;
eX += ( PageInfo.MapInfo.SizeCube * (entitydraw.Adjustment.X /100) );
eY += ( PageInfo.MapInfo.SizeCube * (entitydraw.Adjustment.Y /100) );

    var body = entitydraw.Body;
    if(entitydraw.Move != null && entitydraw.MoveDraw.Index != -1)
        body = entitydraw.Move.Body;

    if(!entitydraw.Body.Animated && !body.Turned)
    {
        for(var i = 0; i < body.Images.length; i++)
            DrawTemplateImage(body.Images[i], eX, eY, eWidth, eHeight, FormBase.Context);
    }
    else
    {
        var ratio = (body.Step % body.Speed) / body.Speed;
        for(i = 0; i < body.Images.length; i++)
        {
            var template = FindTemplatesImages(body.Images[i].Name);
            if(template == null || template.Image == null) continue;
            var tW = template.Image.width / template.NbrX;
            var tH = template.Image.height / template.NbrY;
            var tX = 0;
            var tY = 0;
            if(body.Animated)
                tX = Math.floor( template.NbrX * ratio ) * tW;
            else
                tX = (body.Images[i].NbrX-1) * tW;

            if(!body.Turned) 
                tY = (body.Images[i].NbrY-1) * tH;
            else if(entitydraw.Direction > 0)
                tY = entitydraw.Direction * tH;

            FormBase.Context.drawImage(template.Image, tX, tY, tW, tH, eX, eY, eWidth, eHeight );
        }

//        if(body.Duration > -1 && body.Duration < body.Step)
//            body = entity.Body_Stand;//null;
//        else
            body.Step += DrawStep;
    }        

//################################ Temporaire ######################################
//        if(entitydraw.ID == Target.ID)
//        {
//            FormBase.Context.fillStyle = "Red";
//            FormBase.Context.fillText(entitydraw.ID, eX, eY);
//            FormBase.Context.strokeStyle = "green";
//            FormBase.Context.strokeRect(eX, eY, eWidth, eHeight );
//        }
//        else
//        {
//            FormBase.Context.fillStyle = "black";
//            FormBase.Context.fillText(entitydraw.ID, eX, eY);
//        }
////        FormBase.Context.strokeStyle = "black";
////        if(entity.ID == SelectedMouse.Target)
////        {
////            FormBase.Context.strokeStyle = "green";
////            FormBase.Context.strokeRect(eX, eY, eWidth, eHeight );
////        }
//        for(var p = 0; p < Selected.Multi.length; p++)
//            if(Selected.Multi[p] == entitydraw.ID)
//            {
//                FormBase.Context.strokeStyle = "black";
//                FormBase.Context.strokeRect(eX, eY, eWidth, eHeight );
//            }


////                FormBase.Context.strokeStyle = "orange";
////                FormBase.Context.strokeRect(entitydraw.Screen.X, entitydraw.Screen.Y, 2, 2 );


//        FormBase.Context.strokeStyle = "black";
//        FormBase.Context.fillStyle = "black";

//        FormBase.Context.fillText(C3D.X +" : "+ C3D.Y, eX, eY-45);
//        FormBase.Context.fillText(entitydraw.X +" : "+ entitydraw.Y +" : "+ entitydraw.Z, eX, eY-30);
//        FormBase.Context.fillText(entitydraw.Adjustment.X +" : "+ entitydraw.Adjustment.Y, eX, eY-15);
////        FormBase.Context.fillText(entitydraw.Direction +" ___ "+ entitydraw.TMP.X +"  "+ entitydraw.TMP.Y +" ___ "+ entitydraw.TMP.DX +"  "+ entitydraw.TMP.DY +"  __Size__"+ (PageInfo.MapInfo.SizeCube/2) , eX, eY-15);
////        FormBase.Context.fillText(body.Images[0].Name, eX+20, eY-15 );
//        
//        

};


//function Movement()
//{
//    var entitysdraw = EntitysDraw;
//    for(var e = 0; e < entitysdraw.length; e++)
//    {
//        var entity = FindEntityID(entitysdraw[e].ID);
//        if(entity == null)continue;
//        var entitydraw = entitysdraw[e];

//        if(!entity.CanMove || entity.Move == null || entitysdraw[e].MoveDraw.Index == -1)
//        {
//            var C3D = FindCaseLocation(entitysdraw[e].X, entitysdraw[e].Y, entitysdraw[e].Z);
//            if( C3D != null)
//            {
//                C3D.EntitysDraw[C3D.EntitysDraw.length] = entitysdraw[e];
////                entitysdraw[e].ToScreen(C3D.Screen.X, C3D.Screen.Y);
//            }
//            continue;
//        }

////#######################################################################################################

////        if(entity.Move.ID != entitydraw.MoveDraw.ID)
////        {
////            entitydraw.Move.ID = entity.Move.ID;
////            entitydraw.MoveDraw.Index = 0;
////            entitydraw.MoveDraw.DrawStep = 0;
////            entitydraw.Move.Speed = entity.Move.Speed;
////        }




//        var move = entity.Move;

//        if(entitydraw.MoveDraw.Index == 0)
//        {
//            entitydraw.MoveDraw.Index++;
//            entitydraw.OnDistance(move.Street[entitydraw.MoveDraw.Index], move.Adjustment);
//        }

//        var move_src = entitydraw.MoveDraw.Location;
//        var move_dest = move.Street[entitydraw.MoveDraw.Index];

//        var C3D_src = FindCaseLocation(move_src.X, move_src.Y, move_src.Z);
//        var C3D_dest = FindCaseLocation(move_dest.X, move_dest.Y, move_dest.Z);

//        entitydraw.MoveDraw.DrawStep += DrawStep;

//        var ratio_Speed = entitydraw.MoveDraw.DrawStep / entitydraw.MoveDraw.Time;

//        var dist_X = Math.floor( entitydraw.MoveDraw.Distance.X * ratio_Speed );
//        var dist_Y = Math.floor( entitydraw.MoveDraw.Distance.Y * ratio_Speed );

//        var c1 = CaseFromAdjustment(dist_X+entitydraw.MoveDraw.Adjustment.X, dist_Y+entitydraw.MoveDraw.Adjustment.Y, PageInfo.MapInfo.SizeCube);

//        if(C3D_src != null && C3D_dest != null)
//        {
//            if((c1.X != 0 || c1.Y != 0) && C3D_src.X + c1.X == C3D_dest.X && C3D_src.Y + c1.Y == C3D_dest.Y)
//            {
//                entitydraw.X = move_dest.X;
//                entitydraw.Y = move_dest.Y;
//                entitydraw.Z = move_dest.Z;
//                entitydraw.Adjustment.X = c1.Adjustment.X;
//                entitydraw.Adjustment.Y = c1.Adjustment.Y; 
//                C3D_dest.EntitysDraw[C3D_src.EntitysDraw.length] = entitysdraw[e];
//            }
//            else
//            {
//                entitydraw.Adjustment.X = dist_X+entitydraw.MoveDraw.Adjustment.X;
//                entitydraw.Adjustment.Y = dist_Y+entitydraw.MoveDraw.Adjustment.Y;
//                C3D_src.EntitysDraw[C3D_src.EntitysDraw.length] = entitysdraw[e];
//            }
//        }
//        else
//        {
//            var C3D_src_X = move_src.X - Location.X - (move_src.Z - Location.Z);
//            var C3D_src_Y = move_src.Y - Location.Y - (move_src.Z - Location.Z);
//            var C3D_dest_X = move_dest.X - Location.X - (move_dest.Z - Location.Z);
//            var C3D_dest_Y = move_dest.Y - Location.Y - (move_dest.Z - Location.Z);

//            if((c1.X != 0 || c1.Y != 0) && C3D_src_X + c1.X == C3D_dest_X && C3D_src_Y + c1.Y == C3D_dest_Y)
//            {
//                entitydraw.X = move_dest.X;
//                entitydraw.Y = move_dest.Y;
//                entitydraw.Z = move_dest.Z;
//                entitydraw.Adjustment.X = c1.Adjustment.X;
//                entitydraw.Adjustment.Y = c1.Adjustment.Y;
//            }
//            else
//            {
//                entitydraw.Adjustment.X = dist_X+entitydraw.MoveDraw.Adjustment.X;
//                entitydraw.Adjustment.Y = dist_Y+entitydraw.MoveDraw.Adjustment.Y;
//            }
//        }

//        if(entitydraw.MoveDraw.DrawStep > entitydraw.MoveDraw.Time)
//        {
//            entitydraw.MoveDraw.Index++;
//            if(entitydraw.MoveDraw.Index < move.Street.length)
//                entitydraw.OnDistance(move.Street[entitydraw.MoveDraw.Index], entity.Move.Adjustment);
//            else
//                entitydraw.MoveDraw.Index = -1;
//        }

//        //##### ligne de points rouge!
//        var C3D_e = FindCaseLocation(entitydraw.X, entitydraw.Y, entitydraw.Z);
//        if(C3D_e != null)
//        {
//            var eX = C3D_e.Screen.X;
//            eX += ((entitydraw.Adjustment.X/100)*PageInfo.MapInfo.SizeCube)
//            var eY = C3D_e.Screen.Y;
//            eY += PageInfo.MapInfo.SizeCube/2;
//            eY += ((entitydraw.Adjustment.Y/100)*PageInfo.MapInfo.SizeCube)
//            MovementInfo.Pixel[MovementInfo.Pixel.length] = {X:eX , Y:eY };
//        }
//    }
//};


//function OnDrawBody(entitydraw, eX, eY, sizecube, context, C3D)
//{
//    var entity = FindEntityID(entitydraw.ID);
//    if(entity == null)return;

//    var eWidth = entitydraw.Width;
//    var eHeight = entitydraw.Height;

//eX -= (eWidth/2);
//eY -= eHeight;
//eY += eWidth/2;
//eX += ( PageInfo.MapInfo.SizeCube * (entitydraw.Adjustment.X /100) );
//eY += ( PageInfo.MapInfo.SizeCube * (entitydraw.Adjustment.Y /100) );

//    var body = entity.Body;
//    if(entity.Move != null &&  entitydraw.MoveDraw.Step != -1)
//        body = entity.Move.Body;

//    if(!entity.Body.Animated && !body.Turned)
//    {
//        for(var i = 0; i < body.Images.length; i++)
//            DrawTemplateImage(body.Images[i], eX, eY, eWidth, eHeight, FormBase.Context);
//    }
//    else
//    {
//        var ratio = (body.Step % body.Speed) / body.Speed;
//        for(i = 0; i < body.Images.length; i++)
//        {
//            var template = FindTemplatesImages(body.Images[i].Name);
//            if(template == null || template.Image == null) continue;
//            var tW = template.Image.width / template.NbrX;
//            var tH = template.Image.height / template.NbrY;
//            var tX = 0;
//            var tY = 0;
//            if(body.Animated)
//                tX = Math.floor( template.NbrX * ratio ) * tW;
//            else
//                tX = (body.Images[i].NbrX-1) * tW;

//            if(!body.Turned) 
//                tY = (body.Images[i].NbrY-1) * tH;
//            else if(entitydraw.Direction > 0)
//                tY = entitydraw.Direction * tH;

//            FormBase.Context.drawImage(template.Image, tX, tY, tW, tH, eX, eY, eWidth, eHeight );
//        }

//        if(body.Duration > -1 && body.Duration < body.Step)
//            body = entity.Body_Stand;//null;
//        else
//            body.Step += DrawStep;
//    }        

////################################ Temporaire ######################################
//        if(entity.ID == Target.ID)
//        {
//            FormBase.Context.fillStyle = "Red";
//            FormBase.Context.fillText(entity.ID, eX, eY);
//            FormBase.Context.strokeStyle = "green";
//            FormBase.Context.strokeRect(eX, eY, eWidth, eHeight );
//        }
//        else
//        {
//            FormBase.Context.fillStyle = "black";
//            FormBase.Context.fillText(entity.ID, eX, eY);
//        }
////        FormBase.Context.strokeStyle = "black";
////        if(entity.ID == SelectedMouse.Target)
////        {
////            FormBase.Context.strokeStyle = "green";
////            FormBase.Context.strokeRect(eX, eY, eWidth, eHeight );
////        }
//        for(var p = 0; p < Selected.Multi.length; p++)
//            if(Selected.Multi[p] == entity.ID)
//            {
//                FormBase.Context.strokeStyle = "black";
//                FormBase.Context.strokeRect(eX, eY, eWidth, eHeight );
//            }


////                FormBase.Context.strokeStyle = "orange";
////                FormBase.Context.strokeRect(entitydraw.Screen.X, entitydraw.Screen.Y, 2, 2 );


//        FormBase.Context.strokeStyle = "black";
//        FormBase.Context.fillStyle = "black";

//        FormBase.Context.fillText(C3D.X +" : "+ C3D.Y, eX, eY-45);
//        FormBase.Context.fillText(entitydraw.X +" : "+ entitydraw.Y +" : "+ entitydraw.Z, eX, eY-30);
//        FormBase.Context.fillText(entitydraw.Adjustment.X +" : "+ entitydraw.Adjustment.Y, eX, eY-15);
////        FormBase.Context.fillText(entitydraw.Direction +" ___ "+ entitydraw.TMP.X +"  "+ entitydraw.TMP.Y +" ___ "+ entitydraw.TMP.DX +"  "+ entitydraw.TMP.DY +"  __Size__"+ (PageInfo.MapInfo.SizeCube/2) , eX, eY-15);
////        FormBase.Context.fillText(body.Images[0].Name, eX+20, eY-15 );
//        
//        

//};




//function DrawTemplateImage( imagejson, x, y, width, height, context )
//{
//    if(imagejson == null) return;
//    var template = FindTemplatesImages(imagejson.Name);
//    if(template == null || template.Image == null) return;
//    if(context == null || context == undefined)return;

//    var tW = template.Image.width / template.NbrX;
//    var tH = template.Image.height / template.NbrY;
//    var tX = (imagejson.NbrX-1) * tW;
//    var tY = (imagejson.NbrY-1) * tH;

//    context.drawImage(template.Image, tX, tY, tW, tH, x, y, width, height );
//};




//function OnDrawBody(entitydraw)
//{
//    var entity = FindEntityID(entitydraw.ID);
//    if(entity == null)return;

//    var eX = entitydraw.Screen.X;
//    var eY = entitydraw.Screen.Y; 
//    var eWidth = entitydraw.Width;
//    var eHeight = entitydraw.Height;
//    
////    if( entity.Body == null)
////        entity.Body = entity.Body_Stand;
//        
//    if(!entity.Body.Animated && !entity.Body.Turned)
//    {
//        for(var i = 0; i < entity.Body.Images.length; i++)
//            DrawTemplateImage(entity.Body.Images[i], eX, eY, eWidth, eHeight, FormBase.Context);
//    }
//    else
//    {
//        var ratio = (entity.Body.Step % entity.Body.Speed) / entity.Body.Speed;
//        for(i = 0; i < entity.Body.Images.length; i++)
//        {
//            var template = FindTemplatesImages(entity.Body.Images[i].Name);
//            if(template == null || template.Image == null) continue;
//            var tW = template.Image.width / template.NbrX;
//            var tH = template.Image.height / template.NbrY;
//            var tX = 0;
//            var tY = 0;
//            if(entity.Body.Animated)
//                tX = Math.floor( template.NbrX * ratio ) * tW;
//            else
//                tX = (entity.Body.Images[i].NbrX-1) * tW;

//            if(!entity.Body.Turned) 
//                tY = (entity.Body.Images[i].NbrY-1) * tH;
//            else if(entity.Direction > 0)
//                tY = (entity.Direction-1) * tH;

//            FormBase.Context.drawImage(template.Image, tX, tY, tW, tH, eX, eY, eWidth, eHeight );
//        }

//        if(entity.Body.Duration > -1 && entity.Body.Duration < entity.Body.Step)
//            entity.Body = entity.Body_Stand;//null;
//        else
//            entity.Body.Step += DrawStep;
//    }        

//        if(entity.ID == Target.ID)
//        {
//            FormBase.Context.fillStyle = "Red";
//            FormBase.Context.fillText(entity.ID, eX, eY);
//        }
//        else
//        {
//            FormBase.Context.fillStyle = "black";
//            FormBase.Context.fillText(entity.ID, eX, eY);
//        }
//        FormBase.Context.fillText(entity.Hit, eX, eY-15);
//        if(entity.ID == SelectedMouse.Target)
//        {
//            FormBase.Context.strokeStyle = "Red";
//            FormBase.Context.strokeRect(eX, eY, eWidth, eHeight );
//        }
//        for(var p = 0; p < SelectedMulti.Entitys.length; p++)
//            if(SelectedMulti.Entitys[p] == entity.ID)
//            {
//        FormBase.Context.strokeStyle = "black";
//        FormBase.Context.strokeRect(eX, eY, eWidth, eHeight );
//            }
//        FormBase.Context.strokeStyle = "black";
////        FormBase.Context.fillText(entity.X+"."+entity.Y+"."+entity.Z, eX, eY);
////        FormBase.Context.fillText(entitydraw.Screen.X+":"+entitydraw.Screen.Y, eX, eY);


//        FormBase.Context.fillText(entity.Body.Images[0].Name, eX+20, eY-15 );

//};













//########################################################
//########################################################
//########################################################


function ResizeFrame(sizecube, nbrcube)
{
    var itf = {Centred:{X:0, Y:0}, Frame:{Height:0, Width:0}};
    itf.Centred.X = (sizecube*nbrcube)-sizecube;
    itf.Centred.Y = itf.Centred.X/2;
    itf.Frame.Height = sizecube*nbrcube;
    itf.Frame.Width = itf.Frame.Height*2;
    return itf;
//    PageInfo.MapInfo.Centred.X = (PageInfo.MapInfo.SizeCube * PageInfo.MapInfo.NbrCube) - (PageInfo.MapInfo.SizeCube);
//    PageInfo.MapInfo.Centred.Y = PageInfo.MapInfo.Centred.X / 2;
//    PageInfo.Frame.Height = PageInfo.MapInfo.SizeCube * PageInfo.MapInfo.NbrCube;
//    PageInfo.Frame.Width = PageInfo.Frame.Height * 2;
};

function ResizeCube(nbrcube, frame)
{
    var sizecube = 0;
    if(frame.Height*2 > frame.Width)
    {
        return frame.Height/nbrcube;
    }
    else
    {
        return (frame.Width/2)/nbrcube;
    
    }
//    itf.Centred.X = (sizecube*nbrcube)-sizecube;
//    itf.Centred.Y = itf.Centred.X/2;
//    itf.Frame.Height = sizecube*nbrcube;
//    itf.Frame.Width = itf.Frame.Height*2;
//    return itf;
//    PageInfo.MapInfo.Centred.X = (PageInfo.MapInfo.SizeCube * PageInfo.MapInfo.NbrCube) - (PageInfo.MapInfo.SizeCube);
//    PageInfo.MapInfo.Centred.Y = PageInfo.MapInfo.Centred.X / 2;
//    PageInfo.Frame.Height = PageInfo.MapInfo.SizeCube * PageInfo.MapInfo.NbrCube;
//    PageInfo.Frame.Width = PageInfo.Frame.Height * 2;
};

//########################################################
//function Point3D(){};
//{X:0, Y:0, Z:0}
function Road(x, y, z)
{
    this.X = x;
    this.Y = y;
    this.Z = z;
    this.Closed = false;
    this.Street = [{X:x, Y:y, Z:z}];
    
    this.CopyAndAdd = function(road, point)
    {
        for (var i = 0; i < road.Street.length; i++)
            this.Street[i] = road.Street[i];
        this.Street[this.Street.length] = point;
    }  
};
function PathFinding(x, y, z, map)
{
    this.X = x;
    this.Y = y;
    this.Z = z;
    this.Map = map;
    this.Roads = [new Road(x, y, z)];
    
    this.Contains = function(x, y, z)
    {
        for(var i = 0 ; i < this.Roads.length; i++)
            if (this.Roads[i].X == x && this.Roads[i].Y == y && this.Roads[i].Z == z)
                return true;
        return false;
    };
    
    this.Find = function(x, y, z)
    {
        for (var i = 0; i < this.Roads.length; i++)
            if (this.Roads[i].X == x && this.Roads[i].Y == y && this.Roads[i].Z == z)
                return this.Roads[i].Street;
        return [{X:x, Y:y, Z:z}];
    }
    
    this.MoveTo = function(entity, x, y, z)
    {
        if(entity.Move == null)return;//Verif!!!!!!!!!!!!!!!!!!!!!
        if (!Entity_CanMoveTo(entity, x, y, z, entity.Map)) return;
        this.OnStreet(this.Roads[0], entity);
        entity.Move.Street = this.Find(x, y, z);
//        entity.Move.Step = 0;
        entity.Body_Animated = true;
    };
    
    
    this.OnStreet = function(road, entity)
    {
        road.Closed = true;
    
        for(var i = 1; i < 27; i++)
        {
            var direction = IntToDirection(i);
            if (this.Contains(road.X + direction.X, road.Y + direction.Y, road.Z + direction.Z)) continue;
            var cube_dest = FindCube(road.X + direction.X, road.Y + direction.Y, road.Z + direction.Z);
            if(cube_dest == null || !cube_dest.Cross)continue;

            if (direction.Z != 0)
            {
                var coin = new Coin(road.X, road.Y, road.Z, direction);
                if (!coin.Movement()) continue;
            }

            if(entity != null && !Entity_CanMove(entity, cube_dest.X, cube_dest.Y, cube_dest.Z, this.Map))continue;
            
            var next_road = new Road(cube_dest.X, cube_dest.Y, cube_dest.Z);
            next_road.CopyAndAdd(road, {X:cube_dest.X, Y:cube_dest.Y, Z:cube_dest.Z});
            this.Roads[this.Roads.length] = next_road;
        }

        for (var r = 0; r < this.Roads.length; r++)
            if (!this.Roads[r].Closed)
                this.OnStreet(this.Roads[r], entity);
    };


};

function Coin(x, y, z, d)
{
    this.Axe_X = null;
    this.Axe_Y = null;
    this.Axe_D = null;

    if (d.Z > 0)
    {
        this.Axe_X = FindCube(x + d.X, y, z + d.Z);
        this.Axe_Y = FindCube(x, y + d.Y, z + d.Z);
        this.Axe_D = FindCube(x + d.X, y + d.Y, z + d.Z);
    }
    else
    {
        this.Axe_X = FindCube(x + d.X, y, z);
        this.Axe_Y = FindCube(x, y + d.Y, z);
        this.Axe_D = FindCube(x + d.X, y + d.Y, z);
    }

    this.Movement = function()
    {
        if (this.Axe_D == null || !this.Axe_D.Cross) return false;
        if (this.Axe_X != null && !this.Axe_X.Cross && this.Axe_Y != null && !this.Axe_Y.Cross) return false;
        return true;
    }
};





function IntToDirection(n)
{
    //int z = n / 9 == 2 ? -1 : (n / 9);
    //n %= 9;
    //int y = n / 3 == 2 ? -1 : n / 3;
    //n %= 3;
    //int x = n == 2 ? -1 : n;
    //return new Direction(x, y, z);

    var x = 0;
    var y = 0;
    var z = 0;
    var n2 = n % 9;
    switch (n2)
    {
        case 0: { x = 0; y = 0; break; }    //None
        case 1: { x = 0; y = -1; break; }   //N
        case 2: { x = 1; y = 0; break; }    //E
        case 3: { x = 0; y = 1; break; }    //S
        case 4: { x = -1; y = 0; break; }   //W
        case 5: { x = -1; y = -1; break; }  //N-W
        case 6: { x = 1; y = -1; break; }   //N-E
        case 7: { x = 1; y = 1; break; }    //S-E
        case 8: { x = -1; y = 1; break; }   //S-W
    }
    if (n >= 18) z = 1;                     //Up
    else if (n >= 9) z = -1;                //Down

    return {X:x, Y:y, Z:z}; //new Direction(x, y, z);
};

function Entity_CanMove(entity, pX, pY, pZ, map)
{
//    for (var ey = 0; ey < entity.Width; ey++)
//        for (var ex = 0; ex < entity.Width; ex++)
//            for (var ez = 0; ez < entity.Height; ez++)
//            {
//                if (!Contains_Map(pX - ex, pY - ey, pZ + ez, map)) return false;
//                var c = FindCube(pX - ex, pY - ey, pZ + ez);
//                if (c != null && !c.Cross) return false;
//                var ent = FindEntityLocation(pX - ex, pY - ey, pZ + ez);
//                if (ent != null && !ent.Cross && ent.ID != entity.ID )
//                    return false;
//            
//            }
    return true;
};





//function Draw_Grid(sizecube, nbrcube, centred, adjustment, ctx)
//{	
//    nbrcube += 2;
//    var a = 0;
//    var d = nbrcube;
//    for (var i = 0; i <= nbrcube; i++)
//    {
//        var p1 = CaseToScreen(-d, -a, sizecube, centred, adjustment);
//        var p2 = CaseToScreen(d+1, -a, sizecube, centred, adjustment);
//        var p3 = CaseToScreen(-d, a, sizecube, centred, adjustment);
//        var p4 = CaseToScreen(d+1, a, sizecube, centred, adjustment);
//        
//        DrawLine(p1,p2,ctx);
//        DrawLine(p3,p4,ctx);
//        DrawLine(p1,p3,ctx);
//        DrawLine(p2,p4,ctx);
//        a++;
//        d--;
//    }
//};