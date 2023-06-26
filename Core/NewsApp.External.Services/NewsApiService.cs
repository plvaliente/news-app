using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NewsAPI;
using System;

namespace NewsApp.External.Services
{
    public class NewsApiService
    {
        private string _apiKey;
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
    }
}
