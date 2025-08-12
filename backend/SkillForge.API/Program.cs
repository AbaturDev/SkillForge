using SkillForge.API.Extensions;
using SkillForge.Application;
using SkillForge.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(TimeProvider.System);

builder.AddInfrastructure();
builder.AddApplication();
builder.AddApi();

var app = builder.Build();

app.UseApplication();

app.UseHttpsRedirection();

app.UseApi();

await app.Seed();

app.Run();
