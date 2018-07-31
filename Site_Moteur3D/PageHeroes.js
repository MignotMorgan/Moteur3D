
//var Load = function(){};
//var Downloading = function(){return true;};
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

    FormBase.Add(new ControlGame(0, 0, 250, 500 ));
//    FormBase.Add(new ControlInfo(250, 0, 550, 500 ));
    FormBase.Add(new ControlDownload(PageInfo.Frame.Width-250, 0, 250, 350 ));
    
    Demo_PowersControl = new PowersControl( (PageInfo.Frame.Width/2)-100, 5, 200, 50 );
    Demo_PowersControl.NbrX = 6;
    Demo_PowersControl.NbrY = 1;
    FormBase.Add(Demo_PowersControl);
    
    var c = new Control(10,10,50,50);
    c.ClickLeft = function()
    {
        if(Control_IsFullScreen()) Control_ExitFullScreen();
        else this.Form.OnFullScreen();
    
    };
    FormBase.Add(c);
};
MouseUpRight = function(e)
{
    if( MouseHover.Control != null && !MouseHover.Control.IsInherit("Form") )return false;
//    OnTargetMap();
    Selected.Target = Target.ID;
    CallMove();
    return false;
};
ResponsePage = function(message)
{
    if( message.COMMAND == "ENTITYS" )
    {
        var entity = Selected_Entity();
        if(entity != null)
            Demo_PowersControl.Powers = entity.Powers;
    }
};