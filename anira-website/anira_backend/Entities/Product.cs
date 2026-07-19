using System;

namespace feora_backend.Entities;

public enum ProductStatus { Draft, Active, OutOfStock, Archived }

public class Product
{
    public Guid Id { get; set; }
    public Guid CategoryId { get; set; }
    public int? FabricId { get; set; }
    public required string Name { get; set; }
    public required string Slug { get; set; }
    public string? ShortDescription { get; set; }
    public string? Description { get; set; }
    public string? CareInstructions { get; set; }
    public string Attributes { get; set; } = "{}"; // JSONB mapped as string for simplicity with Dapper
    public string Specifications { get; set; } = "{}";
    public decimal Mrp { get; set; }
    public decimal SellingPrice { get; set; }
    public decimal? CostPrice { get; set; }
    public short DiscountPercent { get; set; }
    public required string Sku { get; set; }
    public bool IsNewArrival { get; set; }
    public bool IsBestseller { get; set; }
    public bool IsTrending { get; set; }
    public bool IsCombo { get; set; }
    public ProductStatus Status { get; set; }
    public decimal AvgRating { get; set; }
    public int ReviewCount { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}
