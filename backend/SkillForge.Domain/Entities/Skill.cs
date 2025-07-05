using SkillForge.Domain.Commons;

namespace SkillForge.Domain.Entities;

public sealed record Skill : BaseEntity
{
    public required string Name { get; set; }
}