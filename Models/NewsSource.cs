using System.Collections.Generic;

namespace Knews.Models
{
    /// <summary>
    /// Class representing a news source
    /// </summary>
    public class NewsSource
    {
        /// <summary>
        /// Name of the news source
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// URL of the icon for this news source
        /// </summary>
        public string IconUrl { get; set; }

        /// <summary>
        /// URL where the news source's article list can be found
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Subsections of the paper to optionally retrieve; these are appended to the base URL
        /// </summary>
        public List<string> UrlSections { get; set; } = new List<string>();
    }
}