const quiz = [
  {
    question: "What is the correct way to Prevent event bubbling?",
    choices: ["preventDefault()", "no bubble", "stop.event", "eventBubbleStop()"],
    answer: "preventDefault()"
  },
  {
    question: "What does (this) mean in a function?",
    choices: ["the object", "the function", "the event", "the prompt"],
    answer: "the object"
  },
  {
    question: "how do you call this function 'myFunction()' ?",
    choices: ["myFunction()", "HEY FUNCTION", "call myFunction", "Function()"],
    answer: "myFunction()"
  },
  {
    question: "what does 'return' do in a function?",
    choices: ["The function will stop and return a specific value", "returns to the last function called", "return gives javascript another turn", "it returns a number of functions"],
    answer: "The function will stop and return a specific value"
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 90;


function displayQuestion() {
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesContainer = document.getElementById("choices-container");

  const currentQuiz = quiz[currentQuestion];
  questionText.textContent = currentQuiz.question;


  choicesContainer.innerHTML = "";


  currentQuiz.choices.forEach(choice => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.addEventListener("click", checkAnswer);
    choicesContainer.appendChild(choiceButton);
  });
}


function checkAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const currentQuiz = quiz[currentQuestion];

  if (selectedAnswer === currentQuiz.answer) {
    score += timeLeft;
  } else {
    timeLeft -= 10;
  }

  currentQuestion++;

  if (currentQuestion < quiz.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}



function endQuiz() {
  clearInterval(timer);
  clearInterval(timeLeft);
  const finalScore = timeLeft;
  const scoreText = document.getElementById("score-text");
  scoreText.textContent = `Your score is ${finalScore} seconds.`;


  const scoreHolder = document.getElementById("score-container");
  scoreHolder.style.display = "block";


  const quizHolder = document.getElementById("quiz-container");
  quizHolder.style.display = "none";

 
  const highscoreHolder = document.getElementById("highscore-container");
  highscoreHolder.style.display = "block";

  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", saveHighscore);

}

function saveHighscore(event) {
  event.preventDefault();
  event.stopPropagation();
  const nameInput = document.getElementById("name-input");
  const playerName = nameInput.value;

  const highscore = { name: playerName, score: timeLeft };
  localStorage.setItem("highscore", JSON.stringify(highscore));

 
  const highscoreContainer = document.getElementById("highscore-container");

  const highscoreElement = document.createElement("p");
  highscoreElement.textContent = `${highscore.name}: ${highscore.score} seconds`;

  highscoreContainer.appendChild(highscoreElement);


  nameInput.value = "";
}


function displayHighscores() {
  const highscoreContainer = document.getElementById("highscore-container");


  const highscore = localStorage.getItem("highscore");

  if (highscore) {
    const parsedHighscore = JSON.parse(highscore);


    const highscoreElement = document.createElement("p");
    highscoreElement.textContent = `${parsedHighscore.name}: ${parsedHighscore.score} seconds`;


    highscoreContainer.appendChild(highscoreElement);
  }
}


displayHighscores();



function startQuiz() {
  const startContainer = document.getElementById("start-container");
  startContainer.style.display = "none";

  const quizContainer = document.getElementById("quiz-container");
  quizContainer.style.display = "block";
  displayQuestion();


  function updateTimer() {
    const timerText = document.getElementById("timer-text");
  
    timerText.textContent = `Time Left: ${timeLeft} seconds`;
  
    if (timeLeft === 0) {
      clearInterval(timer);
      endQuiz();
    }
    timeLeft--;
  }
  timer = setInterval(updateTimer, 1000);
}

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startQuiz);
