using monty_hall_problem_demo.Models;

namespace monty_hall_problem_demo.Services
{
    public interface IGameService
    {
        Task<List<GameCardInfo>> GetInitialCardsInfo();
        Task<AttemptResultReseponse> GetAttemptsResult(AttemptResultRequest request);
    }
}
