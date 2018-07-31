
namespace Core
{
    public class Direction
    {
        public int X = 0;
        public int Y = 0;
        public int Z = 0;

        public Direction(int x, int y, int z)
        {
            if (x <= -1) X = -1; else if (1 <= x) X = 1;
            if (y <= -1) Y = -1; else if (1 <= y) Y = 1;
            if (z <= -1) Z = -1; else if (1 <= z) Z = 1;
        }
    }
}
