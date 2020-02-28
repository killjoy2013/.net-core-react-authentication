using IdentityRegister.Helpers;
using Manas.Core.HttpClient;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace reactsample
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IHttpClient>(sp => new StandardHttpClient(
               new Uri(new Uri(Configuration["TokenMicroService"]), "connect/token").AbsoluteUri,
               Configuration["ClientId"],
               Configuration["ClientSecret"]));
            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "noderunnerweb2/build";
            });
            JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = "oidc";
            })
            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, option =>
            {
                option.ExpireTimeSpan = TimeSpan.FromHours(24);
                option.Cookie.Name = "NoderunnerWeb2.Client.Cookies";
            })
            .AddOpenIdConnect("oidc", options =>
            {
                options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.Authority = Configuration["TokenMicroService"];
                options.RequireHttpsMetadata = false;
                options.ClientId = Configuration["ClientId"];
                options.ClientSecret = Configuration["ClientSecret"];
                options.ResponseType = "code id_token";
                options.Scope.Clear();
                options.SaveTokens = true;
                options.GetClaimsFromUserInfoEndpoint = true;
                options.Scope.Add("NoderunnerService");
                options.Scope.Add("offline_access");
                options.Scope.Add("openid");
                options.Scope.Add("profile");
            });





        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IConfiguration configuration)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                Registerer.RegisterToLocalTokenMicroservice(
               configuration["TokenMicroserviceConnectionString"],
               "NoderunnerService",
               "Noderunner Service API",
               configuration["ClientId"],
               "NoderunnerService GQL Client Layer",
               configuration["ClientSecret"],
               "http://localhost:55291/signin-oidc",
               "http://localhost:55291/signout-callback-oidc",
               "http://localhost:26559",
               "HybridAndClientCredentials");
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}"                   
                    );

            });
            app.Use(async (context, next) =>
            {
                
                if (!context.User.Identity.IsAuthenticated)
                {
                    await context.ChallengeAsync();
                }
                else
                {
                    await next();
                }
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "noderunnerweb2";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
