
namespace Core
{
    public class Point3D
    {
        public int X = 0;
        public int Y = 0;
        public int Z = 0;

        public Point3D() { }
        public Point3D(int x, int y, int z)
        {
            X = x;
            Y = y;
            Z = z;
        }
    }

    public class Rectangle3D
    {
        public int X = 0;
        public int Y = 0;
        public int Z = 0;
        public int Width = 0;
        public int Height = 0;
        public int Depth = 0;

        public Rectangle3D() { }
        public Rectangle3D(int x, int y, int z, int width, int height, int depth)
        {
            X = x;
            Y = y;
            Z = z;
            Width = width;
            Height = height;
            Depth = depth;
        }
        
        public bool Contains(Point3D p)
        {
            return (p.X >= X) && (p.X < X + Width)
                && (p.Y >= Y) && (p.Y < Y + Height)
                && (p.Z >= Z) && (p.Z < Z + Depth);
        }
    }
}
