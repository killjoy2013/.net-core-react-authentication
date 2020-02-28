using System;

namespace reactsample.Models
{
    public class RefreshRequest
    {
        public string access_token { get; set; }

         public string refresh_token { get; set; }
    }
}