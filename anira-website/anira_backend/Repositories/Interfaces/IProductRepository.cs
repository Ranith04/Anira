using System.Collections.Generic;
using System.Threading.Tasks;
using feora_backend.DTOs;

namespace feora_backend.Repositories.Interfaces;

public interface IProductRepository
{
    Task<IEnumerable<ProductDto>> GetAllAsync();
    Task<ProductDto?> GetBySlugAsync(string slug);
    Task<IEnumerable<ProductDto>> GetByCategorySlugAsync(string categorySlug);
}
