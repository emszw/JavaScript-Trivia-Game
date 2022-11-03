/*
Author: Emily Szwalek
*/

/*
putting all questions and answers into an array
each question and answer is assigned with the HTML name so I can access each item individually later
String property called question for displaying the current question
String property for each radio button (a-d) answer option
and declaring the correct answer for each question
*/
const quizQA = [
    {
        question: "Which major ocean is east of the continent of Africa?",
        a: "South Atlantic Ocean",
        b: "Pacific Ocean",
        c: "Indian Ocean",
        d: "North Pacific Ocean",
        correct: "c",
    },
    {
        question: "How many bones are there in the human body?",
        a: "216",
        b: "206",
        c: "198",
        d: "204",
        correct: "b",
    },
    {
        question: "Which of these planets is the largest in our Solar System?",
        a: "Jupiter",
        b: "Venus",
        c: "Saturn",
        d: "Neptune",
        correct: "a",
    },
    {
        question: "Which female author wrote the classic novel, Frankenstein?",
        a: "Mary Wollstonecraft",
        b: "Jane Austen",
        c: "Emily Bronte",
        d: "Mary Shelley",
        correct: "d",
    },
    {
        question: "What is the real name of the Marvel superhero the Hulk?",
        a: "Clint Barton",
        b: "Bruce Banner",
        c: "Steve Rodgers",
        d: "Bucky Barnes",
        correct: "b",
    },
];

//declaring all variables by their element to be used for loading quiz questions and changing HTML when required
const quiz = document.getElementById('quiz');
//constant answerOptions is to select all radio buttons
const answerOptions = document.querySelectorAll('.answer-options');
//constant questionText to access the HTML li Label to display what the current trivia question is
const questionText = document.getElementById('question');
//constants a-d_answer access the HTML li Label to display what the current answer options are
const a_answer = document.getElementById('a_answer');
const b_answer = document.getElementById('b_answer');
const c_answer = document.getElementById('c_answer');
const d_answer = document.getElementById('d_answer');
//constant for the submit button
const submitButton = document.getElementById('submit');
//constant for the help button
const helpButton = document.getElementById('help');

//variable currentQuiz is used to keep track of what question the user is on
let currentQuiz = 0;
//score is used to keep track of how many questions the user has answered correctly
let score = 0;

//fuction startQuiz is placed here so that when the webpage is opened it automatically displays the first question
startQuiz();

//function to run the quiz through each question within the quizQA array
function startQuiz() {

    //starting with the deselectAnswers function (created below) 
    deselectAnswers();

    //declaring variable currentQuesAndAns to hold the value of each element in the quizQA array
    const currentQuesAndAns = quizQA[currentQuiz];

    //using the innerText DOM property to assign the question string from quizQA array  
    questionText.innerText = currentQuesAndAns.question;
    //using the same innerText DOM property but assigning each answer option from a-d
    a_answer.innerText = currentQuesAndAns.a;
    b_answer.innerText = currentQuesAndAns.b;
    c_answer.innerText = currentQuesAndAns.c;
    d_answer.innerText = currentQuesAndAns.d;

}//end of startQuiz function

//this function is used to deselect all radio buttons when the page loads and again before every new question
function deselectAnswers() {
    //answerOptions uses the forEach method to call on every radio button (a-d) and .checked is assigned to false to deselect.
    answerOptions.forEach(answerOptions => answerOptions.checked = false)
}

//this function is to check the answer that was chosen by the user
function userSelectedAnswer() {
    //declaring variable 'answer' to represent the radio button that was chosen by the user
    let answer;
    
    //if statements that will return the value of the string within the array that was set for a, b, c or d.
    //the string will then be used within the checkAnswer method below
    if (a.checked) {
        answer = a.id;
        return answer;
    }
    if (b.checked){
        answer = b.id;
        return answer;
    }
    if (c.checked) {
        answer = c.id;
        return answer;
    }
    if (d.checked) {
        answer = d.id;
        return answer;
    }
}

//the checkAnswer function will assign the constant answer with the string value that was determined from userSelectedAnswer()
function checkAnswer() {
    const answer = userSelectedAnswer();

    //the users answer will then be compared with the correct answer
    if (answer) {
        if (answer === quizQA[currentQuiz].correct) {
            //if the users answer is correct, the score will be incremented, but if its not, it will stay the same 
            score++;
        }
        //after the answer has been checked, the currentQuiz will increment to ensure the next question and answers from the array can be accessed. 
        currentQuiz++;
    }
    //after everything else has been run, nextQuestion is called
    nextQuestion();
}

//nextQuestion is a method that determines whether or not the quiz is over.
function nextQuestion() {
    //if the currentQuiz count is less than the quizQA array length, then that means there are still more questions
    if (currentQuiz < quizQA.length) {
        //startQuiz is called to display the new set of questions
        startQuiz();
    }
    //if the currentQuiz count is equal to the quizQA array length, the endQuiz method is called
    else {
        endQuiz();
    }
}

//endQuiz is used to change the innerHTML within the div id="quiz" after the game has ended. 
function endQuiz() {
    //the score count is then displayed for the user to see how well they did on the quiz
    //and the button is changed from a submit button to say Play again which will reload the page if the user wants to try again
    quiz.innerHTML = `  
    <h2 style="padding: 152px 0px 152px;">You got ${score}/${quizQA.length} questions right!</h2>

    <button class="submit" id="submit" onclick="location.reload()">Play Again</button>
    `
}

//The gameInstructions is another function that changes the innerHTML within the div id="quiz" to show the game instructions
function gameInstructions() {
    //game is explained and the submit button is changed again to an "Im Ready!" button which will reload the page
    quiz.innerHTML = `  
    <h2 style="padding: 64px 0px 30px;">Instructions</h2>
    <div style="padding: 0px 64px 30px 64px;">
    <p>This is a Trivia Game!</p>
    <p>This multiple choice game consists of 5 questions centered around a variety of categories.</p>
    <p>Read each question carefully and pick the answer you believe is correct, then hit the submit button to submit your answer.</p>
    <p>You can view your score after you complete all 5 questions.</p><br>

    <h2>Good luck and have fun!</h2>
    </div>
    <button class="submit" id="submit" onclick="location.reload()">I'm Ready!</button>
    `
}

//eventListener for the submit button which will call on the checkAnswer method
submitButton.addEventListener('click', checkAnswer);
//eventListener for the help button which will call on the gameInstructions method
helpButton.addEventListener('click', gameInstructions);