# Trivia Game
Trivia Game built using JavaScript and jQuery timing functions.

https://www.stardewvalley.net/
https://stardewvalleywiki.com/Stardew_Valley_Wiki
https://soundcloud.com/concernedape/spring-the-valley-comes-alive
https://www.reddit.com/r/StardewValley/comments/b2mvop/stardew_valley_phone_wallpaper/
https://www.reddit.com/r/StardewValley/comments/7e67r7/looking_for_a_specific_wallpaper/
https://stardewvalleywiki.com/List_of_All_Gifts
https://stardewvalleywiki.com/Calendar

https://www.reddit.com/r/StardewValley/comments/4dtgp7/by_popular_request_a_stardew_valley_font_for_your/
https://www.dropbox.com/sh/g1law0qmnf6pjwr/AACummg5fZJ5JIF4ReeRDxJia?dl=0

https://stardewvalley.fandom.com/wiki/Villager_marriage_candidates

## Game Rules


## Global Variables

### var questions = [];
### var currentQuestion = 0;
### var questionDiv = $("#questionDiv");
### var answerDiv = $("#answerDiv");
### var resultsDiv = $("#resultsDiv");
### var timerDiv = $("#timerDiv");
### var secondCountSpan = $("#secondCount");
### var restartDiv = $("#restartDiv");
### var intervalId;
### var timerRunning = false;
### var secondCounter = 10;

## Event Handlers

### $("#btn-start").on("click", function() 
### $("#btn-answerA").on("click", function() 
### $("#btn-answerB").on("click", function() 
### $("#btn-answerC").on("click", function() 
### $("#btn-answerD").on("click", function() 
### $("#btn-restart").on("click", function() 

## Objects

	var question05 =  {
		question: "When is Penny's birthday?",
		answers: [	"Fall 02",
					"Summer 10",
					"Winter 23",
					"Fall 05"],
		correctAnswer: 0,
		selectedAnswer: -1};

## Functions

### function stopTimer() 
### function startTimer()
### function countTime() 
### function getQuestion()
### function logAnswer(theAnswer)
### function gradeQuiz()
### function loadQuestions()














