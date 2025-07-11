using SkillForge.Domain.Enums;

namespace SkillForge.Domain.Dtos.Skills;

public sealed record SkillDto
{
    public required Guid Id { get; set; }
    public required DateTimeOffset CreatedAt { get; set; }
    public required DateTimeOffset UpdatedAt { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTimeOffset? EndedAt { get; set; }
    public required SkillStatus SkillStatus { get; set; }
    public required Guid UserId { get; set; }
}