using Microsoft.EntityFrameworkCore;

namespace server.Models{
    public class ItprojectContext : DbContext{
        public ItprojectContext(DbContextOptions<ItprojectContext> options) : base(options){}

        public DbSet<User> Users { get; set; }
    }
}