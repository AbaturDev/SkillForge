using Microsoft.EntityFrameworkCore;
using SkillForge.Application.Mappers;
using SkillForge.Application.Utils;
using SkillForge.Domain.Commons;
using SkillForge.Domain.Dtos.Skills;
using SkillForge.Domain.Entities;
using SkillForge.Domain.Enums;
using SkillForge.Domain.Exceptions;
using SkillForge.Domain.Interfaces;
using SkillForge.Infrastructure.Contexts;

namespace SkillForge.Application.Services;

public class SkillService : ISkillService
{
    private readonly SkillForgeContext _dbContext;
    private readonly TimeProvider _timeProvider;
    
    public SkillService(SkillForgeContext dbContext, TimeProvider timeProvider)
    {
        _dbContext = dbContext;
        _timeProvider = timeProvider;
    }
    
    public async Task<PaginatedResponseDto<SkillDto>> ListSkillsAsync(PageQueryFilter queryFilter, CancellationToken ct)
    {
        var query = _dbContext.Skills.AsQueryable();

        var count = await query.CountAsync(ct);

        var skills = await query
            .Select(x => SkillMappers.MapToSkillDto(x))
            .Paginate(queryFilter.PageNumber, queryFilter.PageSize)
            .ToListAsync(ct);

        var response = new PaginatedResponseDto<SkillDto>(skills, queryFilter.PageNumber, queryFilter.PageSize, count);

        return response;
    }

    public async Task<SkillDto> GetSkillByIdAsync(Guid id, CancellationToken ct)
    {
        var skill = await _dbContext.Skills
            .FirstOrDefaultAsync(x => x.Id == id, ct);

        if (skill is null)
        {
            throw new NotFoundException("Skill not found");
        }

        var skillDto = SkillMappers.MapToSkillDto(skill);

        return skillDto;
    }

    public async Task<Guid> CreateSkillAsync(CreateSkillDto dto, CancellationToken ct)
    {
        var userId = new Guid();

        var skill = new Skill
        {
            Name = dto.Name,
            Description = dto.Description,
            SkillStatus = SkillStatus.Active,
            UserId = userId
        };

        await _dbContext.Skills.AddAsync(skill, ct);
        await _dbContext.SaveChangesAsync(ct);

        return skill.Id;
    }

    public async Task UpdateSkillAsync(Guid id, CreateSkillDto dto, CancellationToken ct)
    {
        var skill = await _dbContext.Skills
            .FirstOrDefaultAsync(x => x.Id == id, ct);

        if (skill is null)
        {
            throw new NotFoundException("Skill not found");
        }

        if (skill.SkillStatus == SkillStatus.Finished)
        {
            throw new BadRequestException("Can not update finished skill");
        }

        skill.Name = dto.Name;
        skill.Description = dto.Description;

        await _dbContext.SaveChangesAsync(ct);
    }

    public async Task DeleteSkillAsync(Guid id, CancellationToken ct)
    {
        var skill = await _dbContext.Skills
            .FirstOrDefaultAsync(x => x.Id == id, ct);

        if (skill is null)
        {
            throw new NotFoundException("Skill not found");
        }

        _dbContext.Skills.Remove(skill);
        await _dbContext.SaveChangesAsync(ct);
    }

    public async Task EndSkillAsync(Guid id, CancellationToken ct)
    {
        var skill = await _dbContext.Skills
            .FirstOrDefaultAsync(x => x.Id == id, ct);

        if (skill is null)
        {
            throw new NotFoundException("Skill not found");
        }

        if (skill.SkillStatus == SkillStatus.Finished)
        {
            throw new BadRequestException("Skill is already finished");
        }

        skill.SkillStatus = SkillStatus.Finished;
        skill.EndedAt = _timeProvider.GetUtcNow();

        await _dbContext.SaveChangesAsync(ct);
    }
}