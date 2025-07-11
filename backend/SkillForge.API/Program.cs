using SkillForge.API.Extensions;
using SkillForge.Application;
using SkillForge.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(TimeProvider.System);

builder.AddInfrastructure();
builder.AddApplication();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.RegisterEndpoints();

app.Run();
