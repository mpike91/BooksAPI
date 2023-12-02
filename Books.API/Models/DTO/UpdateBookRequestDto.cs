namespace Books.API.Models.DTO
{
    public class UpdateBookRequestDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string? DatePublished { get; set; }
        public string? ImageUrl { get; set; }
        public int? PageLength { get; set; }

    }
}
