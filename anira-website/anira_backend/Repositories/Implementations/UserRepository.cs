using System;
using System.Threading.Tasks;
using Dapper;
using anira_backend.Common;
using anira_backend.Entities;
using anira_backend.Repositories.Interfaces;

namespace anira_backend.Repositories.Implementations;

public class UserRepository : IUserRepository
{
    private readonly DbConnectionFactory _dbConnectionFactory;

    public UserRepository(DbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        using var conn = await _dbConnectionFactory.CreateConnectionAsync();
        var sql = @"
            SELECT id AS Id, email AS Email, phone AS Phone, password_hash AS PasswordHash, 
                   full_name AS FullName, role AS Role, is_email_verified AS IsEmailVerified, 
                   is_active AS IsActive, created_at AS CreatedAt, updated_at AS UpdatedAt
            FROM users WHERE id = @Id;";
        return await conn.QueryFirstOrDefaultAsync<User>(sql, new { Id = id });
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        using var conn = await _dbConnectionFactory.CreateConnectionAsync();
        var sql = @"
            SELECT id AS Id, email AS Email, phone AS Phone, password_hash AS PasswordHash, 
                   full_name AS FullName, role AS Role, is_email_verified AS IsEmailVerified, 
                   is_active AS IsActive, created_at AS CreatedAt, updated_at AS UpdatedAt
            FROM users WHERE email = @Email;";
        return await conn.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
    }

    public async Task<User> CreateAsync(User user)
    {
        using var conn = await _dbConnectionFactory.CreateConnectionAsync();
        var sql = @"
            INSERT INTO users (email, password_hash, full_name, role, is_active)
            VALUES (@Email, @PasswordHash, @FullName, 'customer'::user_role, true)
            RETURNING id AS Id, email AS Email, full_name AS FullName, created_at AS CreatedAt;";
        var created = await conn.QuerySingleAsync<User>(sql, user);
        user.Id = created.Id;
        user.CreatedAt = created.CreatedAt;
        return user;
    }
}
