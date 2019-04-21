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
    /// Configuration route controller class
    /// </summary>
    [Route("api/1.0/[controller]")]
    public class ConfigurationController : Controller
    {
        private static HttpClient _client = new HttpClient();

        // GET api/1.0/config/articles/{source}
        /// <summary>
        /// Gets the article parsing configuration for a given news source
        /// </summary>
        /// <returns>Json</returns>
        [HttpGet("[action]/{source}")]
        [Produces("application/json")]
        public async Task<IActionResult> Articles(string source)
        {
            // TODO: Pull these configs from a database or from a file
            ArticleConfig config = new ArticleConfig()
            {
                NewsSource = "ArsTechnica",
                Organization = "//title",
                Title = "//article//h1",
                Subtitle = "//article//h2",
                FirstPara = "REPLACEME",
                Paragraphs = "//main//article//p",
                Footer = "",
                IntroImage = "//article//figure//img/@src",
                Authors = "//span[@itemprop='name']",
                PublishDate = "//time",
                UpperDeck = "//h4[@class='post-upperdek']",
                CommentCount = "//span[@class='comment-count-number']",
                CommentsUrlFormat = "{x}",
                PaginationUrlFormat = "{x}",
            };

            return Ok(config);
        }
    }
}
