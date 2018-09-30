
let timer = 8;
let interval;
let questionProgress = 0;
let correctResponses = 0;
let incorrectReponses = 0;
let timedOutReponses = 0;

let trivia = [
    {
        question: "What is Fannie Mae's full name?",
        answers: {
            correctAnswer: "Federal National Mortgage Association",
            incorrectAnswers: ["Federal Home Loan Mortgage Corporation", "Financial Mortgage Alliance", "Funding Nationwide Mortgage Administration"]
        }
    },
    {
        question: "If a borrower's home is worth $200,000, and they wish to borrow $150,000, then the loan-to-value is: ",
        answers: {
            correctAnswer: "75%",
            incorrectAnswers: ["25%", "100%", "50%"]
        }
    },
    {
        question: "What service does Freddie Mac provide on the secondary mortgage market?",
        answers: {
            correctAnswer: "Securitization",
            incorrectAnswers: ["Amortization", "Federalization", "None of the Above"]
        }
    },
    {
        question: "Which credit score is considered excellent?",
        answers: {
            correctAnswer: "810",
            incorrectAnswers: ["580", "660", "930"]
        }
    },
    {
        question: "The Real Estate Settlement Procedures Act (RESPA) is also known as: ",
        answers: {
            correctAnswer: "Regulation X",
            incorrectAnswers: ["Regulation Z", "Regulation B", "Regulation C"]
        }
    },
    {
        question: "The requirement for private mortgage insurance is generally discontinued when the loan-to-value ratio falls below:",
        answers: {
            correctAnswer: "80%",
            incorrectAnswers: ["90%", "20%", "50%"]
        }
    },
    {
        question: "One basis point is:",
        answers: {
            correctAnswer: "0.01%",
            incorrectAnswers: ["1.00%", "0.10%", "0.5%"]
        }
    },
    {
        question: "Which loan type is insured by the Federal government?",
        answers: {
            correctAnswer: "FHA",
            incorrectAnswers: ["VA", "Conventional", "Conforming"]
        }
    },
    {
        question: "Which is NOT a name of a major credit reporting agency?",
        answers: {
            correctAnswer: "Lexus",
            incorrectAnswers: ["Trans Union", "Equifax", "Experian"]
        }
    },
    {
        question: "A rehabilitation loan through which a homeowner rehabilitates and renovates a property in which they live is known as:",
        answers: {
            correctAnswer: "203(k)",
            incorrectAnswers: ["Construction Loan", "IRRRL", "203(b)"]
        }
    }
];

function countDown() {
    timer--;
    $('.time-counter').text(timer);
    if(timer === 0){
        stop();
        $('.result').html('<h3 class="time-up">Time\'s Up!<h2>');
    };
}

function stop() {
    clearInterval(interval);
    questionProgress++;
    setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    if(questionProgress < 10){
        timer = 8;
        interval = setInterval(countDown, 1000);
        $('.question').text(trivia[questionProgress].question);
        let positionArray = [];
        while(positionArray.length < 4){
            let num = Math.floor(Math.random() * 4);
            if(positionArray.indexOf(num) < 0){
                positionArray.push(num);
            };
        };

    }else{
        // trigger endgame
    }
}


$('.start-button').on('click', function() {
    $('.result').empty();
    nextQuestion();
})