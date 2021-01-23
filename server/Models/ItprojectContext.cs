using Microsoft.EntityFrameworkCore;
using server.Entities;

namespace server.Models
{
    public class ItprojectContext : DbContext
    {
        public ItprojectContext(DbContextOptions<ItprojectContext> options) : base(options) { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Market> Market { get; set; }
        public DbSet<Buyer> Buyer { get; set; }
        public DbSet<Freelancer> Freelancer { get; set; }
        public DbSet<AccountOrder> AccountOrders { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductOrder>().HasKey(po => new { po.ProductID, po.OrderID });
        }
    }
}