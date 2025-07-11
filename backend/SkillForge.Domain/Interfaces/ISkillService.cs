using SkillForge.Domain.Commons;
using SkillForge.Domain.Dtos.Skills;

namespace SkillForge.Domain.Interfaces;

public interface ISkillService
{
    Task<PaginatedResponseDto<SkillDto>> ListSkillsAsync(PageQueryFilter queryFilter, CancellationToken ct);
    Task<SkillDto> GetSkillByIdAsync(Guid id, CancellationToken ct);
    Task<Guid> CreateSkillAsync(CreateSkillDto dto, CancellationToken ct);
    Task UpdateSkillAsync(Guid id, CreateSkillDto dto, CancellationToken ct);
    Task DeleteSkillAsync(Guid id, CancellationToken ct);
    Task EndSkillAsync(Guid id, CancellationToken ct);
}