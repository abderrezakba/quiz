
const questions = [
  {
    question: "ماهي السورة التي ذكر فيها اسم مسجدين؟",
    answers: [
      { text: "الفرقان", correct: false },
      { text: "القصص", correct: false },
      { text: "الإسراء", correct: true },
      { text: "الشعراء", correct: false },
    ]
  },
  {
    question: "السورة التي بدأت بلفظ (سورة)؟",
    answers: [
      { text: " سورة النور ", correct: true },
      { text: "سورة الفرقان", correct: false },
      { text: " سورة الأحزاب ", correct: false },
      { text: "سورة القصص", correct: false },
    ]
  },
  {
    question: "قال تعالى في سورة الواقعة الآية (28): (في سدر مخضود)، مامعنى مخضود؟",
    answers: [
      { text: "المزين بالحلي", correct: false },
      { text: " المرصع بالذهب", correct: false },
      { text: " الناعم الملمس", correct: false },
      { text: " لا شوك فيه ", correct: true },
    ]
  },
  {
    question: "بماذا كان يكنى الرسول صلى الله عليه وسلم؟ ",
    answers: [
      { text: " أبو عبدالله ", correct: false },
      { text: " أبو اسماعيل ", correct: false },
      { text: " أبو ابراهيم ", correct: false },
      { text: " أبو القاسم  ", correct: true },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text; // Fix typo here
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target; // Fix typo here
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
