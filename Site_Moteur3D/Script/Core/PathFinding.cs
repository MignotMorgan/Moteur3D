
using System.Collections.Generic;

namespace Core
{
    public class Road
    {
        int x;
        int y;
        int z;
        public int X { get { return x; } }
        public int Y { get { return y; } }
        public int Z { get { return z; } }
        public bool Closed;

        public Point3D[] Street = new Point3D[0];

        public Road(int px, int py, int pz) { x = px; y = py; z = pz; }
        public void Add(Point3D point)
        {
            Point3D[] temp = new Point3D[Street.Length + 1];
            for (int i = 0; i < Street.Length; i++)
                temp[i] = Street[i];
            temp[Street.Length] = point;
            Street = temp;
        }
        public void CopyAndAdd(Road road, Point3D point)
        {
            Street = new Point3D[road.Street.Length + 1];
            for (int i = 0; i < road.Street.Length; i++)
                Street[i] = road.Street[i];
            Street[Street.Length - 1] = point;
        }
    }

    public class PathFinding
    {
        //public static PathFinding Path = new PathFinding();

        int X;
        int Y;
        int Z;
        Map Map;
        bool Active = false;
        int Range = 15;
        public PathFinding() { }
        public PathFinding(int range) { Range = range; }

        public List<Road> Roads = new List<Road>();
        void Add(Road road)
        {
            Roads.Add(road);
        }
        public Point3D[] Find(int x, int y, int z)
        {
            foreach (Road r in Roads)
                if (r.X == x && r.Y == y && r.Z == z)
                    return r.Street;
            return null;// new Point3D[0];

        }
        public bool Contains(int x, int y, int z)
        {
            foreach (Road r in Roads)
                if (r.X == x && r.Y == y && r.Z == z)
                    return true;
            return false;

        }

        //public Road[] Roads = new Road[0];
        //void Add(Road road)
        //{
        //    Road[] temp = new Road[Roads.Length + 1];
        //    for (int i = 0; i < Roads.Length; i++)
        //        temp[i] = Roads[i];
        //    temp[Roads.Length] = road;
        //    Roads = temp;
        //}
        //public Point3D[] Find(int x, int y, int z)
        //{
        //    for (int i = 0; i < Roads.Length; i++)
        //        if (Roads[i].X == x && Roads[i].Y == y && Roads[i].Z == z)
        //            return Roads[i].Street;
        //    return null;// new Point3D[0];
        //}
        //public bool Contains(int x, int y, int z)
        //{
        //    for (int i = 0; i < Roads.Length; i++)
        //        if (Roads[i].X == x && Roads[i].Y == y && Roads[i].Z == z)
        //            return true;
        //    return false;
        //}
        //public void MoveTo(Entity entity, int x, int y, int z)
        //{
        //    if (!entity.CanMoveTo(x, y, z, entity.Map)) return;
        //    OnStreet(entity);
        //    entity.Move.Street = Find(x, y, z);
        //    entity.MoveStart();
        //    entity.Move.Step = 0;
        //}
        public void OnStreet(Entity entity)
        {
            //OnStreet(entity.X, entity.Y, entity.Z, entity.Map);
            if (Active) return;
            Active = true;
            X = entity.X;
            Y = entity.Y;
            Z = entity.Z;
            Map = entity.Map;

            Roads = new List<Road>();// new Road[0];
            Road road = new Road(X, Y, Z);
            road.Add(new Point3D(X, Y, Z));
            Add(road);
            OnStreet(road, entity);
            Active = false;
        }
        public void OnStreet(int x, int y, int z, Map map)
        {
            if (Active) return;
            Active = true;
            X = x;
            Y = y;
            Z = z;
            Map = map;

            Roads = new List<Road>();// new Road[0];
            Road road = new Road(X, Y, Z);
            road.Add(new Point3D(X, Y, Z));
            Add(road);
            OnStreet(road, null);
            Active = false;
        }
        //public void OnStreet(Entity entity)
        //{
        //    X = entity.X;
        //    Y = entity.Y;
        //    Z = entity.Z;
        //    Map = entity.Map;

        //    Roads = new Road[0];
        //    Road road = new Road(X, Y, Z);
        //    road.Add(new Point3D(X, Y, Z));
        //    Add(road);
        //    OnStreet(road, entity);
        //}
        void OnStreet(Road road, Entity entity)
        {
            road.Closed = true;

            Cube cube_dest;
            Direction direction;

            if (road.Street.Length < Range)
                //for (int i = 1; i < 27; i++)
                for (int i = 0; i < 24; i++)
                {
                    direction = Info.IntToDirection(i);

                    if (Contains(road.X + direction.X, road.Y + direction.Y, road.Z + direction.Z)) continue;

                    cube_dest = Map.FindCube(road.X + direction.X, road.Y + direction.Y, road.Z + direction.Z);
                    if (cube_dest == null || !cube_dest.Cross || cube_dest.Climb) continue;//

                    if (direction.X != 0 && direction.Y != 0)
                    {
                        Coin coin = new Coin(road.X, road.Y, road.Z, direction, Map);
                        if (!coin.Movement()) continue;
                    }

                    if (entity != null && !entity.CanMoveTo(cube_dest.X, cube_dest.Y, cube_dest.Z, Map)) continue;

                    Road next_road = new Road(cube_dest.X, cube_dest.Y, cube_dest.Z);
                    next_road.CopyAndAdd(road, new Point3D(cube_dest.X, cube_dest.Y, cube_dest.Z));
                    Add(next_road);
                }

            //for (int i = 0; i < Roads.Length; i++)
            //    if (!Roads[i].Closed)
            //    { OnStreet(Roads[i], entity); break; }
            GoToStreet(entity);
        }
        void GoToStreet(Entity entity)
        {
            foreach(Road r in Roads)
                if(!r.Closed)
                { OnStreet(r, entity); break; }
            //for (int i = 0; i < Roads.Length; i++)
            //    if (!Roads[i].Closed)
            //    { OnStreet(Roads[i], entity); break; }
        }
    }

    public class Coin
    {
        Cube Axe_X = null;
        Cube Axe_Y = null;
        //Cube Axe_D = null;

        public Coin(int x, int y, int z, Direction d, Map map)
        {
            if (d.Z > 0)
            {
                Axe_X = map.FindCube(x + d.X, y, z + d.Z);
                Axe_Y = map.FindCube(x, y + d.Y, z + d.Z);
                //Axe_D = map.FindCube(x + d.X, y + d.Y, z + d.Z);
            }
            else
            {
                Axe_X = map.FindCube(x + d.X, y, z);
                Axe_Y = map.FindCube(x, y + d.Y, z);
                //Axe_D = map.FindCube(x + d.X, y + d.Y, z);
            }
        }
        public bool Movement()
        {
            //if (Axe_D == null || !Axe_D.Cross) return false;
            if (Axe_X != null && !Axe_X.Cross && Axe_Y != null && !Axe_Y.Cross) return false;
            return true;
        }
    }
}

//namespace Core
//{
//    public class Road
//    {
//        int x;
//        int y;
//        int z;
//        public int X { get { return x; } }
//        public int Y { get { return y; } }
//        public int Z { get { return z; } }
//        public bool Closed;

//        public Point3D[] Street = new Point3D[0];

//        public Road(int px, int py, int pz) { x = px; y = py; z = pz; }
//        public void Add(Point3D point)
//        {
//            Point3D[] temp = new Point3D[Street.Length + 1];
//            for (int i = 0; i < Street.Length; i++)
//                temp[i] = Street[i];
//            temp[Street.Length] = point;
//            Street = temp;
//        }
//        public void CopyAndAdd(Road road, Point3D point)
//        {
//            Street = new Point3D[road.Street.Length + 1];
//            for (int i = 0; i < road.Street.Length; i++)
//                Street[i] = road.Street[i];
//            Street[Street.Length - 1] = point;
//        }
//    }

//    public class PathFinding
//    {
//        //public static PathFinding Path = new PathFinding();

//        int X;
//        int Y;
//        int Z;
//        Map Map;
//        bool Active = false;
//        int Range = 15;
//        public PathFinding() { }
//        public PathFinding(int range) { Range = range; }

//        public Road[] Roads = new Road[0];
//        void Add(Road road)
//        {
//            Road[] temp = new Road[Roads.Length + 1];
//            for (int i = 0; i < Roads.Length; i++)
//                temp[i] = Roads[i];
//            temp[Roads.Length] = road;
//            Roads = temp;
//        }
//        public Point3D[] Find(int x, int y, int z)
//        {
//            for (int i = 0; i < Roads.Length; i++)
//                if (Roads[i].X == x && Roads[i].Y == y && Roads[i].Z == z)
//                    return Roads[i].Street;
//            return null;// new Point3D[0];
//        }
//        public bool Contains(int x, int y, int z)
//        {
//            for (int i = 0; i < Roads.Length; i++)
//                if (Roads[i].X == x && Roads[i].Y == y && Roads[i].Z == z)
//                    return true;
//            return false;
//        }
//        //public void MoveTo(Entity entity, int x, int y, int z)
//        //{
//        //    if (!entity.CanMoveTo(x, y, z, entity.Map)) return;
//        //    OnStreet(entity);
//        //    entity.Move.Street = Find(x, y, z);
//        //    entity.MoveStart();
//        //    entity.Move.Step = 0;
//        //}
//        public void OnStreet(Entity entity)
//        {
//            //OnStreet(entity.X, entity.Y, entity.Z, entity.Map);
//            if (Active) return;
//            Active = true;
//            X = entity.X;
//            Y = entity.Y;
//            Z = entity.Z;
//            Map = entity.Map;

//            Roads = new Road[0];
//            Road road = new Road(X, Y, Z);
//            road.Add(new Point3D(X, Y, Z));
//            Add(road);
//            OnStreet(road, entity);
//            Active = false;
//        }
//        public void OnStreet(int x, int y, int z, Map map)
//        {
//            if (Active) return;
//            Active = true;
//            X = x;
//            Y = y;
//            Z = z;
//            Map = map;

//            Roads = new Road[0];
//            Road road = new Road(X, Y, Z);
//            road.Add(new Point3D(X, Y, Z));
//            Add(road);
//            OnStreet(road, null);
//            Active = false;
//        }
//        //public void OnStreet(Entity entity)
//        //{
//        //    X = entity.X;
//        //    Y = entity.Y;
//        //    Z = entity.Z;
//        //    Map = entity.Map;

//        //    Roads = new Road[0];
//        //    Road road = new Road(X, Y, Z);
//        //    road.Add(new Point3D(X, Y, Z));
//        //    Add(road);
//        //    OnStreet(road, entity);
//        //}
//        void OnStreet(Road road, Entity entity)
//        {
//            road.Closed = true;

//            Cube cube_dest;
//            Direction direction;

//            if (road.Street.Length < Range)
//                //for (int i = 1; i < 27; i++)
//                for (int i = 0; i < 24; i++)
//                {
//                    direction = Info.IntToDirection(i);

//                    if (Contains(road.X + direction.X, road.Y + direction.Y, road.Z + direction.Z)) continue;

//                    cube_dest = Map.FindCube(road.X + direction.X, road.Y + direction.Y, road.Z + direction.Z);
//                    if (cube_dest == null || !cube_dest.Cross || cube_dest.Climb) continue;//

//                    if (direction.X != 0 && direction.Y != 0)
//                    {
//                        Coin coin = new Coin(road.X, road.Y, road.Z, direction, Map);
//                        if (!coin.Movement()) continue;
//                    }

//                    if (entity != null && !entity.CanMoveTo(cube_dest.X, cube_dest.Y, cube_dest.Z, Map)) continue;

//                    Road next_road = new Road(cube_dest.X, cube_dest.Y, cube_dest.Z);
//                    next_road.CopyAndAdd(road, new Point3D(cube_dest.X, cube_dest.Y, cube_dest.Z));
//                    Add(next_road);
//                }

//            for (int i = 0; i < Roads.Length; i++)
//                if (!Roads[i].Closed)
//                { OnStreet(Roads[i], entity); break; }
//        }
//    }

//    public class Coin
//    {
//        Cube Axe_X = null;
//        Cube Axe_Y = null;
//        //Cube Axe_D = null;

//        public Coin(int x, int y, int z, Direction d, Map map)
//        {
//            if (d.Z > 0)
//            {
//                Axe_X = map.FindCube(x + d.X, y, z + d.Z);
//                Axe_Y = map.FindCube(x, y + d.Y, z + d.Z);
//                //Axe_D = map.FindCube(x + d.X, y + d.Y, z + d.Z);
//            }
//            else
//            {
//                Axe_X = map.FindCube(x + d.X, y, z);
//                Axe_Y = map.FindCube(x, y + d.Y, z);
//                //Axe_D = map.FindCube(x + d.X, y + d.Y, z);
//            }
//        }
//        public bool Movement()
//        {
//            //if (Axe_D == null || !Axe_D.Cross) return false;
//            if (Axe_X != null && !Axe_X.Cross && Axe_Y != null && !Axe_Y.Cross) return false;
//            return true;
//        }
//    }
//}












//namespace Core
//{
//    public class Road
//    {
//        int x;
//        int y;
//        int z;
//        public int X { get { return x; } }
//        public int Y { get { return y; } }
//        public int Z { get { return z; } }
//        public bool Closed;

//        public Point3D[] Street = new Point3D[0];

//        public Road(int px, int py, int pz) { x = px; y = py; z = pz; }
//        public void Add(Point3D point)
//        {
//            Point3D[] temp = new Point3D[Street.Length + 1];
//            for (int i = 0; i < Street.Length; i++)
//                temp[i] = Street[i];
//            temp[Street.Length] = point;
//            Street = temp;
//        }
//        public void CopyAndAdd(Road road, Point3D point)
//        {
//            Street = new Point3D[road.Street.Length + 1];
//            for (int i = 0; i < road.Street.Length; i++)
//                Street[i] = road.Street[i];
//            Street[Street.Length - 1] = point;
//        }
//    }

//    public class PathFinding
//    {
//        //public static PathFinding Path = new PathFinding();

//        int X;
//        int Y;
//        int Z;
//        Map Map;
//        bool Active = false;
//        int Range = 15;
//        public PathFinding() { }
//        public PathFinding(int range) { Range = range; }

//        public Road[] Roads = new Road[0];
//        void Add(Road road)
//        {
//            Road[] temp = new Road[Roads.Length + 1];
//            for (int i = 0; i < Roads.Length; i++)
//                temp[i] = Roads[i];
//            temp[Roads.Length] = road;
//            Roads = temp;
//        }
//        public Point3D[] Find(int x, int y, int z)
//        {
//            for (int i = 0; i < Roads.Length; i++)
//                if (Roads[i].X == x && Roads[i].Y == y && Roads[i].Z == z)
//                    return Roads[i].Street;
//            return null;// new Point3D[0];
//        }
//        public bool Contains(int x, int y, int z)
//        {
//            for (int i = 0; i < Roads.Length; i++)
//                if (Roads[i].X == x && Roads[i].Y == y && Roads[i].Z == z)
//                    return true;
//            return false;
//        }
//        //public void MoveTo(Entity entity, int x, int y, int z)
//        //{
//        //    if (!entity.CanMoveTo(x, y, z, entity.Map)) return;
//        //    OnStreet(entity);
//        //    entity.Move.Street = Find(x, y, z);
//        //    entity.MoveStart();
//        //    entity.Move.Step = 0;
//        //}
//        public void OnStreet(Entity entity)
//        {
//            OnStreet(entity.X, entity.Y, entity.Z, entity.Map);
//        }
//        public void OnStreet(int x, int y, int z, Map map)
//        {
//            if (Active) return;
//            Active = true;
//            X = x;
//            Y = y;
//            Z = z;
//            Map = map;

//            Roads = new Road[0];
//            Road road = new Road(X, Y, Z);
//            road.Add(new Point3D(X, Y, Z));
//            Add(road);
//            OnStreet(road, null);
//            Active = false;
//        }
//        //public void OnStreet(Entity entity)
//        //{
//        //    X = entity.X;
//        //    Y = entity.Y;
//        //    Z = entity.Z;
//        //    Map = entity.Map;

//        //    Roads = new Road[0];
//        //    Road road = new Road(X, Y, Z);
//        //    road.Add(new Point3D(X, Y, Z));
//        //    Add(road);
//        //    OnStreet(road, entity);
//        //}
//        void OnStreet(Road road, Entity entity)
//        {
//            road.Closed = true;

//            Cube cube_dest;
//            Direction direction;

//            if (road.Street.Length < Range)
//                //for (int i = 1; i < 27; i++)
//                for (int i = 0; i < 24; i++)
//                {
//                    direction = Info.IntToDirection(i);

//                    if (Contains(road.X + direction.X, road.Y + direction.Y, road.Z + direction.Z)) continue;

//                    cube_dest = Map.FindCube(road.X + direction.X, road.Y + direction.Y, road.Z + direction.Z);
//                    if (cube_dest == null || !cube_dest.Cross) continue;//

//                    if (direction.Z != 0)
//                    {
//                        Coin coin = new Coin(road.X, road.Y, road.Z, direction, Map);
//                        if (!coin.Movement()) continue;
//                    }

//                    if (entity != null && !entity.CanMoveTo(cube_dest.X, cube_dest.Y, cube_dest.Z, Map)) continue;

//                    Road next_road = new Road(cube_dest.X, cube_dest.Y, cube_dest.Z);
//                    next_road.CopyAndAdd(road, new Point3D(cube_dest.X, cube_dest.Y, cube_dest.Z));
//                    Add(next_road);
//                }

//            for (int i = 0; i < Roads.Length; i++)
//                if (!Roads[i].Closed)
//                { OnStreet(Roads[i], entity); break; }
//        }
//    }

//    public class Coin
//    {
//        Cube Axe_X = null;
//        Cube Axe_Y = null;
//        Cube Axe_D = null;

//        public Coin(int x, int y, int z, Direction d, Map map)
//        {
//            if (d.Z > 0)
//            {
//                Axe_X = map.FindCube(x + d.X, y, z + d.Z);
//                Axe_Y = map.FindCube(x, y + d.Y, z + d.Z);
//                Axe_D = map.FindCube(x + d.X, y + d.Y, z + d.Z);
//            }
//            else
//            {
//                Axe_X = map.FindCube(x + d.X, y, z);
//                Axe_Y = map.FindCube(x, y + d.Y, z);
//                Axe_D = map.FindCube(x + d.X, y + d.Y, z);
//            }
//        }
//        public bool Movement()
//        {
//            if (Axe_D == null || !Axe_D.Cross) return false;
//            if (Axe_X != null && !Axe_X.Cross && Axe_Y != null && !Axe_Y.Cross) return false;
//            return true;
//        }
//    }
//}













//public class Road
//{
//    int x;
//    int y;
//    int z;
//    public int X { get { return x; } }
//    public int Y { get { return y; } }
//    public int Z { get { return z; } }
//    public bool Closed;

//    public Point3D[] Street = new Point3D[0];

//    public Road(int px, int py, int pz) { x = px; y = py; z = pz; }
//    public void Add(Point3D point)
//    {
//        Point3D[] temp = new Point3D[Street.Length + 1];
//        for (int i = 0; i < Street.Length; i++)
//            temp[i] = Street[i];
//        temp[Street.Length] = point;
//        Street = temp;
//    }
//    public void CopyAndAdd(Road road, Point3D point)
//    {
//        Street = new Point3D[road.Street.Length + 1];
//        for (int i = 0; i < road.Street.Length; i++)
//            Street[i] = road.Street[i];
//        Street[Street.Length - 1] = point;
//    }
//}

//public class PathFinding
//{
//    public static PathFinding Path = new PathFinding();

//    int X;
//    int Y;
//    int Z;
//    Map Map;

//    public Road[] Roads = new Road[0];
//    void Add(Road road)
//    {
//        Road[] temp = new Road[Roads.Length + 1];
//        for (int i = 0; i < Roads.Length; i++)
//            temp[i] = Roads[i];
//        temp[Roads.Length] = road;
//        Roads = temp;
//    }
//    public Point3D[] Find(int x, int y, int z)
//    {
//        for (int i = 0; i < Roads.Length; i++)
//            if (Roads[i].X == x && Roads[i].Y == y && Roads[i].Z == z)
//                return Roads[i].Street;
//        return new Point3D[0];
//    }
//    public bool Contains(int x, int y, int z)
//    {
//        for (int i = 0; i < Roads.Length; i++)
//            if (Roads[i].X == x && Roads[i].Y == y && Roads[i].Z == z)
//                return true;
//        return false;
//    }
//    public void MoveTo(Entity entity, int x, int y, int z)
//    {
//        if (!entity.CanMoveTo(x, y, z, entity.Map)) return;
//        OnStreet(entity);
//        entity.Move.Street = Find(x, y, z);
//        entity.MoveStart();
//        entity.Move.Step = 0;
//    }
//    public void OnStreet(int x, int y, int z, Map map)
//    {
//        X = x;
//        Y = y;
//        Z = z;
//        Map = map;

//        Roads = new Road[0];
//        Road road = new Road(X, Y, Z);
//        road.Add(new Point3D(X, Y, Z));
//        Add(road);
//        OnStreet(road, null);
//    }
//    public void OnStreet(Entity entity)
//    {
//        X = entity.X;
//        Y = entity.Y;
//        Z = entity.Z;
//        Map = entity.Map;

//        Roads = new Road[0];
//        Road road = new Road(X, Y, Z);
//        road.Add(new Point3D(X, Y, Z));
//        Add(road);
//        OnStreet(road, entity);
//    }
//    void OnStreet(Road road, Entity entity)
//    {
//        road.Closed = true;

//        Cube cube_dest;
//        Direction direction;

//        if (road.Street.Length < 15)
//            for (int i = 1; i < 27; i++)
//            {
//                direction = Info.IntToDirection(i);

//                if (Contains(road.X + direction.X, road.Y + direction.Y, road.Z + direction.Z)) continue;

//                cube_dest = Map.FindCube(road.X + direction.X, road.Y + direction.Y, road.Z + direction.Z);
//                if (cube_dest == null || !cube_dest.Cross) continue;//

//                if (direction.Z != 0)
//                {
//                    Coin coin = new Coin(road.X, road.Y, road.Z, direction, Map);
//                    if (!coin.Movement()) continue;
//                }

//                if (entity != null && !entity.CanMoveTo(cube_dest.X, cube_dest.Y, cube_dest.Z, Map)) continue;

//                Road next_road = new Road(cube_dest.X, cube_dest.Y, cube_dest.Z);
//                next_road.CopyAndAdd(road, new Point3D(cube_dest.X, cube_dest.Y, cube_dest.Z));
//                Add(next_road);
//            }

//        for (int i = 0; i < Roads.Length; i++)
//            if (!Roads[i].Closed)
//                OnStreet(Roads[i], entity);
//    }
//}

//public class Coin
//{
//    Cube Axe_X = null;
//    Cube Axe_Y = null;
//    Cube Axe_D = null;

//    public Coin(int x, int y, int z, Direction d, Map map)
//    {
//        if (d.Z > 0)
//        {
//            Axe_X = map.FindCube(x + d.X, y, z + d.Z);
//            Axe_Y = map.FindCube(x, y + d.Y, z + d.Z);
//            Axe_D = map.FindCube(x + d.X, y + d.Y, z + d.Z);
//        }
//        else
//        {
//            Axe_X = map.FindCube(x + d.X, y, z);
//            Axe_Y = map.FindCube(x, y + d.Y, z);
//            Axe_D = map.FindCube(x + d.X, y + d.Y, z);
//        }
//    }
//    public bool Movement()
//    {
//        if (Axe_D == null || !Axe_D.Cross) return false;
//        if (Axe_X != null && !Axe_X.Cross && Axe_Y != null && !Axe_Y.Cross) return false;
//        return true;
//    }
//}