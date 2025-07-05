using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SkillForge.Domain.Entities;
using SkillForge.Infrastructure.Contexts;

namespace SkillForge.Infrastructure;

public static class Setup
{
    public static void AddInfrastructure(this IHostApplicationBuilder builder)
    {
        builder.Services.AddDbContext<SkillForgeContext>(options => 
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
        );
        
        builder.Services.AddIdentity<User, IdentityRole<Guid>>()
            .AddEntityFrameworkStores<SkillForgeContext>()
            .AddDefaultTokenProviders();
    }
}