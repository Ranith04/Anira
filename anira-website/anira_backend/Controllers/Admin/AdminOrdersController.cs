using System.Threading.Tasks;
using anira_backend.Common;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace anira_backend.Controllers.Admin;

[ApiController]
[Route("api/admin/orders")]
[Authorize]
public class AdminOrdersController : ControllerBase
{
    private readonly DbConnectionFactory _db;

    public AdminOrdersController(DbConnectionFactory db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        using var conn = await _db.CreateConnectionAsync();

        var sql = @"
            SELECT 
                o.order_number AS Id, 
                u.full_name AS Customer, 
                u.email AS Email,
                TO_CHAR(o.placed_at, 'Mon DD, YYYY') AS Date, 
                '₹' || TRIM(TO_CHAR(o.total_amount, '99,99,999.00')) AS Amount, 
                (SELECT SUM(quantity) FROM order_items WHERE order_id = o.id) AS Items,
                CASE 
                    WHEN o.status = 'pending' THEN 'Pending'
                    WHEN o.status = 'processing' THEN 'Processing'
                    WHEN o.status = 'shipped' THEN 'Shipped'
                    WHEN o.status = 'delivered' THEN 'Delivered'
                    ELSE 'Pending' 
                END AS Status,
                COALESCE(
                    (SELECT status::text FROM payments WHERE order_id = o.id LIMIT 1), 'pending'
                ) AS PaymentStatus
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.placed_at DESC;
        ";

        var orders = await conn.QueryAsync(sql);
        
        // Transform the payment status text to Title Case
        var result = new System.Collections.Generic.List<object>();
        foreach (dynamic order in orders)
        {
            var pStatus = order.paymentstatus?.ToString() ?? "Pending";
            if (pStatus == "paid") pStatus = "Paid";
            else if (pStatus == "failed") pStatus = "Failed";
            else pStatus = "Pending";

            result.Add(new {
                order.id,
                order.customer,
                order.email,
                order.date,
                order.amount,
                order.items,
                order.status,
                payment = pStatus
            });
        }

        return Ok(result);
    }
}
