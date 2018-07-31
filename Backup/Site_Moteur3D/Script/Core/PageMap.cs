using System;
using Core.Utility;

namespace Core
{
    public partial class PageMap : PageBase
    {
        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
        }
        protected override void FindPageInfo()
        {
            base.FindPageInfo();
        }
        protected virtual void SendWorld() { if (PageInfo.World != null) { PageInfo.Map = null; Add(new MsgJSON_World("WORLD", PageInfo.World)); } }
        protected virtual void SendMap() { if (PageInfo.Map != null)Add(new MsgJSON_Map("MAP", PageInfo.Map)); }
        protected virtual void SendEntitys() { if (PageInfo.Map != null)Add(new MsgJSON_Entitys("ENTITYS", PageInfo.Map.EntityJSON)); }

        protected virtual void SendPlayAnimations()
        {
            if (PageInfo.Index_Animations >= PageInfo.Map.PlayAnimations.Length) return;
            Animation[] playAnimations = PageInfo.Map.PlayAnimations;
            Animation[] playanimation = new Animation[playAnimations.Length - PageInfo.Index_Animations];
            for (int i = PageInfo.Index_Animations; i < playAnimations.Length; i++)
            {
                playanimation[i - PageInfo.Index_Animations] = playAnimations[i];
            }
            PageInfo.Index_Animations = playAnimations.Length;
            SendPlayAnimations(playanimation);
        }
        public override void CallPage(string[] str)
        {
            base.CallPage(str);
            if (str[0] == "SELECTED")
                Selected(str);
            else if (str[0] == "MOVE")
                Move(str);
            else if (str[0] == "CONTAINER")
                OnContainer(str);
            else if (str[0] == "POWER")
                Power(str);
            else if (str[0] == "MAP")
                Map(str);
            else if (str[0] == "WORLD")
                World(str);
            else if (str[0] == "WORLD_TRANSLATORS")
                DownloadWorldTranslators(str);
            else if (str[0] == "WORLD_ANIMATIONS")
                DownloadWorldAnimations(str);
            else if (str[0] == "WORLD_TEMPLATES")
                DownloadWorldTemplates(str);
            else if (str[0] == "LOADWORLD")
                LoadWorld(str);
            else if (str[0] == "LOADCUBES")
                LoadCubes(str);
            else if (str[0] == "PERMANENTS")
                LoadPermanents(str);
        }
        public override void Loop(string[] str)
        {
            SendEntitys();
            SendChats();
            Add(new MessageJSON("LOOP"));
            if (PageInfo.Map != null)
                SendPlayAnimations();
        }
        public virtual void Selected(string[] str)
        {
            if (str.Length < 3) return;
            Entity entity = PageInfo.Map.FindEntity(str[1]);
            Entity target = PageInfo.Map.FindEntity(str[2]);

            MessageJSON[] MessagesJSON = null;
            if (target != null)
            {
                MessagesJSON = target.OnSelected(entity);

                if (MessagesJSON != null)
                    for (int i = 0; i < MessagesJSON.Length; i++)
                        Add(MessagesJSON[i]);

                for (var i = 0; i < target.Containers.Length; i++)
                    Add(new MsgJSON_Container("CONTAINER", new ContainerJSON(target.Containers[i])));
            }
        }
        public virtual void Move(string[] str)
        {
            if (str.Length < 7) return;
            //if (GameInfo.LastMove > DateTime.Now) return;
            //GameInfo.LastMove = DateTime.Now + TimeSpan.FromMilliseconds(1000);
            if (PageInfo == null || PageInfo.Map == null) return;
            Entity entity = PageInfo.Map.FindEntity(str[1]);
            int x = StringToInt(str[2]);
            int y = StringToInt(str[3]);
            int z = StringToInt(str[4]);
            int adj_X = StringToInt(str[5]);
            int adj_Y = StringToInt(str[6]);

            if (entity != null)
            {
                //if (entity.Move != null)
                //{
                //    Point3D p = entity.Move.Street[entity.Move.Street.Length - 1];
                //    if (p.X == x && p.Y == y && p.Z == z) return;
                //}
                entity.MoveTo(x, y, z, adj_X, adj_Y);
                for (int i = 0; i < PageInfo.Map.EntityJSON.Length; i++)
                    if (entity.ID == PageInfo.Map.EntityJSON[i].ID)
                        PageInfo.Map.EntityJSON[i].Move = entity.Move;

                //entity.MoveTo(StringToInt(str[2]), StringToInt(str[3]), StringToInt(str[4]), StringToInt(str[5]), StringToInt(str[6]));
                Add(new MsgJSON_Object("ENTITY", entity.JSON));
            }
        }
        public virtual void OnContainer(string[] str)
        {
            if (str.Length < 7) return;
            Entity src = PageInfo.Map.FindEntity(str[2]);
            Entity dest = PageInfo.Map.FindEntity(str[5]);
            if (src == null || dest == null) return;

            Container src_C = src.Container(str[1]);
            Container dest_C = dest.Container(str[4]);
            if (src_C == null || dest_C == null) return;

            int index_src = StringToInt(str[3]);
            int index_dest = StringToInt(str[6]);

            Entity temp = src_C.Entitys[index_src];
            if (src_C.Remove(index_src))
                if (!dest_C.AddRange(temp, index_dest))
                    src_C.AddRange(temp, index_src);

            Add(new MsgJSON_Container("CONTAINER", new ContainerJSON(src_C)));
            if (src_C != dest_C)
                Add(new MsgJSON_Container("CONTAINER", new ContainerJSON(dest_C)));
        }
        public virtual void Power(string[] str)
        {
            if (str.Length < 4) return;
            Mobile mobile = PageInfo.Map.FindEntity(str[2]) as Mobile;
            if (mobile == null) return;
            Entity target = null;
            if (str[3] != "")
                target = PageInfo.Map.FindEntity(str[3]);

            MessageJSON[] MessagesJSON = mobile.OnUsePower(str[1], target, StringToInt(str[4]), StringToInt(str[5]), StringToInt(str[6]), StringToInt(str[7]), StringToInt(str[8]));
            for (int i = 0; i < MessagesJSON.Length; i++)
                Add(MessagesJSON[i]);
        }
        public virtual void World(string[] str)
        {
            SendWorld();
        }
        public virtual void DownloadWorldTranslators(string[] str)
        {
            if (str.Length < 2) return;
            if (PageInfo.World == null) return;
            int index = StringToInt(str[1]);
            Add(new MsgJSON_Object(str[0], PageInfo.World.Translators[index]));
        }
        public virtual void DownloadWorldAnimations(string[] str)
        {
            if (str.Length < 2) return;
            if (PageInfo.World == null) return;
            int index = StringToInt(str[1]);
            Add(new MsgJSON_Object(str[0], PageInfo.World.Animations[index]));
        }
        public virtual void DownloadWorldTemplates(string[] str)
        {
            if (str.Length < 2) return;
            if (PageInfo.World == null) return;
            int index = StringToInt(str[1]);
            Add(new MsgJSON_Object(str[0], PageInfo.World.Templates[index]));
        }
        public virtual void LoadWorld(string[] str)
        {
            if (str.Length < 3) return;
            string keyword = str[1];
            int index = StringToInt(str[2]);
            if (PageInfo.World == null) return;
            if (keyword == "TRANSLATORS")
                Add(new MsgJSON_Object(keyword, PageInfo.World.Translators[index]));
            else if (keyword == "ANIMATIONS")
                Add(new MsgJSON_Object(keyword, PageInfo.World.Animations[index]));
            else if (keyword == "TEMPLATES")
                Add(new MsgJSON_Object(keyword, PageInfo.World.Templates[index]));
        }
        public virtual void Map(string[] str)
        {
            if (str.Length < 2) return;
            string name = str[1];
            if (PageInfo.World == null || PageInfo.World.Maps.Length == 0) return;
            if (name == string.Empty)
                PageInfo.Map = PageInfo.World.Maps[0];
            else
                PageInfo.Map = PageInfo.World.FindMap(name);

            if (PageInfo.Map != null)
                SendMap();
        }
        public virtual void LoadCubes(string[] str)
        {
            if (str.Length < 2) return;
            int index = StringToInt(str[1]);
            if (PageInfo.Map != null)
                Add(PageInfo.Map.MessageCubes[index]);
        }
        public virtual void LoadPermanents(string[] str)
        {
            if (str.Length < 2) return;
            int index = StringToInt(str[1]);
            if (PageInfo.Map != null)
                Add(PageInfo.Map.MessagePermanents[index]);
        }
        public override void Init_Hidden()
        {
            if (PageInfo != null) ResizeInterface();
            base.Init_Hidden();
        }

        //public void GridOnOff(object sender, EventArgs e) { GameInfo.Interface.Grid = !GameInfo.Interface.Grid; }

        protected void ResizeInterface()
        {
            //GameInfo.Interface.Centred.X = -50;// (GameInfo.Interface.SizeCube * GameInfo.Interface.NbrCube) - (GameInfo.Interface.SizeCube);
            //GameInfo.Interface.Centred.Y = -50;// GameInfo.Interface.Centred.X / 2;
            PageInfo.Frame.Height = 20 * 30;// PageInfo.MapInfo.SizeCube * 30;// GameInfo.Interface.NbrCube;
            PageInfo.Frame.Width = PageInfo.Frame.Height * 2;
        }


    }
}