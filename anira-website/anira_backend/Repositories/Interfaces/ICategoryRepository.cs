using System.Collections.Generic;
using System.Threading.Tasks;
using anira_backend.DTOs;

namespace anira_backend.Repositories.Interfaces;

public interface ICategoryRepository
{
    Task<IEnumerable<CategoryDto>> GetAllAsync();
}
