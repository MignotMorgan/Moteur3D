using System;
using System.Collections.Generic;
using System.Drawing;

namespace Core
{
    public class Line
    {
        //public Point3DList Points = new Point3DList();
        public Point3D[] Points = new Point3D[0];
        void Add(Point3D point)
        {
            Point3D[] temp = new Point3D[Points.Length + 1];
            for (int i = 0; i < Points.Length; i++)
                temp[i] = Points[i];
            temp[Points.Length] = point;
            Points = temp;
        }

        public Line(Point3D src, Point3D dest)
        {
            List<Point> listA = CheckLine(new Point(src.X, src.Y), new Point(dest.X, dest.Y));
            List<Point> listB;

            if ( Math.Abs(src.X - dest.X) >= Math.Abs(src.Y - dest.Y) )
                listB = CheckLine(new Point(src.X, src.Z), new Point(dest.X, dest.Z));
            else
                listB = CheckLine(new Point(src.Y, src.Z), new Point(dest.Y, dest.Z));

            for (int i = 0; i < listA.Count; i++)
            {
                Add(new Point3D(listA[i].X, listA[i].Y, listB[i].Y));
                //Points.Add(new Point3D(listA[i].X, listA[i].Y, listB[i].Y));
            }
        }
        private List<Point> CheckLine(Point p0, Point p1)
        {
            List<Point> points = new List<Point>();

            Boolean steep = Math.Abs(p1.Y - p0.Y) > Math.Abs(p1.X - p0.X);

            if (steep == true)
            {
                Point tmpPoint = new Point(p0.X, p0.Y);
                p0 = new Point(tmpPoint.Y, tmpPoint.X);

                tmpPoint = p1;
                p1 = new Point(tmpPoint.Y, tmpPoint.X);
            }

            int deltaX = Math.Abs(p1.X - p0.X);
            int deltaY = Math.Abs(p1.Y - p0.Y);
            int error = 0;
            int deltaError = deltaY;
            int yStep = 0;
            int xStep = 0;
            int y = p0.Y;
            int x = p0.X;

            if (p0.Y < p1.Y) { yStep = 1; }
            else { yStep = -1; }

            if (p0.X < p1.X) { xStep = 1; }
            else { xStep = -1; }

            int tmpX = 0;
            int tmpY = 0;

            while (x != p1.X)
            {
                x += xStep;
                error += deltaError;

                if ((2 * error) > deltaX)
                {
                    y += yStep;
                    error -= deltaX;
                }

                if (steep) { tmpX = y; tmpY = x; }
                else { tmpX = x; tmpY = y; }
                points.Add(new Point(tmpX, tmpY));
            }
            return points;
        }
    }
}
