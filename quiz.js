let questions = [];
let questionIndex = 0;
let score = 0;

/* function to randomize questions from json*/

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* get questions from json file and randomize */

fetch("questions.json")
    .then(response => response.json())
    .then(data => {
        questions = data;
        shuffleArray(questions);
        displayQuestion();
    })
    .catch(error => console.error("Error loading JSON", error));

/* start screen functionality = button and display */

document.getElementById("start-button").addEventListener("click", startQuiz);

function startQuiz() {
    document.getElementById("start-screen").classList.add("hide-none");
    document.getElementById("quiz-container").classList.remove("hide");
    
    displayQuestion();
}

function displayQuestion() {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");

/* clear choices */

choicesElement.innerHTML = "";
document.getElementById("result").textContent = "";

const currentQuestion = questions[questionIndex];

/* reset animation for questions */

questionElement.classList.remove("animate__animated", "animate__zoomIn");
void questionElement.offsetWidth;

/* retrigger animation for questions */
setTimeout(() => {
    questionElement.classList.add("animate__animated", "animate__zoomIn");
}, 15);

/* set text for next question */
questionElement.textContent = currentQuestion.question;

/* display choices */

currentQuestion.choices.forEach((choice,index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => selectAnswer(index));
    li.appendChild(button);
    choicesElement.appendChild(li);
});
}

/* answer selection handler */

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[questionIndex];

    const resultElement = document.getElementById("result");

    if (selectedIndex === currentQuestion.answer) {
        score++;
        resultElement.textContent = "Correct!";
        document.getElementById("goku-win").classList.add("show");
    } else {
        resultElement.textContent = "Wrong!";
        document.getElementById("goku-lose").classList.add("show");
    }

    /* delay for next question */

    setTimeout(() => {
        document.getElementById("goku-win").classList.remove("show");
        document.getElementById("goku-win").classList.add("hide-none");
        document.getElementById("goku-lose").classList.remove("show");
        document.getElementById("goku-lose").classList.add("hide-none");
        questionIndex++;
        resultElement.textContent = "";
        if (questionIndex < questions.length) {
            displayQuestion();
        } else {
            showFinalScore();
        }
    }, 2500);
}

/* show final score */
function showFinalScore() {
    const quizContainer = document.querySelector(".quiz-container");
    quizContainer.innerHTML = `<h1>Your Score: ${score}/${questions.length}<br>Thank you for playing!</h1>`;
}