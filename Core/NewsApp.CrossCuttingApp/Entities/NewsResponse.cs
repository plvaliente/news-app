using System;
using System.Collections.Generic;
using System.Text;

namespace NewsApp.CrossCuttingApp.Entities
{
    public class NewsResponse
    {
        public bool Success { get; set; } = false;
        public string Error { get; set; } = string.Empty;
        public List<News> News { get; set; } = new List<News> { };
        public int MatchingNews { get; set; } = 0;
    }
}