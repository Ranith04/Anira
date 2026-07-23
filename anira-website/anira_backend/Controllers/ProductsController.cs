using System.Collections.Generic;
using System.Threading.Tasks;
using anira_backend.DTOs;
using anira_backend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace anira_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _productRepository;

    public ProductsController(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts([FromQuery] string? category)
    {
        if (!string.IsNullOrEmpty(category))
        {
            var productsByCategory = await _productRepository.GetByCategorySlugAsync(category);
            return Ok(productsByCategory);
        }

        var products = await _productRepository.GetAllAsync();
        return Ok(products);
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<ProductDto>> GetProductBySlug(string slug)
    {
        var product = await _productRepository.GetBySlugAsync(slug);
        
        if (product == null)
            return NotFound(new { message = "Product not found" });
            
        return Ok(product);
    }
}
