using NewsApp.CrossCuttingApp.Entities;

namespace NewsApp.CrossCuttingApp.Dto
{
    public class TopHeadlinesRequestDto
    {
        public string Country { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
