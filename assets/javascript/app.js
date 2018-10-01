
let timer = 15; //initializes the timer
let interval; 
let questionProgress = 0; //tracks what question you're on
let correctResponses = 0; //tracks number of correct responses
let incorrectReponses = 0; // tracks number of incorrect responses
let timedOutReponses = 0; // tracks number of questions that time out
let clickCounter = 0; // makes sure you don't click another answer after already selecting one

let trivia = [
    {
        question: "What is Fannie Mae's full name?",
        answers: {
            correctAnswer: "Federal National Mortgage Association",
            potentialAnswers: ["Federal Home Loan Mortgage Corporation", "Financial Mortgage Alliance", "Funding Nationwide Mortgage Administration", "Federal National Mortgage Association"]
        }
    },
    {
        question: "If a borrower's home is worth $200,000, and they wish to borrow $150,000, then the loan-to-value is: ",
        answers: {
            correctAnswer: "75%",
            potentialAnswers: ["25%", "100%", "50%", "75%"]
        }
    },
    {
        question: "What service does Freddie Mac provide on the secondary mortgage market?",
        answers: {
            correctAnswer: "Securitization",
            potentialAnswers: ["Amortization", "Federalization", "Nationalization", "Securitization"]
        }
    },
    {
        question: "Which credit score is considered excellent?",
        answers: {
            correctAnswer: "810",
            potentialAnswers: ["580", "660", "930", "810"]
        }
    },
    {
        question: "The Real Estate Settlement Procedures Act (RESPA) is also known as: ",
        answers: {
            correctAnswer: "Regulation X",
            potentialAnswers: ["Regulation Z", "Regulation B", "Regulation C", "Regulation X"]
        }
    },
    {
        question: "The requirement for private mortgage insurance is generally discontinued when the loan-to-value ratio falls below:",
        answers: {
            correctAnswer: "80%",
            potentialAnswers: ["90%", "20%", "50%", "80%"]
        }
    },
    {
        question: "One basis point is:",
        answers: {
            correctAnswer: "0.01%",
            potentialAnswers: ["1.00%", "0.10%", "0.5%", "0.01%"]
        }
    },
    {
        question: "Which loan type is insured by the Federal government?",
        answers: {
            correctAnswer: "FHA",
            potentialAnswers: ["VA", "Conventional", "Conforming", "FHA"]
        }
    },
    {
        question: "Which is NOT a name of a major credit reporting agency?",
        answers: {
            correctAnswer: "Credit Karma",
            potentialAnswers: ["Trans Union", "Equifax", "Experian", "Credit Karma"]
        }
    },
    {
        question: "A rehabilitation loan through which a homeowner rehabilitates and renovates a property in which they live is known as:",
        answers: {
            correctAnswer: "203(k)",
            potentialAnswers: ["Construction Loan", "IRRRL", "203(b)", "203(k)"]
        }
    }
];

// starts timer counting down
function countDown() {
    timer--;
    $('.time-counter').text(timer);
    if(timer === 0){
        timeOut();
    };
}

// runs if you don't answer a question in time
function timeOut(){
    $('.result').html('<h3 class="time-up">Time\'s Up!</h3><p class="correct-answer">Correct Answer: '+ trivia[questionProgress].answers.correctAnswer + '</p>');
    timedOutReponses++;
    stop();
}

//stops the timer and moves on to the next question 
function stop() {
    clearInterval(interval);
    questionProgress++;
    setTimeout(nextQuestion, 4000);
}

// shuffles items within an array
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    };
    return array;
  }

  // populates the question's answer choices on the page
  function displayAnswerChoices(arr){
      for(let i = 0; i < arr.length;i++){
        let answerDiv = $('<div class="answer-display">');
        answerDiv.text(arr[i]);
        $('.answer-area').append(answerDiv);
      }
  }

  //resets the game after you're done
  function reset(){
      questionProgress = 0;
      correctResponses = 0;
      incorrectReponses = 0;
      timedOutReponses = 0;
      $('.timer').removeClass('hidden');
      $('.question').empty();
      nextQuestion();
  }

//moves on to the next question
function nextQuestion() {
    clickCounter = 0;
    $('.result').empty();
    $('.answer-area').empty();
    if(questionProgress < 10){ // resets times and moves on if you haven't hit the last question
        timer = 15;
        $('.time-counter').text(timer);
        interval = setInterval(countDown, 1000);
        //displays next question
        $('.question').text(trivia[questionProgress].question);
        //randomize answers below question
        let answersArray = trivia[questionProgress].answers.potentialAnswers;
        shuffle(answersArray);
        displayAnswerChoices(answersArray);
    }else{ //triggers endgame if you're beyond 10th question
        $('.question').empty();
        if(correctResponses >= 7){
            $('.timer').addClass('hidden');
            $('.result').text('Great job! You answered ' + correctResponses + ' correctly!');
            $('.question').text('You missed ' + incorrectReponses + ' questions, and didn\'t answer ' + timedOutReponses + ' questions');
        }else{
            $('.timer').addClass('hidden');
            $('.result').text('Too bad! You only answered ' + correctResponses + ' correctly.');
            $('.question').text('You missed ' + incorrectReponses + ' questions, and didn\'t answer ' + timedOutReponses + ' questions');
        };
        //creates a reset button and resets the game if you click it
        $('.answer-area').html('<button class="reset-button">Click Here to play again!</button>');
        $('.reset-button').on('click', function(){
            reset();
        });
    };
    $('.answer-display').on('click', function(){
        if(clickCounter === 0){
            if($(this).text() === trivia[questionProgress].answers.correctAnswer){
                correctResponses++;
                $('.result').html('<h3 class="correct-result">Correct!</h3>');
                stop();
            }else{
                incorrectReponses++;
                $('.result').html('<h3 class="incorrect-result">Wrong!</h3><p class="correct-answer">Correct Answer: '+ trivia[questionProgress].answers.correctAnswer + '</p>');
                stop();
            }
        }
        clickCounter++;
    });
}


$('.start-button').on('click', function() {
    $('.timer').removeClass('hidden');
    nextQuestion();
});

