using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using anira_backend.Common;
using anira_backend.DTOs;
using anira_backend.Repositories.Interfaces;

namespace anira_backend.Repositories.Implementations;

public class CategoryRepository : ICategoryRepository
{
    private readonly DbConnectionFactory _dbConnectionFactory;

    public CategoryRepository(DbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllAsync()
    {
        using var conn = await _dbConnectionFactory.CreateConnectionAsync();
        var sql = @"
            SELECT 
                id AS Id,
                name AS Name,
                slug AS Slug,
                image_url AS ImageUrl,
                display_order AS DisplayOrder
            FROM categories
            WHERE is_active = true
            ORDER BY display_order ASC;
        ";
        return await conn.QueryAsync<CategoryDto>(sql);
    }
}
