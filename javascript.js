let startReset = document.querySelector("#startreset");
let scoreValue = document.querySelector("#scorevalue");
let timeRemaining = document.querySelector("#timeremaining");
let timeRemainingValue = document.querySelector("#timeremainingvalue");
let gameOver = document.querySelector("#gameover");
let question = document.querySelector("#question");
let box1 = document.querySelector("#box1");
let box2 = document.querySelector("#box2");
let box3 = document.querySelector("#box3");
let box4 = document.querySelector("#box4");
let correct = document.querySelector("#correct");
let wrong = document.querySelector("#wrong");
 
let game = {
	playing: false,
	score: 0,
	generateQA() {
		questionAnswers.generateQuestionAnswers();
	},	
	initGame() {
		if(this.playing) {
			location.reload();
		} else {
			this.playing = true;
			scoreValue.textContent = 0;
			this.startTimer();
			startReset.textContent = "Reset Game";
			this.generateQA();
		
		}
	},
	gameOver() {
		gameOver.style.display = "block";
		gameOver.innerHTML = `<p>Game Over<p><p>Your Score is ${this.score}.<p>`;
	},
	addPoint() {
		this.score++;
		scoreValue.textContent = this.score;
	},
	startTimer() {
		timeRemaining.style.display = "block";
		let time = 60000;
		let that = this;
		let intervalo = setInterval(function() { 
			time -= 1000;
			timeRemainingValue.textContent = time / 1000;
			if(time <= 0) {
				clearInterval(intervalo);								
				box1.removeEventListener("click", b1)
				box2.removeEventListener("click", b2)
				box3.removeEventListener("click", b3)
				box4.removeEventListener("click", b4)
				that.gameOver();					
			} 
		},1000);
	}
}

let questionAnswers  = {
	number1: 1,
	number2: 1,
	solution: 1,
	position: 1,

	generateQuestionAnswers() {
		this.number1 = Math.floor(Math.random() * 10) + 1,
		this.number2 = Math.floor(Math.random() * 10) + 1,
		this.position = Math.floor(Math.random() * 4) + 1,
		this.solution = this.number1 * this.number2; 	

		question.textContent = `${this.number1} X ${this.number2}`;
		box1.textContent = this.position === 1? this.solution : Math.floor(Math.random() * 100) + 1;
		box2.textContent = this.position === 2? this.solution : Math.floor(Math.random() * 100) + 1;
		box3.textContent = this.position === 3? this.solution : Math.floor(Math.random() * 100) + 1;
		box4.textContent = this.position === 4? this.solution : Math.floor(Math.random() * 100) + 1;	
	},

	checkAnswer(box) {
		if(+box.textContent === +this.solution) {
			game.addPoint();
			correct.style.display = "block";
			setTimeout(function() { correct.style.display = "none";},1000)
			this.generateQuestionAnswers();
		} else {
			wrong.style.display = "block";
			setTimeout(function() {wrong.style.display = "none";},1000)
		}
	}

}
startReset.addEventListener("click", function() {game.initGame()});

let b1 = function() {questionAnswers.checkAnswer(box1)};
let b2 = function() {questionAnswers.checkAnswer(box2)};
let b3 = function() {questionAnswers.checkAnswer(box3)};
let b4 = function() {questionAnswers.checkAnswer(box4)};

box1.addEventListener("click", b1);
box2.addEventListener("click", b2);
box3.addEventListener("click", b3);
box4.addEventListener("click", b4);