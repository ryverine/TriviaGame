
$(document).ready(function() 
{
	var questions = [];
	var currentQuestion = 0;
	var questionDiv = $("#questionDiv");
	var answerDiv = $("#answerDiv");
	var resultsDiv = $("#resultsDiv");
	var timerDiv = $("#timerDiv");
	var secondCountSpan = $("#secondCount");
	var restartButton = $("#btn-restart");
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
		restartButton.hide();
		questions = [];
		currentQuestion = 0;
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
		secondCountSpan.text("10");
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
  		secondCountSpan.text(secondCounter);

  		if (secondCounter === 0)
  		{	
			stopTimer();
			answerDiv.hide();
			resultsDiv.show();
			resultsDiv.html("<div class='resultHeader'>" + "<img src='" + "assets/images/timesUp.png" + "'>" + "</div>");
			var tmpDiv = $("<div>")
			tmpDiv.attr("class", "responseText");
			resultsDiv.append(	"<div>" + "<h3>" + "The correct answer is: " + "</h3>" + "</div>" +
								"<div>" + "<h1>" + questions[currentQuestion].answers[questions[currentQuestion].correctAnswer] + "</h1>" + "</div");			
			tmpDiv.append("<div id='img-fluid questionImg'>" + "<img src='" + questions[currentQuestion].imgUrl + "'>" + "</div>");
			resultsDiv.append(tmpDiv);
			currentQuestion++;
			setTimeout(getQuestion, 6000);
  		}
  	}


	function getQuestion()
	{
		resultsDiv.text("");
		secondCountSpan.text("10");
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
		resultsDiv.show();

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
			resultsDiv.html("<div class='resultHeader'>" + "<img src='" + "assets/images/youGotIt.png" + "'>" + "</div>");
			var tmpDiv = $("<div>")
			tmpDiv.attr("class", "responseText");
			tmpDiv.append("<div id='img-fluid questionImg'>" + "<img src='" + questions[currentQuestion].imgUrl + "'>" + "</div>");
			resultsDiv.append(tmpDiv);
			currentQuestion++;
			setTimeout(getQuestion, 6000);
		}
		else
		{
			resultsDiv.html("<div class='resultHeader'>" + "<img src='" + "assets/images/youDidntGetIt.png" + "'>" + "</div>");
			var tmpDiv = $("<div>")
			tmpDiv.attr("class", "responseText");
			tmpDiv.html(	"<div>" + "<h3>" + "The correct answer is: " + "<h3>" + "</div>" +
								"<div>" + "<h1>" + questions[currentQuestion].answers[questions[currentQuestion].correctAnswer] + "</h1>" + "</div");

			tmpDiv.append("<div id='img-fluid questionImg'>" + "<img src='" + questions[currentQuestion].imgUrl + "'>" + "</div>");
			resultsDiv.append(tmpDiv);
			currentQuestion++;
			setTimeout(getQuestion, 6000);
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
				resultsDiv.append(	"<div class='resultDataQuestion'>" + qNum + ". " + questions[i].question + "</div>" + 
									"<div class='resultData'>" + 
										"You answered: " + "<strong>" + questions[i].answers[questions[i].selectedAnswer] + "</strong>" + "<br>" + 
										"Correct answer: " +  "<strong>" + questions[i].answers[questions[i].correctAnswer] + "</strong>" + "</div>");
			}
			else
			{
				resultsDiv.append(	"<div class='resultDataQuestion'>" + qNum + ". " + questions[i].question + "</div>" + 
									"<div class='resultData'>" + 
										"<strong>" + "You did not answer." + "</strong>" + "<br>" + 
										"Correct answer: " + "<strong>" + questions[i].answers[questions[i].correctAnswer] + "</strong>"  + "</div>");
			}
		}

		resultsDiv.prepend(	"<div class='resultHeader'>" + "Quiz Completed" + "</div>" + 
							"<div class='resultData'>" + 
								"Total Questions: " + total + "<br>" + 
								"Correct Answers: " + numRight + "<br>" + 
								"Wrong Answers: " + numWrong + "</div>" );
		restartButton.show();
	}


	function loadQuestions()
	{
		var questionList = getQuestions();
		var finalQuestionList = [];
		var addToFinalQuestionList = false;

		while(finalQuestionList.length < 10)
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

});













































