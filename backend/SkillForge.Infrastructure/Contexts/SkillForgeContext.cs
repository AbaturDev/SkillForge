using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using SkillForge.Domain.Commons;
using SkillForge.Domain.Entities;

namespace SkillForge.Infrastructure.Contexts;

public sealed class SkillForgeContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
    private readonly TimeProvider _timeProvider;
    
    public SkillForgeContext(DbContextOptions<SkillForgeContext> options, TimeProvider timeProvider) : base(options)
    {
        _timeProvider = timeProvider;
        
        ChangeTracker.StateChanged += UpdateTimestamps;
        ChangeTracker.Tracked += UpdateTimestamps;
    }

    public DbSet<Skill> Skills { get; init; }
    
    private void UpdateTimestamps(object? sender, EntityEntryEventArgs e)
    {
        if (e.Entry.Entity is not ITimeTrackable timeTrackable)
        {
            return;
        }

        switch (e.Entry.State)
        {
            case EntityState.Modified:
                timeTrackable.UpdatedAt = _timeProvider.GetUtcNow();
                return;
            case EntityState.Added:
                timeTrackable.CreatedAt = _timeProvider.GetUtcNow();
                timeTrackable.UpdatedAt = _timeProvider.GetUtcNow();
                return;
        }
    }
}