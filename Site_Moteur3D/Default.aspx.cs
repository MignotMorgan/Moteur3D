using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

using Core.Utility;
using System.Drawing;
namespace Core
{
    public partial class Default : PageBase
    {
        protected override void Page_Load(object sender, EventArgs e)
        {
            base.Page_Load(sender, e);
        }

        public override void CallPage(string[] str)
        {
            base.CallPage(str);

            //if (str[0] == "DEFAULT_INIT")
            //    Default_Init(str);
        }

        public void DemoControl_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/DemoControl.aspx");
        }

        public void Forum_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/PageForum.aspx");
        }

        public void HeroesClick(object sender, EventArgs e)
        {

            if (Univers.Worlds.Length > 0)
                PageInfo.World = Univers.Worlds[0];
            if (PageInfo.World == null) return;
            if (PageInfo.World.Maps.Length > 0)
                PageInfo.Map = PageInfo.World.Maps[0];
            if (PageInfo.Map == null) return;

            string name = "Personnage";
            Mobile entity = PageInfo.Map.FindEntity(name) as Mobile;
            if (entity == null)
            {
                entity = new PlayerMobile();
                entity.Name = entity.ID = name;
                //entity.Move.Speed = 1000;
                entity.Add(new Core.Utility.Container("Sac", entity.ID, 4, 4));
                entity.CanMove = true;
                entity.CanTarget = true;
                entity.Cross = true;
                ((PlayerMobile)entity).Add(new Power_Aggro());
                ((PlayerMobile)entity).Add(new Power_Melee());
                ((PlayerMobile)entity).Add(new Power_Archery());
                ((PlayerMobile)entity).Add(new Power_Heal());
                ((PlayerMobile)entity).Add(new Power_Jump());
                ((PlayerMobile)entity).Add(new Power_Throw());
                entity.MoveToMap(0, 0, 0, PageInfo.Map);
            }
            PageInfo.Players = new string[] { name };

            Rectangle3D rec = new Rectangle3D(0, 0, 0, 10, 10, 3);
            //Rectangle3D rec = new Rectangle3D(4, 4, 0, 6, 6, 3);
            PageInfo.Map.Add(rec);

            Response.Redirect("~/PageHeroes.aspx");
        }
        public void Editor_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/PageEditor.aspx");
        }
        public void PageTV_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/PageTV.aspx");
        }
        public void PageTVEditor_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/PageTVEditor.aspx");
        }

        public void SharizClick(object sender, EventArgs e)
        {

            if (Univers.Worlds.Length > 0)
                PageInfo.World = Univers.Worlds[0];
            if (PageInfo.World == null) return;
            if (PageInfo.World.Maps.Length > 0)
                PageInfo.Map = PageInfo.World.Maps[0];
            if (PageInfo.Map == null) return;

            string name = "Shariz";
            Mobile entity = PageInfo.Map.FindEntity(name) as Mobile;
            if (entity == null)
            {
                entity = new PlayerMobile();
                entity.Name = entity.ID = name;
                //entity.Move.Speed = 1000;
                entity.Add(new Core.Utility.Container("Sac", entity.ID, 4, 4));
                entity.CanMove = true;
                entity.CanTarget = true;
                entity.Cross = true;
                ((PlayerMobile)entity).Add(new Power_Aggro());
                ((PlayerMobile)entity).Add(new Power_Melee());
                ((PlayerMobile)entity).Add(new Power_Archery());
                ((PlayerMobile)entity).Add(new Power_Heal());
                ((PlayerMobile)entity).Add(new Power_Jump());
                ((PlayerMobile)entity).Add(new Power_Throw());
                entity.MoveToMap(0, 15, 0, PageInfo.Map);
            }
            PageInfo.Players = new string[] { name };

            //Rectangle3D rec = new Rectangle3D(0, 0, 0, 10, 10, 3);
            //Rectangle3D rec = new Rectangle3D(4, 4, 0, 6, 6, 3);
            //PageInfo.Map.Add(rec);

            for (int i = 0; i < 1; i++)
            {
                entity = new Mobile();
                entity.AI = new AI();
                entity.AI.Entity = entity;
                entity.Height = 0.5F;
                entity.Name = entity.ID = "monster_"+i;
                //entity.Move.Speed = 1000;
                //entity.Add(new Core.Utility.Container("Sac", entity.ID, 4, 4));
                entity.CanMove = true;
                entity.CanTarget = true;
                entity.Cross = true;
                //((PlayerMobile)entity).Add(new Power_Aggro());
                //((PlayerMobile)entity).Add(new Power_Melee());
                //((PlayerMobile)entity).Add(new Power_Archery());
                //((PlayerMobile)entity).Add(new Power_Heal());
                //((PlayerMobile)entity).Add(new Power_Jump());
                //((PlayerMobile)entity).Add(new Power_Throw());
                entity.MoveToMap(25, 25, 0, PageInfo.Map);

            }


            Response.Redirect("~/PageHeroes.aspx");
        }







        public void EditorTV_Channel_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/Script/WebTV/EditorTV_Channel.aspx");
        }


    }
}
