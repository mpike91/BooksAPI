using Books.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Books.API.Data
{
    public class BooksDbContext: DbContext
    {
        public BooksDbContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {
            
        }

        public DbSet<Book> Books { get; set; }
    }
}
