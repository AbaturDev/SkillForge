using SkillForge.Domain.Enums;

namespace SkillForge.Domain.Dtos.Skills;

public sealed record CreateSkillDto
{
    public required string Name { get; set; }
    public required string Description { get; set; }
}