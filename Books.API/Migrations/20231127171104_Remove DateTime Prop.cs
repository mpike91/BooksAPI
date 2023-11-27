using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Books.API.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDateTimeProp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicationDate",
                table: "Books");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "PublicationDate",
                table: "Books",
                type: "datetime2",
                nullable: true);
        }
    }
}
