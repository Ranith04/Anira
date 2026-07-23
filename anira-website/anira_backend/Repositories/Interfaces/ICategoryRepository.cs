using System.Collections.Generic;
using System.Threading.Tasks;
using feora_backend.DTOs;

namespace feora_backend.Repositories.Interfaces;

public interface ICategoryRepository
{
    Task<IEnumerable<CategoryDto>> GetAllAsync();
}
