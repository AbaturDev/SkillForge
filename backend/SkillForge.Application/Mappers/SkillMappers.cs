using SkillForge.Domain.Dtos.Skills;
using SkillForge.Domain.Entities;

namespace SkillForge.Application.Mappers;

public static class SkillMappers
{
    public static SkillDto MapToSkillDto(Skill skill)
    {
        var skillDto = new SkillDto
        {
            Id = skill.Id,
            CreatedAt = skill.CreatedAt,
            UpdatedAt = skill.UpdatedAt,
            Name = skill.Name,
            Description = skill.Description,
            EndedAt = skill.EndedAt,
            SkillStatus = skill.SkillStatus,
        };

        return skillDto;
    }
}