namespace Books.API.Models.Domain
{
    public class Book
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string? ImageUrl { get; set; }
        public int? PageLength { get; set; }
    }
}
