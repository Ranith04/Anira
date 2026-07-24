using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace anira_backend.Entities;

public class OrderItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string OrderId { get; set; } = string.Empty;

    [ForeignKey("OrderId")]
    [JsonIgnore]
    public Order Order { get; set; } = null!;

    [Required]
    public int ProductId { get; set; }

    [ForeignKey("ProductId")]
    public Product Product { get; set; } = null!;

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }
}
