
namespace Core.Utility
{
    public class Flag
    {
        public int Value = 0;
        public bool Get(int flag) { return ((Value & Flags[flag]) != 0); }
        public void Set(int flag, bool value) { if (value)Value |= Flags[flag]; else Value &= ~Flags[flag]; }
        public static bool IsFlag(int flags, int flag){ return ((flags & Flags[flag]) != 0); }
        public static int[] Flags = new int[]
        {
            0x00000000,
            0x00000001,
            0x00000002,
            0x00000004,
            0x00000008,
            0x00000010,
            0x00000020,
            0x00000040,
            0x00000080,
            0x00000100,
            0x00000200,
            0x00000400,
            0x00000800,
            0x00001000,
            0x00002000
        };
    }
}
