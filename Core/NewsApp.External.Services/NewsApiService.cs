using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NewsAPI;
using NewsAPI.Constants;
using NewsAPI.Models;
using NewsApp.CrossCuttingApp.Dto;
using NewsApp.CrossCuttingApp.Entities;
using NewsApp.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NewsApp.External.Services
{
    public class NewsApiService : IExternalNewsService
    {
        private readonly string _apiKey;
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly NewsApiClient _client;

        public NewsApiService(IConfiguration conf, ILogger<NewsApiService> logger)
        {
            _configuration = conf;
            _logger = logger;
            _apiKey = _configuration.GetSection("ExternalNewsApiKey").Value!;
            _client = new NewsApiClient(_apiKey);
        }

        public NewsResponse Search(SearchRequestDto dto)
        {
            return GetNews(() =>
            {
                return _client.GetEverything(new EverythingRequest
                {
                    From = dto.DateFrom,
                    To = dto.DateTo,
                    Page = dto.Page,
                    PageSize = dto.PageSize,
                    Q = FormatKeyWords(dto.Keywords),
                    SortBy = SortBys.PublishedAt,
                    Language = Languages.ES
                });
            });
        }

        public NewsResponse TopHeadlines(TopHeadlinesRequestDto dto)
        {
            return GetNews(() =>
            {
                return _client.GetTopHeadlines(new TopHeadlinesRequest
                {
                    Country = ParseCountry(dto.Country),
                    Page = dto.Page,
                    PageSize = dto.PageSize,
                });
            });
        }
        private NewsResponse GetNews(Func<ArticlesResult> method)
        {
            try
            {
                ArticlesResult result = method();

                return HandleArticleResult(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"NewsApiSvc: {ex.Message}", ex);
                return new NewsResponse { Error = ex.Message };
            }
        }

        private NewsResponse HandleArticleResult(ArticlesResult result)
        {
            if (result.Status != Statuses.Ok)
            {
                _logger.LogInformation($"NewsApiSvc: {result.Error.Message}");
                return new NewsResponse {  Error = result.Error.Message };
            }

            return new NewsResponse
            {
                News = result.Articles.Select(i => MapToNews(i)).ToList(),
                MatchingNews = result.TotalResults,
                Success = true
            };
        }

        private News MapToNews(Article i)
        {
            return new News
            {
                Author = i.Author,
                Title = i.Title,
                Content = i.Content,
                Description = i.Description,
                Date = i.PublishedAt,
                ImageUrl = i.UrlToImage,
                Source = i.Url
            };
        }

        private string FormatKeyWords(List<string> keywords)
        {
            string appendedKeyords = keywords.Aggregate((fst, snd) => fst + " AND " + snd);
            return HttpUtility.UrlEncode(appendedKeyords);
        }

        private Countries? ParseCountry(string country)
        {
            return Enum.TryParse<Countries>(country, true, out Countries result) ? result : default;
        }
    }
}