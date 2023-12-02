using Microsoft.AspNetCore.Mvc;
using Books.API.Data;
using Books.API.Models.Domain;
using Books.API.Models.DTO;
using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace Books.API.Controllers
{
    // https://localhost:7079/api/books
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BooksDbContext _dbContext;

        public BooksController(BooksDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET ALL BOOKS
        // GET: https://localhost:7079/api/books
        [HttpGet]
        public IActionResult GetAll()
        {

            // Get Data from DataBase - Domain models
            var booksDomain = _dbContext.Books.ToList();

            // Map Domain Models to DTOs
            var booksDto = new List<BookDto>();
            foreach (var bookDomain in booksDomain)
            {
                booksDto.Add(new BookDto()
                {
                    Id = bookDomain.Id,
                    Title = bookDomain.Title,
                    Author = bookDomain.Author,
                    DatePublished = bookDomain.DatePublished,
                    ImageUrl = bookDomain.ImageUrl,
                    PageLength = bookDomain.PageLength,
                });
            }

            // Return DTOs to client
            return Ok(booksDto);
        }

        // GET BOOK BY ID
        // GET: https://localhost:7079/api/books/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public IActionResult GetById([FromRoute] Guid id)
        {
            // Get Book Domain Model from Database
            var bookDomain = _dbContext.Books.FirstOrDefault(x => x.Id == id);

            if (bookDomain == null)
            {
                return NotFound();
            }

            // Map Book Domain Model to Book DTO
            var bookDto = new BookDto
            {
                Id = bookDomain.Id,
                Title = bookDomain.Title,
                Author = bookDomain.Author,
                DatePublished = bookDomain.DatePublished,
                ImageUrl = bookDomain.ImageUrl,
                PageLength = bookDomain.PageLength
            };

            // Return DTO back to client
            return Ok(bookDto);
        }

        // POST TO CREATE NEW BOOK
        // POST: https://localhost:7079/api/books
        [HttpPost]
        public IActionResult Create([FromBody] AddBookRequestDto addBookRequestDto)
        {
            // Map DTO to Domain Model
            var bookDomainModel = new Book
            {
                Title = addBookRequestDto.Title,
                Author = addBookRequestDto.Author,
                DatePublished = addBookRequestDto.DatePublished,
                ImageUrl = addBookRequestDto.ImageUrl,
                PageLength = addBookRequestDto.PageLength,
            };



            // Use Domain Model to create Book. Add and save to DB.
            _dbContext.Books.Add(bookDomainModel);
            _dbContext.SaveChanges();

            // Map Domain model back to DTO
            var bookDto = new BookDto
            {
                Id = bookDomainModel.Id,
                Title = bookDomainModel.Title,
                Author = bookDomainModel.Author,
                DatePublished = bookDomainModel.DatePublished,
                ImageUrl = bookDomainModel.ImageUrl,
                PageLength = bookDomainModel.PageLength,
            };

            return CreatedAtAction(nameof(GetById), new { id = bookDto.Id }, bookDto);
        }

        // UDATE BOOK
        // PUT: https://localhost:7255/api/books/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        public IActionResult Update([FromRoute] Guid id, [FromBody] UpdateBookRequestDto updateBookRequestDto)
        {
            // Check if book exists
            var bookDomainModel = _dbContext.Books.FirstOrDefault(x => x.Id == id);

            if (bookDomainModel == null)
            {
                return NotFound();
            }

            // Update Book Domain Model from DTO's values
            bookDomainModel.Title = updateBookRequestDto.Title;
            bookDomainModel.Author = updateBookRequestDto.Author;
            bookDomainModel.DatePublished = updateBookRequestDto.DatePublished;
            bookDomainModel.ImageUrl = updateBookRequestDto.ImageUrl;
            bookDomainModel.PageLength = updateBookRequestDto.PageLength;

            _dbContext.SaveChanges();

            // Map Domain Model to DTO
            var bookDto = new BookDto
            {
                Id = bookDomainModel.Id,
                Title = bookDomainModel.Title,
                Author = bookDomainModel.Author,
                DatePublished = bookDomainModel.DatePublished,
                ImageUrl = bookDomainModel.ImageUrl,
                PageLength = bookDomainModel.PageLength,
            };

            return Ok(bookDto);
        }

        // DELETE BOOK
        // DELETE: https://localhost:7255/api/books/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        public IActionResult Delete([FromRoute] Guid id)
        {
            var bookDomainModel = _dbContext.Books.FirstOrDefault(x => x.Id == id);

            if (bookDomainModel == null)
            {
                return NotFound();
            }

            // Delete book
            _dbContext.Books.Remove(bookDomainModel);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}
