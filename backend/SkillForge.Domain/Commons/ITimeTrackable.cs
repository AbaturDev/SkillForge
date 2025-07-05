namespace SkillForge.Domain.Commons;

public interface ITimeTrackable
{
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}