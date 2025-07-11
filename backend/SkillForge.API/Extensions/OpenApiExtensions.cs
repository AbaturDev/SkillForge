namespace SkillForge.API.Extensions;

public static class OpenApiExtensions
{
    public static void AddOpenApiDocs(this IHostApplicationBuilder builder)
    {
        builder.Services.AddOpenApi();
        builder.Services.AddSwaggerGen();
    }

    public static void MapOpenApiDocs(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("v1/swagger.json", "IT Helpdesk System API");
            });
        }
    }
}