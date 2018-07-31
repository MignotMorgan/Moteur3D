
namespace Core.Utility
{
    public class Translate
    {
        public string Key = string.Empty;
        public string Text = string.Empty;
        public Translate() { }
        public Translate(string key, string text) { Key = key; Text = text; }
    }
    public class Translator
    {
        public static Translator[] Translators = new Translator[0];
        public static void Add(Translator translator)
        {
            Translator[] temp = new Translator[Translators.Length + 1];
            for (int i = 0; i < Translators.Length; i++)
                temp[i] = Translators[i];
            temp[Translators.Length] = translator;
            Translators = temp;
        }
        public static Translator Find(string name, string culture)
        {
            for (int i = 0; i < Translators.Length; i++)
                if (Translators[i] != null && Translators[i].Name == name && Translators[i].Culture == culture)
                    return Translators[i];
            return null;
        }

        public string Name = string.Empty;
        public string Culture = string.Empty;

        public Translate[] Translates = new Translate[0];
        public void Add(Translate translate)
        {
            Translate[] temp = new Translate[Translates.Length + 1];
            for (int i = 0; i < Translates.Length; i++)
                temp[i] = Translates[i];
            temp[Translates.Length] = translate;
            Translates = temp;
        }
        public string this[int index] { get { return Translates[index] == null ? string.Empty : Translates[index].Text; } }
        public string this[string key]
        {
            get
            {
                for (int i = 0; i < Translates.Length; i++)
                    if (Translates[i] != null && Translates[i].Key == key)
                        return Translates[i].Text;
                return "ERROR";// key;// string.Empty;
            }
        }

        public override string ToString()
        {
            return Name + " [" + Culture + "]";
        }

        public virtual void Save(SerializationWriter SW)
        {
            SW.WriteStartElement("Translator");
            SW.WriteVersion(0);
            SW.Write("Name", Name);
            SW.Write("Culture", Culture);
            SW.Write("Length", Translates.Length);
            for (int i = 0; i < Translates.Length; i++)
                if (Translates[i] != null)
                {
                    SW.Write("Key", Translates[i].Key);
                    SW.Write("Text", Translates[i].Text);
                }
            SW.WriteEndElement();

        }
        public virtual void Load(SerializationReader SR)
        {
            SR.ReadStartElement();
            int version = SR.ReadVersion();
            switch (version)
            {
                case 0:
                    {
                        Name = SR.ReadString();
                        Culture = SR.ReadString();

                        int length = SR.ReadInt();
                        Translates = new Translate[length];
                        for (int i = 0; i < length; i++)
                        {
                            string key = SR.ReadString();
                            string text = SR.ReadString();
                            Translates[i] = new Translate(key, text);
                        }
                        break;
                    }
            }
            SR.ReadEndElement();
        }
    }
}
