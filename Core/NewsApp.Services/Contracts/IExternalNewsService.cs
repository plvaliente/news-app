using NewsApp.CrossCuttingApp.Dto;
using NewsApp.CrossCuttingApp.Entities;

namespace NewsApp.Services.Contracts
{
    public interface IExternalNewsService
    {
        NewsResponse Search(SearchRequestDto dto);
        NewsResponse TopHeadlines(TopHeadlinesRequestDto dto);
    }
}
