using System.Collections.Generic;

namespace NewsApp.CrossCuttingApp.Dto
{
    public class NewsResponseDto : BaseResponseDto<List<NewsDto>>
    {
        public int MatchingNews { get; set; } = 0;
    }
}
