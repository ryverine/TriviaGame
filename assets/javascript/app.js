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
	var answers = [];

	var currentQuestion = 0;

	var correct = 0;

	var wrong = 0;

	var questionDiv = $("#questionDiv");
	questionDiv.hide();

	var answerDiv = $("#answerDiv");
	answerDiv.hide();

	var resultsDiv = $("#resultsDiv");
	resultsDiv.hide();


	$("#btn-start").on("click", function() 
	{	
		$("#btn-start").hide();

		questions = loadQuestions();

		getQuestion(currentQuestion);

		// https://www.w3schools.com/jsref/met_win_setinterval.asp
		// every 10 seconds  call getQuestion
		// setInterval(getQuestion, 10000);

	});


	$("#btn-answerA").on("click", function() 
	{	
		console.log(this.value);

		// clearInterval(myInterval);
		if(currentQuestion < questions.length)
		{
			logAnswer(this.value);
		}
		else
		{
			console.log("NO MORE QUESTIONS");
		}
	});


	$("#btn-answerB").on("click", function() 
	{	
		console.log(this.value);

		if(currentQuestion < questions.length)
		{
			logAnswer(this.value);
		}
		else
		{
			console.log("NO MORE QUESTIONS");
		}
	});


	$("#btn-answerC").on("click", function() 
	{	
		console.log(this.value);

		if(currentQuestion < questions.length)
		{
			logAnswer(this.value);
		}
		else
		{
			console.log("NO MORE QUESTIONS");
		}
		
	});


	$("#btn-answerD").on("click", function() 
	{	
		console.log(this.value);

		if(currentQuestion < questions.length)
		{
			logAnswer(this.value);
		}
		else
		{
			console.log("NO MORE QUESTIONS");
		}
	});


	function getQuestion(arrayIndex)
	{
		//start new interval here?
		
		//put question on screen
		questionDiv.text(questions[arrayIndex].question);

		questionDiv.show();

		$("#btn-answerA").text(questions[arrayIndex].answers[0]);
		$("#btn-answerB").text(questions[arrayIndex].answers[1]);
		$("#btn-answerC").text(questions[arrayIndex].answers[2]);
		$("#btn-answerD").text(questions[arrayIndex].answers[3]);

		answerDiv.show();
	}


	function logAnswer(theAnswer)
	{
		// put selected answer in question object
		// questions[currentQuestion].selectedAnswer = theAnswer.toUpperCase();


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
				If the player selects the correct answer, show a screen congratulating them for choosing the right option. 
				After a few seconds, display the next question -- do this without user input. 
			*/
		}
		else
		{
			/*
				If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. 
				Wait a few seconds, then show the next question.
			*/
		}

		/*
			If the player runs out of time, tell the player that time's up and display the correct answer. 
			Wait a few seconds, then show the next question.
		*/

		



		currentQuestion++;

		if(currentQuestion < questions.length)
		{
			// move to next question
			getQuestion(currentQuestion);
		}
		else
		{
			console.log("HAVE ANSWERED ALL QUESTIONS");
			gradeQuiz();
		}
	}


	function gradeQuiz()
	{

		/*
			On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).
		*/

		questionDiv.hide();

		answerDiv.hide();

		resultsDiv.show();

		for (var i = 0; i < questions.length; i++)
		{
			var qNum = i+1;
			resultsDiv.append(	"<div>" + "Question " + qNum + ": " + questions[i].question + "<br>" + 
								"You answered: " + questions[i].answers[questions[i].selectedAnswer] + "<br>" + 
								"Correct answer: " +  questions[i].answers[questions[i].correctAnswer]  + "</div>");
		}
	}


	function loadQuestions()
	{
		var questionList = [];

		var question01 =  {
			question: "Question 1",
			answers: ["Answer A","Answer B","Answer C","Answer D"],
			correctAnswer: 0,
			selectedAnswer: -1};

		questionList.push(question01);

		var question02 =  {
			question: "Question 2",
			answers: ["Answer A","Answer B","Answer C","Answer D"],
			correctAnswer: 1,
			selectedAnswer: -1};

		questionList.push(question02);

		var question03 =  {
			question: "Question 3",
			answers: ["Answer A","Answer B","Answer C","Answer D"],
			correctAnswer: 2,
			selectedAnswer: -1};

		questionList.push(question03);

		var question04 =  {
			question: "Question 4",
			answers: ["Answer A","Answer B","Answer C","Answer D"],
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
			01	Krobus Icon.png Krobus
			03	Linus Icon.png Linus
			07	Caroline Icon.png Caroline
			10	Sebastian Icon.png Sebastian
			14	Harvey Icon.png Harvey
			17	Wizard Icon.png Wizard
			20	Evelyn Icon.png Evelyn
			23	Leah Icon.png Leah
			26	Clint Icon.png Clint
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













































