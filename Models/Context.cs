using Microsoft.EntityFrameworkCore;

namespace hello_world.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Pet> Pets { get; set; }
    }
}
