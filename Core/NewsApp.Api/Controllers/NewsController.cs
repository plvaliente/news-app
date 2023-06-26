using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Threading.Tasks;

namespace NewsApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly ILogger<NewsController> _logger;

        public NewsController(ILogger<NewsController> logger)
        {
            _logger = logger;
        }

        [Route("search")]
        public ActionResult<object> Search(DateTime? dateFrom, DateTime? dateTo, string[] keywords, int page, int pageSize)
        {
            try
            {
                if (keywords.Length == 0 || page == 0 || pageSize == 0) return BadRequest(new object());

                return Ok(new object()); ;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode((int)HttpStatusCode.InternalServerError, new object());
            }
        }

        [Route("top-headlines")]
        public ActionResult<object> HeadLines(string country, int page, int pageSize)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(country) || page == 0 || pageSize == 0) return BadRequest(new object());

                return Ok(new object()); ;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode((int)HttpStatusCode.InternalServerError, new object());
            }
        }
    }
}
