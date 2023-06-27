using System;

namespace NewsApp.CrossCuttingApp.Entities
{
    public class News
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public DateTime? Date { get; set; }
        public string Source { get; set; }
        public string ImageUrl { get; set; }
    }
}