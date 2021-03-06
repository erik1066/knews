using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Knews.Models;

namespace Knews.Controllers
{
    /// <summary>
    /// News route controller class
    /// </summary>
    [Route("api/1.0/[controller]")]
    public class NewsController : Controller
    {
        private static HttpClient _client = new HttpClient();

        // GET api/1.0/news/articles/{url}
        /// <summary>
        /// Gets the raw Html for the specified URL
        /// </summary>
        /// <returns>Html</returns>
        [HttpGet("[action]/{url}")]
        [Produces("text/html")]
        [ResponseCache(Duration=60)]
        public async Task<IActionResult> Articles(string url)
        {
            string decodedUrl = System.Net.WebUtility.UrlDecode(url);
            string html = string.Empty;

            using (HttpResponseMessage result = await _client.GetAsync(decodedUrl))
            {
                if (result.StatusCode == HttpStatusCode.NotFound) 
                {
                    return NotFound();
                }
                html = await result.Content.ReadAsStringAsync();
            }

            return Content(html);
        }

        // GET api/1.0/news/sources
        /// <summary>
        /// Gets all news sources
        /// </summary>
        /// <returns>Json</returns>
        [HttpGet("[action]")]
        [Produces("application/json")]
        public IActionResult Sources()
        {
            // TODO: Pull from database at some point
            List<NewsSource> sources = new List<NewsSource>()
            {
                new NewsSource()
                {
                    Name = "Ars Technica",
                    Url = "https://arstechnica.com",
                    IconUrl = "https://cdn.arstechnica.net/favicon.ico"
                },
                new NewsSource()
                {
                    Name = "AnandTech",
                    Url = "https://www.anandtech.com",
                    IconUrl = "https://www.anandtech.com/favicon.ico"
                },
                new NewsSource()
                {
                    Name = "The Register",
                    Url = "https://www.theregister.co.uk",
                    IconUrl = "https://www.theregister.co.uk/design_picker/4ee431b84ac2d23c13376f753522acd7ecbb9b47/graphics/favicons/apple-touch-icon.png"
                },
                new NewsSource()
                {
                    Name = "Hacker News",
                    Url = "https://news.ycombinator.com",
                    IconUrl = "https://news.ycombinator.com/favicon.ico"
                },
                new NewsSource()
                {
                    Name = "National Public Radio",
                    Url = "https://www.npr.org/",
                    IconUrl = "https://media.npr.org/templates/favicon/favicon-180x180.png"
                },
                new NewsSource()
                {
                    Name = "New York Times",
                    Url = "https://www.nytimes.com",
                    UrlSections = new List<string>() {
                        "/section/us",
                        "/section/world",
                        "/section/technology",
                        "/section/science"
                    },
                    IconUrl = "https://www.nytimes.com/vi-assets/static-assets/apple-touch-icon-319373aaf4524d94d38aa599c56b8655.png"
                },
                new NewsSource()
                {
                    Name = "AJC",
                    Url = "https://www.ajc.com",
                    IconUrl = "https://www.ajc.com/r/PortalConfig/np-one/assets-one/myajc/images/favicon-apple-touch-icon.png"
                },
                new NewsSource()
                {
                    Name = "Vox",
                    Url = "https://www.vox.com",
                    IconUrl = "https://cdn.vox-cdn.com/uploads/hub/sbnu_logo_minimal/441/touch_icon_iphone_retina_1000_yellow.755.png"
                },
                new NewsSource()
                {
                    Name = "The Atlantic",
                    Url = "https://www.theatlantic.com/",
                    IconUrl = "https://cdn.theatlantic.com/assets/static/b/theatlantic/img/default-thumbnail.png"
                },
                new NewsSource()
                {
                    Name = "Scientific American",
                    Url = "https://www.scientificamerican.com/",
                    IconUrl = "https://www.scientificamerican.com/public/resources/favicons/favicon-196-f10395ba7ecf07756e4b5a82c4795b61.png"
                },
                new NewsSource()
                {
                    Name = "TechCrunch",
                    Url = "https://techcrunch.com/",
                    IconUrl = "https://techcrunch.com/wp-content/uploads/2015/02/cropped-cropped-favicon-gradient.png"
                },
            };

            return Ok(sources);
        }
    }
}
