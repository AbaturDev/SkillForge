namespace SkillForge.API.Extensions;

public static class RegisterServicesExtensions
{
    public static void AddApi(this IHostApplicationBuilder builder)
    {
        AddOpenApiDocs(builder);
        AddCors(builder);
    }
    
    private static void AddOpenApiDocs(IHostApplicationBuilder builder)
    {
        builder.Services.AddOpenApi();
        builder.Services.AddSwaggerGen();
    }

    private static void AddCors(IHostApplicationBuilder builder)
    {
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("MyPolicy", policy =>
            {
                policy
                    .WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
        });
    }
}