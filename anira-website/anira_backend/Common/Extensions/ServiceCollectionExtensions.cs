using Microsoft.Extensions.DependencyInjection;

namespace feora_backend.Common.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        // Add transient/scoped repositories here
        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        // Add scoped services here
        return services;
    }
}
