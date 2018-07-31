
function onYouTubeIframeAPIReady(){};

function OnWebTV(id, webtvjson)
{
    var webtv = FindWebTV(id);
    if(webtv != null)webtv.OnWebTV(webtvjson);
    webtv.CallWebTVNext();
};
function OnWebTVNext(id, webtvjson)
{
    var webtv = FindWebTV(id);
    if(webtv != null)webtv.OnWebTVNext(webtvjson);
};

function FindWebTV(id)
{
    for(var i = 0; i < Controls.length; i++)
        if(Controls[i].IsInherit("ControlVideo") && Controls[i].ID == id)
            return Controls[i];
    return null;
};

function ControlVideo(x, y, width, height, id, border)
{
    this.InheritClass = Form;
    this.InheritClass( x, y, width, height, border );
    delete this.InheritClass;
    this.Inherit("ControlVideo");

    this.CanMove = false;
    this.CanResize = false;

    this.ID = id;
    this.Channel = "";
    this.Setup = { FullScreen:false };
    this.Volume = 10;

    this.Div_Player = null;
    this.Div_Player_DM = null;
    this.WebTVJSON = null;
    this.WebTVJSONNext = null;
    this.Video = null;
    this.Player = null;
    this.Player_DM = null;

    this.CallWebTV = function(){ CallPage("WEBTV", this.Channel +PageInfo.Separator+ this.ID); };
    this.CallWebTVNext = function(){ CallPage("WEBTVNEXT", this.Channel +PageInfo.Separator+ this.ID); };
    this.CallChannelTV = function(channel){ this.Channel = channel; CallPage("CHANNELTV", this.Channel +PageInfo.Separator+ this.ID); };
    this.OnWebTVNext = function(webtv)
    {
        if(this.WebTVJSON == null)
        {
            this.OnWebTV(webtv);
            this.CallWebTVNext();
        }
        else
        {
            this.WebTVJSONNext = webtv;
        }
    };
    this.OnWebTVEnded = function()
    {
        if(this.WebTVJSONNext != null)
        {
            this.OnWebTV(this.WebTVJSONNext);
            this.WebTVJSONNext = null;
            this.CallWebTVNext();
        }
        else
        {
            this.CallWebTV();
            this.CallWebTVNext();
        }
    };
    this.OnWebTV = function(webtv)
    {
        if(this.WebTVJSON != null && this.WebTVJSON.Media.VideoPlayer != webtv.Media.VideoPlayer) this.WebTVJSONDelete(this.WebTVJSON.Media.VideoPlayer);
        this.WebTVJSON = webtv;
        if(webtv.Media.VideoPlayer == "Video")
        {
            if(this.Video == null)
                this.OnNewPlayer_Video();
            this.OnVideo(webtv);
        }
        else if(webtv.Media.VideoPlayer == "Youtube")
        {
            if(this.Player == null) this.OnNewPlayer_YT(webtv.Media.Source);
            else this.OnPlayer(webtv);
        }
        else if(webtv.Media.VideoPlayer == "Dailymotion")
        {
            if(this.Player_DM == null)
                this.OnNewPlayer_DM(webtv.Media.Source);
            this.OnPlayer_DM(webtv);
        }

        this.OnWebTV_Change();
        this.SetVolume(this.Volume);
        if(this.Setup.FullScreen)this.OnFullScreen();
    };
    this.OnWebTV_Change = function(){};
    this.OnVideo = function(webtv)
    {
        this.Video.src = webtv.Media.Source;
        this.Video.load();
        this.Video.play();
    };
    this.OnPlayer = function(webtv)
    {
        this.Player.loadVideoById(webtv.Media.Source, webtv.Media.StartSeconds, webtv.Media.Quality);        
    };
    this.OnPlayer_DM = function(webtv)
    {
        this.Div_Player_DM.load(webtv.Media.Source, {autoplay: true, start: webtv.Media.StartSeconds });
    };

    this.OnNewDivPlayer = function()
    {
        this.Div_Player = document.createElement('div');
        this.Div_Player.id = "Div_Player";
        document.body.appendChild(this.Div_Player);

        this.Div_Player.style.position = 'absolute';
	    this.Div_Player.style.left = this.Frame.X+this.Border.Left+"px";
	    this.Div_Player.style.top = this.Frame.Y+this.Border.Top+"px";
        this.Div_Player.width = this.Frame.Width-this.Border.Left-this.Border.Right;
        this.Div_Player.height = this.Frame.Height-this.Border.Top-this.Border.Bottom;
    };
    this.OnNewDivPlayer_DM = function()
    {
        this.Div_Player_DM = document.createElement('div');
        this.Div_Player_DM.id = "Div_Player_DM";
        document.body.appendChild(this.Div_Player_DM);

        this.Div_Player_DM.style.position = 'absolute';
	    this.Div_Player_DM.style.left = this.Frame.X+"px";
	    this.Div_Player_DM.style.top = this.Frame.Y+"px";
        this.Div_Player_DM.width = this.Frame.Width;
        this.Div_Player_DM.height = this.Frame.Height;
    };

    this.OnNewPlayer_Video = function()
    {
        this.Video = document.createElement('video');
        this.Video.Form = this;
        if(this.Setup.FullScreen)this.OnFullScreen();
        this.Video.onended = function(){this.Form.OnWebTVEnded()};
    };
    this.OnNewPlayer_YT = function(videoid)
    {
        if(this.Div_Player == null)this.OnNewDivPlayer();
        this.Player = new YT.Player('Div_Player', {
            width: (this.Frame.Width-this.Border.Left-this.Border.Right).toString(),
            height: (this.Frame.Height-this.Border.Top-this.Border.Bottom).toString(),
            videoId: videoid,
          playerVars: { 'rel': 0, 'showinfo': 0, 'modestbranding': 1, 'enablejsapi': 1, 'controls': 0},//, 'showinfo': 0, 'boder': 1, 'controls': 0, 'color1': 0xFF0000, 'color2': 0xf8af18  },// { 'autoplay': 1, 'controls': 0 },iv_load_policy
            events: {
                'onReady': this.OnPlayerReady,
                'onStateChange': this.OnPlayerStateChange,
                'onError': this.OnPlayerError
            }
        });
        this.Player.Form = this;
    };
    this.OnNewPlayer_DM = function(videoid)
    {
        if(this.Div_Player_DM == null)this.OnNewDivPlayer_DM();
        this.Player_DM = DM.player(document.getElementById('Div_Player_DM'), {video: 'xwr14q',params: {autoplay:true} });
        this.Player_DM.style.position = 'absolute';
        this.Player_DM.style.left = this.Frame.X+"px";
        this.Player_DM.style.top = this.Frame.Y+"px";
        this.Player_DM.width = this.Frame.Width;
        this.Player_DM.height = this.Frame.Height;
        
//        this.Player_DM.addEventListener('ad_end', function(){WebTV.OnWebTVEnded();})
        this.Player_DM.addEventListener('video_end', this.OnWebTVEnded)
//        this.Player_DM.addEventListener('end', function(){WebTV.OnWebTVEnded();})
    };
    this.OnPlayerReady = function(event)
    {
        event.target.playVideo();
        event.target.seekTo(event.target.Form.WebTVJSON.Media.StartSeconds);
        event.target.Form.SetVolume(event.target.Form.Volume);
    }
    this.OnPlayerStateChange = function(event)
    {
        if (event.data == YT.PlayerState.PLAYING){}
        if (event.data == YT.PlayerState.PAUSED){event.target.playVideo();}
        if (event.data == YT.PlayerState.ENDED){event.target.Form.OnWebTVEnded();}
    };
    this.OnPlayerError = function(event)
    {
        if (event.data == 2){}//Mauvais ID
        if (event.data == 100){}// impossible de trouver la vidéo demandée
        if (event.data == 101){}//le propriétaire de la vidéo demandée n'autorise pas sa lecture dans des lecteurs intégrés.
        if (event.data == 150){}//Il s'agit simplement d'une erreur 101 masquée.
    };
    this.Moved =function()
    {
        if(this.WebTVJSON == null)return;
        if(this.WebTVJSON.Media.VideoPlayer == "Video")
        {
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Youtube")
        {
            this.Player.style.left = this.Frame.X+"px";
            this.Player.style.top = this.Frame.Y+"px";
//            this.Player.setSize(this.Frame.Width-this.Border.Left-this.Border.Right, this.Frame.Height-this.Border.Top-this.Border.Bottom)
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Dailymotion")
        {
        }
    };
    this.Resized = function()
    {
        if(this.WebTVJSON == null)return;
        if(this.WebTVJSON.Media.VideoPlayer == "Video")
        {
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Youtube")
        {
            this.Player.setSize(this.Frame.Width-this.Border.Left-this.Border.Right, this.Frame.Height-this.Border.Top-this.Border.Bottom)
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Dailymotion")
        {
        }
    };

    this.WebTVJSONDelete = function(mediatype)
    {
        if(Control_IsFullScreen())Control_ExitFullScreen();
        if(mediatype == "Video")
        {
            this.Video.pause();
            this.Video.src = "";
        }
        else if(mediatype == "Youtube")
        {
            this.Player.destroy();
            this.Player = null;
        }
        else if(mediatype == "Dailymotion")
        {
            this.Player_DM.style.display = "none";//"block"
        }
    };

    this.OnVideoFullScreen = this.OnFullScreen;
    this.OnFullScreen = function()
    {
        if(this.WebTVJSON == null)return;
        var elem = null;
        if(this.WebTVJSON.Media.VideoPlayer == "Video")
        {
            this.OnVideoFullScreen();
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Youtube")
        {
//        alert(this.Player.allowfullscreen);
//this.Player.toggleFullscreen()  ;
//        this.Player.enterFullscreen();
//        mozRequestFullScreen.bind('Div_Player')();
//            this.Player.allowfullscreen = true;
//        alert(this.Player.allowfullscreen);
//            this.Player.Fullscreen();
//            elem = this.Player;
            elem = this.Div_Player;
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Dailymotion")
        {
            this.Player_DM.setFullscreen(true);
            //elem = this.Player_DM;
        }
        if(elem != null)
        {
            if (elem.requestFullscreen)
                elem.requestFullscreen();
            else if(elem.webkitRequestFullScreen)
                elem.webkitRequestFullScreen();
            else if(elem.msRequestFullscreen)
                elem.msRequestFullscreen();
            else if(elem.mozRequestFullScreen)
                elem.mozRequestFullScreen();
    //        else if (elem.oRequestFullScreen)
    //            elem.oRequestFullScreen();
        }
        this.Setup.FullScreen = true;
    };

    this.GetCurrentTime = function()
    {
        if(this.WebTVJSON == null)return 0;
        var num = 0;
        if(this.WebTVJSON.Media.VideoPlayer == "Video")
        {
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Youtube")
        {
            if(this.Player.getCurrentTime)
                num = this.Player.getCurrentTime() - this.WebTVJSON.Media.StartSeconds;
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Dailymotion")
        {
        }
        return num;
    };
    this.GetVideoLoaded = function()
    {
        if(this.WebTVJSON == null)return 0;
        var num = 0;
        if(this.WebTVJSON.Media.VideoPlayer == "Video")
        {
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Youtube")
        {
            if(this.Player.getVideoLoadedFraction)
                num = this.Player.getVideoLoadedFraction();
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Dailymotion")
        {
        }
        return num;
    };

    this.SetVolume = function(volume)
    {
        if(this.WebTVJSON == null)return;
        this.Volume = volume;
        if(this.WebTVJSON.Media.VideoPlayer == "Video")
        {
            if(this.Video != null)this.Video.Volume = volume/100;
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Youtube")
        {
            this.Player.setVolume(volume);
            if(this.Player.isMuted())this.Player.unMute();
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Dailymotion")
        {
            this.Player_DM.setVolume(volume/100);
        }
    };
    this.Speed = function(ratio)
    {
        if(this.WebTVJSON == null)return 0;
        if(this.WebTVJSON.Media.VideoPlayer == "Video")
        {
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Youtube")
        {
            this.Player.setPlaybackRate(ratio);
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Dailymotion")
        {
        }
    };
    this.Quality = function(quality)
    {
        if(this.WebTVJSON == null)return 0;
        if(this.WebTVJSON.Media.VideoPlayer == "Video")
        {
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Youtube")
        {
            this.Player.setPlaybackQuality(quality);
        }
        else if(this.WebTVJSON.Media.VideoPlayer == "Dailymotion")
        {
        }
    };

    this.ClickLeft = function()
    {
        if(Control_IsFullScreen()) Control_ExitFullScreen();
        else this.OnFullScreen();
    };
    this.ClickLeftUp = function(){};
    this.ClickRight = function(){};
    this.ClickRightUp = function(){};

    this.Draw = function(x, y, width, height, context)
    {
        if(this.WebTVJSON != null && this.WebTVJSON.Media.VideoPlayer == "Video" && this.Video.src != "")
        {
            context.drawImage(this.Video, x+this.Border.Left, y+this.Border.Top, width-this.Border.Right-this.Border.Left, height-this.Border.Top-this.Border.Bottom);
        }
    };

};

