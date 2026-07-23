using System.Text;
using feora_backend.Common;
using feora_backend.Common.Middleware;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Logger setup
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();
builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Cache & Compression
builder.Services.AddMemoryCache();
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    throw new System.Exception("Connection string is not configured.");
}
builder.Services.AddNpgsqlDataSource(connectionString);
builder.Services.AddSingleton<DbConnectionFactory>();

// JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var jwtSettings = builder.Configuration.GetSection("Jwt");
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"] ?? "super_secret_fallback_key_that_is_long_enough"))
    };
});
builder.Services.AddAuthorization();

// Add Validators, Services, Repositories here
// builder.Services.AddValidatorsFromAssemblyContaining<Program>();

builder.Services.AddTransient<feora_backend.Services.DatabaseSeeder>();
builder.Services.AddScoped<feora_backend.Repositories.Interfaces.ICategoryRepository, feora_backend.Repositories.Implementations.CategoryRepository>();
builder.Services.AddScoped<feora_backend.Repositories.Interfaces.IProductRepository, feora_backend.Repositories.Implementations.ProductRepository>();
builder.Services.AddScoped<feora_backend.Repositories.Interfaces.IUserRepository, feora_backend.Repositories.Implementations.UserRepository>();

var app = builder.Build();

// Test Database Connection and Seed on Startup
try
{
    using var scope = app.Services.CreateScope();
    var factory = scope.ServiceProvider.GetRequiredService<DbConnectionFactory>();
    using var conn = await factory.CreateConnectionAsync();
    app.Logger.LogInformation("✅ Successfully connected to the PostgreSQL database!");
    
    // Run seeder
    var seeder = scope.ServiceProvider.GetRequiredService<feora_backend.Services.DatabaseSeeder>();
    await seeder.SeedAsync();
}
catch (System.Exception ex)
{
    app.Logger.LogError(ex, "❌ Failed to connect to the PostgreSQL database or seed data.");
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseResponseCompression();
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/health", async (DbConnectionFactory factory) =>
{
    using var conn = await factory.CreateConnectionAsync();
    return Results.Ok(new { status = "Healthy" });
});

app.Run();
