using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewsApp.CrossCuttingApp.Dto;
using NewsApp.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Net;

namespace NewsApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : BaseController
    {
        private readonly INewsService _service;

        public NewsController(ILogger<NewsController> logger, INewsService service) : base(logger)
        {
            _service = service;
        }

        [Route("search")]
        public ActionResult<NewsResponseDto> Search(DateTime? dateFrom, DateTime? dateTo, [FromQuery] string[] keywords, int page, int pageSize)
        {
            return DoMethod<NewsResponseDto>(

                keywords == null || keywords.Length == 0 || page == 0 || pageSize == 0,
                () =>
                {
                    return _service.Search(new SearchRequestDto
                    {
                        DateFrom = dateFrom,
                        DateTo = dateTo,
                        Keywords = new List<string>(keywords),
                        Page = page,
                        PageSize = pageSize
                    });
                }
            );
        }

        [Route("top-headlines")]
        public ActionResult<NewsResponseDto> HeadLines(string country, int page, int pageSize)
        {
            return DoMethod<NewsResponseDto>(
                string.IsNullOrWhiteSpace(country) || page == 0 || pageSize == 0,
                () => _service.TopHeadlines(new TopHeadlinesRequestDto { Country = country, Page = page, PageSize = pageSize })
                );
        }
    }
}