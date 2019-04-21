#pragma warning disable 1591 // disables the warnings about missing Xml code comments

namespace Knews.Models
{
    /// <summary>
    /// Class representing an article configuration
    /// </summary>
    public class ArticleConfig
    {
        public string NewsSource { get; set; } = string.Empty;
        public string Organization { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; }
        public string FirstPara { get; set; }
        public string Paragraphs { get; set; } = string.Empty;
        public string Footer { get; set; }
        public string IntroImage { get; set; }
        public string Authors { get; set; } = string.Empty;
        public string PublishDate { get; set; } = string.Empty;
        public string UpperDeck { get; set; }
        public string CommentCount { get; set; }
        public string CommentsUrlFormat { get; set; }
        public string PaginationUrlFormat { get; set; }
    }
}

#pragma warning restore 1591