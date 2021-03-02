const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull =document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?", 
        choice1: "<Script>",
        choice2: "<Script>",
        choice3: "<Script>",
        choice4: "<Script>",
        answer: 1
    }, 
    {
        question: "What is the correct syntax for referring to an external script called 'xx.js'?", 
        choice1: "<Script href='xxx.js'>",
        choice2: "<Script name='xxx.js'>",
        choice3: "<Script src='xxx.js'>",
        choice4: "<Script file='xxx.js'>",
        answer: 3
    }, 
    {
        question: "What is ICT?", 
        choice1: "Information Technology",
        choice2: "Information Communication",
        choice3: "Info Communicate",
        choice4: "Information Communication and Technology",
        answer: 4
    }, 
    {
        question: "What is UPS?", 
        choice1: "UPS",
        choice2: "Uninterrupted Power Supply",
        choice3: "Info Communicate",
        choice4: "Power Supply",
        answer: 2
    }, 
    {
        question: "What is the Meaning of CPU", 
        choice1: "Central Processing Unit",
        choice2: "Processing Unit",
        choice3: "Unit",
        choice4: "Monitoring Unit",
        answer: 1
    }, 
];

//CONSTANTS
const CORRECT_BONUS = 2;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >=MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        //go to the end page 
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //const classToApply = 'incorrect';
        //if (selectedAnswer == currentQuestion.answer) {
           // classToApply = 'correct';
        //}

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'; 

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();

