using Bogus;
using Microsoft.EntityFrameworkCore;
using SkillForge.Domain.Entities;
using SkillForge.Domain.Enums;
using SkillForge.Infrastructure.Contexts;

namespace SkillForge.Application.Seeders;

public static class SkillsSeeder
{
    public static async Task SeedAsync(SkillForgeContext context, TimeProvider timeProvider, int count)
    {
        if (await context.Skills.AnyAsync())
            return;
        
        var faker = new Faker<Skill>("pl")
            .RuleFor(s => s.Name, f => f.Lorem.Word())
            .RuleFor(s => s.Description, f => f.Lorem.Sentence())
            .RuleFor(s => s.CreatedAt, 
                f => timeProvider.GetUtcNow() - TimeSpan.FromDays(f.Random.Int(5, 120)))
            .RuleFor(x => x.UpdatedAt, (_, cbs) => cbs.CreatedAt)
            .RuleFor(s => s.SkillStatus, f => f.PickRandom<SkillStatus>())
            .RuleFor(s => s.EndedAt, (f, x) => x.SkillStatus == SkillStatus.Finished ? x.CreatedAt + TimeSpan.FromHours(f.Random.Int(1, 1000)) : null);
        
        var skills = faker.Generate(count);
        
        await context.Skills.AddRangeAsync(skills);
        await context.SaveChangesAsync();
    }
}