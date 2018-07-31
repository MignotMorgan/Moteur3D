<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Core.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Page sans titre</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:Button ID="btn_Forum" Text="Forum" OnClick="Forum_Click" runat="server" />
        <asp:Button ID="btn_Control" Text="DemoControl" OnClick="DemoControl_Click" runat="server" />
        <asp:Button ID="btn_PageTV" Text="WebTV" OnClick="PageTV_Click" runat="server" />
        <asp:Button ID="btn_PageTVEditor" Text="WebTvEditor" OnClick="PageTVEditor_Click" runat="server" />
        <asp:Button ID="btn_Heroes" Text="Heroes" OnClick="HeroesClick" runat="server" />
        <asp:Button ID="Button1" Text="Personnage Heroes" OnClick="SharizClick" runat="server" />
        <asp:Button ID="btn_Editor" Text="Editor" OnClick="Editor_Click" runat="server" />
    </div>
    </form>

	<script language="JavaScript" type="text/javascript" src="/PageWeb/PageBase.js"></script>
	<script language="JavaScript" type="text/javascript" src="/PageWeb/Control.js"></script>
	<script language="JavaScript" type="text/javascript" src="/PageWeb/Keyboard.js"></script>
	<script language="JavaScript" type="text/javascript" src="/PageWeb/Animation.js"></script>
	<script language="JavaScript" type="text/javascript" src="/PageWeb/Forum.js"></script>

	<script language="JavaScript" type="text/javascript" src="/Default.js"></script>
</body>
</html>
