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

        // GET api/1.0/configuration/articles/{source}
        /// <summary>
        /// Gets the article parsing configuration for a given news source
        /// </summary>
        /// <returns>Json</returns>
        [HttpGet("[action]/{source}")]
        [Produces("application/json")]
        public async Task<IActionResult> Articles(string source)
        {
            // TODO: Pull these configs from a database or from a file
            ArticleConfig arsConfig = new ArticleConfig()
            {
                NewsSource = "Ars Technica",
                Organization = "Ars Technica",
                Title = "//h1",
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

            ArticleConfig anandConfig = new ArticleConfig()
            {
                NewsSource = "AnandTech",
                Organization = "AnandTech",
                Title = "//h1",
                Subtitle = "",
                FirstPara = "",
                Paragraphs = "//div[@class='articleContent']//p",
                Footer = "",
                IntroImage = "//div[@class='sidepadding review']//div[@style='']//img/@src",
                Authors = "//a[@class='b']",
                PublishDate = "//div[@class='blog_top_left']//em",
                UpperDeck = "",
                CommentCount = "//div[@class='blog_top_right show_resp2']/span/a",
                CommentsUrlFormat = "{x}",
                PaginationUrlFormat = "{x}",
            };

            ArticleConfig registerConfig = new ArticleConfig()
            {
                NewsSource = "The Register",
                Organization = "The Register",
                Title = "//h1",
                Subtitle = "//h2",
                FirstPara = "",
                Paragraphs = "//div[@id='body']//p",
                Footer = "",
                IntroImage = "//div[@class='sidepadding review']//div[@style='']//img/@src",
                Authors = "//a[@class='alt_colour dcl']",
                PublishDate = "//span[@class='dateline']",
                UpperDeck = "",
                CommentCount = "//div[@class='comments_share']/a/span",
                CommentsUrlFormat = "{x}",
                PaginationUrlFormat = "{x}",
            };

            ArticleConfig ajcConfig = new ArticleConfig()
            {
                NewsSource = "AJC",
                Organization = "AJC",
                Title = "//h1",
                Subtitle = "",
                FirstPara = "",
                Paragraphs = "//p",
                Footer = "",
                IntroImage = "//img/@src",
                Authors = "//div[@class='names']/ul/li/names",
                PublishDate = "//time/@data-timestamp",
                UpperDeck = "",
                CommentCount = "",
                CommentsUrlFormat = "{x}",
                PaginationUrlFormat = "{x}",
            };

            ArticleConfig voxConfig = new ArticleConfig()
            {
                NewsSource = "Vox",
                Organization = "Vox",
                Title = "//h1",
                Subtitle = "//h2[@class='c-entry-summary p-dek']",
                FirstPara = "REPLACEME",
                Paragraphs = "//p",
                Footer = "",
                IntroImage = "",
                Authors = "//span[@class='c-byline__item']",
                PublishDate = "//time",
                UpperDeck = "",
                CommentCount = "",
                CommentsUrlFormat = "{x}",
                PaginationUrlFormat = "{x}",
            };

            if (source == "Ars Technica")
            {
                return Ok(arsConfig);                
            }
            else if (source == "AnandTech")
            {
                return Ok(anandConfig);
            }
            else if (source == "The Register")
            {
                return Ok(registerConfig);
            }
            else if (source == "AJC")
            {
                return Ok(ajcConfig);
            }
            else if (source == "Vox")
            {
                return Ok(voxConfig);
            }
            return Ok(arsConfig);
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
                Articles = "//main//section//li",
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
                Url = "./div[@class='cont_box1_txt']/h2/a/@href",
                Excerpt = "./div[@class='cont_box1_txt']/p",
                Authors = "./div[@class='cont_box1_txt']/span/a[@class='b']",
                Image = "./div[@class='cont_box1_pic pie']//a/img/@src",
                PublishDate = "./div[@class='cont_box1_txt']/span",
                CommentCount = "//strong",
                PaginationUrlFormat = "",
            };

            ArticleListConfig registerConfig = new ArticleListConfig()
            {
                Organization = "The Register",
                Articles = "//article",
                Title = "./a/div[@class='article_text_elements']/h4",
                Url = "./a/@href",
                Excerpt = "./a/div[@class='article_text_elements']/div[@class='standfirst']",
                Authors = "",
                Image = "./a/div[@class='story_grid_img']/img/@data-src",
                PublishDate = "", //"./a//span[@class='time_stamp']",
                CommentCount = "", // "./a//span[@class='comment light_bg_comments']",
                PaginationUrlFormat = "",
            };

            ArticleListConfig nprConfig = new ArticleListConfig()
            {
                Organization = "National Public Radio",
                Articles = "//article",
                Title = ".//h3", //"./div[@class='story-wrap']/div[@class='story-text']/a[0]",
                Url = ".//a/@href",
                Excerpt = "",
                Authors = "",
                Image = ".//img/@src",
                PublishDate = "", //"./a//span[@class='time_stamp']",
                CommentCount = "", // "./a//span[@class='comment light_bg_comments']",
                PaginationUrlFormat = "",
            };

            ArticleListConfig nytConfig = new ArticleListConfig()
            {
                Organization = "New York Times",
                Articles = "//article",
                Title = ".//h2", //"./div[@class='story-wrap']/div[@class='story-text']/a[0]",
                Url = ".//a/@href",
                Excerpt = "",
                Authors = ".//span[@itemprop='name']",
                Image = ".//img/@src",
                PublishDate = "", //"./a//span[@class='time_stamp']",
                CommentCount = "", // "./a//span[@class='comment light_bg_comments']",
                PaginationUrlFormat = "",
            };

            ArticleListConfig ajcConfig = new ArticleListConfig()
            {
                Organization = "AJC",
                Articles = "//ul[@class='tease-list  tease-list--strip tease-list--row tease-list--slider']//li[@class='tease ']",
                Title = ".//h3", //"./div[@class='story-wrap']/div[@class='story-text']/a[0]",
                Url = ".//a/@href",
                Excerpt = "",
                Authors = "",
                Image = ".//img/@data-src",
                PublishDate = "", //"./a//span[@class='time_stamp']",
                CommentCount = "", // "./a//span[@class='comment light_bg_comments']",
                PaginationUrlFormat = "",
            };

            ArticleListConfig voxConfig = new ArticleListConfig()
            {
                Organization = "Vox",
                Articles = "//div[@class='c-compact-river__entry ']",
                Title = ".//h2",
                Url = ".//a/@href",
                Excerpt = "",
                Authors = "",
                Image = ".//img/@src",
                PublishDate = "",
                CommentCount = "",
                PaginationUrlFormat = "",
            };

            ArticleListConfig atlanticConfig = new ArticleListConfig()
            {
                Organization = "The Atlantic",
                Articles = "//article[@class='c-tease c-tease--article c-tease--']",
                Title = ".//h3",
                Url = ".//a/@href",
                Excerpt = "",
                Authors = "",
                Image = ".//source/@data-srcset",
                PublishDate = ".//time",
                CommentCount = "",
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
            else if (source == "The Register")
            {
                return Ok(registerConfig);
            }
            else if (source == "National Public Radio")
            {
                return Ok(nprConfig);
            }
            else if (source == "New York Times")
            {
                return Ok(nytConfig);
            }
            else if (source == "AJC")
            {
                return Ok(ajcConfig);
            }
            else if (source == "Vox")
            {
                return Ok(voxConfig);
            }
            else if (source == "The Atlantic")
            {
                return Ok(atlanticConfig);
            }
            return Ok(arsConfig);
        }
    }
}
