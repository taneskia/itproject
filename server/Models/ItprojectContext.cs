using Microsoft.EntityFrameworkCore;

namespace server.Models{
    public class ItprojectContext : DbContext{
        public ItprojectContext(DbContextOptions<ItprojectContext> options) : base(options){}

        public DbSet<User> Users { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Market> Market { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<ProductOrder>().HasKey(po => new {po.ProductID,po.OrderID});
        }
    }
}