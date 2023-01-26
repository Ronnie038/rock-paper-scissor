const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissor = document.getElementById('scissor');
// console.log('hello world');
rock.addEventListener('click', rpsGame);
paper.addEventListener('click', rpsGame);
scissor.addEventListener('click', rpsGame);

function rpsGame() {
	let yourChoice = this;
	let humanChoice, botChoice;

	// console.log(yourChoice);
	humanChoice = yourChoice.id;
	botChoice = numberToChoice(randToRpsInt());
	// console.log(yourChoice);

	results = decideWinner(humanChoice, botChoice);
	console.log({ yourChoice });
	console.log({ botChoice });

	message = finalMessage(results);
	rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
	return Math.floor(Math.random() * 3);
}
function numberToChoice(number) {
	return ['rock', 'paper', 'scissor'][number];
}

function decideWinner(yourChoice, computerChoice) {
	let rpsDatabase = {
		rock: { scissor: 1, rock: 0.5, paper: 0 },
		paper: { rock: 1, paper: 0.5, scissor: 0 },
		scissor: { paper: 1, scissor: 0.5, rock: 0 },
	};

	let yourScore = rpsDatabase[yourChoice][computerChoice];
	let computerScore = rpsDatabase[computerChoice][yourChoice];
	console.log(rpsDatabase[yourChoice]);
	console.log(rpsDatabase[computerChoice]);

	// * console for check
	console.log({ yourScore });

	console.log({ computerScore });

	return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
	if (yourScore === 0) {
		return { message: 'You lost', color: 'red' };
	} else if (yourScore === 0.5) {
		return { message: 'You tied', color: 'yellow' };
	} else {
		return { message: 'You Won!', color: 'green' };
	}
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
	let imagesDatabase = {
		rock: document.getElementById('rock').src,
		paper: document.getElementById('paper').src,
		scissor: document.getElementById('scissor').src,
	};

	document.getElementById('rock').remove();
	document.getElementById('paper').remove();
	document.getElementById('scissor').remove();

	let humanDiv = document.createElement('div');
	let botDiv = document.createElement('div');
	let messageDiv = document.createElement('div');

	humanDiv.innerHTML = `<img src="${imagesDatabase[humanImageChoice]} " height="150px" width"150px">`;

	messageDiv.innerHTML = `<h1 style="color:${finalMessage['color']} ;" >${finalMessage['message']}</h1>`;

	botDiv.innerHTML = `<img  src="${imagesDatabase[botImageChoice]} " height="150px" width"150px" style="box-shadow:0px 10px 50px rgb(233, 9, 9);">`;

	document.getElementById('flex-box-rps-div').appendChild(humanDiv);
	document.getElementById('flex-box-rps-div').appendChild(messageDiv);
	document.getElementById('flex-box-rps-div').appendChild(botDiv);
}
