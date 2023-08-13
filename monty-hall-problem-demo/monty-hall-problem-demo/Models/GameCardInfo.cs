using System;

namespace monty_hall_problem_demo.Models
{
    public class GameCardInfo
    {
        public int Id { get; set; }
        public string CardName { get; set; }
        public bool IsOpen { get; set; }
        public bool IsSelected { get; set; }
        public string ImagePath { get; set; }
        public string DefualtImagePath { get; set; }
        public bool isCar { get; set; }
    }
}
