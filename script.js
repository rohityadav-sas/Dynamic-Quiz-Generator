let quiz = [
    {
        question: 'How many Infinity Stones are there?',
        opt1: '4',
        opt2: '5',
        opt3: '6',
        opt4: '8',
        correct: null,
    },
    {
        question: 'Who was able to pick up Thor\'s hammer in Endgame?',
        opt1: 'Captain America',
        opt2: 'Loki',
        opt3: 'Iron Man',
        opt4: 'Thanos',
        correct: null,
    },
    {
        question: 'Which movie kicked off the MCU?',
        opt1: 'The Incredible Hulk',
        opt2: 'Thor',
        opt3: 'Black Widow',
        opt4: 'Iron Man',
        correct: null,
    },
    {
        question: 'Who is the Winter Solider?',
        opt1: 'Steve Rogers',
        opt2: 'Hulk',
        opt3: 'Bucky',
        opt4: 'Loki',
        correct: null,
    },
    {
        question: 'Who is the first born of Odin?',
        opt1: 'Thor',
        opt2: 'Hela',
        opt3: 'Loki',
        opt4: 'None of the above',
        correct: null,
    }
];
quiz[0].correct = quiz[0].opt3;
quiz[1].correct = quiz[1].opt1;
quiz[2].correct = quiz[2].opt4;
quiz[3].correct = quiz[3].opt3;
quiz[4].correct = quiz[4].opt2;
let quizIndex = 0;
let score = 0;
let ask;
const labeloptions = document.querySelectorAll('.labeloptions');
const button = document.getElementsByTagName('button')[0];
const checked = document.querySelectorAll('.checked');
const questionText = document.getElementById('questionText');
const quizContainer = document.querySelector('.quizContainer');
const computerQuiz = document.querySelector('.computerQuiz');
const userQuiz = document.querySelector('.userQuiz');
const showscore = document.createElement('h1');

function loadQuiz() {
    questionText.textContent = quiz[quizIndex].question;
    labeloptions.forEach((e, index) => {
        e.textContent = quiz[quizIndex]['opt' + (index + 1)];
    })
}

loadQuiz();

button.addEventListener('click', () => {
    checkanswer();
    quizIndex++;
    if (quizIndex < quiz.length) {
        loadQuiz();
        checked.forEach((e) => {
            e.checked = false;
        })
    }
    else {
        computerQuiz.classList.add('hidden');
        showscore.classList.remove('hidden');
        let x = window.matchMedia('(min-width:300px) and (max-width:900px)');
        if (x.matches) {
            showscore.style.fontSize = '2em';
        }
        else {
            showscore.style.fontSize = '3em';
        }
        showscore.style.opacity = '0';
        showscore.style.userSelect = 'none';
        showscore.style.cursor = 'text';
        showscore.style.fontStyle = 'italic';
        showscore.style.transition = 'opacity 2s ease-in-out';
        showscore.style.color = 'rgba(0,0,0,0.6)'
        setTimeout(() => {
            showscore.style.opacity = '1';
        }, 1);
        quizContainer.classList.add('flex');
        showscore.textContent = `Your Score : ${score}`;
        quizContainer.appendChild(showscore);
        setTimeout(() => {
            ask = confirm('Do you want to make your own Quiz?');
            quiz = [];
            runuserquiz();
        }, 2000);
    }
})

function checkanswer() {
    checked.forEach((e) => {
        if (e.checked) {
            if (e.labels[0].textContent == quiz[quizIndex].correct) {
                score++;
            }
        }
    })
}

//USERQUIZ PART

const userbutton1 = document.querySelector('.userbutton1');
const userbutton2 = document.querySelector('.userbutton2');
const userClearValue = Array.from(userQuiz.getElementsByTagName('input'));
const userquiz = [];
let userQuizIndex = 0;
function runuserquiz() {
    if (ask) {
        showscore.classList.add('hidden');
        userQuiz.classList.remove('hidden');
    }
    return;
}

userbutton1.addEventListener('click', () => {
    let userQuestion = document.getElementById('userQuestionText');
    let useropt_a = document.getElementById('useropt_a');
    let useropt_b = document.getElementById('useropt_b');
    let useropt_c = document.getElementById('useropt_c');
    let useropt_d = document.getElementById('useropt_d');
    let correctans = document.getElementById('usercorrectopt');
    let obj = {
        question: userQuestion.value,
        opt1: useropt_a.value,
        opt2: useropt_b.value,
        opt3: useropt_c.value,
        opt4: useropt_d.value,
        correct: null
    }
    switch (correctans.value) {
        case '1':
            obj.correct = obj.opt1;
            break;
        case '2':
            obj.correct = obj.opt2;
            break;
        case '3':
            obj.correct = obj.opt3;
            break;
        case '4':
            obj.correct = obj.opt4;
            break;
        default:
            alert('Invalid Value for Correct Option');
            break;
    }
    userquiz.push(obj);
    userClearValue.forEach((e) => {
        e.value = ''
    });
})

userbutton2.addEventListener('click', () => {
    quizIndex = 0;
    score = 0;
    quiz = userquiz;
    loadQuiz();
    quizContainer.classList.remove('flex');
    userQuiz.classList.add('hidden');
    computerQuiz.classList.remove('hidden');
})
