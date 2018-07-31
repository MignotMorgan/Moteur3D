using System;
using Core.Utility;

namespace Core
{
    public class CaseJSON
    {
        public int X = 0;
        public int Y = 0;
        public Point3D Adjustment = new Point3D();
    }
    public class MoveDraw
    {
        public Point3D Location = new Point3D();
        public Point3D Adjustment = new Point3D();
        public PointJSON Distance = new PointJSON();
        public int DrawStep = 0;
        public int Index = 0;
        public int Time = 0;
    }
    
    public class Entity
    {
        public AI AI = null;//????????????dans Mobile

        public string ID = string.Empty;
        public int X = 0;
        public int Y = 0;
        public int Z = 0;
        public Point3D Location { get { return new Point3D(X, Y, Z); } }
        public Point3D Adjustment = new Point3D();
        public Map Map = null;
        public string Name = string.Empty;
        public float Width = 1;
        public float Height = 1;
        public bool CanMove = false;
        public bool CanTarget = false;
        public bool Cross = false;
        public MoveJSON Move = null;
        public PathFinding Path = null;
        public int Direction = 0;

        public MoveDraw MoveDraw = new MoveDraw();
        public PointJSON Distance = new PointJSON();


        public Flag Flag = new Flag(); ///??????

        public BodyJSON Body = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Stand", 1, 1) }, true, true, 1250, -1);// null;

        public BodyJSON Body_Stand = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Stand", 1, 1) }, true, true, 1250, -1);
        public BodyJSON Body_Move = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Move", 1, 1) }, true, true, 750, -1);

        public Container[] Containers = new Container[0];
        public Container Container(string name)
        {
            for (int i = 0; i < Containers.Length; i++)
                if (Containers[i].Name == name)
                    return Containers[i];
            return null;
        }
        public void Add(Container container)
        {
            Container[] temp = new Container[Containers.Length + 1];
            for (int i = 0; i < Containers.Length; i++)
                temp[i] = Containers[i];
            temp[Containers.Length] = container;
            Containers = temp;
        }
        public bool Add(Entity entity)
        {
            for (int i = 0; i < Containers.Length; i++)
                if (Containers[i].Add(entity))
                    return true;
            return false;
        }
        public Entity() { }
        public Entity(string e_name, int e_X, int e_Y, int e_Z, Map e_Map)
        {
            Name = e_name;
            ID = e_name;
            X = e_X;
            Y = e_Y;
            Z = e_Z;
            Map = e_Map;
        }
        public virtual void OnTick()
        {
            if (AI != null) AI.OnTick();
            if (CanMove && Move != null) Movement();
            //if (CanMove && Move != null) MoveToStreet();
        }
        public virtual MessageJSON[] OnSelected(Entity entity) { return null; }
        public virtual EntityJSON JSON { get { return CreateJSON(); } }
        public virtual EntityJSON CreateJSON() { return new EntityJSON(this); }
        public virtual bool Contains(int pX, int pY, int pZ)
        {
            return (pX <= X) && (pX > X - Width)
                && (pY <= Y) && (pY > Y - Width)
                && (pZ >= Z) && (pZ < Z + Height);
        }
        //public virtual Direction ToDestination(int destX, int destY, int destZ)
        //{
        //    return new Direction(destX-X, destY-Y,destZ-Z);
        //}
        public virtual void ChangeDirection(int dest_X, int dest_Y, int dest_Z)
        {
            if (X == dest_X && Y == dest_Y) Direction = 6;         //None
            else if (X == dest_X && Y > dest_Y) Direction = 0;     //N
            else if (X < dest_X && Y == dest_Y) Direction = 1;     //E
            else if (X == dest_X && Y < dest_Y) Direction = 2;     //S
            else if (X > dest_X && Y == dest_Y) Direction = 3;     //W
            else if (X > dest_X && Y > dest_Y) Direction = 4;      //N-W
            else if (X < dest_X && Y > dest_Y) Direction = 5;      //N-E
            else if (X < dest_X && Y < dest_Y) Direction = 6;      //S-E
            else if (X > dest_X && Y < dest_Y) Direction = 7;      //S-W
            else Direction = 6;
        }

        public int ScreenDirection(int x_dest, int y_dest)
        {
            int x = 0;
            int y = 0;

            if( -25 < x_dest && x_dest < 25)
            {
                if(x_dest < 0)x = -1;
                else if(x_dest > 0)x = 1;
            }
            else
            {
                if(x_dest < -25)x = -1;
                else if(x_dest > 25)x = 1;
            }

            if( -25 < y_dest && y_dest < 25)
            {
                if(y_dest < 0)y = -1;
                else if(y_dest > 0)y = 1;
            }
            else
            {
                if(y_dest < -25)y = -1;
                else if(y_dest > 25)y = 1;
            }
            
        //    if(x_dest < -size)x = -1;
        //    else if(x_dest > size)x = 1;
        //    if(y_dest < -size)y = -1;
        //    else if(y_dest > size)y = 1;

        //    if(x < 0) x = -1;
        //    else if(x > 0) x = 1;
        //    else x = 0;
        //    
        //    if(y < 0) y = -1;
        //    else if (y > 0) y = 1;
        //    else y = 0;



            if( x == 0 && y == 0 )return 6;             //None
            else if( x == 1 && y == -1 )return 0;       //N
            else if( x == 1 && y == 1 )return 1;        //E
            else if( x == -1 && y == 1 )return 2;       //S
            else if( x == -1 && y == -1 )return 3;      //W
            else if( x == 0 && y == -1 )return 4;       //N-W
            else if( x == 1 && y == 0 )return 5;        //N-E
            else if( x == 0 && y == 1 )return 6;        //S-E
            else if( x == -1 && y == 0 )return 7;       //S-W

            return 6;
        }
        
        
        
        
        
        public virtual bool CanMoveTo(int pX, int pY, int pZ, Map map)
        {
            for (int ey = 0; ey < Width; ey++)
                for (int ex = 0; ex < Width; ex++)
                    for (int ez = 0; ez < Height; ez++)
                    {
                        if (!map.Contains(pX - ex, pY - ey, pZ + ez)) return false;
                        Cube c = map.FindCube(pX - ex, pY - ey, pZ + ez);
                        if (c != null && !c.Cross) return false;
                        Entity entity = map.FindEntity(pX - ex, pY - ey, pZ + ez);
                        if (entity != null && !entity.Cross && entity.ID != ID )
                            return false;
                    }
            return true;
        }




        //public CaseJSON CaseFromAdjustment(int adj_X, int adj_Y, int sizecube) { return CaseFrom2((adj_X / 100) * sizecube, ((adj_Y + 50) / 100) * sizecube, sizecube); }
        //public CaseJSON CaseFrom2(int x, int y, int sizecube)//à partir d'un point X:0 Y:0
        //{
        //    CaseJSON c = new CaseJSON();// {X:0,Y:0,Adjustment:{X:0,Y:0}};
        //    y -= (sizecube / 2);
        //    int adj_X = (x / sizecube) * 100;
        //    int adj_Y = (y / sizecube) * 100;
        //    int pY = ((2 * y - x) / 2);
        //    int pX = (x + pY);
        //    c.Y = (int)Math.Round((decimal)(pY / sizecube));
        //    c.X = (int)Math.Round((decimal)(pX / sizecube));
        //    c.Adjustment.X = (int)Math.Round((decimal)(adj_X - ((c.X - c.Y) * 100)));
        //    c.Adjustment.Y = (int)Math.Round((decimal)(adj_Y - ((c.X + c.Y) * 50)));
        //    return c;
        //}
        //public CaseJSON CaseFrom(int x, int y)//, int sizecube)//à partir d'un point X:0 Y:0
        //{
        //    CaseJSON c = new CaseJSON();
        //    int pY = ((2 * y - x) / 2);
        //    int pX = (x + pY);
        //    c.Y = (int)Math.Round((decimal)(pY / 100));
        //    c.X = (int)Math.Round((decimal)(pX / 100));
        //    c.Adjustment.X = (int)Math.Round((decimal)(x - ((c.X - c.Y) * 100)));
        //    c.Adjustment.Y = (int)Math.Round((decimal)(y - ((c.X + c.Y) * 50)));
        //    return c;
        //}
        public CaseJSON CaseFrom(int x, int y)
        {
            CaseJSON c = new CaseJSON();
            double pY = ((2 * y - x) / 2);
            double pX = (x + pY);
            c.Y = (int)Math.Round((pY / 100));
            c.X = (int)Math.Round((pX / 100));
            c.Adjustment.X = (int)Math.Round((double)(x - ((c.X - c.Y) * 100)));
            c.Adjustment.Y = (int)Math.Round((double)(y - ((c.X + c.Y) * 50)));
            return c;
        }   
 
public PointJSON CaseToCase(CaseJSON case_src, CaseJSON case_dest)
{
    int cX = case_dest.X - case_src.X;
    int cY = case_dest.Y - case_src.Y;
    PointJSON p = new PointJSON();
    p.X = ((cX-cY)*100)+case_dest.Adjustment.X-case_src.Adjustment.X;
    p.Y = ((cX+cY)*50)+case_dest.Adjustment.Y-case_src.Adjustment.Y;
    return p;
    //return {X:((cX-cY)*100)+case_dest.Adjustment.X-case_src.Adjustment.X,Y:((cX+cY)*50)+case_dest.Adjustment.Y-case_src.Adjustment.Y};
}
          
    public void OnDistance(Point3D location_dest,PointJSON adjustment)
    {
        MoveDraw.Location.X = X;
        MoveDraw.Location.Y = Y;
        MoveDraw.Location.Z = Z;
        MoveDraw.Adjustment.X = Adjustment.X;
        MoveDraw.Adjustment.Y = Adjustment.Y;
    
        var Case_src = new CaseJSON();// {X:0,Y:0, Adjustment:{X:0,Y:0}};
        var Case_dest = new CaseJSON();// {X:0,Y:0, Adjustment:{X:0,Y:0}}; 

        Case_src.X = MoveDraw.Location.X - MoveDraw.Location.Z;
        Case_src.Y = MoveDraw.Location.Y - MoveDraw.Location.Z;
        Case_src.Adjustment.X = MoveDraw.Adjustment.X;
        Case_src.Adjustment.Y = MoveDraw.Adjustment.Y;

        Case_dest.X = location_dest.X - location_dest.Z;
        Case_dest.Y = location_dest.Y - location_dest.Z;
        Case_dest.Adjustment.X = adjustment.X;
        Case_dest.Adjustment.Y = adjustment.Y;

        MoveDraw.Distance = CaseToCase(Case_src, Case_dest);
        MoveDraw.DrawStep = 0;

        double ratio_X = Math.Abs((double)( this.MoveDraw.Distance.X/100));
        double ratio_Y = Math.Abs((double)( this.MoveDraw.Distance.Y/100));

        int ratio_Speed_X = Convert.ToInt32( Move.Speed * ratio_X );
        int ratio_Speed_Y = Convert.ToInt32( Move.Speed * ratio_Y );
        if(ratio_Speed_X > ratio_Speed_Y)MoveDraw.Time = ratio_Speed_X;
        else MoveDraw.Time = ratio_Speed_Y;

        Direction = ScreenDirection(MoveDraw.Distance.X, MoveDraw.Distance.Y);
    } 
        
        
    
public void Movement()
{
    //var entitysdraw = EntitysDraw;
    //for(var e = 0; e < entitysdraw.length; e++)
    //{
    //    var entitydraw = entitysdraw[e];

    //    if(!entitydraw.CanMove || entitydraw.Move == null || entitydraw.MoveDraw.Index == -1)
    //    {
    //        var C3D = FindCaseLocation(entitydraw.X, entitydraw.Y, entitydraw.Z);
    //        if( C3D != null)
    //        {
    //            C3D.EntitysDraw[C3D.EntitysDraw.length] = entitydraw;
    //        }
    //        continue;
    //    }

//#######################################################################################################

    if (MoveDraw.Index == -1) return;
        MoveJSON move = Move;

        if(MoveDraw.Index == 0)
        {
            MoveDraw.Index++;
            OnDistance(move.Street[MoveDraw.Index], move.Adjustment);
        }

        Point3D move_src = MoveDraw.Location;
        Point3D move_dest = move.Street[MoveDraw.Index];

        //var C3D_src = FindCaseLocation(move_src.X, move_src.Y, move_src.Z);
        //var C3D_dest = FindCaseLocation(move_dest.X, move_dest.Y, move_dest.Z);

        MoveDraw.DrawStep += Map.Step;//DrawStep;

        double ratio_Speed = 0;
        if(MoveDraw.Time > 0)
            ratio_Speed = MoveDraw.DrawStep / MoveDraw.Time;

        int dist_X = (int)Math.Floor((double)( MoveDraw.Distance.X * ratio_Speed ));
        int dist_Y = (int)Math.Floor((double)( MoveDraw.Distance.Y * ratio_Speed ));

        CaseJSON c1 = CaseFrom(dist_X + MoveDraw.Adjustment.X, dist_Y + MoveDraw.Adjustment.Y);//, 100);// PageInfo.MapInfo.SizeCube);

        //if(C3D_src != null && C3D_dest != null)
        //{
        //    if((c1.X != 0 || c1.Y != 0) && C3D_src.X + c1.X == C3D_dest.X && C3D_src.Y + c1.Y == C3D_dest.Y)
        //    {
        //        entitydraw.X = move_dest.X;
        //        entitydraw.Y = move_dest.Y;
        //        entitydraw.Z = move_dest.Z;
        //        entitydraw.Adjustment.X = c1.Adjustment.X;
        //        entitydraw.Adjustment.Y = c1.Adjustment.Y; 
        //        C3D_dest.EntitysDraw[C3D_dest.EntitysDraw.length] = entitysdraw[e];
        //    }
        //    else
        //    {
        //        entitydraw.Adjustment.X = dist_X+entitydraw.MoveDraw.Adjustment.X;
        //        entitydraw.Adjustment.Y = dist_Y+entitydraw.MoveDraw.Adjustment.Y;
        //        C3D_src.EntitysDraw[C3D_src.EntitysDraw.length] = entitysdraw[e];
        //    }
        //}
        //else
        //{
            int C3D_src_X = move_src.X - move_src.Z;
            int C3D_src_Y = move_src.Y - move_src.Z;
            int C3D_dest_X = move_dest.X - move_dest.Z;
            int C3D_dest_Y = move_dest.Y - move_dest.Z;

            if((c1.X != 0 || c1.Y != 0) && C3D_src_X + c1.X == C3D_dest_X && C3D_src_Y + c1.Y == C3D_dest_Y)
            {
                X = move_dest.X;
                Y = move_dest.Y;
                Z = move_dest.Z;
                Adjustment.X = c1.Adjustment.X;
                Adjustment.Y = c1.Adjustment.Y;
            }
            else
            {
                Adjustment.X = dist_X+MoveDraw.Adjustment.X;
                Adjustment.Y = dist_Y+MoveDraw.Adjustment.Y;
            }
        //}

        if(MoveDraw.DrawStep > MoveDraw.Time)
        {
            MoveDraw.Index++;
            if(MoveDraw.Index < move.Street.Length)
                OnDistance(move.Street[MoveDraw.Index], move.Adjustment);
            else
                MoveDraw.Index = -1;
        }

        ////##### ligne de points rouge!
        //var C3D_e = FindCaseLocation(entitydraw.X, entitydraw.Y, entitydraw.Z);
        //if(C3D_e != null)
        //{
        //    var eX = C3D_e.Screen.X;
        //    eX += ((entitydraw.Adjustment.X/100)*PageInfo.MapInfo.SizeCube)
        //    var eY = C3D_e.Screen.Y;
        //    eY += PageInfo.MapInfo.SizeCube/2;
        //    eY += ((entitydraw.Adjustment.Y/100)*PageInfo.MapInfo.SizeCube)
        //    MovementInfo.Pixel[MovementInfo.Pixel.length] = {X:eX , Y:eY };
        //}
    //}
} 
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        //public void OnDistance(Point3D point3D, PointJSON adj)
        //{
        //    MoveDraw.Location.X = X;
        //    MoveDraw.Location.Y = Y;
        //    MoveDraw.Location.Z = Z;
        //    MoveDraw.Adjustment.X = Adjustment.X;
        //    MoveDraw.Adjustment.Y = Adjustment.Y;

        //    int cZ = point3D.Z - MoveDraw.Location.Z;
        //    int cX = point3D.X - MoveDraw.Location.X + Z;
        //    int cY = point3D.Y - MoveDraw.Location.Y + Z;

        //    MoveDraw.Distance.X = ((cX - cY) * 100) + adj.X - MoveDraw.Adjustment.X;
        //    MoveDraw.Distance.Y = ((cX + cY) * 100) + adj.Y - MoveDraw.Adjustment.Y;

        //    MoveDraw.DrawStep = 0;

        //    int ratio_X = Math.Abs(MoveDraw.Distance.X / 100);
        //    int ratio_Y = Math.Abs(MoveDraw.Distance.Y / 100);

        //    int ratio_Speed_X = Move.Speed * ratio_X;
        //    int ratio_Speed_Y = Move.Speed * ratio_Y;
        //    if (ratio_Speed_X > ratio_Speed_Y) MoveDraw.Time = ratio_Speed_X;
        //    else MoveDraw.Time = ratio_Speed_Y;

        //    //Direction = ScreenDirection(this.MoveDraw.Distance.X, this.MoveDraw.Distance.Y);
        //}
 
        //public void Movement()
        //{
        //    if (MoveDraw.Index == -1) return;
      
        //    if(MoveDraw.Index == 0)
        //    {
        //        MoveDraw.Index++;
        //        OnDistance(Move.Street[MoveDraw.Index], Move.Adjustment);
        //    }  

        //    MoveDraw.DrawStep += Map.Step;

        //    int ratio_Speed = MoveDraw.DrawStep / MoveDraw.Time;

        //    int dist_X = ((int)( MoveDraw.Distance.X * ratio_Speed ))+MoveDraw.Adjustment.X;
        //    int dist_Y = ((int)( MoveDraw.Distance.Y * ratio_Speed ))+MoveDraw.Adjustment.Y;

        //    int pY = ((2*dist_Y-dist_X)/2);
        //    int pX = (dist_X+pY);
        //    int c_Y = ((int)Math.Floor((double)(pY/100)));
        //    int c_X = ((int)Math.Floor((double)(pX/100)));
        //    int Adjustment_X = ((int)(dist_X - ((c_X - c_Y) * 100)));
        //    int Adjustment_Y = ((int)(dist_Y - ((c_X + c_Y) * 50)));

        //    if((c_X != 0 || c_Y != 0) && MoveDraw.Location.X + c_X == Move.Street[MoveDraw.Index].X && MoveDraw.Location.Y + c_Y == Move.Street[MoveDraw.Index].Y)
        //    {
        //        X = Move.Street[MoveDraw.Index].X;
        //        Y = Move.Street[MoveDraw.Index].Y;
        //        Z = Move.Street[MoveDraw.Index].Z;
        //        Adjustment.X = Adjustment_X;
        //        Adjustment.Y = Adjustment_Y;
        //    }
        //    else
        //    {
        //        Adjustment.X = dist_X;//+MoveDraw.Adjustment.X;
        //        Adjustment.Y = dist_Y;//+MoveDraw.Adjustment.Y;
        //    }

            
        //    if(MoveDraw.DrawStep > MoveDraw.Time)
        //    {
        //        MoveDraw.Index++;
        //        if(MoveDraw.Index < Move.Street.Length)
        //            OnDistance(Move.Street[MoveDraw.Index], Move.Adjustment);
        //        else
        //            MoveDraw.Index = -1;
        //    }

        //}
 
        
        //public virtual void MoveToStreet()
        //{
        //    double temp = 0;
        //    temp = Move.Step / Move.Speed;
        //    int index = ((int)Math.Floor(temp));

        //    if (index < Move.Street.Length - 1)
        //    {
        //        if (Move.Street[index + 1].X != X || Move.Street[index + 1].Y != Y || Move.Street[index + 1].Z != Z)
        //            MoveToLocation(Move.Street[index + 1]);
        //        Move.Step += Map.Step;
        //    }
        //    else
        //    {
        //        if (Move.Street[Move.Street.Length - 1].X != X || Move.Street[Move.Street.Length - 1].Y != Y || Move.Street[Move.Street.Length - 1].Z != Z)
        //            MoveToLocation(Move.Street[Move.Street.Length - 1]);
        //        MoveEnd();
        //    }
        //}
        public virtual void MoveToMap(int dest_X, int dest_Y, int dest_Z, Map map)
        {
            if (map == null || !map.OnEnter(this)) return;
            X = dest_X;
            Y = dest_Y;
            Z = dest_Z;
        }
        //public virtual void MoveToLocation(Point3D dest) { MoveToLocation(dest.X, dest.Y, dest.Z); }
        //public virtual void MoveToLocation(int dest_X, int dest_Y, int dest_Z)
        //{
        //    ChangeDirection(dest_X, dest_Y, dest_Z);
        //    X = dest_X;
        //    Y = dest_Y;
        //    Z = dest_Z;
        //}
        public virtual Point3D[] OnStreet(int dest_X, int dest_Y, int dest_Z)
        {
            if (dest_X == X && dest_Y == Y && dest_Z == Z)
                return new Point3D[] { new Point3D(X, Y, Z), new Point3D(X, Y, Z) };
            
            if (Path == null) Path = new PathFinding(15);//Ajouter Range!!!
            Path.OnStreet(this);
            return Path.Find(dest_X, dest_Y, dest_Z);
        }
        public virtual void MoveTo(int dest_X, int dest_Y, int dest_Z) { MoveTo(dest_X, dest_Y, dest_Z, 0, 0); }
        public virtual void MoveTo(int dest_X, int dest_Y, int dest_Z, int Adjustment_X, int Adjustment_Y)
        {
            if (!CanMove || !CanMoveTo(dest_X, dest_Y, dest_Z, Map)) return;
            MoveJSON tmp_Move = new MoveJSON();
            tmp_Move.Speed = 1000;
            tmp_Move.Body = Body_Move;
            tmp_Move.Street = OnStreet(dest_X, dest_Y, dest_Z);
            if (tmp_Move.Street != null)
            {
                Adjustment.X = Adjustment_X;
                Adjustment.Y = Adjustment_Y;
                tmp_Move.Adjustment.X = Adjustment_X;
                tmp_Move.Adjustment.Y = Adjustment_Y;
                Move = tmp_Move;
                MoveStart();
            }
        }
        public virtual void MoveToRandom()
        {
            MoveJSON tmp_Move = new MoveJSON();
            tmp_Move.Speed = 2000;
            tmp_Move.Body = Body_Move;
            if (Path == null) Path = new PathFinding(15);//Ajouter Range!!!
            //if (Path == null) Path = new PathFinding(15);//Ajouter Range!!!
            Path.OnStreet(this);
            int random = Info.Random.Next(Path.Roads.Count);//.Length);
            tmp_Move.Street = Path.Roads[random].Street; //OnStreet(dest_X, dest_Y, dest_Z);
            if (tmp_Move.Street != null)
            {
                Adjustment.X = 0;
                Adjustment.Y = 0;
                tmp_Move.Adjustment.X = 0;
                tmp_Move.Adjustment.Y = 0;
                //Adjustment.X = Adjustment_X;
                //Adjustment.Y = Adjustment_Y;
                Move = tmp_Move;
                MoveStart();
            }



            //Path.OnStreet(Entity);
            //int random = Info.Random.Next(Path.Roads.Length);
            //Entity.Move = new MoveJSON();
            //Entity.Move.Body = new BodyJSON(new ImageJSON[] { new ImageJSON("Mobile_Move", 1, 1) }, true, true, 750, -1);
            //Entity.Move.Street = Path.Roads[random].Street;
            ////Entity.Move.Step = 0;
            //Entity.MoveStart();


            //int x = Info.Random.Next(-5, 5);
            //int y = Info.Random.Next(-5, 5);
            //PathFinding.Path.MoveTo(Entity, Entity.X + x, Entity.Y + y, Entity.Z);// + Info.Random.Next(10));
        }
        public virtual void MoveStart() { MoveDraw.Index = 0; }
        public virtual void MoveEnd(){ Move = null; }

        public virtual void Save(SerializationWriter SW)
        {
            SW.WriteType(this);
            SW.WriteStartElement("Entity");
            SW.WriteVersion(0);

            if (AI == null) SW.Write("AI", "");
            else SW.Write("AI", AI.GetType().ToString());

            SW.Write("ID", ID);
            SW.Write("X", X);
            SW.Write("Y", Y);
            SW.Write("Z", Z);
            SW.Write("Name", Name);
            SW.Write("Width", Width);
            SW.Write("Height", Height);
            SW.Write("CanMove", CanMove);
            SW.Write("CanTarget", CanTarget);
            SW.Write("Cross",Cross);
            SW.Write("Direction", Direction);
            SW.Write("Flag", Flag.Value);
            SW.Write("Containers", Containers);
            //SW.Write("Move", Move);//Supprimer!!!!
            SW.Write("Body", Body);
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
                        string ai = SR.ReadString();
                        if (ai != "") AI = Info.Instance(ai) as AI;
                        if(AI != null)
                            AI.Entity = this;

                        ID = SR.ReadString();
                        X = SR.ReadInt();
                        Y = SR.ReadInt();
                        Z = SR.ReadInt();
                        Name = SR.ReadString();
                        Width = SR.ReadFloat();
                        Height = SR.ReadFloat();
                        CanMove = SR.ReadBool();
                        CanTarget = SR.ReadBool();
                        Cross = SR.ReadBool();
                        Direction = SR.ReadInt();
                        Flag.Value = SR.ReadInt();
                        Containers = SR.ReadContainers();
                        //Move = SR.ReadMove();//Supprimer!!!!!
                        Body = SR.ReadBodyJSON();
                        break;
                    }
            }

            SR.ReadEndElement();
        }
    }
}
