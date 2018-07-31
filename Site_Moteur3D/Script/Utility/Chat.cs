
namespace Core.Utility
{
    public class Chat
    {
        public static Chat Default = new Chat("Default");

        public Chat() { }
        public Chat(string name) { Name = name; }

        public string Name = "";

        public ChatText[] Chats = new ChatText[0];
        public void Add(ChatText chat)
        {
            ChatText[] temp = new ChatText[Chats.Length + 1];
            for (int i = 0; i < Chats.Length; i++)
                temp[i] = Chats[i];
            temp[Chats.Length] = chat;
            Chats = temp;
        }


        //public void Remove(Chat chat)
        //{
        //    for (int i = 0; i < Chats.Length; i++)
        //        if (Chats[i] == chat)
        //        { Chats[i] = null; return; }
        //}
        //public Chat FindChat(string str) 
        //{
        //    for (int i = 0; i < Chats.Length; i++)
        //        if (Chats[i] != null && Chats[i].ID != null && Chats[i].ID.ToString() == str)
        //            return Chats[i];
        //    return null;
        //}



    }
    public class ChatText
    {
        public string Name = "";
        public string Text = "";
    }

}
