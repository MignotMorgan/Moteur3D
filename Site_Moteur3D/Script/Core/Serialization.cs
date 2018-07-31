using System;
using System.Xml;
using System.Text;
using Core.Utility;

namespace Core
{
    public class SerializationWriter
    {
        Encoding Encoding = Encoding.UTF8;
        XmlTextWriter writer;

        public SerializationWriter(string path)
        {
            writer = new XmlTextWriter(path, Encoding);
        }
        public void Start(string text)
        {
            writer.WriteStartDocument(true);
            writer.WriteStartElement(text);
        }
        public void End()
        {
            writer.WriteEndElement();
            writer.WriteEndDocument();
            writer.Flush();
            writer.Close();
        }
        public void WriteStartElement(string name)
        {
            writer.WriteStartElement(name);
        }
        public void WriteEndElement()
        {
            writer.WriteEndElement();
        }
        public void WriteVersion(int value)
        {
            Write("Version", value.ToString());
        }
        public void WriteType(object obj)
        {
            Write(Info.type, obj.GetType().FullName);
        }
        public void WriteEmpty()
        {
            WriteStartElement("Empty");
            WriteEndElement();
        }
        public void Write(string name, string value)
        {
            writer.WriteElementString(name, value);
        }
        public void Write(string name, int value)
        {
            writer.WriteElementString(name, value.ToString());
        }
        public void Write(string name, bool value)
        {
            writer.WriteElementString(name, value ? Info.True : Info.False);
        }
        public void Write(string name, float value)
        {
            writer.WriteElementString(name, value.ToString());
        }
        public void Write(string name, double value)
        {
            writer.WriteElementString(name, value.ToString());
        }
        public void Write(string name, TimeSpan value)
        {
            writer.WriteElementString(name, value.ToString());
        }
        public void Write(string name, DateTime value)
        {
            writer.WriteElementString(name, value.ToString());
        }
        public void WriteJSON(string name, object value)
        {
            writer.WriteElementString(name, Info.JSONSerialize(value));
        }
        public void WriteJSONList(string name, object[] list)
        {
            WriteStartElement("List");
            Write("Length", list.Length);
            for (int i = 0; i < list.Length; i++)
            {
                if (list[i] != null)
                    WriteJSON(name, list[i]);
                else
                    WriteEmpty();
            }
            WriteEndElement();
        }

        public void WriteCData(string value)
        {
            writer.WriteCData(value);
        }

        public void Write(string name, string[] list)
        {
            WriteStartElement(name);
            Write("Length", list.Length);
            for (int i = 0; i < list.Length; i++)
            {
                if (list[i] != null && list[i] != "")
                    WriteCData(list[i]);
                else
                    WriteEmpty();
            }
            WriteEndElement();
        }
        public void Write(string name, ID id)
        {
            WriteStartElement(name);

            if (id != null)
            {
                WriteType(id);
                id.Save(this);
            }

            WriteEndElement();
        }
        public void Write(string name, Point3D point3D)
        {
            WriteStartElement(name);
            if (point3D != null)
            {
                Write("X", point3D.X);
                Write("Y", point3D.Y);
                Write("Z", point3D.Z);
            }
            WriteEndElement();
        }
        public void Write(string name, Animation animation)
        {
            WriteStartElement(name);

            if (animation != null)
            {
                WriteType(animation);
                //id.Save(this);
                Write("ID", animation.Name);
                //Write("Step", animation.Step);
                //Write("Entity_Src", animation.Entity_Src);
                //Write("Entity_Dest", animation.Entity_Dest);
                //Write("Cube_Src", animation.Cube_Src);
                //Write("Cube_Dest", animation.Cube_Dest);
                //Write("Start", animation.Start);
                Write("Duration", animation.Duration);
                Write("X", animation.X);
                Write("Y", animation.Y);
                Write("Width", animation.Width);
                Write("Height", animation.Height);
                Write("ImageJSON", animation.Image);
                Write("Text", animation.Text);

                Write("Length", animation.Effects.Length);
                for (int i = 0; i < animation.Effects.Length; i++)
                {
                    Write("KeyName", animation.Effects[i].KeyName);
                    Write("Start", animation.Effects[i].Start);
                    Write("End", animation.Effects[i].End);
                    Write("Text", animation.Effects[i].Text);
                    Write("Number", animation.Effects[i].Number);
                }
            }
            WriteEndElement();
        }

        public void Write(Cube[, ,] Cubes)
        {
            WriteStartElement("Cubes");
            foreach (Cube c in Cubes)
                if (c != null)
                {
                    WriteStartElement("Element");
                    c.Save(this);
                    WriteEndElement();
                }
            WriteEndElement();
        }
        public void Write(Entity[] list)
        {
            WriteStartElement("Entitys");
            for (int i = 0; i < list.Length; i++)
                if (list[i] != null)
                {
                    WriteStartElement("Element");
                    list[i].Save(this);
                    WriteEndElement();
                }
            WriteEndElement();
        }
        public void Write(string name, Container[] list)
        {
            WriteStartElement(name);
            Write("Length", list.Length);
            for (int i = 0; i < list.Length; i++)
                if (list[i] != null)
                    list[i].Save(this);
                else
                    WriteEmpty();
            WriteEndElement();
        }
        public void Write(string name, ImageJSON[] list)
        {
            WriteStartElement(name);
            Write("Length", list.Length);
            for (int i = 0; i < list.Length; i++)
                if (list[i] != null)
                    Write("ImageJSON", list[i]);
            WriteEndElement();
        }
        public void Write(string name, ImageJSON imagejson)
        {
            WriteStartElement(name);
            if (imagejson != null)
            {
                Write("Name", imagejson.Name);
                Write("nbrX", imagejson.NbrX);
                Write("nbrY", imagejson.NbrY);
            }
            WriteEndElement();
        }
        public void Write(string name, BodyJSON bodyjson)
        {
            WriteStartElement(name);
            if (bodyjson != null)
            {
                Write("Images", bodyjson.Images);
                Write("Animated", bodyjson.Animated);
                Write("Turned", bodyjson.Turned);
                Write("Speed", bodyjson.Speed);
                Write("Duration", bodyjson.Duration);
            }
            WriteEndElement();
        }
        //public void Write(string name, MoveJSON move)
        //{
        //    WriteStartElement(name);
        //    //Write("Step", move.Step);
        //    Write("Speed", move.Speed);
        //    //Write("X", move.Adjustment.X);
        //    //Write("Y", move.Adjustment.Y);
        //    Write("Length", move.Street.Length);
        //    for (int i = 0; i < move.Street.Length; i++)
        //    {
        //        Write("X", move.Street[i].X);
        //        Write("Y", move.Street[i].Y);
        //        Write("Z", move.Street[i].Z);
        //    }
        //    WriteEndElement();
        //}
        public void Write(Rectangle3D[] list)
        {
            writer.WriteStartElement("Rectangles");
            for (int i = 0; i < list.Length; i++)
            {
                WriteStartElement("Element");
                Write("X", list[i].X);
                Write("Y", list[i].Y);
                Write("Z", list[i].Z);
                Write("Width", list[i].Width);
                Write("Height", list[i].Height);
                Write("Depth", list[i].Depth);
                WriteEndElement();
            }
            writer.WriteEndElement();
        }
        //public void Write(string name, Translator[] list)
        //{
        //    WriteStartElement(name);
        //    Write("Length", list.Length);
        //    for (int i = 0; i < list.Length; i++)
        //        if (list[i] != null)
        //            list[i].Save(this);
        //    WriteEndElement();
        //}
        //public void Write(Translate[] list)
        //{
        //    WriteStartElement("Translates");
        //    for (int i = 0; i < list.Length; i++)
        //        if (list[i] != null)
        //        {
        //            WriteStartElement("Element");
        //            Write("Key", list[i].Key);
        //            Write("Text", list[i].Text);
        //            WriteEndElement();
        //        }
        //    WriteEndElement();
        //}
        //public void Write(TemplateJSON[] list)
        //{
        //    WriteStartElement("Templates");
        //    Write("Length", list.Length);
        //    for (int i = 0; i < list.Length; i++)
        //        if (list[i] != null)
        //            WriteJSON("TemplateJSON", list[i]);
        //    WriteEndElement();
        //}

        //public void Write(string name, Forum.ForumCommentary[] list)
        //{
        //    WriteStartElement(name);
        //    Write("Length", list.Length);
        //    for (int i = 0; i < list.Length; i++)
        //        if (list[i] != null)
        //            list[i].Save(this);
        //    //Write("Response", list[i]);
        //    WriteEndElement();
        //}

        //public void Write(string name, Forum.ForumMessage2[] list)
        //{
        //    WriteStartElement(name);
        //    Write("Length", list.Length);
        //    for (int i = 0; i < list.Length; i++)
        //        if (list[i] != null)
        //            list[i].Save(this);
        //    //Write("Response", list[i]);
        //    WriteEndElement();
        //}
        //public void Write(string name, Forum.ForumMessage response)
        //{
        //    WriteStartElement(name);
        //    if (response != null)
        //    {
        //        Write("Author", response.Author);
        //        Write("Create", response.Create);
        //        Write("Message", response.Message);
        //    }
        //    WriteEndElement();
        //}
    }
    public class SerializationReader
    {
        XmlReader reader;
        public SerializationReader(string path)
        {
            reader = XmlReader.Create(path);
        }
        public void Close() { reader.Close(); }
        public bool IsType()
        {
            return reader.Name == Info.type;
        }
        public object ReadType()
        {
            return Info.Instance(reader.ReadElementString());
        }
        public bool Read() { return reader.Read(); }
        public string Name { get { return reader.Name; } }
        public XmlNodeType NodeType { get { return reader.NodeType; } }
        public bool IsDeclaration() { return NodeType == XmlNodeType.XmlDeclaration; }
        public bool IsStartElement() { return reader.IsStartElement(); }
        public bool IsEndElement() { return NodeType == XmlNodeType.EndElement; }
        //public bool IsEmpty() { if (Name == "Empty" && IsEndElement()) { ReadEndElement(); return; } }
        public void ReadDeclaration() { if (IsDeclaration()) Read(); }
        public void ReadStartElement() { if (IsStartElement())Read(); }
        public void ReadEndElement() { if (IsEndElement())Read(); }
        public bool IsEmptyElement { get { return reader.IsEmptyElement; } }
        public void Start()
        {
            Read();
            ReadDeclaration();
            ReadStartElement();
        }
        public void End()
        {
            Close();
        }
        public string ReadString()
        {
            return reader.ReadElementString();
        }
        public int ReadVersion()
        {
            return ReadInt();
        }
        public int ReadInt()
        {
            return reader.ReadElementContentAsInt();
        }
        public bool ReadBool()
        {
            return reader.ReadElementString() == Info.True ? true : false;
        }
        public float ReadFloat()
        {
            return float.Parse(reader.ReadElementString());// reader.ReadElementContentAsFloat();
        }
        public double ReadDouble()
        {
            return reader.ReadElementContentAsDouble();
        }
        public TimeSpan ReadTimeSpan()
        {
            return TimeSpan.Parse(reader.ReadElementString());
        }
        public DateTime ReadDateTime()
        {
            return DateTime.Parse(reader.ReadElementString());
            //return DateTime.TryParse(reader.ReadElementContentAsDateTime());
        }
        public T ReadJSON<T>()
        {
            return (T)(Info.JSONDeserialize<T>(ReadString()));
        }
        public T[] ReadJSONList<T>()
        {
            ReadStartElement();
            int length = ReadInt();
            T[] list = new T[length];
            for (int i = 0; i < length; i++)
            {
                if (IsEmptyElement) { Read(); continue; }
                list[i] = ReadJSON<T>();
            }
            ReadEndElement();
            return list;
        }

        public string ReadCData()
        {
            string value = reader.Value;
            Read();
            return value;
        }
        public string[] ReadStringList()
        {
            ReadStartElement();
            int length = ReadInt();
            string[] list = new string[length];
            for (int i = 0; i < length; i++)
            {
                if (IsEmptyElement) { Read(); continue; }
                list[i] = ReadCData();
            }
            ReadEndElement();
            return list;
        }

        public ID ReadID()
        {
            if (IsEmptyElement) { Read(); return null; }
            ReadStartElement();

            ID id = ReadType() as ID;
            id.Load(this);

            ReadEndElement();
            return id;
        }
        public Point3D ReadPoint3D()
        {
            if (IsEmptyElement) { Read(); return null; }
            ReadStartElement();
            Point3D point3D = new Point3D();
            point3D.X = ReadInt();
            point3D.Y = ReadInt();
            point3D.Z = ReadInt();
            ReadEndElement();
            return point3D;
        }
        public Animation ReadAnimation()
        {
            if (IsEmptyElement) { Read(); return null; }
            ReadStartElement();

            Animation animation = ReadType() as Animation;
            animation.Name = ReadString();
            //animation.Step = ReadString();
            //animation.Entity_Src = ReadString();
            //animation.Entity_Dest = ReadString();
            //animation.Cube_Src = ReadPoint3D();
            //animation.Cube_Dest = ReadPoint3D();
            //animation.Start = ReadImageJSON();
            animation.Duration = ReadInt();
            animation.X = ReadInt();
            animation.Y = ReadInt();
            animation.Width = ReadInt();
            animation.Height = ReadInt();
            animation.Image = ReadImageJSON();
            animation.Text = ReadString();

            int length = ReadInt();
            animation.Effects = new Effect[length];
            for (int i = 0; i < length; i++)
            {
                animation.Effects[i] = new Effect();
                animation.Effects[i].KeyName = ReadString();
                animation.Effects[i].Start = ReadInt();
                animation.Effects[i].End = ReadInt();
                animation.Effects[i].Text = ReadString();
                animation.Effects[i].Number = ReadInt();           
            }
            ReadEndElement();
            return animation;
        }

        public void ReadCubes(Map map)
        {
            if (IsEmptyElement) { Read(); return; }
            while (Read())
            {
                if (Name == "Cubes" && IsEndElement()) { ReadEndElement(); return; }
                if (IsType())
                {
                    Cube c = ReadType() as Cube;
                    c.Load(this);//, map);
                    map.Add(c);
                }
            }
        }
        public void ReadEntitys(Map map)
        {
            if (IsEmptyElement) { Read(); return; }
            while (Read())
            {
                if (Name == "Entitys" && IsEndElement()) { ReadEndElement(); return; }
                if (IsType())
                {
                    Entity entity = ReadType() as Entity;
                    entity.Load(this);
                }
            }
        }
        public Container[] ReadContainers()
        {
            ReadStartElement();
            int length = ReadInt();
            Container[] list = new Container[length];
            for (int i = 0; i < length; i++)
            {
                if (IsEmptyElement) { Read(); continue; }
                Container container = ReadType() as Container;
                container.Load(this);
                list[i] = container;
            }
            ReadEndElement();
            return list;
        }
        public ImageJSON[] ReadImagesJSON()
        {
            ReadStartElement();
            int length = ReadInt();
            ImageJSON[] imgjson = new ImageJSON[length];
            for (int i = 0; i < length; i++)
                imgjson[i] = ReadImageJSON();
            ReadEndElement();
            return imgjson;
        }
        public ImageJSON ReadImageJSON()
        {
            if (IsEmptyElement) { Read(); return null; }
            ReadStartElement();
            string name = ReadString();
            int nbrX = ReadInt();
            int nbrY = ReadInt();
            ReadEndElement();
            return new ImageJSON(name, nbrX, nbrY);
        }
        public BodyJSON ReadBodyJSON()
        {
            if (IsEmptyElement) { Read(); return null; }
            ReadStartElement();
            ImageJSON[] images = ReadImagesJSON();
            bool animated = ReadBool();
            bool turned = ReadBool();
            int speed = ReadInt();
            int duration = ReadInt();
            ReadEndElement();
            return new BodyJSON(images, animated, turned, speed, duration);
        }
        //public MoveJSON ReadMove()
        //{
        //    MoveJSON move = new MoveJSON();
        //    ReadStartElement();
        //    //move.Step = ReadInt();
        //    move.Speed = ReadInt();
        //    //move.Adjustment.X = ReadInt();
        //    //move.Adjustment.Y = ReadInt();
        //    int length = ReadInt();
        //    move.Street = new Point3D[length];
        //    for (int i = 0; i < length; i++)
        //    {
        //        int x = ReadInt();
        //        int y = ReadInt();
        //        int z = ReadInt();
        //        move.Street[i] = new Point3D(x, y, z);
        //    }
        //    ReadEndElement();
        //    return move;
        //}
        public void ReadRectangles3D(Map map)
        {
            if (IsEmptyElement) { Read(); return; }
            while (Read())
            {
                if (Name == "Rectangles" && IsEndElement()) { ReadEndElement(); return; }
                if (IsType())//?????
                {
                    Rectangle3D rec = ReadType() as Rectangle3D;
                    rec.X = ReadInt();
                    rec.Y = ReadInt();
                    rec.Z = ReadInt();
                    rec.Width = ReadInt();
                    rec.Height = ReadInt();
                    rec.Depth = ReadInt();

                    map.Add(rec);
                }
            }
        }
        //public Translator[] ReadTranslators()
        //{
        //    ReadStartElement();
        //    int length = ReadInt();
        //    Translator[] list = new Translator[length];
        //    for (int i = 0; i < length; i++)
        //    {
        //        list[i] = new Translator();
        //        list[i].Load(this);
        //    }
        //    ReadEndElement();
        //    return list;
        //}
        //public void ReadTranslates(Translator translator)
        //{
        //    if (IsEmptyElement) { Read(); return; }
        //    while (Read())
        //    {
        //        if (Name == "Translates" && IsEndElement()) { ReadEndElement(); return; }
        //        string key = ReadString();
        //        string txt = ReadString();
        //        translator.Add(new Translate(key, txt));
        //    }
        //}


        //public TemplateJSON[] ReadTemplates()
        //{
        //    ReadStartElement();
        //    int length = ReadInt();
        //    TemplateJSON[] list = new TemplateJSON[length];
        //    for (int i = 0; i < length; i++)
        //        list[i] = ReadJSON<TemplateJSON>();
        //    ReadEndElement();
        //    return list;
        //}
        //public Forum.ForumCommentary[] ReadForumCommentarys()
        //{
        //    ReadStartElement();
        //    int length = ReadInt();
        //    Forum.ForumCommentary[] responses = new Forum.ForumCommentary[length];
        //    for (int i = 0; i < length; i++)
        //    {
        //        responses[i] = new Forum.ForumCommentary();
        //        //responses[i] = ReadForumCommentary();
        //        responses[i].Load(this);
        //    }
        //    ReadEndElement();
        //    return responses;
        //}
        //public Forum.ForumMessage2[] ReadForumMessages()
        //{
        //    ReadStartElement();
        //    int length = ReadInt();
        //    Forum.ForumMessage2[] responses = new Forum.ForumMessage2[length];
        //    for (int i = 0; i < length; i++)
        //    {
        //        responses[i] = new Forum.ForumMessage2();
        //        //responses[i] = ReadForumMessage();
        //        responses[i].Load(this);
        //    }
        //    ReadEndElement();
        //    return responses;
        //}
        //public Forum.ForumMessage2 ReadForumMessage()
        //{
        //    if (IsEmptyElement) { Read(); return null; }
        //    ReadStartElement();
        //    Forum.ForumMessage2 forum = new Forum.ForumMessage2();
        //    forum.Author = ReadString();
        //    forum.Create = ReadDateTime().ToString();
        //    forum.Message = ReadString();
        //    ReadEndElement();
        //    return forum;
        //}
    }
}