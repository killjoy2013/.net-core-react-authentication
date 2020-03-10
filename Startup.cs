using IdentityRegister.Helpers;
using Manas.Core.HttpClient;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
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
            //services.AddScoped<IHttpClient>(sp => new StandardHttpClient(
            //   new Uri(new Uri(Configuration["TokenMicroService"]), "connect/token").AbsoluteUri,
            //   Configuration["ClientId"],
            //   Configuration["ClientSecret"]));
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
                options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
            })
            .AddGoogle(options =>
            {
                options.ClientId = "657054742385-mifk9tfr9qn3u3671qjq38a9g1mjoqr1.apps.googleusercontent.com";
                options.ClientSecret = "myxD5C1C6tP2NJZtHgrl_6h6";
            })
            .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, option =>
            {
                option.ExpireTimeSpan = TimeSpan.FromHours(24);
                option.Cookie.Name = "NoderunnerWeb2.Client.Cookies";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IConfiguration configuration)
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseAuthorization();
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
