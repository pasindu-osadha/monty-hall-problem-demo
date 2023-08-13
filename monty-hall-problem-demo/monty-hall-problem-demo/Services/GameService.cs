using monty_hall_problem_demo.Models;

namespace monty_hall_problem_demo.Services
{
    public class GameService : IGameService
    {
        public async Task<List<GameCardInfo>> GetInitialCardsInfo()
        {
            var GameCardInfoList = new List<GameCardInfo>()
            {
                new GameCardInfo{Id=1, CardName="Goat01", IsOpen=false, ImagePath="assets/goat.png", DefualtImagePath="assets/default.png", IsSelected=false, isCar=false},
                new GameCardInfo{Id=2, CardName="Goat02", IsOpen=false, ImagePath="assets/goat.png", DefualtImagePath="assets/default.png", IsSelected=false, isCar=false},
                new GameCardInfo{Id=3, CardName="Car01", IsOpen=false, ImagePath="assets/car.png", DefualtImagePath="assets/default.png", IsSelected=false, isCar=true}
            };

            ShuffleList(GameCardInfoList);
            return GameCardInfoList;
        }

        static void ShuffleList<T>(List<T> list)
        {
            Random random = new Random();
            int n = list.Count;
            for (int i = n - 1; i > 0; i--)
            {
                int j = random.Next(0, i + 1);
                T temp = list[i];
                list[i] = list[j];
                list[j] = temp;
            }
        }

        public async Task<AttemptResultReseponse> GetAttemptsResult(AttemptResultRequest request)
        {
            //simulation option 0 => final answer
            //simulation option 1=> one by one 
            AttemptResultReseponse attemptResultReseponse = new AttemptResultReseponse();
            int numberOfIteration = 0;
            
            if (request.SimulateOption == 0)
                numberOfIteration = request.NumberOfAttempts;
            else
                numberOfIteration = 1;

            for (int i = 0; i < numberOfIteration; i++)
            {
                attemptResultReseponse.GameCardInfoList = await GetInitialCardsInfo();
                
                await SelectRandomGameCard(attemptResultReseponse.GameCardInfoList);

                if (await CheckWonTheGame(attemptResultReseponse.GameCardInfoList, request.IsChangeOption))
                {
                    attemptResultReseponse.CountOfWon = attemptResultReseponse.CountOfWon + 1;
                }
                else
                {
                    attemptResultReseponse.CountOfLost = attemptResultReseponse.CountOfLost + 1;
                }
            }

            attemptResultReseponse.NumberOfGameAttempt = numberOfIteration;
            return attemptResultReseponse;
        }

        private async Task SelectRandomGameCard(List<GameCardInfo> gameCards)
        {
            Random random = new Random();
            int index = random.Next(gameCards.Count);
            gameCards[index].IsSelected = true;

            int gameCardIndexForOpen = gameCards.FindIndex(g => g.isCar != true && g.IsSelected != true);
            if (gameCardIndexForOpen != -1)
            {
                gameCards[gameCardIndexForOpen].IsOpen = true;
            }
        }

        private async Task<bool> CheckWonTheGame(List<GameCardInfo> gameCards, bool IsChangeOption)
        {
            bool isWon = false;

            if(IsChangeOption)
            {
               var result =  gameCards.FindAll(g=> g.IsSelected==false && g.IsOpen == false && g.isCar == true);
                if(result.Count == 0)
                    isWon = false;
                else
                    isWon = true;
            }
            else
            {
                var selectedCard = gameCards.FirstOrDefault(g=> g.IsSelected == true); 
                if (selectedCard != null)
                {
                    if(selectedCard.isCar == true)
                        isWon = true;
                    else
                        isWon = false;
                }
            }

            return isWon;
        }

    }
}
