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

        // GET api/1.0/configuration/articlelists/{source}
        /// <summary>
        /// Gets the article list parsing configuration for a given news source
        /// </summary>
        /// <returns>Json</returns>
        [HttpGet("[action]/{source}")]
        [Produces("application/json")]
        public async Task<IActionResult> ArticleLists(string source)
        {
            // TODO: Pull these configs from a database or from a file
            ArticleListConfig arsConfig = new ArticleListConfig()
            {
                Organization = "Ars Technica",
                Articles = "//main//section//ul//li",
                Title = "./header/h2",
                Url = "./header//h2/a/@href",
                Excerpt = "./header//p[@class='excerpt']",
                Authors = "//span[@itemprop='name']",
                Image = "./figure//div/@style",
                PublishDate = "//time",
                CommentCount = "//span[@class='comment-count-number']",
                PaginationUrlFormat = "",
            };

            ArticleListConfig anandConfig = new ArticleListConfig()
            {
                Organization = "AnandTech",
                Articles = "//section[@class='main_cont']//div[@class='cont_box1 l_']",
                Title = "./div[@class='cont_box1_txt']/h2",
                Url = "./div[@class='cont_box1_txt']/a/@href",
                Excerpt = "./div[@class='cont_box1_txt']/p",
                Authors = "./div[@class='cont_box1_txt']/span/a[@class='b']",
                Image = "./div[@class='cont_box1_pic pie']//a/img/@src",
                PublishDate = "./div[@class='cont_box1_txt']/span",
                CommentCount = "//strong",
                PaginationUrlFormat = "",
            };

            if (source == "Ars Technica")
            {
                return Ok(arsConfig);                
            }
            else if (source == "AnandTech")
            {
                return Ok(anandConfig);
            }
            return Ok(arsConfig);
        }
    }
}
