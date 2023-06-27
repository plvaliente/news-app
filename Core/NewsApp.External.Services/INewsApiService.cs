using NewsApp.CrossCuttingApp.Dto;
using System.Threading.Tasks;

namespace NewsApp.External.Services
{
    public interface INewsApiService
    {
        Task<NewsResponseDto> Search(SearchRequestDto dto);

        Task<NewsResponseDto> TopHeadlines(TopHeadlinesRequestDto dto);
    }
}
