using AutoMapper;
using Microsoft.Extensions.Logging;
using NewsApp.CrossCuttingApp.Dto;
using NewsApp.CrossCuttingApp.Entities;
using NewsApp.Services.Contracts;
using System;

namespace NewsApp.Services.Services
{
    public class NewsService : INewsService
    {
        private readonly ILogger _logger;
        private readonly IExternalNewsService _svc;
        private readonly IMapper _mapper;

        public NewsService(ILogger<NewsService> logger, IExternalNewsService svc, IMapper mapper)
        {
            _logger = logger;
            _svc = svc;
            _mapper = mapper;
        }

        public NewsResponseDto Search(SearchRequestDto dto)
        {
            NewsResponse news = _svc.Search(dto);
            
            return CheckObtainedNews(news);
        }

        public NewsResponseDto TopHeadlines(TopHeadlinesRequestDto dto)
        {
            NewsResponse news = _svc.TopHeadlines(dto);

            return CheckObtainedNews(news);
        }

        private NewsResponseDto CheckObtainedNews(NewsResponse news)
        {
            if (news == null) throw new Exception("Ocurrio un Error Inesperado. Intente luego.");
            if(!news.Success) throw new Exception(news.Error);

            return _mapper.Map<NewsResponseDto>(news);
        }


    }
}
