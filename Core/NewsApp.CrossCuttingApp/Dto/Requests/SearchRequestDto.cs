using System;
using System.Collections.Generic;

namespace NewsApp.CrossCuttingApp.Dto
{
    public class SearchRequestDto
    {
        public List<string> Keywords { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
