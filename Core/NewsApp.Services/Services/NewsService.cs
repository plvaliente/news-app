using Microsoft.Extensions.Logging;
using NewsApp.CrossCuttingApp.Dto;
using NewsApp.Services.Contracts;
using System;

namespace NewsApp.Services.Services
{
    public class NewsService : INewsService
    {
        private readonly ILogger _logger;

        public NewsService(ILogger logger)
        {
            _logger = logger;
        }

        public NewsResponseDto Search(SearchRequestDto dto)
        {
            throw new NotImplementedException();
        }

        public NewsResponseDto TopHeadlines(TopHeadlinesRequestDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
