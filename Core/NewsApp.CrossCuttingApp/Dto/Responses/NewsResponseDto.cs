using System.Collections.Generic;

namespace NewsApp.CrossCuttingApp.Dto
{
    public class NewsResponseDto : BaseResponseDto<List<NewsDto>>
    {
        public int MatchingNews { get; set; } = 0;

        public NewsResponseDto(List<NewsDto> data, int matchs) : base(data)
        {
            MatchingNews = matchs;
        }

        public NewsResponseDto(string msg) : base(msg)
        {
            MatchingNews = 0;
        }
    }
}
