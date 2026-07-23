using System.Collections.Generic;
using System.Threading.Tasks;
using anira_backend.DTOs;
using anira_backend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace anira_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return Ok(categories);
    }
}
