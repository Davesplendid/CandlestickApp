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
        question: "What is the full meaning of  ICT?" ,
        choice1: "Information Communication and Technology",
        choice2: "Information",
        choice3: "Information and Communication",
        choice4: "Technology  Communication and Information",
        answer: 1
        },
        {
        question: "GSM stands for what?",
        choice1: "Global System Mobile",
        choice2: "Global System ",
        choice3: "Go set mobile",
        choice4: "Global Set Mobile",
        answer: 1
        },
        {
        question: "Which one of the following is ICT Device?" ,
        choice1: "Smart phones",
        choice2: "Book",
        choice3: "Pot",
        choice4: "Key",
        answer: 1
        },
        {
        question: "What is smart phones used for?" ,
        choice1: "For making and receiving calls",
        choice2: "for crying",
        choice3: "For Fighting",
        choice4: "For insulting",
        answer: 1
        },
        {
        question: "Is smartphone use for playing music and watching films?" ,
        choice1: "Yes",
        choice2: "No",
        choice3: "Not sure",
        choice4: "It may or may not",
        answer: 1
        },
        {
        question: "Is digital wristwatch part of GSM ?" ,
        choice1: "Yes",
        choice2: "No",
        choice3: "Not sure",
        choice4: "It may or may not",
        answer: 1
        },
        {
        question:  "What can we use to register our contacts ?",
        choice1: "Smart Phones",
        choice2: "Pencil",
        choice3: "Cupboard",
        choice4: "Refrigrator",
        answer: 1
        },
        {
        question:  "SmartPhone can be used to perform one of the following ?",
        choice1: "Perform basic arithematic",
        choice2: "It is used for droping picture",
        choice3: "It is used for jumping words ",
        choice4: "It is used for housing material",
        answer: 1
        },
        
        {
        question:  "We can use smart phone to browse using ?",
        choice1: "A mobile browser Application",
        choice2: "Our book",
        choice3: "Our Notepad",
        choice4: "Our drum",
        answer: 1
        },
        {
        question: "Organizer can be used for ?",
        choice1: "Organizing meetings and appointments",
        choice2: "It is use for printing",
        choice3: "Sending pictures",
        choice4: "Listening to a voice",
        answer: 1
        },
];

//CONSTANTS
const CORRECT_BONUS = 4;
const MAX_QUESTIONS = 10;

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

