using SkillForge.API.Endpoints;

namespace SkillForge.API.Extensions;

public static class RegisterEndpointsExtensions
{
    public static void RegisterEndpoints(this IEndpointRouteBuilder app)
    {
        app
            .MapSkillApi();
    }
}