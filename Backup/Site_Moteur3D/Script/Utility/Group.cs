
namespace Core.Utility
{
    public class Group
    {
        public string Name = string.Empty;
        public EntityList Entitys = new EntityList();
        //public Container Container = new Container("", "", 10, 10);

        public virtual void OnTick() { }
        public virtual bool OnEnter(Entity entity) { return false; }
        public virtual bool OnExit(Entity entity) { return false; }
    }
}
