using NewsApp.CrossCuttingApp.Dto;

namespace NewsApp.Services.Contracts
{
    public interface INewsService
    {
        NewsResponseDto Search(SearchRequestDto dto);
        NewsResponseDto TopHeadlines(TopHeadlinesRequestDto dto);
    }
}
