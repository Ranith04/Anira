using System;
using System.Threading.Tasks;
using Dapper;
using anira_backend.Common;
using Microsoft.Extensions.Logging;
using BCrypt.Net;

namespace anira_backend.Services;

public class DatabaseSeeder
{
    private readonly DbConnectionFactory _dbConnectionFactory;
    private readonly ILogger<DatabaseSeeder> _logger;

    public DatabaseSeeder(DbConnectionFactory dbConnectionFactory, ILogger<DatabaseSeeder> logger)
    {
        _dbConnectionFactory = dbConnectionFactory;
        _logger = logger;
    }

    public async Task SeedAsync()
    {
        using var conn = await _dbConnectionFactory.CreateConnectionAsync();
        
        // 1. Automatic Database Migrations via db_changelog.txt
        await conn.ExecuteAsync(@"
            CREATE TABLE IF NOT EXISTS _schema_migrations (
                last_length INT NOT NULL DEFAULT 0
            );
            INSERT INTO _schema_migrations (last_length) 
            SELECT 0 WHERE NOT EXISTS (SELECT 1 FROM _schema_migrations);
        ");

        var changelogPath = System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), "db_changelog.txt");
        if (System.IO.File.Exists(changelogPath))
        {
            var sql = await System.IO.File.ReadAllTextAsync(changelogPath);
            // Normalize line endings to avoid length calculation bugs across OS
            sql = sql.Replace("\r\n", "\n"); 
            var lastLength = await conn.QuerySingleAsync<int>("SELECT last_length FROM _schema_migrations LIMIT 1");

            // If this is the very first run (lastLength == 0) but the 'users' table already exists, 
            // it means the baseline was deployed manually before this migration system was added.
            // We should fast-forward the lastLength to avoid crashing.
            if (lastLength == 0)
            {
                var baselineExists = await conn.ExecuteScalarAsync<int>("SELECT COUNT(1) FROM information_schema.tables WHERE table_name = 'users'") > 0;
                if (baselineExists)
                {
                    lastLength = sql.Length;
                    await conn.ExecuteAsync("UPDATE _schema_migrations SET last_length = @Len", new { Len = lastLength });
                    _logger.LogInformation("Fast-forwarded migration baseline to {Len} characters.", lastLength);
                }
            }

            if (sql.Length > lastLength)
            {
                _logger.LogInformation("New changes detected in db_changelog.txt. Executing migrations...");
                var newSql = sql.Substring(lastLength);
                
                using var migrationTx = conn.BeginTransaction();
                try
                {
                    await conn.ExecuteAsync(newSql, transaction: migrationTx);
                    await conn.ExecuteAsync("UPDATE _schema_migrations SET last_length = @Len", new { Len = sql.Length }, transaction: migrationTx);
                    migrationTx.Commit();
                    _logger.LogInformation("Successfully executed {Len} bytes of new SQL.", newSql.Length);
                }
                catch (Exception ex)
                {
                    migrationTx.Rollback();
                    _logger.LogError(ex, "Failed to execute new SQL in db_changelog.txt. Please check your syntax.");
                    throw;
                }
            }
        }
        var demoUserExists = await conn.ExecuteScalarAsync<int>("SELECT COUNT(1) FROM users WHERE email = 'priya@example.com'");
        if (demoUserExists == 0)
        {
            var demoUserId = Guid.NewGuid();
            var passwordHash = BCrypt.Net.BCrypt.HashPassword("password123");
            await conn.ExecuteAsync(@"
                INSERT INTO users (id, email, phone, password_hash, full_name, role, is_email_verified, is_active)
                VALUES (@Id, 'priya@example.com', '+919876543210', @Hash, 'Priya Sharma', 'customer', true, true)
                ON CONFLICT DO NOTHING;",
                new { Id = demoUserId, Hash = passwordHash });
        }

        var adminUserExists = await conn.ExecuteScalarAsync<int>("SELECT COUNT(1) FROM users WHERE email = 'admin@anirastudio.com'");
        if (adminUserExists == 0)
        {
            var adminUserId = Guid.NewGuid();
            var adminPasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123");
            await conn.ExecuteAsync(@"
                INSERT INTO users (id, email, phone, password_hash, full_name, role, is_email_verified, is_active)
                VALUES (@Id, 'admin@anirastudio.com', '+910000000000', @Hash, 'Anira Admin', 'admin', true, true)
                ON CONFLICT DO NOTHING;",
                new { Id = adminUserId, Hash = adminPasswordHash });
        }

        // Check if categories already exist
        var count = await conn.ExecuteScalarAsync<int>("SELECT COUNT(1) FROM categories");
        if (count > 0)
        {
            _logger.LogInformation("Database already seeded. Skipping seeder.");
            return;
        }

        _logger.LogInformation("Seeding database with sample data...");

        using var transaction = conn.BeginTransaction();
        try
        {

            // Seed Categories
            var categoryId1 = Guid.NewGuid();
            var categoryId2 = Guid.NewGuid();
            var categoryId3 = Guid.NewGuid();
            
            await conn.ExecuteAsync(@"
                INSERT INTO categories (id, name, slug, description, display_order) VALUES 
                (@Id1, 'Sarees', 'sarees', 'Exquisite collection of traditional and modern sarees.', 1),
                (@Id2, 'Kurtas', 'kurtas', 'Elegant designer kurtas for every occasion.', 2),
                (@Id3, 'Dresses', 'dresses', 'Beautiful ethnic dresses.', 3)",
                new { Id1 = categoryId1, Id2 = categoryId2, Id3 = categoryId3 }, transaction);

            // Seed Products
            var p1 = Guid.NewGuid();
            var p2 = Guid.NewGuid();
            var p3 = Guid.NewGuid();
            
            await conn.ExecuteAsync(@"
                INSERT INTO products (id, category_id, name, slug, short_description, mrp, selling_price, sku, is_new_arrival, is_bestseller) VALUES 
                (@Id1, @Cat1, 'Priya - Banarasi Silk Saree', 'priya-banarasi-silk-saree', 'A stunning yellow Banarasi silk saree with intricate zari work.', 5500.00, 3850.00, 'SA-BAN-01', true, true),
                (@Id2, @Cat2, 'Meera - Cotton Anarkali Kurta', 'meera-cotton-anarkali-kurta', 'Comfortable and stylish cotton Anarkali kurta.', 2500.00, 1800.00, 'KU-COT-01', false, true),
                (@Id3, @Cat1, 'Shriya - Chiffon Saree', 'shriya-chiffon-saree', 'Lightweight and elegant chiffon saree.', 3200.00, 2250.00, 'SA-CHI-02', true, false)",
                new { Id1 = p1, Id2 = p2, Id3 = p3, Cat1 = categoryId1, Cat2 = categoryId2 }, transaction);

            // Seed Images
            await conn.ExecuteAsync(@"
                INSERT INTO product_images (product_id, storage_key, cdn_url, is_primary) VALUES 
                (@Id1, 'priya_saree.jpg', 'https://readdy.ai/api/search-image?query=yellow+banarasi+silk+saree+indian+ethnic&width=400&height=500', true),
                (@Id2, 'meera_kurta.jpg', 'https://readdy.ai/api/search-image?query=cotton+anarkali+kurta+indian+ethnic&width=400&height=500', true),
                (@Id3, 'shriya_saree.jpg', 'https://readdy.ai/api/search-image?query=peach+chiffon+saree+minimalist&width=400&height=500', true)",
                new { Id1 = p1, Id2 = p2, Id3 = p3 }, transaction);
            
            // Seed Variants
            await conn.ExecuteAsync(@"
                INSERT INTO product_variants (product_id, sku, stock_quantity) VALUES 
                (@Id1, 'SA-BAN-01-DEF', 10),
                (@Id2, 'KU-COT-01-DEF', 25),
                (@Id3, 'SA-CHI-02-DEF', 15)",
                new { Id1 = p1, Id2 = p2, Id3 = p3 }, transaction);

            transaction.Commit();
            _logger.LogInformation("Database seeded successfully.");
        }
        catch (Exception ex)
        {
            transaction.Rollback();
            _logger.LogError(ex, "Failed to seed database.");
            throw;
        }
    }
}
