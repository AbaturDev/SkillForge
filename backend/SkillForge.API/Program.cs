using SkillForge.API.Extensions;
using SkillForge.Application;
using SkillForge.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(TimeProvider.System);

builder.AddInfrastructure();
builder.AddApplication();

builder.AddOpenApiDocs();

var app = builder.Build();

app.MapOpenApiDocs();

app.UseHttpsRedirection();

app.RegisterEndpoints();

app.Run();
