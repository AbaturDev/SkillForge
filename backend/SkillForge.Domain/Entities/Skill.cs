using SkillForge.Domain.Commons;
using SkillForge.Domain.Enums;

namespace SkillForge.Domain.Entities;

public sealed record Skill : BaseEntity
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTimeOffset? EndedAt { get; set; }
    public required SkillStatus SkillStatus { get; set; }
}