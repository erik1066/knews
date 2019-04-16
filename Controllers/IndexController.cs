using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;
using System.Reflection;

namespace Knews
{
    /// <summary>
    /// Index route controller class
    /// </summary>
    [Route("api/1.0")]
    [ApiController]
    public sealed class IndexController : ControllerBase
    {
        private readonly string _version = "{ \"version\": \"" +  typeof(Startup).Assembly.GetName().Version.ToString() + "\" }";

        // GET api/1.0
        /// <summary>
        /// Gets the version number of this service
        /// </summary>
        /// <returns>Version number</returns>
        [Produces("application/json")]
        [HttpGet]
        public IActionResult Index()
        {
            return Content(_version);
        }
    }
}