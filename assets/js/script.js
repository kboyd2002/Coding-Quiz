const questions = [
  {
      question: "Inside which HTML element do we put the JavaScript?",
      choices: ["a. <js>", "b. <javascript>", "c. <scripting>", "d. <script>"],
      answer: "d. <script>"
  },
  {
      question: "Array values must be enclosed within _____ when being assigned to variables.",
      choices: ["a. commas", "b. curly brackets", "c. square brackets", "d. parenthesis"],
      answer: "c. square brackets"
  },
  {
      question: "Arrays in JavaScript can be used to store _____.",
      choices: ["a. numbers and strings", "b. other arrays", "c. booleans", "d. all of the above"],
      answer: "d. all of the above"
  },
  {
      question: "Commonly used data types DO NOT include:",
      choices: ["a. strings", "b. booleans", "c. prompts", "d. numbers"],
      answer: "c. prompts"
  },
  {
      question: "How do you create a function in JavaScript",
      choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
      answer: "b. function myFunction()"
  },
  {
      question: "How do you call a function named myFunction?",
      choices: ["a. call myFunction()", "b. call function myFunction()", "c. myFunction()", "d. call myFunction"],
      answer: "c. myFunctions()"
  },
  {
      question: "The first index of an array is ____.",
      choices: ["a. 0", "b. 1", "c. 8", "d. any"],
      answer: "a. 0"
  },
  {
      question: "How to write an IF statement in JavaScript?",
      choices: ["a. if i == 5 then", "b. if i = 5 then", "c. if(i == 5)", "d. if i = 5"],
      answer: "c. if(i == 5)"
  },
  {
      question: "How do you add a comment in a JavaScript?",
      choices: ["a. //This is a comment", "b. <!--This is a comment-->", "c. 'This is a comment", "d. * This is a comment *"],
      answer: "a. //This is a comment"
  }
];

var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;


var totalTime = 90;
function newQuiz() {
  questionIndex = 0;
  totalTime = 90;
  timeLeft.textContent = totalTime;
  initialInput.textContent = "";

  startDiv.style.display = "none";
  questionDiv.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";

  var startTimer = setInterval(function() {
      totalTime--;
      timeLeft.textContent = totalTime;
      if(totalTime <= 0) {
          clearInterval(startTimer);
          if (questionIndex < questions.length - 1) {
              gameOver();
          }
      }
  },1000);

  showQuiz();
};

function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choiceA.textContent = questions[questionIndex].choices[0];
  choiceB.textContent = questions[questionIndex].choices[1];
  choiceC.textContent = questions[questionIndex].choices[2];
  choiceD.textContent = questions[questionIndex].choices[3];
}

function checkAnswer(answer) {

  var lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  answerCheck.style.display = "block";

  if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
      correctAns++;
      answerCheck.textContent = "Correct!";
  } else {
      totalTime -= 10;
      timeLeft.textContent = totalTime;
      answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
  }

  questionIndex++;
  if (questionIndex < questions.length) {
      nextQuestion();
  } else {
      gameOver();
  }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

// when all questions are answered or timer reaches 0, game over
function gameOver() {
  summary.style.display = "block";
  questionDiv.style.display = "none";
  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";

  finalScore.textContent = correctAns;
}

function storeHighScores(event) {
  event.preventDefault();

  if (initialInput.value === "") {
      alert("Please enter your initials!");
      return;
  } 

  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";   

  var savedHighScores = localStorage.getItem("high scores");
  var scoresArray;

  if (savedHighScores === null) {
      scoresArray = [];
  } else {
      scoresArray = JSON.parse(savedHighScores)
  }

  var userScore = {
      initials: initialInput.value,
      score: finalScore.textContent
  };

  console.log(userScore);
  scoresArray.push(userScore);

  var scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("high scores", scoresArrayString);
  
  showHighScores();
}

var i = 0;
function showHighScores() {

  startDiv.style.display = "none";
  timer.style.display = "none";
  questionDiv.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";

  var savedHighScores = localStorage.getItem("high scores");

  if (savedHighScores === null) {
      return;
  }
  console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  for (; i < storedHighScores.length; i++) {
      var eachNewHighScore = document.createElement("p");
      eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
      listOfHighScores.appendChild(eachNewHighScore);
  }
}

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function(event){ 
  storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
  showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
  startDiv.style.display = "block";
  highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
  window.localStorage.removeItem("high scores");
  listOfHighScores.innerHTML = "High Scores Cleared!";
  listOfHighScores.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});
