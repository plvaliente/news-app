using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NewsApp.CrossCuttingApp.Dto;
using System;
using System.Net;

namespace NewsApp.Api.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        private readonly ILogger<NewsController> _logger;

        public BaseController(ILogger<NewsController> logger)
        {
            _logger = logger;
        }

        public ActionResult<T_DATA> DoMethod<T_DATA>(bool unallowedRequestCondition, Func<T_DATA> method)
        {
            try
            {
                if (unallowedRequestCondition) return BadRequest();

                return Ok(method());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
    }
}
