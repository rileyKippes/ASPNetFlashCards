using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FlashCards.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ConfigController : ControllerBase
    {

        private readonly Config config = new Config
        {
            ShowBanner = true,
            Banner = "Ready",
            BannerTime = 2000 //2 seconds
        };

        private readonly ILogger<Config> _logger;

        public ConfigController(ILogger<Config> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Config Get() => config;
    }
}