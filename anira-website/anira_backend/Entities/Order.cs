using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace anira_backend.Entities;

public class Order
{
    [Key]
    public string Id { get; set; } = string.Empty; // e.g., ORD-12345

    [Required]
    public int UserId { get; set; }

    [ForeignKey("UserId")]
    public User User { get; set; } = null!;

    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

    public decimal TotalAmount { get; set; }

    [Required]
    [MaxLength(50)]
    public string Status { get; set; } = "Pending"; // Pending, Processing, Shipped, Delivered, Cancelled

    [Required]
    [MaxLength(50)]
    public string PaymentStatus { get; set; } = "Pending"; // Pending, Paid, Failed

    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
