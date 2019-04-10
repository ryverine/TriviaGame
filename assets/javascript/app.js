// https://www.stardewvalley.net/
// https://stardewvalleywiki.com/Stardew_Valley_Wiki
// https://soundcloud.com/concernedape/spring-the-valley-comes-alive
// https://www.reddit.com/r/StardewValley/comments/b2mvop/stardew_valley_phone_wallpaper/
// https://www.reddit.com/r/StardewValley/comments/7e67r7/looking_for_a_specific_wallpaper/
// https://stardewvalleywiki.com/List_of_All_Gifts
// https://stardewvalleywiki.com/Calendar

// https://www.reddit.com/r/StardewValley/comments/4dtgp7/by_popular_request_a_stardew_valley_font_for_your/
// https://www.dropbox.com/sh/g1law0qmnf6pjwr/AACummg5fZJ5JIF4ReeRDxJia?dl=0


// https://stardewvalley.fandom.com/wiki/Villager_marriage_candidates


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
			stopTimer();

			answerDiv.hide();

			resultsDiv.html("<h3>" + "TIME'S UP" + "</h3>");

			resultsDiv.append(	"<br>" + "The correct answer is: " + "<br>" + "<h4>" +
								questions[currentQuestion].answers[questions[currentQuestion].correctAnswer] + 
								"</h4>");

			// put image here?

			currentQuestion++;

			setTimeout(getQuestion, 5000);
  		}
  	}


	function getQuestion()
	{
		resultsDiv.text("");
		timerDiv.text("10");
		timerDiv.show();
		answerDiv.show();

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
		answerDiv.hide();

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
			resultsDiv.text("YOU GOT IT!");

			currentQuestion++;

			setTimeout(getQuestion, 5000);
		}
		else
		{
			resultsDiv.text("YOU DIDN'T GET IT!");

			resultsDiv.append(	"<br>" + "The correct answer is: " + "<br>" +
								questions[currentQuestion].answers[questions[currentQuestion].correctAnswer]);

			currentQuestion++;

			setTimeout(getQuestion, 5000);
		}
	}


	function gradeQuiz()
	{
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
				resultsDiv.append(	"<div class='resultData'>" + "Question " + qNum + ": " + questions[i].question + "<br>" + 
									"You answered: " + questions[i].answers[questions[i].selectedAnswer] + "<br>" + 
									"Correct answer: " +  questions[i].answers[questions[i].correctAnswer]  + "</div>");
			}
			else
			{
				resultsDiv.append(	"<div class='resultData'>" + "Question " + qNum + ": " + questions[i].question + "<br>" + 
									"You did not answer." + "<br>" + 
									"Correct answer: " +  questions[i].answers[questions[i].correctAnswer]  + "</div>");
			}
		}

		resultsDiv.append(	"<div class='resultData'>" + "Total Questions: " + total + "<br>" + 
							"Correct Answers: " + numRight + "<br>" + 
							"Wrong Answers: " + numWrong + "</div>");

		restartDiv.show();
	}


	function loadQuestions()
	{
		var questionList = [];

		var finalQuestionList = [];

		var question01 =  {
			question: "When is Salmonberry season?",
			answers: [	"Fall 8-11",
						"Spring 15-18",
						"Summer 12-14",
						"Spring 5-8"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question01);

		var question02 =  {
			question: "When is Blackberry season?",
			answers: [	"Spring 15-18",
						"Summer 12-14",
						"Fall 10-14",
						"Fall 8-11"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question02);

		var question03 =  {
			question: "Who loves to recieve a Golden Pumpkin as a gift?",
			answers: [	"Abigail",
						"Evelyn",
						"Nobody",
						"Everyone"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question03);

		var question04 =  {
			question: "Who will always appreciate a hot mug of joe?",
			answers: [	"Clint",
						"Leah",
						"Harvey",
						"Emily"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question04);

		var question05 =  {
			question: "When is Penny's birthday?",
			answers: [	"Fall 02",
						"Summer 10",
						"Winter 23",
						"Fall 05"],
			correctAnswer: 0,
			selectedAnswer: -1};

		questionList.push(question05);

		var question06 =  {
			question: "When is Sebastian's birthday?",
			answers: [	"Spring 02",
						"Summer 10",
						"Winter 10",
						"Fall 05"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question06);

		var question07 = {
			question: "When is the best time to catch an octopus?",
			answers: [	"Spring",
						"Summer",
						"Fall",
						"Winter"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question07);

		var question08 = {
			question: "When is the best time to catch a perch?",
			answers: [	"Spring",
						"Summer",
						"Fall",
						"Winter"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question08);

		var question09 = {
			question: "When is the best time to grow garlic?",
			answers: [	"Spring",
						"Summer",
						"Fall",
						"Winter"],
			correctAnswer: 0,
			selectedAnswer: -1};

		questionList.push(question09);

		var question10 = {
			question: "When is the best time to grow pomegranates?",
			answers: [	"Spring",
						"Summer",
						"Fall",
						"Winter"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question10);

		var question11 = {
			question: "When is the Flower Dance?",
			answers: [	"Summer 05",
						"Spring 24",
						"Fall 21",
						"Spring 13"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question11);

		var question12 = {
			question: "When does the Stardew Valley Fair occur?",
			answers: [	"Spring 13",
						"Summer 28",
						"Fall 16",
						"Winter 08"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question12);

		var question13 = {
			question: "Which of these foods will ehance your Mining level?",
			answers: [	"Eggplant Parmesan",
						"Cranberry Sauce",
						"Maple Bar",
						"All of the above"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question13);

		var question14 = {
			question: "You will gain access to the Quarry upon completion OF what Community Center room?",
			answers: [	"Crafts Room",
						"Pantry",
						"Boiler Room",
						"Vault"],
			correctAnswer: 0,
			selectedAnswer: -1};

		questionList.push(question14);

		var question15 = {
			question: "What item is not needed for the Artisan Bundle?",
			answers: [	"Jelly",
						"Truffle Oil",
						"Peach",
						"Melon"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question15);

		var question16 = {
			question: "What item is needed for the Spring Crops Bundle?",
			answers: [	"Garlic",
						"Cauliflower",
						"Kale",
						"Hops"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question16);

		var question17 = {
			question: "What item is not needed for the Super Meal recipe?",
			answers: [	"Bok Choy",
						"Cranberries",
						"Artichoke",
						"Common Mushroom"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question17);

		var question18 = {
			question: "What fish do you need for the Fish Taco recipe?",
			answers: [	"Rainbow Trout",
						"Tuna",
						"Salmon",
						"Halibut"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question18);

		var question19 = {
			question: "Who is the local carpenter?",
			answers: [	"Clint",
						"Marnie",
						"Robin",
						"Pierre"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question19);

		var question20 = {
			question: "Who runs the Adventurer's Guild?",
			answers: [	"Shane",
						"Gus",
						"Haley",
						"Marlon"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question20);





		// CODE TO PUT QUESTIONS IN RANDOM ORDER
		var addToFinalQuestionList = false;

		while(finalQuestionList.length < questionList.length)
		{
			var randomIndex = Math.floor((Math.random() * Math.floor(questionList.length)));

			if(finalQuestionList.length < 1)
			{
				finalQuestionList.push(questionList[randomIndex]);
			}
			else
			{
				for(var i = 0; i < finalQuestionList.length; i++)
				{
					if(questionList[randomIndex].question === finalQuestionList[i].question)
					{
						addToFinalQuestionList = false;
						break;
					}
					else
					{
						addToFinalQuestionList = true;
					}
				}

				if(addToFinalQuestionList)
				{
					finalQuestionList.push(questionList[randomIndex]);
				}
			}
		}
		
		return finalQuestionList;
	}

	// CREATE QUESTIONS
	/*
	-------
	2 forageable
	2 gifts
	2 birthdays
	2 fish
	2 crops
	-------
	2 festivals
	2 mining
	2 dishes
	2 bundles
	2
	-------


		var question01 =  {
			question: "When is Salmonberry season?",
			answers: [	"Fall 8-11",
						"Spring 15-18",
						"Summer 12-14",
						"Spring 5-8"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question01);

		var question02 =  {
			question: "When is Blackberry season?",
			answers: [	"Spring 15-18"",
						"Summer 12-14",
						"Fall 10-14",
						"Fall 8-11"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question02);

		var question03 =  {
			question: "Who loves to recieve a Golden Pumpkin as a gift?",
			answers: [	"Abigail",
						"Evelyn",
						"Nobody",
						"Everyone"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question03);

		var question04 =  {
			question: "Who will always appreciate a hot mug of joe?",
			answers: [	"Clint",
						"Leah",
						"Harvey",
						"Emily"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question04);

		var question05 =  {
			question: "When is Penny's birthday?",
			answers: [	"Fall 02",
						"Summer 10",
						"Winter 23",
						"Fall 05"],
			correctAnswer: 0,
			selectedAnswer: -1};

		questionList.push(question05);

		var question06 =  {
			question: "When is Sebastian's birthday?",
			answers: [	"Spring 02",
						"Summer 10",
						"Winter 10",
						"Fall 05"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question06);

		var question07 = {
			question: "When is the best time to catch an octopus?",
			answers: [	"Spring",
						"Summer",
						"Fall",
						"Winter"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question07);

		var question08 = {
			question: "When is the best time to catch a perch?",
			answers: [	"Spring",
						"Summer",
						"Fall",
						"Winter"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question08);

		var question09 = {
			question: "When is the best time to grow garlic?",
			answers: [	"Spring",
						"Summer",
						"Fall",
						"Winter"],
			correctAnswer: 0,
			selectedAnswer: -1};

		questionList.push(question09);

		var question10 = {
			question: "When is the best time to grow pomegranates?",
			answers: [	"Spring",
						"Summer",
						"Fall",
						"Winter"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question10);

		var question11 = {
			question: "When is the Flower Dance?",
			answers: [	"Summer 05",
						"Spring 24",
						"Fall 21",
						"Spring 13"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question11);

		var question12 = {
			question: "When does the Stardew Valley Fair occur?",
			answers: [	"Spring 13",
						"Summer 28",
						"Fall 16",
						"Winter 08"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question12);

		var question13 = {
			question: "Which of these foods will ehance your Mining level?",
			answers: [	"Eggplant Parmesan",
						"Cranberry Sauce",
						"Maple Bar",
						"All of the above"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question13);

		var question14 = {
			question: "You will gain access to the Quarry upon completion OF what Community Center room?",
			answers: [	"Crafts Room",
						"Pantry",
						"Boiler Room",
						"Vault"],
			correctAnswer: 0,
			selectedAnswer: -1};

		questionList.push(question14);

		var question15 = {
			question: "What item is not needed for the Artisan Bundle?",
			answers: [	"Jelly",
						"Truffle Oil",
						"Peach",
						"Melon"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question15);

		var question16 = {
			question: "What item is needed for the Spring Crops Bundle?",
			answers: [	"Garlic",
						"Cauliflower",
						"Kale",
						"Hops"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question16);

		var question17 = {
			question: "What item is not needed for the Super Meal recipe?",
			answers: [	"Bok Choy",
						"Cranberries",
						"Artichoke",
						"Common Mushroom"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question17);

		var question18 = {
			question: "What fish do you need for the Fish Taco recipe?",
			answers: [	"Rainbow Trout",
						"Tuna",
						"Salmon",
						"Halibut"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question18);

		var question19 = {
			question: "Who is the local carpenter?",
			answers: [	"Clint",
						"Marnie",
						"Robin",
						"Pierre"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question19);

		var question20 = {
			question: "Who runs the Adventurer's Guild?",
			answers: [	"Shane",
						"Gus",
						"Haley",
						"Marlon"],
			correctAnswer: 3,
			selectedAnswer: -1};

		questionList.push(question20);

		


	*/

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













































