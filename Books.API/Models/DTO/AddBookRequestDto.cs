namespace Books.API.Models.DTO
{
    public class AddBookRequestDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string? ImageUrl { get; set; }
        public int? PageLength { get; set; }
    }
}
