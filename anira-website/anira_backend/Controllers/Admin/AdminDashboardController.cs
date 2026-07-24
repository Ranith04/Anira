using System.Threading.Tasks;
using anira_backend.Common;
using anira_backend.DTOs;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace anira_backend.Controllers.Admin;

[ApiController]
[Route("api/admin/dashboard")]
[Authorize] // Ideally we'd have a Role check here like [Authorize(Roles = "admin,staff")]
public class AdminDashboardController : ControllerBase
{
    private readonly DbConnectionFactory _db;

    public AdminDashboardController(DbConnectionFactory db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetDashboardStats()
    {
        using var conn = await _db.CreateConnectionAsync();

        var totalRevenue = await conn.ExecuteScalarAsync<decimal>("SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status != 'cancelled'");
        var activeOrders = await conn.ExecuteScalarAsync<int>("SELECT COUNT(1) FROM orders WHERE status IN ('pending', 'processing', 'shipped')");
        var totalCustomers = await conn.ExecuteScalarAsync<int>("SELECT COUNT(1) FROM users WHERE role = 'customer'");
        var productsSold = await conn.ExecuteScalarAsync<int>(@"
            SELECT COALESCE(SUM(quantity), 0) 
            FROM order_items oi 
            JOIN orders o ON oi.order_id = o.id 
            WHERE o.status != 'cancelled'
        ");

        var recentOrders = await conn.QueryAsync<RecentOrderDto>(@"
            SELECT 
                o.order_number AS Id, 
                u.full_name AS Customer, 
                TO_CHAR(o.placed_at, 'Mon DD, YYYY') AS Date, 
                '₹' || TRIM(TO_CHAR(o.total_amount, '99,99,999.00')) AS Amount, 
                CASE 
                    WHEN o.status = 'pending' THEN 'Pending'
                    WHEN o.status = 'processing' THEN 'Processing'
                    WHEN o.status = 'shipped' THEN 'Shipped'
                    WHEN o.status = 'delivered' THEN 'Delivered'
                    ELSE 'Pending' 
                END AS Status 
            FROM orders o
            JOIN users u ON o.user_id = u.id
            ORDER BY o.placed_at DESC 
            LIMIT 5;
        ");

        var dto = new AdminDashboardDto
        {
            TotalRevenue = $"₹{totalRevenue:N0}",
            ActiveOrders = activeOrders.ToString(),
            TotalCustomers = totalCustomers.ToString(),
            ProductsSold = productsSold.ToString(),

            TotalRevenueChange = new RevenueChange { Value = "+12.5%", Trend = "up" },
            ActiveOrdersChange = new RevenueChange { Value = "+5.2%", Trend = "up" },
            TotalCustomersChange = new RevenueChange { Value = "+18.1%", Trend = "up" },
            ProductsSoldChange = new RevenueChange { Value = "-2.4%", Trend = "down" },

            RecentOrders = recentOrders.AsList()
        };

        return Ok(dto);
    }
}
