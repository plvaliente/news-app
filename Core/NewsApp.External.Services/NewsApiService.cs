using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NewsAPI;
using NewsAPI.Constants;
using NewsAPI.Models;
using NewsApp.CrossCuttingApp.Dto;
using NewsApp.CrossCuttingApp.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace NewsApp.External.Services
{
    public class NewsApiService : INewsApiService
    {
        private readonly string _apiKey;
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly NewsApiClient _client;

        public NewsApiService(IConfiguration conf, ILogger logger)
        {
            _configuration = conf;
            _logger = logger;
            _apiKey = _configuration.GetSection("ExternalNewsApiKey").Value!;
            _client = new NewsApiClient(_apiKey);
        }

        public async Task<NewsResponseDto> Search(SearchRequestDto dto)
        {
            ArticlesResult result = await _client.GetEverythingAsync(new EverythingRequest
            {
                From = dto.DateFrom, 
                To = dto.DateTo, 
                Page = dto.Page,
                PageSize = dto.PageSize, 
                Q = FormatKeyWords(dto.Keywords), 
                SortBy = SortBys.PublishedAt, 
                Language = Languages.ES
            });

            return HandleArticleResult(result);
        }

        public async Task<NewsResponseDto> TopHeadlines(TopHeadlinesRequestDto dto)
        {
            ArticlesResult result = await _client.GetTopHeadlinesAsync(new TopHeadlinesRequest
            {
                Country = FormatCountry(dto.Country), 
                Page = dto.Page, 
                PageSize= dto.PageSize,
            });

            return HandleArticleResult(result);
        }

        private NewsResponseDto HandleArticleResult(ArticlesResult result)
        {
            if (result.Status != Statuses.Ok)
            {
                _logger.LogInformation($"NewsApiSvc: {result.Error.Message}");
                return new NewsResponseDto(result.Error.Message);
            }

            return new NewsResponseDto(result.Articles.Select(i => MapToNewsDto(i)).ToList(), result.TotalResults);
        }

        private NewsDto MapToNewsDto(Article i)
        {
            return new NewsDto
            {
                Author = i.Author,
                Title = i.Title,
                Content = i.Content,
                Description = i.Description,
                Date = i.PublishedAt,
                ImageUrl = i.UrlToImage,
                Source = i.Source.Name
            };
        }

        private string FormatKeyWords(List<string> keywords)
        {
            string appendedKeyords = keywords.Aggregate((fst, snd) => fst + " OR " + snd);
            return HttpUtility.UrlEncode(appendedKeyords);
        }
        private Countries? FormatCountry(Country country)
        {
            throw new NotImplementedException();
        }
    }
}