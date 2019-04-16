using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Knews.Controllers
{
    /// <summary>
    /// News route controller class
    /// </summary>
    [Route("api/1.0/[controller]")]
    public class NewsController : Controller
    {
        private static HttpClient _client = new HttpClient();

        // GET api/1.0/news/article/{url}
        /// <summary>
        /// Gets the raw Html for the specified URL
        /// </summary>
        /// <returns>Html</returns>
        [HttpGet("[action]/{url}")]
        [Produces("text/html")]
        public async Task<IActionResult> Article(string url)
        {
            string decodedUrl = System.Net.WebUtility.UrlDecode(url);
            string html = string.Empty;

            using (HttpResponseMessage result = await _client.GetAsync(decodedUrl))
            {
                html = await result.Content.ReadAsStringAsync();
            }

            return Content(html);
        }
    }
}
