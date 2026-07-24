using System.Threading.Tasks;
using anira_backend.Common;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace anira_backend.Controllers.Admin;

[ApiController]
[Route("api/admin/customers")]
[Authorize]
public class AdminCustomersController : ControllerBase
{
    private readonly DbConnectionFactory _db;

    public AdminCustomersController(DbConnectionFactory db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetCustomers()
    {
        using var conn = await _db.CreateConnectionAsync();

        var sql = @"
            SELECT 
                u.id AS Id,
                u.full_name AS Name,
                u.email AS Email,
                u.phone AS Phone,
                (SELECT COUNT(1) FROM orders WHERE user_id = u.id) AS Orders,
                '₹' || TRIM(TO_CHAR(COALESCE((SELECT SUM(total_amount) FROM orders WHERE user_id = u.id AND status != 'cancelled'), 0), '99,99,999.00')) AS Spent,
                CASE 
                    WHEN o.placed_at IS NOT NULL THEN 'Recent'
                    ELSE 'New'
                END AS LastActive
            FROM users u
            LEFT JOIN LATERAL (
                SELECT placed_at FROM orders WHERE user_id = u.id ORDER BY placed_at DESC LIMIT 1
            ) o ON true
            WHERE u.role = 'customer'
            ORDER BY u.created_at DESC;
        ";

        var customers = await conn.QueryAsync(sql);
        return Ok(customers);
    }
}
