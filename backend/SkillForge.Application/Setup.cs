using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SkillForge.Application.Services;
using SkillForge.Domain.Interfaces;

namespace SkillForge.Application;

public static class Setup
{
    public static void AddApplication(this IHostApplicationBuilder builder)
    {
        RegisterServices(builder.Services);
    }

    private static void RegisterServices(IServiceCollection service)
    {
        service.AddScoped<ISkillService, SkillService>();
    }
}