using SkillForge.Application.Seeders;
using SkillForge.Infrastructure.Contexts;

namespace SkillForge.API.Extensions;

public static class SeedingExtensions
{
    private const int SkillsCount = 100;
    
    public static async Task Seed(this WebApplication app)
    {
        await using var scope = app.Services.CreateAsyncScope();
        await using var context = scope.ServiceProvider.GetRequiredService<SkillForgeContext>();
        var timeProvider = scope.ServiceProvider.GetRequiredService<TimeProvider>();
        
        await context.Database.EnsureCreatedAsync();
        
        if (app.Environment.IsDevelopment())
        {
            await SkillsSeeder.SeedAsync(context, timeProvider, SkillsCount);
        }

    }
}