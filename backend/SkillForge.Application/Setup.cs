using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SkillForge.Application.Middlewares;
using SkillForge.Application.Services;
using SkillForge.Domain.Interfaces;

namespace SkillForge.Application;

public static class Setup
{
    public static void AddApplication(this IHostApplicationBuilder builder)
    {
        RegisterServices(builder.Services);
        AddExceptionHandler(builder);

    }

    public static void UseApplication(this WebApplication app)
    {
        app.UseExceptionHandler();
    }
    
    private static void RegisterServices(IServiceCollection service)
    {
        service.AddScoped<ISkillService, SkillService>();
    }

    private static void AddExceptionHandler(IHostApplicationBuilder builder)
    {
        builder.Services.AddProblemDetails();
        builder.Services.AddExceptionHandler<ExceptionHandler>();
    }
}