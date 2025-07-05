namespace SkillForge.Domain.Commons;

public abstract record BaseEntity<TId> : ITimeTrackable where TId: struct
{
    public required TId Id { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}

public abstract record BaseEntity : BaseEntity<Guid>;