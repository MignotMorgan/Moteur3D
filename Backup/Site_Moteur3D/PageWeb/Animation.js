


//Info Animation
//Nouveau syteme d'animation: chaque animation est crée séparement, l'utilisation (ex:Power) peut se faire en groupe/liste (ajouter dans Map ou sur Entity)!!!!!! 
//Step toujour = 0;
//Entity + cube + Start valeur dynamique en fonction de l'utilisation ((ex: valeur modifier dans Power)
//Duration remplace End (supprimer End:0)
//Verifier tous les effets pour les adapter au nouveau system.
// utiliser % de Screen pour Zoom ou le deplacement sur l'ecran. (cf: MoveToScreen)

function Create_Animation()
{
    return {Name:"", Step:0, Entity_Src:"", Entity_Dest:"", Cube_Src:{X:0,Y:0,Z:0}, Cube_Dest:{X:0,Y:0,Z:0}, Start:0, Duration:0, X:0, Y:0, Width:0, Height:0, Image:null, Text:"", Effects:[]};
};
function Create_Effect(keyname)
{
    return {KeyName:keyname, Start:0, End:0, Text:"", Number:0};
};

function OnPlayAnimations(animations, context)
{
    for(var p = 0; p < animations.length; p++)
    {
        if(animations[p].Start + animations[p].Duration < animations[p].Step)continue;
        animations[p].Step += DrawStep;
        if(animations[p].Start > animations[p].Step)continue;

        for(var e = 0; e < animations[p].Effects.length; e++)
            if(animations[p].Effects[e].Start < animations[p].Step && (animations[p].Step < animations[p].Effects[e].End || animations[p].Effects[e].End < 0))
                OnEffect( animations[p], animations[p].Effects[e] );

        if(animations[p].Image != null)
        {
            var img = animations[p].Image;
            if(animations[p].Image_Animated)
            {
                var ratio = ((animations[p].Step - animations[p].Start) % animations[p].Duration) / animations[p].Duration;
                var template = FindTemplatesImages(animations[p].Image.Name);
                if(template != null)
                {
                    img = {Name:animations[p].Image.Name, NbrX:1, NbrY:animations[p].Image.NbrY };
    //            alert(animations[p].Image.NbrX);
                    img.NbrX = Math.floor( template.NbrX * ratio )+1;
    //                img.NbrY = Math.floor( template.NbrY * ratio )+1;
                }
            }
            DrawTemplateImage( img, animations[p].X, animations[p].Y, animations[p].Width, animations[p].Height, context );
//            DrawTemplateImage( animations[p].Image, animations[p].X, animations[p].Y, animations[p].Width, animations[p].Height, context );
        }
        if(animations[p].Text != "")
        {
            context.fillText( Translate(animations[p].Text), animations[p].X, animations[p].Y);
        }
    }
};

//function OnPlayAnimations(animations, context)
//{
//    for(var p = 0; p < animations.length; p++)
//    {
//        if(animations[p].Start + animations[p].Duration < animations[p].Step)continue;
//        animations[p].Step += DrawStep;
//        if(animations[p].Start > animations[p].Step)continue;

//        for(var e = 0; e < animations[p].Effects.length; e++)
//            if(animations[p].Effects[e].Start < animations[p].Step && (animations[p].Step < animations[p].Effects[e].End || animations[p].Effects[e].End < 0))
//                OnEffect( animations[p], animations[p].Effects[e] );

//        if(animations[p].Image != null)
//            DrawTemplateImage( animations[p].Image, animations[p].X, animations[p].Y, animations[p].Width, animations[p].Height, context );

//        if(animations[p].Text != "")
//        {
//            context.fillText( Translate(animations[p].Text), animations[p].X, animations[p].Y);
//        }
//    }
//};

function DrawScreenAnimation(screenanimation, context)
{
    for(var p = 0; p < screenanimation.Animations.length; p++)
    {
        if(screenanimation.Animations[p].Start + screenanimation.Animations[p].Duration < screenanimation.Animations[p].Step)continue;
        screenanimation.Animations[p].Step += DrawStep;
        if(screenanimation.Animations[p].Start > screenanimation.Animations[p].Step)continue;

        for(var e = 0; e < screenanimation.Animations[p].Effects.length; e++)
            if(screenanimation.Animations[p].Effects[e].Start < screenanimation.Animations[p].Step && screenanimation.Animations[p].Step < screenanimation.Animations[p].Effects[e].End)
                OnEffect( screenanimation.Animations[p], screenanimation.Animations[p].Effects[e] );

        if(screenanimation.Animations[p].Image != null)
        {
            var imagejson = screenanimation.Animations[p].Image;
            var template = null;
            for( var i = 0; i < screenanimation.Templates.length; i++)
                if( screenanimation.Templates[i].Name == imagejson.Name )
                    template = screenanimation.Templates[i];

            if(template == null || template.Image == null) break;

            var tW = template.Image.width / template.NbrX;
            var tH = template.Image.height / template.NbrY;
            var tX = (imagejson.NbrX-1) * tW;
            var tY = (imagejson.NbrY-1) * tH;

            context.drawImage(template.Image, tX, tY, tW, tH, screenanimation.Animations[p].X, screenanimation.Animations[p].Y, screenanimation.Animations[p].Width, screenanimation.Animations[p].Height );
        }
        if(screenanimation.Animations[p].Text != "")
        {
            context.fillText( screenanimation.Animations[p].Text, screenanimation.Animations[p].X, screenanimation.Animations[p].Y);
        }
    }
};


//function OnPlayAnimations(context)
//{
//    for(var p = 0; p < PlayAnimations.length; p++)
//    {
//        if(PlayAnimations[p].Start + PlayAnimations[p].Duration < PlayAnimations[p].Step)continue;
//        PlayAnimations[p].Step += DrawStep;
//        if(PlayAnimations[p].Start > PlayAnimations[p].Step)continue;

//        for(var e = 0; e < PlayAnimations[p].Effects.length; e++)
//            if(PlayAnimations[p].Effects[e].Start < PlayAnimations[p].Step && (PlayAnimations[p].Step < PlayAnimations[p].Effects[e].End || PlayAnimations[p].Effects[e].End < 0))
//                OnEffect( PlayAnimations[p], PlayAnimations[p].Effects[e] );

//        if(PlayAnimations[p].Image != null)
//            DrawTemplateImage( PlayAnimations[p].Image, PlayAnimations[p].X, PlayAnimations[p].Y, PlayAnimations[p].Width, PlayAnimations[p].Height, context );

//        if(PlayAnimations[p].Text != "")
//        {
//            context.fillText( Translate(PlayAnimations[p].Text), PlayAnimations[p].X, PlayAnimations[p].Y);
//        }
//    }
//};


function OnEffect(animation, effect)
{
    switch(effect.KeyName)
    {
        case "ToHead_Src" : { Effect_ToHead_Src(animation, effect); break; }
        case "ToHead_Dest" : { Effect_ToHead_Dest(animation, effect); break; }
        case "MoveToHead_Src" : { Effect_MoveToHead_Src(animation, effect); break; }
        case "MoveToHead_Dest" : { Effect_MoveToHead_Dest(animation, effect); break; }
        case "ToCube_Src" : { Effect_ToCube_Src(animation, effect); break; }
        case "ToCube_Dest" : { Effect_ToCube_Dest(animation, effect); break; }
        case "MoveToCube_Src" : { Effect_MoveToCube_Src(animation, effect); break; }
        case "MoveToCube_Dest" : { Effect_MoveToCube_Dest(animation, effect); break; }

        case "ToScreen_X" : { Effect_ToScreen_X(animation, effect); break; }
        case "ToScreen_Y" : { Effect_ToScreen_Y(animation, effect); break; }
        case "MoveToScreen_X" : { Effect_MoveToScreen_X(animation, effect); break; }
        case "MoveToScreen_Y" : { Effect_MoveToScreen_Y(animation, effect); break; }
        case "ToAxeX" : { Effect_ToAxeX(animation, effect); break; }
        case "ToAxeY" : { Effect_ToAxeY(animation, effect); break; }
        case "MoveToAxeX" : { Effect_MoveToAxeX(animation, effect); break; }
        case "MoveToAxeY" : { Effect_MoveToAxeY(animation, effect); break; }

        case "Size_Width" : { Effect_Size_Width(animation, effect); break; }
        case "Size_Height" : { Effect_Size_Height(animation, effect); break; }
        case "Size_ToAxeX" : { Effect_Size_ToAxeX(animation, effect); break; }
        case "Size_ToAxeY" : { Effect_Size_ToAxeY(animation, effect); break; }
        case "Size_MoveToAxeX" : { Effect_Size_MoveToAxeX(animation, effect); break; }
        case "Size_MoveToAxeY" : { Effect_Size_MoveToAxeY(animation, effect); break; }
        case "Zoom_Width" : { Effect_Zoom_Width(animation, effect); break; }
        case "Zoom_Height" : { Effect_Zoom_Height(animation, effect); break; }
        case "FullScreen" : { Effect_FullScreen(animation, effect); break; }
        case "Centred" : { Effect_Centred(animation, effect); break; }
        
        
//        case "Font" : { Effect_Txt_Font(animation, effect); break; }
//        case "Stroke" : { Effect_Txt_Stroke(animation, effect); break; }
//        case "Fill" : { Effect_Txt_Fill(animation, effect); break; }
//        case "StrokeStyle" : { Effect_Txt_StrokeStyle(animation, effect); break; }
//        case "FillStyle" : { Effect_Txt_FillStyle(animation, effect); break; }
//        case "LineWidth" : { Effect_Txt_LineWidth(animation, effect); break; }
//        case "TextBaseline" : { Effect_Txt_TextBaseline(animation, effect); break; }
    }
};


function Effect_ToHead_Src(animation, effect)
{
    if( animation.Entity_Src == "")return;
    var entity = FindEntityID(animation.Entity_Src);
    Effect_ToHead(animation, effect, entity);
};
function Effect_ToHead_Dest(animation, effect)
{
    if( animation.Entity_Dest == "")return;
    var entity = FindEntityID(animation.Entity_Dest);
    Effect_ToHead(animation, effect, entity);
};
function Effect_MoveToHead_Src(animation, effect)
{
    if( animation.Entity_Src == "")return;
    var entity = FindEntityID(animation.Entity_Src);
    Effect_MoveToHead(animation, effect, entity);
};
function Effect_MoveToHead_Dest(animation, effect)
{
    if( animation.Entity_Dest == "")return;
    var entity = FindEntityID(animation.Entity_Dest);
    Effect_MoveToHead(animation, effect, entity);
};
function Effect_ToCube_Src(animation, effect)
{
    Effect_ToCube(animation, effect, animation.Cube_Src);
};
function Effect_ToCube_Dest(animation, effect)
{
    Effect_ToCube(animation, effect, animation.Cube_Dest);
};
function Effect_MoveToCube_Src(animation, effect)
{
    Effect_MoveToCube(animation, effect, animation.Cube_Src);
};
function Effect_MoveToCube_Dest(animation, effect)
{
    Effect_MoveToCube(animation, effect, animation.Cube_Dest);
};


function Effect_ToHead(animation, effect, entity)
{
    if(entity == null)return;
    var screen = LocationToScreen( entity.X, entity.Y, entity.Z, PageInfo.MapInfo.SizeCube, PageInfo.MapInfo.Centred, Adjustment);
    var eHeight = PageInfo.MapInfo.SizeCube*(entity.Height) + ((entity.Width-1)*PageInfo.MapInfo.SizeCube);   
    animation.X = screen.X;
    animation.Y = screen.Y - eHeight;
};
function Effect_MoveToHead(animation, effect, entity)
{
    if(entity == null)return;
    var screen = LocationToScreen( entity.X, entity.Y, entity.Z, PageInfo.MapInfo.SizeCube, PageInfo.MapInfo.Centred, Adjustment);
    var eHeight = PageInfo.MapInfo.SizeCube*(entity.Height) + ((entity.Width-1)*PageInfo.MapInfo.SizeCube);
    var step = animation.Step - animation.Start - effect.Start;
    var duration;// = effect.End - effect.Start;
    if(effect.End > effect.Start)
        duration = effect.End - effect.Start;
    else
        duration = animation.Duration - effect.Start;
    var ratio = step / duration;
    animation.X = Math.floor( animation.X + ((screen.X - animation.X) * ratio) );
    animation.Y = Math.floor( animation.Y + ((screen.Y - eHeight - animation.Y) * ratio) );
};
function Effect_ToCube(animation, effect, cube)
{
    var screen = LocationToScreen( cube.X, cube.Y, cube.Z, PageInfo.MapInfo.SizeCube, PageInfo.MapInfo.Centred, Adjustment);
    animation.X = screen.X;
    animation.Y = screen.Y;
};
function Effect_MoveToCube(animation, effect, cube)
{
    var screen = LocationToScreen( cube.X, cube.Y, cube.Z, PageInfo.MapInfo.SizeCube, PageInfo.MapInfo.Centred, Adjustment);
    var step = animation.Step - animation.Start - effect.Start;
    var duration;// = effect.End - effect.Start;
    if(effect.End > effect.Start)
        duration = effect.End - effect.Start;
    else
        duration = animation.Duration - effect.Start;
    var ratio = step / duration;
    animation.X = Math.floor( animation.X + ((screen.X - animation.X) * ratio) );
    animation.Y = Math.floor( animation.Y + ((screen.Y - animation.Y) * ratio) );
};

function Effect_ToScreen_X(animation, effect)
{
    animation.X = effect.Number;
};
function Effect_ToScreen_Y(animation, effect)
{
    animation.Y = effect.Number;
};

function Effect_MoveToScreen_X(animation, effect)
{
    var step = animation.Step - animation.Start - effect.Start;
    var duration;// = effect.End - effect.Start;
    if(effect.End > effect.Start)
        duration = effect.End - effect.Start;
    else
        duration = animation.Duration - effect.Start;
    var ratio = step / duration;
    animation.X = Math.floor( animation.X + ((effect.Number - animation.X) * ratio) );
};
function Effect_MoveToScreen_Y(animation, effect)
{
    var step = animation.Step - animation.Start - effect.Start;
    var duration;// = effect.End - effect.Start;
    if(effect.End > effect.Start)
        duration = effect.End - effect.Start;
    else
        duration = animation.Duration - effect.Start;
    var ratio = step / duration;
    animation.Y = Math.floor( animation.Y + ((effect.Number - animation.Y) * ratio) );
};
function Effect_ToAxeX(animation, effect)
{
    animation.X += effect.Number;
};
function Effect_MoveToAxeX(animation, effect)
{
    var step = animation.Step - animation.Start - effect.Start;
    var duration;// = effect.End - effect.Start;
    if(effect.End > effect.Start)
        duration = effect.End - effect.Start;
    else
        duration = animation.Duration - effect.Start;
    var ratio = step / duration;
    animation.X += Math.floor( effect.Number * ratio );
};
function Effect_ToAxeY(animation, effect)
{
    animation.Y += effect.Number;
};
function Effect_MoveToAxeY(animation, effect)
{
    var step = animation.Step - animation.Start - effect.Start;
    var duration;// = effect.End - effect.Start;
    if(effect.End > effect.Start)
        duration = effect.End - effect.Start;
    else
        duration = animation.Duration - effect.Start;
    var ratio = step / duration; 
    animation.Y += Math.floor( effect.Number * ratio );
};

function Effect_FullScreen(animation, effect)
{
    animation.X = 0;
    animation.Y = 0;
    animation.Width = PageInfo.Frame.Width;
    animation.Height = PageInfo.Frame.Height;
};
function Effect_Centred(animation, effect)
{
    animation.X -= animation.Width/2;
    animation.Y -= animation.Height/2;
};
function Effect_Size_Width(animation, effect)
{
    animation.Width = PageInfo.MapInfo.SizeCube * effect.Number;
};
function Effect_Size_Height(animation, effect)
{
    animation.Height = effect.Number * PageInfo.MapInfo.SizeCube;
};
function Effect_Size_ToAxeX(animation, effect)
{
    animation.X += effect.Number * PageInfo.MapInfo.SizeCube;
};
function Effect_Size_MoveToAxeX(animation, effect)
{
    var step = animation.Step - animation.Start - effect.Start;
    var duration;// = effect.End - effect.Start;
    if(effect.End > effect.Start)
        duration = effect.End - effect.Start;
    else
        duration = animation.Duration - effect.Start;
    var ratio = step / duration;
    animation.X += Math.floor( effect.Number * PageInfo.MapInfo.SizeCube * ratio );
};
function Effect_Size_ToAxeY(animation, effect)
{
    animation.Y += effect.Number * PageInfo.MapInfo.SizeCube;
};
function Effect_Size_MoveToAxeY(animation, effect)
{
    var step = animation.Step - animation.Start - effect.Start;
    var duration;// = effect.End - effect.Start;
    if(effect.End > effect.Start)
        duration = effect.End - effect.Start;
    else
        duration = animation.Duration - effect.Start;
    var ratio = step / duration; 
    animation.Y += Math.floor( effect.Number * PageInfo.MapInfo.SizeCube * ratio );
};
function Effect_Zoom_Width(animation, effect)
{
    var step = animation.Step - animation.Start - effect.Start;
    var duration;// = effect.End - effect.Start;
    if(effect.End > effect.Start)
        duration = effect.End - effect.Start;
    else
        duration = animation.Duration - effect.Start;
    var ratio = step / duration;
    animation.Width += (effect.Number - animation.Width) * ratio;
};
function Effect_Zoom_Height(animation, effect)
{
    var step = animation.Step - animation.Start - effect.Start;
    var duration;// = effect.End - effect.Start;
    if(effect.End > effect.Start)
        duration = effect.End - effect.Start;
    else
        duration = animation.Duration - effect.Start;
    var ratio = step / duration;
    animation.Height += (effect.Number - animation.Height) * ratio;
};









































////function Create_AnimationList(id, entity_Src, entity_Dest, cube_Src, cube_Dest)
////{
////    return {ID:id, Step:0, Entity_Src:entity_Src, Entity_Dest:entity_Dest, Cube_Src:cube_Src, Cube_Dest:cube_Dest, Animations:[]};
////};
////function Create_Animation(start, end, x, y, width, height, image, text)
////{
////    return {Start:start, End:end, X:x, Y:y, Width:width, Height:height, Image:image, Text:text, Effects:[]};
////};
////function Create_Effect(keyname, start, end, x, y, z, text, bool, number)
////{
////    return {KeyName:keyname, Start:start, End:end, X:x, Y:y, Z:z, Text:text, Boolean:bool, Number:number};
////};

//function CreatePlayAnimation(id, entity_Src, entity_Dest, cube_Src, cube_Dest)//+start
//{
//    var playanimation = Create_AnimationList(id, entity_Src, entity_Dest, cube_Src, cube_Dest);
//    var animationlist = FindAnimationList(id);
//    if(animationlist == null)return;

//    playanimation.Animations = animationlist.Animations;
//    PlayAnimations.push(playanimation);
//};

//function OnPlayAnimations(context)
//{
//    for(var p = 0; p < PlayAnimations.length; p++)
//    {
////        if(PlayAnimations[p].Duration < PlayAnimations[p].Step)continue;
//        PlayAnimations[p].Step += DrawStep;
//        for(var a = 0; a < PlayAnimations[p].Animations.length; a++)
//        {
////            if( PlayAnimations[p].Step > PlayAnimations[p].Animations[a].Start && PlayAnimations[p].Animations[a].End < PlayAnimations[p].Step )
//            if( PlayAnimations[p].Animations[a].Start < PlayAnimations[p].Step && PlayAnimations[p].Step < PlayAnimations[p].Animations[a].End )
//            {
//                for(var e = 0; e < PlayAnimations[p].Animations[a].Effects.length; e++)
//                {
//                    OnEffect( PlayAnimations[p], PlayAnimations[p].Animations[a], PlayAnimations[p].Animations[a].Effects[e] );
////                    if(PlayAnimations[p].Animations[a].Image != null)
////                        DrawTemplateImage( PlayAnimations[p].Animations[a].Image, PlayAnimations[p].Animations[a].X, PlayAnimations[p].Animations[a].Y, PlayAnimations[p].Animations[a].Width, PlayAnimations[p].Animations[a].Height, context );

////                    if(PlayAnimations[p].Animations[a].Text != "")
////                    {
////                        context.fillText( PlayAnimations[p].Animations[a].Text, PlayAnimations[p].Animations[a].X, PlayAnimations[p].Animations[a].Y);
////                    }
//                }
//                
//                    if(PlayAnimations[p].Animations[a].Image != null)
//                        DrawTemplateImage( PlayAnimations[p].Animations[a].Image, PlayAnimations[p].Animations[a].X, PlayAnimations[p].Animations[a].Y, PlayAnimations[p].Animations[a].Width, PlayAnimations[p].Animations[a].Height, context );

//                    if(PlayAnimations[p].Animations[a].Text != "")
//                    {
//                        context.fillText( PlayAnimations[p].Animations[a].Text, PlayAnimations[p].Animations[a].X, PlayAnimations[p].Animations[a].Y);
//                    }  
//                
//                
//            }
//        }
//    }
//};

//function OnEffect(animationlist, animation, effect)
//{
//    switch(effect.ID)
//    {
//        //Supprimer!!!!!!!!!!
//        case "Entity_Src_IsSelected" : { Effect_Entity_Src_IsSelected(animationlist, animation, effect); break;}
//        case "Entity_Src_IsTarget" : { Effect_Entity_Src_IsTarget(animationlist, animation, effect); break;}
//        case "Cube_Src_IsTarget" : { Effect_Cube_Src_IsTarget(animationlist, animation, effect); break;}
//        case "Case_Src_IsMouse" : { Effect_Case_Src_IsMouse(animationlist, animation, effect); break;}
//        case "Entity_Dest_IsSelected" : { Effect_Entity_Dest_IsSelected(animationlist, animation, effect); break;}
//        case "Entity_Dest_IsTarget" : { Effect_Entity_Dest_IsTarget(animationlist, animation, effect); break;}
//        case "Cube_Dest_IsTarget" : { Effect_Cube_Dest_IsTarget(animationlist, animation, effect); break;}
//        case "Case_Dest_IsMouse" : { Effect_Case_Dest_IsMouse(animationlist, animation, effect); break;}
//        //
//        case "ToHead_Src" : { Effect_ToHead_Src(animationlist, animation, effect); break; }
//        case "ToHead_Dest" : { Effect_ToHead_Dest(animationlist, animation, effect); break; }
//        case "MoveToHead_Src" : { Effect_MoveToHead_Src(animationlist, animation, effect); break; }
//        case "MoveToHead_Dest" : { Effect_MoveToHead_Dest(animationlist, animation, effect); break; }
//        case "ToCube_Src" : { Effect_ToCube_Src(animationlist, animation, effect); break; }
//        case "ToCube_Dest" : { Effect_ToCube_Dest(animationlist, animation, effect); break; }
//        case "MoveToCube_Src" : { Effect_MoveToCube_Src(animationlist, animation, effect); break; }
//        case "MoveToCube_Dest" : { Effect_MoveToCube_Dest(animationlist, animation, effect); break; }
//        case "ToCase_Src" : { Effect_ToCase_Src(animationlist, animation, effect); break; }
//        case "ToCase_Dest" : { Effect_ToCase_Dest(animationlist, animation, effect); break; }
//        case "MoveToCase_Src" : { Effect_MoveToCase_Src(animationlist, animation, effect); break; }
//        case "MoveToCase_Dest" : { Effect_MoveToCase_Dest(animationlist, animation, effect); break; }
//        case "ToScreen" : { Effect_ToScreen(animationlist, animation, effect); break; }
//        case "MoveToScreen" : { Effect_MoveToScreen(animationlist, animation, effect); break; }
//        case "ToAxeX" : { Effect_ToAxeX(animationlist, animation, effect); break; }
//        case "MoveToAxeX" : { Effect_MoveToAxeX(animationlist, animation, effect); break; }
//        case "ToAxeY" : { Effect_ToAxeY(animationlist, animation, effect); break; }
//        case "MoveToAxeY" : { Effect_MoveToAxeY(animationlist, animation, effect); break; }

//        case "FullScreen" : { Effect_FullScreen(animationlist, animation, effect); break; }
//        case "Centred" : { Effect_Centred(animationlist, animation, effect); break; }
//        case "Size" : { Effect_Size(animationlist, animation, effect); break; }
//        case "Zoom" : { Effect_Zoom(animationlist, animation, effect); break; }
//    }
//};

////function Effect_Entity_Src_IsSelected(animationlist, animation, effect){ if(Selected.Entity != null)animationlist.Entity_Src = Selected.Entity.ID;};
////function Effect_Entity_Src_IsTarget(animationlist, animation, effect){ if(Selected.Target != null)animationlist.Entity_Src = Selected.Target.ID;};
//function Effect_Entity_Src_IsSelected(animationlist, animation, effect){ animationlist.Entity_Src = Selected.Entity; };
//function Effect_Entity_Src_IsTarget(animationlist, animation, effect){ animationlist.Entity_Src = Selected.Target; };
//function Effect_Cube_Src_IsTarget(animationlist, animation, effect){animationlist.Cube_Src = {X:Selected.X,Y:Selected.Y,Z:Selected.Z};};
//function Effect_Case_Src_IsMouse(animationlist, animation, effect){animationlist.Case_Src = Case;};
////function Effect_Entity_Dest_IsSelected(animationlist, animation, effect){ if(Selected.Entity != null)animationlist.Entity_Dest = Selected.Entity.ID;};
////function Effect_Entity_Dest_IsTarget(animationlist, animation, effect){ if(Seleceted.Target != null)animationlist.Entity_Dest = Selected.Target.ID;};
//function Effect_Entity_Dest_IsSelected(animationlist, animation, effect){ animationlist.Entity_Dest = Selected.Entity;};
//function Effect_Entity_Dest_IsTarget(animationlist, animation, effect){ animationlist.Entity_Dest = Selected.Target;};
//function Effect_Cube_Dest_IsTarget(animationlist, animation, effect){animationlist.Cube_Dest = {X:Selected.X,Y:Selected.Y,Z:Selected.Z};};
//function Effect_Case_Dest_IsMouse(animationlist, animation, effect){animationlist.Case_Dest = Case;};


//function Effect_ToHead_Src(animationlist, animation, effect)
//{
//    if( animationlist.Entity_Src == "")return;
//    var entity = FindEntityID(animationlist.Entity_Src);
//    Effect_ToHead(animationlist, animation, effect, entity);
//};
//function Effect_ToHead_Dest(animationlist, animation, effect)
//{
//    if( animationlist.Entity_Dest == "")return;
//    var entity = FindEntityID(animationlist.Entity_Dest);
//    Effect_ToHead(animationlist, animation, effect, entity);
//};
//function Effect_MoveToHead_Src(animationlist, animation, effect)
//{
//    if( animationlist.Entity_Src == "")return;
//    var entity = FindEntityID(animationlist.Entity_Src);
//    Effect_MoveToHead(animationlist, animation, effect, entity);
//};
//function Effect_MoveToHead_Dest(animationlist, animation, effect)
//{
//    if( animationlist.Entity_Dest == "")return;
//    var entity = FindEntityID(animationlist.Entity_Dest);
//    Effect_MoveToHead(animationlist, animation, effect, entity);
//};
//function Effect_ToCube_Src(animationlist, animation, effect, cube)
//{
//    Effect_ToCube(animationlist, animation, effect, animationlist.Cube_Src);
//};
//function Effect_ToCube_Dest(animationlist, animation, effect, cube)
//{
//    Effect_ToCube(animationlist, animation, effect, animationlist.Cube_Dest);
//};
//function Effect_MoveToCube_Src(animationlist, animation, effect, cube)
//{
//    Effect_MoveToCube(animationlist, animation, effect, animationlist.Cube_Src);
//};
//function Effect_MoveToCube_Dest(animationlist, animation, effect)//, cube)
//{
//    Effect_MoveToCube(animationlist, animation, effect, animationlist.Cube_Dest);
//};
//function Effect_ToCase_Src(animationlist, animation, effect)
//{
//    var C3D = FindCase3D(animationlist.Case_Src.X, animationlist.Case_Src.Y);
//    Effect_ToCase(animationlist, animation, effect, C3D);
//};
//function Effect_ToCase_Dest(animationlist, animation, effect)
//{
//    var C3D = FindCase3D(animationlist.Case_Dest.X, animationlist.Case_Dest.Y);
//    Effect_ToCase(animationlist, animation, effect, C3D);
//};
//function Effect_MoveToCase_Src(animationlist, animation, effect)
//{
//    var C3D = FindCase3D(animationlist.Case_Src.X, animationlist.Case_Src.Y);
//    Effect_MoveToCase(animationlist, animation, effect, C3D);
//};
//function Effect_MoveToCase_Dest(animationlist, animation, effect)
//{
//    var C3D = FindCase3D(animationlist.Case_Dest.X, animationlist.Case_Dest.Y);
//    Effect_MoveToCase(animationlist, animation, effect, C3D);
//};

//function Effect_ToHead(animationlist, animation, effect, entity)
//{
//    if(entity == null)return;
//    var eHeight = PageInfo.MapInfo.SizeCube*(entity.Height) + ((entity.Width-1)*PageInfo.MapInfo.SizeCube);   
//    animation.X = entity.Screen.X;
//    animation.Y = entity.Screen.Y - eHeight;
//};
//function Effect_MoveToHead(animationlist, animation, effect, entity)
//{
//    if(entity == null)return;
//    var eHeight = PageInfo.MapInfo.SizeCube*(entity.Height) + ((entity.Width-1)*PageInfo.MapInfo.SizeCube);
//    var step = animationlist.Step - animation.Start - effect.Start;
//    var duration = effect.End - effect.Start;
//    var ratio = step / duration;
//    animation.X = Math.floor( animation.X + ((entity.Screen.X - animation.X) * ratio) );
//    animation.Y = Math.floor( animation.Y + ((entity.Screen.Y - eHeight - animation.Y) * ratio) );
////    if(entity == null)return;
////    var eHeight = PageInfo.MapInfo.SizeCube*(entity.Height) + ((entity.Width-1)*PageInfo.MapInfo.SizeCube);
////    var step = animationlist.Step - effect.Start;
////    var duration = effect.End - effect.Start;
////    var ratio = step / duration;
////    animation.X = Math.floor( animation.X + ((entity.Screen.X - animation.X) * ratio) );
////    animation.Y = Math.floor( animation.Y + ((entity.Screen.Y - eHeight - animation.Y) * ratio) );
//};
//function Effect_ToCube(animationlist, animation, effect, cube)
//{
//    var C3D = FindCase3DLocation(cube.X, cube.Y, cube.Z);
//    if(C3D == null)return;
//    animation.X = C3D.Screen.X;
//    animation.Y = C3D.Screen.Y;
//};
//function Effect_MoveToCube(animationlist, animation, effect, cube)
//{
//    var screen = LocationToScreen( cube.X, cube.Y, cube.Z, PageInfo.MapInfo.SizeCube, PageInfo.MapInfo.Centred, Adjustment)
//    var step = animationlist.Step - animation.Start - effect.Start;
//    var duration = effect.End - effect.Start;
//    var ratio = step / duration;
//    animation.X = Math.floor( animation.X + ((screen.X - animation.X) * ratio) );
//    animation.Y = Math.floor( animation.Y + ((screen.Y - animation.Y) * ratio) );


////    var C3D = FindCase3DLocation(cube.X, cube.Y, cube.Z);
////    if(C3D == null)return;
////    var step = animationlist.Step - animation.Start - effect.Start;
////    var duration = effect.End - effect.Start;
////    var ratio = step / duration;
////    animation.X = Math.floor( animation.X + ((C3D.Screen.X - animation.X) * ratio) );
////    animation.Y = Math.floor( animation.Y + ((C3D.Screen.Y - animation.Y) * ratio) );
//};
//function Effect_ToCase(animationlist, animation, effect, C3D)
//{
//    if(C3D == null)return;
//    animation.X = C3D.Screen.X;
//    animation.Y = C3D.Screen.Y;
//};
//function Effect_MoveToCase(animationlist, animation, effect, C3D)
//{
//    if(C3D == null)return;
//    var step = animationlist.Step - animation.Start - effect.Start;
//    var duration = effect.End - effect.Start;
//    var ratio = step / duration;
//    animation.X = Math.floor( animation.X + ((C3D.Screen.X - animation.X) * ratio) );
//    animation.Y = Math.floor( animation.Y + ((C3D.Screen.Y - animation.Y) * ratio) );
////    if(C3D == null)return;
////    var step = animationlist.Step - effect.Start;
////    var duration = effect.End - effect.Start;
////    var ratio = step / duration;
////    animation.X = Math.floor( animation.X + ((C3D.Screen.X - animation.X) * ratio) );
////    animation.Y = Math.floor( animation.Y + ((C3D.Screen.Y - animation.Y) * ratio) );
//};
//function Effect_ToScreen(animationlist, animation, effect)
//{
//    animation.X = effect.X;
//    animation.Y = effect.Y;
//};
//function Effect_MoveToScreen(animationlist, animation, effect)
//{
//    var step = animationlist.Step - animation.Start - effect.Start;
//    var duration = effect.End - effect.Start;
//    var ratio = step / duration;
//    animation.X = Math.floor( animation.X + ((effect.X - animation.X) * ratio) );
//    animation.Y = Math.floor( animation.Y + ((effect.Y - animation.Y) * ratio) );
////    var step = animationlist.Step - effect.Start;
////    var duration = effect.End - effect.Start;
////    var ratio = step / duration;
////    animation.X = Math.floor( animation.X + ((effect.X - animation.X) * ratio) );
////    animation.Y = Math.floor( animation.Y + ((effect.Y - animation.Y) * ratio) );
//};
//function Effect_ToAxeX(animationlist, animation, effect)
//{
//    animation.X += effect.Number;
//};
//function Effect_MoveToAxeX(animationlist, animation, effect)
//{
//    var step = animationlist.Step - animation.Start - effect.Start;
//    var duration = effect.End - effect.Start;
//    var ratio = step / duration;
//    animation.X += Math.floor( effect.Number * ratio );
////    var step = animationlist.Step - effect.Start;
////    var duration = effect.End - effect.Start;
////    var ratio = step / duration;
////    animation.X += Math.floor( effect.Number * ratio );
//};
//function Effect_ToAxeY(animationlist, animation, effect)
//{
//    animation.Y += effect.Number;
//};
//function Effect_MoveToAxeY(animationlist, animation, effect)
//{
//    var step = animationlist.Step - animation.Start - effect.Start;
//    var duration = effect.End - effect.Start;
//    var ratio = step / duration; 
//    animation.Y += Math.floor( effect.Number * ratio );
////    var step = animationlist.Step - effect.Start;
////    var duration = effect.End - effect.Start;
////    var ratio = step / duration; 
////    animation.Y += Math.floor( effect.Number * ratio );
//};


//function Effect_FullScreen(animationlist, animation, effect)
//{
//    animation.X = 0;
//    animation.Y = 0;
//    animation.Width = PageInfo.Frame.Width;
//    animation.Height = PageInfo.Frame.Height;
//};
//function Effect_Centred(animationlist, animation, effect)
//{
//    animation.X -= animation.Width/2;
//    animation.Y -= animation.Height/2;
//};
//function Effect_Size(animationlist, animation, effect)
//{
//    animation.Width = effect.Width;
//    animation.Height = effect.Height;
//};
//function Effect_Zoom(animationlist, animation, effect)
//{
//    var step = animationlist.Step - animation.Start - effect.Start;
//    var duration = effect.End - effect.Start;
//    var ratio = step / duration;
//    animation.Width += (effect.Width - animation.Width) * ratio;
//    animation.Height += (effect.Height - animation.Height) * ratio;
////    var step = animationlist.Step - effect.Start;
////    var duration = effect.End - effect.Start;
////    var ratio = step / duration;
////    animation.Width += (effect.Width - animation.Width) * ratio;
////    animation.Height += (effect.Height - animation.Height) * ratio;
//};









//##############################################################################################
//##############################################################################################
//##############################################################################################


//Draw_Animation2 = function()
//{
//    if(animations.Step > animations.StepMax)return;
//    animations.Step += DrawStep;
//    
//    for(var i = 0; i < Animations_Img.Effects.length;i++)
//    {
//        if(animation.Effects[i].Start > animations.Step)continue;
//        if(animation.Effects[i].Start + animation.Effects[i].Speed < animations.Step)continue;
////        OnEffect(animation.Effects[i]);
//    }
//};

////function DrawTemplateImage( imagejson, x, y, width, height, context )


//function OnAnimation3(animation)
//{
//    ctx_Map.fillText("OnAnimation : " +animations.Step +" : "+ animations.StepMax, 950, 475);
//    
//    if(animations.Step > animations.StepMax)return;
//    animations.Step += DrawStep;
//    
//    for(var i = 0; i < animation.Effects.length;i++)
//    {
//        if(animation.Effects[i].Start > animations.Step)continue;
//        if(animation.Effects[i].Start + animation.Effects[i].Speed < animations.Step)continue;
////        OnEffect(animation.Effects[i]);
//    }
//    var template = FindTemplatesImages( "Ball" );
//    var texture = template.Image;
//    
//    ctx_Map.save();
//    
//    
//    var motif = ctx_Map.createPattern(texture,'repeat');
////    var motif = ctx_Map.createPattern(texture,'no-repeat');
//    ctx_Map.fillStyle = motif;
//    
//    ctx_Map.beginPath();
//    ctx_Map.moveTo(450, 400);
//    ctx_Map.lineTo(600, 300);
////    ctx_Map.lineTo(600, 475);
//    ctx_Map.lineTo(400, 525);

//    
//    ctx_Map.closePath();
//    
//    ctx_Map.clip();
////        ctx_Map.transform(450, 400,
////                      600, 300,
////                      400, 525);
//        ctx_Map.drawImage(texture, 0, 0);


////    ctx_Map.fill();
//    ctx_Map.stroke();
//    
//    
////    ctx_Map.drawImage(texture, 0, 0);
//    ctx_Map.restore();
//    
//    
////    
////    
////    	var motif = ctx_Map.createPattern(texture,'repeat');
//// 
////ctx_Map.fillStyle = motif;
////ctx_Map.rect(950,550,20,20);
////ctx_Map.fill();
//    
//    
//    
//    
//    
////            g.DrawImage(Texture_Planche, new Point[] { Point_A, Point_B, Point_C });
////        ctx_Map.drawImage(Powers[pow].Image, 1050, 50, 50, 50 );
//    
//};

////FullScreen
////Move
////Size
////ZoomIn & ZoomOut


////function OnEffect(effect)
////{

////        ctx_Map.fillText("OnEffect : " +effect.Name, 950, 500);
//////    alert("OnEffect : " +effect.Name);
////};
















//function Effect_Transformation()//ctx, imgjson, x, y)  //a, b, c, d, e, f)
//{
//    

//var img = ScreenJSON[0].Image;

//ctx_Map.save();

//    ctx_Map.transform(1,0.5,-0.5, 0.5,30,10);
//    ctx_Map.drawImage(img, 0, 0);

//ctx_Map.restore();
//};












////avec une image de 640 par 480
////textureMap( ctx, img, [{x:0,y:0,u:0,v:0}, {x:200,y:0,u:640,v:0}, {x:300,y:100,u:640,v:480}, {x:0,y:150,u:0,v:480}] );



////ctx: objet context   
////texture: image ou canvas a afficher
////pts: array a 4 entree au format->  {x:x,y:y,u:u,v:v}, soit     x et y les coordonné cible    et    u et v les extremité de l'image
//function textureMap(ctx, texture, pts) {
//    var tris = [[0, 1, 2], [2, 3, 0]]; //decoupe en 2 triangle
//    for (var t=0; t<2; t++) {
//        var pp = tris[t];
// 
//        // on recupere les point du triangle
//        var x0 = pts[pp[0]].x, x1 = pts[pp[1]].x, x2 = pts[pp[2]].x;
//        var y0 = pts[pp[0]].y, y1 = pts[pp[1]].y, y2 = pts[pp[2]].y;
//        var u0 = pts[pp[0]].u, u1 = pts[pp[1]].u, u2 = pts[pp[2]].u;
//        var v0 = pts[pp[0]].v, v1 = pts[pp[1]].v, v2 = pts[pp[2]].v;
//  
//        // on decoupe pour n'afficher que le contenu d'un triangle correspondant au point envoyé
//        ctx.save();
//        ctx.beginPath();
//        ctx.moveTo(x0, y0);
//        ctx.lineTo(x1, y1);
//                ctx.lineTo(x2, y2);
//        ctx.closePath();
//        ctx.clip();
// 
//        // on calcul la transformation de la matrice
//        var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
//        var delta_a = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
//        var delta_b = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
//        var delta_c = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2
//                      - v0*u1*x2 - u0*x1*v2;
//        var delta_d = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
//        var delta_e = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
//        var delta_f = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2
//                      - v0*u1*y2 - u0*y1*v2;
// 
//        // on passe par une matrice de deformation et on dessine le triangle
//        ctx.transform(delta_a/delta, delta_d/delta,
//                      delta_b/delta, delta_e/delta,
//                      delta_c/delta, delta_f/delta);
//        ctx.drawImage(texture, 0, 0);
//        ctx.restore();
//    }
//};












////function OnPlayAnimations(context)
////{
////    for(var p = 0; p < PlayAnimations.length; p++)
////    {
////        PlayAnimations[p].Step += DrawStep;
////        for(var a = 0; a < PlayAnimations[p].Animations.length; a++)
////        {
////            if( PlayAnimations[p].Step > PlayAnimations[p].Animations[a].Start && PlayAnimations[p].Animations[a].End < PlayAnimations[p].Step )
////            {
////                for(var e = 0; e < PlayAnimations[p].Animations[a].Effects.length; e++)
////                {
////                    OnEffect( PlayAnimations[p], PlayAnimations[p].Animations[a], PlayAnimations[p].Animations[a].Effects[e] );
////                    if(PlayAnimations[p].Animations[a].Image != null)
////                        DrawTemplateImage( PlayAnimations[p].Animations[a].Image, PlayAnimations[p].Animations[a].X, PlayAnimations[p].Animations[a].Y, PlayAnimations[p].Animations[a].Width, PlayAnimations[p].Animations[a].Height, context );



////       context.fillText( PlayAnimations[p].Animations[a].Text, PlayAnimations[p].Animations[a].X, PlayAnimations[p].Animations[a].Y);




////                    if(PlayAnimations[p].Animations[a].Text != "")
////                    {
////                        context.fillText( PlayAnimations[p].Step.toString(), PlayAnimations[p].Animations[a].X, PlayAnimations[p].Animations[a].Y);
////                    }
////                }
////            }
////        }
////    }
////};


