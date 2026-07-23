using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using anira_backend.Common;
using anira_backend.DTOs;
using anira_backend.Repositories.Interfaces;

namespace anira_backend.Repositories.Implementations;

public class ProductRepository : IProductRepository
{
    private readonly DbConnectionFactory _dbConnectionFactory;

    public ProductRepository(DbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    private const string BaseSelectSql = @"
        SELECT 
            p.id AS Id,
            p.slug AS Slug,
            p.name AS Name,
            p.selling_price AS Price,
            p.mrp AS OriginalPrice,
            COALESCE(img.cdn_url, '') AS Image,
            NULL AS HoverImage,
            CASE 
                WHEN p.is_new_arrival THEN 'New Arrival'
                WHEN p.is_bestseller THEN 'Bestseller'
                WHEN p.is_trending THEN 'Trending'
                ELSE NULL 
            END AS Badge,
            c.slug AS CategorySlug
        FROM products p
        INNER JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_images img ON p.id = img.product_id AND img.is_primary = true
        WHERE p.status = 'active'
    ";

    public async Task<IEnumerable<ProductDto>> GetAllAsync()
    {
        using var conn = await _dbConnectionFactory.CreateConnectionAsync();
        var sql = BaseSelectSql + " ORDER BY p.created_at DESC;";
        return await conn.QueryAsync<ProductDto>(sql);
    }

    public async Task<ProductDto?> GetBySlugAsync(string slug)
    {
        using var conn = await _dbConnectionFactory.CreateConnectionAsync();
        var sql = BaseSelectSql + " AND p.slug = @Slug LIMIT 1;";
        return await conn.QueryFirstOrDefaultAsync<ProductDto>(sql, new { Slug = slug });
    }

    public async Task<IEnumerable<ProductDto>> GetByCategorySlugAsync(string categorySlug)
    {
        using var conn = await _dbConnectionFactory.CreateConnectionAsync();
        var sql = BaseSelectSql + " AND c.slug = @CategorySlug ORDER BY p.created_at DESC;";
        return await conn.QueryAsync<ProductDto>(sql, new { CategorySlug = categorySlug });
    }
}
