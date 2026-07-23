using System;

namespace anira_backend.Entities;

public class ProductVariant
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public int? SizeId { get; set; }
    public int? ColorId { get; set; }
    public required string Sku { get; set; }
    public decimal? MrpOverride { get; set; }
    public decimal? SellingPriceOverride { get; set; }
    public decimal? CostPriceOverride { get; set; }
    public int StockQuantity { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}
