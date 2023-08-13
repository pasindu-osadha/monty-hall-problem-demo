namespace monty_hall_problem_demo.Models
{
    public class AttemptResultReseponse
    {
        public List<GameCardInfo> GameCardInfoList { get; set; }
        public int NumberOfGameAttempt { get; set; }
        public int CountOfWon { get; set; } = 0;
        public int CountOfLost { get; set; } = 0;
        public double PrecentageofCountOfWon { get; set; } = 0.00;
        public double PrecentageofCountOfLost { get; set; } = 0.00;
    }
}
