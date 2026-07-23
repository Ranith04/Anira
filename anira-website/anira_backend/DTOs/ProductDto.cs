using System;

namespace anira_backend.DTOs;

public class ProductDto
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public decimal OriginalPrice { get; set; }
    public string Image { get; set; } = string.Empty;
    public string? HoverImage { get; set; }
    public string? Badge { get; set; }
    public string CategorySlug { get; set; } = string.Empty;
}
