using SkillForge.API.Endpoints;

namespace SkillForge.API.Extensions;

public static class ConfigureExtensions
{
    public static void UseApi(this WebApplication app)
    {
        RegisterEndpoints(app);
        app.UseCors("MyPolicy");
        
        if (app.Environment.IsDevelopment())
        {
            MapOpenApiDocs(app);
        }
    }
    
    private static void MapOpenApiDocs(WebApplication app)
    {
            app.MapOpenApi();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "IT Helpdesk System API");
            });
    }
    
    private static void RegisterEndpoints(IEndpointRouteBuilder app)
    {
        app
            .MapSkillApi();
    }
}