using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace reactsample
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var path = Directory.GetCurrentDirectory();
            var environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";
            var configuration = new ConfigurationBuilder()
               .SetBasePath(path)
               .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
               .AddJsonFile($"appsettings.{environmentName}.json", optional: true, reloadOnChange: true)
               .AddEnvironmentVariables()
               .Build();


            var host = CreateHostBuilder(args).Build();

            var logger = host.Services.GetRequiredService<ILogger<Program>>();
            logger.LogInformation($"Environment : {Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}");

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)           
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureKestrel(serverOptions =>
                    {
                        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                        serverOptions.Listen(IPAddress.Any, 55291,
                        listenOptions =>
                        {
                            if (env != Environments.Development)
                            {
                                listenOptions.UseHttps("certs/cert.pfx", "root");
                            }
                        });

                    })
                    .UseUrls(string.Format("http://{0}:55291",
                        Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == Environments.Development ?
                        "localhost" : "*"))
                    .UseStartup<Startup>();
                });
    }
}
