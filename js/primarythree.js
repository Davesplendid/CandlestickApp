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
        question: "What is an input device ?" ,
        choice1: "Input device are parts of the computer used to send data/information and commands into computer system",
        choice2: "Input device is used to command the computer only",
        choice3: "Input device is used to send pictures",
        choice4: "Listening to a voice",
        answer: 1
        },
        {
        question: "______is an example of an input device ?" ,
        choice1: "Keyboard",
        choice2: "Cables",
        choice3: "Televison",
        choice4: "DVD",
        answer: 1
        },
        {
        question: "_____ is one of the types of keyboard ?" ,
        choice1: "Alphbetic keys",
        choice2: "Cables keys ",
        choice3: "Game keys ",
        choice4: "Nerd keys",
        answer: 1
        },
        {
        question: "Alphabetics keys are ___to ___ ?",
        choice1: "A to Z",
        choice2: "F1 to F12",
        choice3: "K to Z ",
        choice4: "B to U",
        answer: 1
        },
        {
        question: "Functional  keys are ___to ___ ?" ,
        choice1: "F1 to F12" ,
        choice2: "A to Z",
        choice3: "K to Z ",
        choice4: "B to U",
        answer: 1
        },
        {
        question: "What can be used for typing letters?" ,
        choice1: "Computer Keyboard" ,
        choice2: "Paino keyboard",
        choice3: "Monitor ",
        choice4: "Joystick",
        answer: 1
        },
        {
        question: "Keyboard can be used for performing the following functions ?" ,
        choice1: "For adding, substracting, multiplying and dividing " ,
        choice2: "For Watching Games",
        choice3: "For playing online games balls",
        choice4: "Joystick",
        answer: 1
        },
        {
        question: "Select the specials character from the option below",
        choice1: "#,$,&@" ,
        choice2: "A,B,D,H",
        choice3: "Q,O,P",
        choice4: "I,J,O,L",
        answer: 1
        },
        {
        question: "Can Numeric keys be found on the keyboard ?" ,
        choice1: "Yes" ,
        choice2: "No",
        choice3: "Not too sure",
        choice4: "Is likely ",
        answer: 1
        },
        {
        question: "____is used to move cursor in the computer system?", 
        choice1: "Mouse",
        choice2: "Monitor",
        choice3: "Joystick",
        choice4: "Pointer",
        answer: 1
        },
        {
        question: "Symbols and characters can be entered using ?" ,
        choice1: "Mouse" ,
        choice2: "Monitor",
        choice3: "Joystick",
        choice4: "Pointer",
        answer: 1
        },
        
        {
        question: "____can be used for opening and executing a  program?",
        choice1: "Mouse" ,
        choice2: "Monitor",
        choice3: "Joystick",
        choice4: "Pointer",
        answer: 1
        },
        {
        question: "Mouse can be used for selecting or moving  __ , ___, ___and ____?" ,
        choice1: "icons, files, folders" ,
        choice2: "dust, water, Lens",
        choice3: "Port, Cables and Keys",
        choice4: "Pointer",
        answer: 1
        },
        {
        question: "What can be used for scrolling around a personal computer?" ,
        choice1: "Mouse" ,
        choice2: "Monitor",
        choice3: "Cursor",
        choice4: "Pointer",
        answer: 1
        },
        {
        question: "Mouse can be use for performing  _____and _______ tasks" ,
        choice1: "Copying and pasting" ,
        choice2: "Checking the sound of the system",
        choice3: "Cursor and Pointer",
        choice4: "Pointer and Ampires",
        answer: 1
        },
        {
        question: "Output device are part of  _______?" ,
        choice1: "Computer " ,
        choice2: "Sound",
        choice3: "Input",
        choice4: "VCD",
        answer: 1
        },
        {
        question:  "____is an input device that control a charater or machine in a computer game" ,
        choice1: "computer Joystick", 
        choice2: "Monior",
        choice3: "CPU",
        choice4: "VCD",
        answer: 1
        },
        {
        question: "Select the right option for output device" ,
        choice1: "Speakers" ,
        choice2: "Boystick",
        choice3: "Window 10",
        choice4: "SMS",
        answer: 1
        },
        {
        question: "What is CPU",
        choice1: "Central Processing Unit" ,
        choice2: "Processing Unit",
        choice3: "Unit Processing Center",
        choice4: "Central Processing",
        answer: 1
        },
        {
        question: "Speakers helps to do ________" ,
        choice1: "To enhance the computer sound ",
        choice2: "Check the movement of waves",
        choice3: "Check the inner part of the system",
        choice4: "Quicken the task ",
        answer: 1
        }
];

//CONSTANTS
const CORRECT_BONUS = 2;
const MAX_QUESTIONS = 20;

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
        return window.location.assign("end.html");
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

