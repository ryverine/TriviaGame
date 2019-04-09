// https://www.stardewvalley.net/
// https://stardewvalleywiki.com/Stardew_Valley_Wiki
// https://soundcloud.com/concernedape/spring-the-valley-comes-alive
// https://www.reddit.com/r/StardewValley/comments/b2mvop/stardew_valley_phone_wallpaper/
// https://www.reddit.com/r/StardewValley/comments/7e67r7/looking_for_a_specific_wallpaper/
// https://stardewvalleywiki.com/List_of_All_Gifts
// https://stardewvalleywiki.com/Calendar


$(document).ready(function() 
{
	var questions = [];

	var currentQuestion = 0;

	var questionDiv = $("#questionDiv");
	questionDiv.hide();

	var answerDiv = $("#answerDiv");
	answerDiv.hide();

	var resultsDiv = $("#resultsDiv");
	//resultsDiv.hide();

	var timerDiv = $("#timerDiv");

	var restartDiv = $("#restartDiv");
	restartDiv.hide();

	var intervalId;

	var timerRunning = false;

	var secondCounter = 10;


	$("#btn-start").on("click", function() 
	{	
		$("#btn-start").hide();

		questions = loadQuestions();

		getQuestion();

	});


	$("#btn-answerA").on("click", function() 
	{	
		console.log(this.value);

		stopTimer();

		logAnswer(this.value);
  		
	});


	$("#btn-answerB").on("click", function() 
	{	
		console.log(this.value);

		stopTimer();

		logAnswer(this.value);
  		
	});


	$("#btn-answerC").on("click", function() 
	{	
		console.log(this.value);

		stopTimer();

		logAnswer(this.value);
  		
	});


	$("#btn-answerD").on("click", function() 
	{	
		console.log(this.value);

		stopTimer();

		logAnswer(this.value);
  		
	});


	$("#btn-restart").on("click", function() 
	{	
		console.log(this.value);

		restartDiv.hide();

		questions = [];

		currentQuestion = 0;

		// var questionDiv = $("#questionDiv");
		// questionDiv.hide();

		// var answerDiv = $("#answerDiv");
		// answerDiv.hide();

		// var resultsDiv = $("#resultsDiv");
		// resultsDiv.hide();

		// var timerDiv = $("#timerDiv");

		// var restartDiv = $("#restartDiv");
		// restartDiv.hide();

		timerRunning = false;

		secondCounter = 10;

		questions = loadQuestions();

		getQuestion();
	});


	function stopTimer() 
	{
		clearInterval(intervalId);

		timerRunning = false;

		secondCounter = 10;

		timerDiv.text("10");
		timerDiv.hide();
	}


	function startTimer()
	{
  		if (!timerRunning)
  		{	
  			timerDiv.show();

    		intervalId = setInterval(countTime,1000);

    		clockRunning = true;
    	}
  	}


  	function countTime() 
  	{
  		secondCounter--;

  		timerDiv.text(secondCounter);

  		if (secondCounter === 0)
  		{
  			/*
				If the player runs out of time, 
					tell the player that time's up 
					and display the correct answer. 
					Wait a few seconds, then show the next question.
			*/

			stopTimer();

			resultsDiv.text("TIME'S UP");

			resultsDiv.append(	"<br>" + "The correct answer is: " + "<br>" +
								questions[currentQuestion].answers[questions[currentQuestion].correctAnswer]);

			currentQuestion++;

			setTimeout(getQuestion, 5000);
  		}
  	}


	function getQuestion()
	{
		resultsDiv.text("");

		timerDiv.text("10");
		timerDiv.show();

		if(currentQuestion < questions.length)
		{
			questionDiv.text(questions[currentQuestion].question);

			questionDiv.show();

			$("#btn-answerA").text(questions[currentQuestion].answers[0]);

			$("#btn-answerB").text(questions[currentQuestion].answers[1]);

			$("#btn-answerC").text(questions[currentQuestion].answers[2]);

			$("#btn-answerD").text(questions[currentQuestion].answers[3]);

			answerDiv.show();

			startTimer();
		}
		else
		{
			console.log("HAVE ANSWERED ALL QUESTIONS");

			gradeQuiz();
		}
	}


	function logAnswer(theAnswer)
	{
		switch(theAnswer.toUpperCase())
		{
  			case "A":
    			questions[currentQuestion].selectedAnswer = 0;
   				break;

  			case "B":
    			questions[currentQuestion].selectedAnswer = 1;
    			break;

  			case "C":
    			questions[currentQuestion].selectedAnswer = 2;
    			break;

  			case "D":
    			questions[currentQuestion].selectedAnswer = 3;
    			break;

  			default:
    			console.log("logAnswer(" + theAnswer + "): Unexpected argument.");
		}

		if(questions[currentQuestion].selectedAnswer === questions[currentQuestion].correctAnswer)
		{
			/*
				If the player selects the correct answer, 
					show a screen congratulating them for choosing the right option. 
					After a few seconds, display the next question -- do this without user input. 
			*/

			resultsDiv.text("YOU GOT IT!");

			currentQuestion++;

			setTimeout(getQuestion, 5000);
		}
		else
		{
			/*
				If the player chooses the wrong answer, 
					tell the player they selected the wrong option 
					and then display the correct answer. 
					Wait a few seconds, then show the next question.
			*/

			resultsDiv.text("YOU DIDN'T GET IT!");

			resultsDiv.append(	"<br>" + "The correct answer is: " + "<br>" +
								questions[currentQuestion].answers[questions[currentQuestion].correctAnswer]);

			currentQuestion++;

			setTimeout(getQuestion, 5000);
		}
	}


	function gradeQuiz()
	{

		/*
			On the final screen, 
				show the number of correct answers, 
				incorrect answers, 
				and an option to restart the game (without reloading the page).
		*/
		
		timerDiv.hide();

		questionDiv.hide();

		answerDiv.hide();

		resultsDiv.show();

		var numRight = 0;
		var numWrong = 0;
		var total = questions.length;

		for (var i = 0; i < questions.length; i++)
		{
			var qNum = i+1;

			if(questions[i].selectedAnswer === questions[i].correctAnswer)
			{
				numRight++;
			}
			else
			{
				numWrong++;
			}

			if(questions[i].selectedAnswer > -1 )
			{
				resultsDiv.append(	"<div>" + "Question " + qNum + ": " + questions[i].question + "<br>" + 
									"You answered: " + questions[i].answers[questions[i].selectedAnswer] + "<br>" + 
									"Correct answer: " +  questions[i].answers[questions[i].correctAnswer]  + "</div>");
			}
			else
			{
				resultsDiv.append(	"<div>" + "Question " + qNum + ": " + questions[i].question + "<br>" + 
									"You did not answer." + "<br>" + 
									"Correct answer: " +  questions[i].answers[questions[i].correctAnswer]  + "</div>");
			}
		}

		resultsDiv.append(	"<div>" + "Total Questions: " + total + "<br>" + 
							"Correct Answers: " + numRight + "<br>" + 
							"Wrong Answers: " + numRight + "</div>");

		// DO HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// ASK TO RESTART QUIZ

		restartDiv.show();
	}


	function loadQuestions()
	{
		var questionList = [];

		var question01 =  {
			question: "Question 1",
			answers: [	"Answer A",
						"Answer B",
						"Answer C",
						"Answer D"],
			correctAnswer: 0,
			selectedAnswer: -1};

		questionList.push(question01);

		var question02 =  {
			question: "Question 2",
			answers: [	"Answer A",
						"Answer B",
						"Answer C",
						"Answer D"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question02);

		var question03 =  {
			question: "Question 3",
			answers: [	"Answer A",
						"Answer B",
						"Answer C",
						"Answer D"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question03);

		var question04 =  {
			question: "Question 4",
			answers: [	"Answer A",
						"Answer B",
						"Answer C",
						"Answer D"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question04);

		return questionList;
	}

	// code here

	/* Spring
		Festivals
			13  Egg Festival
			24  Flower Dance
		Birthdays
			04  Kendt
			07	Lewis
			10	Vincent
			14	Haley
			18	Pam
			20	Shane
			26	Pierre
			27	Emily
		Other
			15-18	Salmonberry Season
	*/

	/* Summer
		Festivals
			11	Luau
			28	Dance of the Moonlight Jellies
		Birthdays
			04	Jas
			08	Gus
			10	Maru
			13	Alex
			17	Sam
			19	Demetrius
			22	Dwarf
			24	Willy
		Other
			12-14	Extra forageables at The Beach
	*/

	/* Fall
		Festivals
			16	Stardew Valley Fair
			27	Spirit's Eve
		Birthdays
			02	Penny
			05	Elliott
			11	Jodi
			13	Abigail
			15	Sandy
			18	Marnie
			21	Robin
			24	George
		Other
			8-11	Blackberry Season
	*/

	/* Winter
		Festivals
			08 Festival of Ice
			15-17 Night Market
			25 Feast of the Winter Star
		Birthdays
			01	Krobus
			03	Linus
			07	Caroline 
			10	Sebastian 
			14	Harvey 
			17	Wizard 
			20	Evelyn 
			23	Leah 
			26	Clint 
	*/

	/* loved gifts
	*/

	/* Universal Gifts
		Loved
			Golden Pumpkin
			Pearl
			Prismatic Shard
			Rabbit's Foot
	*/

	/* Seasonal Fish
	*/

	/* Seasonal Crops
	*/

	/* Bundles
	*/


	/**/
	/**/
	/**/


});













































