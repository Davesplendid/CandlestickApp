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
        question: "What is a PC Hardware?", 
        choice1: "It is the phyiscal part of UI",
        choice2: "It is the phyiscal part of the computer that we can see and touch",
        choice3: "It is an electronic device",
        choice4: "It is the hard surface of the UNIX",
        answer: 2
    }, 
{
        question: "An already processed fact that has been processsed is called ___", 
        choice1: "Info",
        choice2: "Informate",
        choice3: "Information",
        choice4: "Data",
        answer: 3
    }, 
{
        question: "A raw facts that has not been processed is called ___", 
        choice1: "Information",
        choice2: "Database",
        choice3: "Information",
        choice4: "Data",
        answer: 4
    }, 
{
        question: "UPS stand for ", 
        choice1: "Under the Power System",
        choice2: "Uninterrupted System Power",
        choice3: "Uninteruppted Power Supply",
        choice4: "Unit Power System",
        answer: 3
   }, 
{
        question: "UPS is also known as ___", 
        choice1: "A battery Backup",
        choice2: "Net bar",
        choice3: "System unit",
        choice4: "Unit Grid",
        answer: 1
   }, 
{
        question: "Home key is one of the ___key", 
        choice1: "Numeric Keys",
        choice2: "Printscreen key",
        choice3: "Control Keys",
        choice4: "Delete keys",
        answer: 1
   }, 
{
        question: "What is cursor keys?", 
        choice1: "They switch off the computer system",
        choice2: "Unix keys that check the Artifical intelligent of the computer",
        choice3: "They are the main keys that moves",
        choice4: "These keys are arrows that moves the cursor around the screen",
        answer: 4
   }, 
{
        question: "What are the main ways of protecting computer?", 
        choice1: "By troubleshooting ",
        choice2: "By using chemical designed for virus",
        choice3: "By using password and antivirus",
        choice4: "By using detergent and Towel",
        answer: 3
   }, 
{
        question: "One of the following is the reason for taking care of the computer?", 
        choice1: "To damage the system ",
        choice2: "To protect the system",
        choice3: "To create smooth PC",
        choice4: "To avoid high tension",
        answer: 2
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
question: "Symbols and characters can be entered using ?" ,
choice1: "Keyboard" ,
choice2: "Monitor",
choice3: "Joystick",
choice4: "Pointer",
answer: 1
},

{
question: "____can be used for opening and executing a  program?" ,
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
question: "GSM stands for what?",
choice1: "Global System Mobile",
choice2: "Global System ",
choice3: "Go set mobile",
choice4: "Global Set Mobile",
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
question:  "We can use smart phone to browse using ?",
choice1: "Skype",
choice2: "Our book",
choice3: "Our Notepad",
choice4: "A mobile browser Application",
answer: 4
},
{
    question: "What is Computer Software?", 
    choice1: "Software is a set of instruction given to the computer",
    choice2: "Software is a set of instrcution given to the computer to make it function",
    choice3: "It is an electronic device",
    choice4: "It is a PC ",
    answer: 2
    }, 

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

