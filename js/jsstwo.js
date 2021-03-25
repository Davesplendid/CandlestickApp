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
        question: "_____is hardware  component responsible for all the operations that is carried out in the computer", 
        choice1: "CPU",
        choice2: "VDU",
        choice3: "UPS",
        choice4: "Monitor",
        answer: 1
 },
{
        question: "ALU carries out the ___and ___processes", 
        choice1: "Physical and Arithmetic ",
        choice2: "Logical and phyiscal ",
        choice3: "Arithmetic and logical ",
        choice4: "Input and output processes",
        answer: 3
 },
{
        question: "The speed of a processor is measured in _____or _______", 
        choice1: "Megahertz  or Gigahertz",
        choice2: "MTK or GJE",
        choice3: "HzM or GHz",
        choice4: "Height and width",
        answer: 1
 },
{
        question: "______is the main internal hardware component of the system unit", 
        choice1: "Motherboard",
        choice2: "CPU",
        choice3: "UPS",
        choice4: "Monitor",
        answer: 1
 },
{
        question: "CPU or processor has two main components  which are ___ and ____", 
        choice1: "Control  Unit  and The arithmetic Logic Unit",
        choice2: "LUA and CU ",
        choice3: "IC and Cables",
        choice4: "Joystick and IC",
        answer: 1
 },



{
        question: "A component in the system unit positioned closer to the CD-ROM drive is called", 
        choice1: "Floppy Disk Drive",
        choice2: "FDD",
        choice3: "Power unit",
        choice4: "IC ",
        answer: 1
 },
{
        question: "What is computer ethics", 
        choice1: "It refers to moral principles that guide individuals within the computer  Industry",
        choice2: "It is the principle of  hardware",
        choice3: "It is the rules in softeware",
        choice4: "It is the rules and regulation ",
        answer: 1
 },
{
        question: "The creation of a document with a computerized device", 
        choice1: "Word Processing",
        choice2: "Procession",
        choice3: "Word notes ",
        choice4: "Notepad",
        answer: 1
 },
{
        question: "Which part is the brain work of the computer", 
        choice1: "CPU",
        choice2: "VDU",
        choice3: "UPS",
        choice4: "Monitor",
        answer: 1
 },
{
question: "What is the full meaning of  ICT?" ,
choice1: "Information Communication and Technology",
choice2: "Information",
choice3: "Information and Communication",
choice4: "Technology  Communication and Information",
answer: 1
},
{
question: "What is an input device ?" ,
choice1: "Input device are parts of the computer used to send data/information and commands into computer system",
choice2: "Input device is used to command the computer only",
choice3: "Input device is used to send pictures",
choice4: "Listening to a voice",
answer: 1
},
{
        question: "What are those specific jobs perform by an application software", 
        choice1: "Creating documents, graphics designing ",
        choice2: "Delecting words ",
        choice3: "Refreshing the browser ",
        choice4: "Carry the words around the computer  ",
        answer: 1
    },
{
        question: "What is computer ?", 
        choice1: "It is a device that welcomes informations",
        choice2: "It is a PC ",
        choice3: " It is an electronic device that accept, store, process and gives out information as an output ",
        choice4: "It is an electronic device that stores data only ",
        answer: 3
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
choice3: "For playing backet balls",
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

];

//CONSTANTS
const CORRECT_BONUS = 3;
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

