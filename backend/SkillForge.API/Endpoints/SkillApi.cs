using Microsoft.AspNetCore.Mvc;
using SkillForge.Domain.Commons;
using SkillForge.Domain.Dtos.Skills;
using SkillForge.Domain.Interfaces;

namespace SkillForge.API.Endpoints;

public static class SkillApi
{
    public static IEndpointRouteBuilder MapSkillApi(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/skills")
            .WithTags("Skills")
            .WithOpenApi();

        group.MapGet("", async ([FromServices] ISkillService skillService, [AsParameters] PageQueryFilter queryFilter, CancellationToken ct ) =>
            {
                var result = await skillService.ListSkillsAsync(queryFilter, ct);

                return Results.Ok(result);
            })
            .Produces<PaginatedResponseDto<SkillDto>>(StatusCodes.Status200OK, "application/json");
        
        group.MapGet("/{id:guid}", async ([FromServices] ISkillService skillService, [FromRoute] Guid id, CancellationToken ct ) =>
            {
                var result = await skillService.GetSkillByIdAsync(id, ct);

                return Results.Ok(result);
            })
            .Produces<SkillDto>(StatusCodes.Status200OK, "application/json");

        group.MapPost("", async ([FromServices] ISkillService skillService, [FromBody] CreateSkillDto dto, CancellationToken ct ) =>
            {
                var id = await skillService.CreateSkillAsync(dto, ct);
                
                return Results.Created($"/api/skills/{id}", null);
            })
            .Produces(StatusCodes.Status201Created);
        
        group.MapPut("/{id:guid}", async ([FromServices] ISkillService skillService,[FromRoute] Guid id, [FromBody] CreateSkillDto dto, CancellationToken ct ) =>
            {
                await skillService.UpdateSkillAsync(id, dto, ct);

                return Results.Ok();
            })
            .Produces(StatusCodes.Status200OK);
        
        group.MapDelete("/{id:guid}", async ([FromServices] ISkillService skillService,[FromRoute] Guid id, CancellationToken ct ) =>
            {
                await skillService.DeleteSkillAsync(id, ct);

                return Results.NoContent();
            })
            .Produces(StatusCodes.Status204NoContent);
        
        group.MapPost("/{id:guid}/end", async ([FromServices] ISkillService skillService,[FromRoute] Guid id, CancellationToken ct ) =>
            {
                await skillService.EndSkillAsync(id, ct);

                return Results.Ok();
            })
            .Produces(StatusCodes.Status200OK);

        return app;
    }
}