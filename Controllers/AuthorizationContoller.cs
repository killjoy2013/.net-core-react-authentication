using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Manas.Core.HttpClient;
using reactsample.Models;

namespace reactsample.Controllers
{
    [Authorize]
    public class AuthorizationContoller : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClient _httpClient;
        public AuthorizationContoller(IConfiguration configuration, IHttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }

        [HttpPost("/authorization")]
        public async Task<IActionResult> AcquireTokens()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var refreshToken = await HttpContext.GetTokenAsync("refresh_token");
            return Ok(new { accessToken, refreshToken });
        }

        [HttpPost("/refresh")]
        public async Task<IActionResult> RefreshTokens([FromBody]RefreshRequest request)
        {
            var response = await (_httpClient as StandardHttpClient).RequestRefreshTokenAsync(request.refresh_token);
            return Ok(new {
                access_token = response.AccessToken,
                refresh_token = response.RefreshToken
            });
        }
    }
}