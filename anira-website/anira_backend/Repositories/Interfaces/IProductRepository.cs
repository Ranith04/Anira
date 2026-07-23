using System.Collections.Generic;
using System.Threading.Tasks;
using anira_backend.DTOs;

namespace anira_backend.Repositories.Interfaces;

public interface IProductRepository
{
    Task<IEnumerable<ProductDto>> GetAllAsync();
    Task<ProductDto?> GetBySlugAsync(string slug);
    Task<IEnumerable<ProductDto>> GetByCategorySlugAsync(string categorySlug);
}
