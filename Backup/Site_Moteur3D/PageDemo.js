









//var Draw = function(){};
//var MouseMove = function(e) {};
//var MouseDownLeft = function(e) { return false; };
//var MouseUpLeft = function(e) { return false; };
//var MouseDownRight = function(e) { return false; };
//var MouseUpRight = function(e) { return false; };
//var KeyUp = function(e) { return false; };
//var KeyDown = function(e) { return false; };
//var ResponsePage = function(message){ };
//var ResponsePower = function(message){};
//var FindTemplates = function(name){ return null; };
//var FindAnim = function(id){return null;};



var Demo_PowersControl = null;

Load = function()
{
    Selected.ID = PageInfo.Players[0];

//    FormBase.Add(new ControlGame(0, 0, 250, 500 ));
    FormBase.Add(new ControlDownload(PageInfo.Frame.Width-250, 0, 250, 350 ));
    
    Demo_PowersControl = new PowersControl( (PageInfo.Frame.Width/2)-100, 5, 200, 50 );
    Demo_PowersControl.NbrX = 6;
    Demo_PowersControl.NbrY = 1;
    FormBase.Add(Demo_PowersControl);

//    MouseTarget = false;
};





//MouseDownLeft = function(e) 
//{
//    return false; 
//};
MouseUpLeft = function(e)
{
    if( MouseHover.Control != FormBase )return false;
//    OnTargetMap();
//    OnTarget();
//    if(Target.ID == "")
//    {
//	    var mx = Mouse.X - PageInfo.Frame.X;
//	    var my = Mouse.Y - PageInfo.Frame.Y;
//        for(var i = 0; i < EntitysDraw.length;  i++)
//        {
//            if(EntitysDraw[i].Screen.X < mx && mx < EntitysDraw[i].Screen.X + EntitysDraw[i].Width && EntitysDraw[i].Screen.Y < my && my < EntitysDraw[i].Screen.Y + EntitysDraw[i].Height)
//                Target.ID = EntitysDraw[i].ID;
//        }
//    }
    return false;
};

var MouseDownRight = function(e)
{
    return false;
};
var MouseUpRight = function(e)
{
    if( MouseHover.Control != null && !MouseHover.Control.IsInherit("Form") )return false;
//    OnTargetMap();
//    OnTarget();
    Selected.Target = Target.ID;
    CallMove();
    return false;
};

var KeyUp = function(e) 
{
    switch(Modifiers.Shortcut)
    {
        case "" :
            break;
        case "Selected_Last" :
            if(Target.ID == "" && Entitys.length > 0)
            {
                Target.ID = Entitys[0].ID;
                break;
            }
            var entitys = Entitys;
            for(var i = 0; i < entitys.length; i++)
            {
                if(entitys[i].ID == Target.ID)
                {
                    if(i == entitys.length-1)
                        Target.ID = entitys[0].ID;
                    else
                        Target.ID = entitys[i+1].ID;
                        break;
                }
            }
            break;
        case "Power_01_00" :
            Demo_PowersControl.OnPower(0);
            break;
        case "Power_01_01" :
            Demo_PowersControl.OnPower(1);
            break;
        case "Power_01_02" :
            Demo_PowersControl.OnPower(2);
            break;
        case "Power_01_03" :
            Demo_PowersControl.OnPower(3);
            break;
        case "Power_01_04" :
            Demo_PowersControl.OnPower(4);
            break;
        case "Power_01_05" :
            Demo_PowersControl.OnPower(5);
            break;
        case "Power_01_06" :
            Demo_PowersControl.OnPower(6);
            break;
        case "Power_01_07" :
            Demo_PowersControl.OnPower(7);
            break;
        case "Power_01_08" :
            Demo_PowersControl.OnPower(8);
            break;
        case "Power_01_09" :
            Demo_PowersControl.OnPower(9);
            break;
        case "Power_01_10" :
            Demo_PowersControl.OnPower(10);
            break;
        case "Power_01_11" :
            Demo_PowersControl.OnPower(11);
            break;
//        case "Power_01_00" :
//            if(Demo_PowersControl.Powers.length > 0 && Demo_PowersControl.Powers[0] != null)
//                CallPower(Demo_PowersControl.Powers[0].Name);
//            break;
//        case "Power_01_01" :
//            if(Demo_PowersControl.Powers.length > 1 && Demo_PowersControl.Powers[1] != null)
//                CallPower(Demo_PowersControl.Powers[1].Name);
//            break;
//        case "Power_01_02" :
//            if(Demo_PowersControl.Powers.length > 2 && Demo_PowersControl.Powers[2] != null)
//                CallPower(Demo_PowersControl.Powers[2].Name);
//            break;
//        case "Power_01_03" :
//            if(Demo_PowersControl.Powers.length > 3 && Demo_PowersControl.Powers[3] != null)
//                CallPower(Demo_PowersControl.Powers[3].Name);
//            break;
//        case "Power_01_04" :
//            if(Demo_PowersControl.Powers.length > 4 && Demo_PowersControl.Powers[4] != null)
//                CallPower(Demo_PowersControl.Powers[4].Name);
//            break;
//        case "Power_01_05" :
//            if(Demo_PowersControl.Powers.length > 5 && Demo_PowersControl.Powers[5] != null)
//                CallPower(Demo_PowersControl.Powers[5].Name);
//            break;
//        case "Power_01_06" :
//            if(Demo_PowersControl.Powers.length > 6 && Demo_PowersControl.Powers[6] != null)
//                CallPower(Demo_PowersControl.Powers[6].Name);
//            break;
//        case "Power_01_07" :
//            if(Demo_PowersControl.Powers.length > 7 && Demo_PowersControl.Powers[7] != null)
//                CallPower(Demo_PowersControl.Powers[7].Name);
//            break;
    }
    return false; 
 };
//var KeyDown = function(e) { return false; };

ResponsePage = function(message)
{
    if( message.COMMAND == "ENTITYS" )
    {
        var entity = Selected_Entity();
        if(entity != null)
            Demo_PowersControl.Powers = entity.Powers;
    }
//    else if( message.COMMAND == "POWER" )
//    {
//        entity = FindEntityID(message.Entity)
//        if(entity != null)
//        for(var i = 0; i < entity.Powers.length; i++)
//            if(entity.Powers[i].Name == message.Name)
//                entity.Powers[i].LastAction = message.Date;
//    }
//    else if( message.COMMAND == "POWER" )
//    {
//        entity = Selected_Entity();
//        if(entity != null)
//        for(var i = 0; i < entity.Powers.length; i++)
//            if(entity.Powers[i].Name == message.Text)
//                entity.Powers[i].LastAction = Now();
//            Demo_PowersControl.Powers = ;
//    }
};




Draw = function()
{
//    if(MouseInfo.Up - MouseInfo.Down < -250)
//    {
//            FormBase.Context.fillRect(5, 5, 5, 5);
//        var entity = Selected_Entity();
//        if(entity != null)
//    CallPage("MOVE", Selected.ID +PageInfo.Separator+ (entity.X+1) +PageInfo.Separator+ (entity.Y+1) +PageInfo.Separator+ entity.Z +PageInfo.Separator+ Selected.Adjustment.X.toString() +PageInfo.Separator+ Selected.Adjustment.Y.toString());

//    }
//            else
//            FormBase.Context.fillRect(5, 5, 15, 15);
};