using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;
using monty_hall_problem_demo.Models;
using monty_hall_problem_demo.Services;

namespace monty_hall_problem_demo.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;
        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet("GetInitialGameInfo")]
        public async Task< IActionResult> GetInitialGameInfo()
        {
            return Ok(await _gameService.GetInitialCardsInfo());
        }

        [HttpPost("GetAttemptsResult")]
        public async Task<IActionResult> GetAttemptsResult(AttemptResultRequest request)
        {
            return Ok(await _gameService.GetAttemptsResult(request));
        } 

    }
}
