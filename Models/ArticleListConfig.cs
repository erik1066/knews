#pragma warning disable 1591 // disables the warnings about missing Xml code comments

namespace Knews.Models
{
    /// <summary>
    /// Class representing an article list configuration
    /// </summary>
    public class ArticleListConfig
    {
        public string Organization { get; set; }
        public string Articles { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; }
        public string Url { get; set; } = string.Empty;
        public string Excerpt { get; set; } = string.Empty;
        public string Byline { get; set; } = string.Empty;        
        public string Authors { get; set; } = string.Empty;
        public string Image { get; set; }
        public string PublishDate { get; set; } = string.Empty;
        public string CommentCount { get; set; }
        public string PaginationUrlFormat { get; set; }
        
    }
}

#pragma warning restore 1591