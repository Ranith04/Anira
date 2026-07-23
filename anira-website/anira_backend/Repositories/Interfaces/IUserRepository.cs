using System;
using System.Threading.Tasks;
using anira_backend.Entities;

namespace anira_backend.Repositories.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(Guid id);
    Task<User?> GetByEmailAsync(string email);
    Task<User> CreateAsync(User user);
}
