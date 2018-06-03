var startButton = document.getElementsByClassName('button');
var radioInputs = document.forms.difficulty_level.elements;
var startMenu = document.getElementById('start-menu');
var difficultyLevel = document.getElementsByClassName('difficalt')[0];
var nextLevel = document.getElementsByClassName('next-level')[0];
var levelsInfo = document.getElementsByTagName('span');
var levelInfo = document.getElementsByClassName('level-info')[0];
var levelCounter = 0;
var snake;
var isPause = false;
var timerBeforePause;

function fieldShower(){
	makeObstruction(levels[levelCounter]);
	foodMaker();
	for(var i = 0; i < radioInputs.length; i++){
			if (radioInputs[i].checked){
				snake.moving.speed = radioInputs[i].value;
			}
		}
}


function startGame(){
	snake = new Snake;
	snake.startPosition();
	levelInfo.style.display = 'block';
	difficultyLevel.style.display = 'none';
	document.getElementsByTagName("h1")[0].style.display = 'none';
	setTimeout(function(){
		startMenu.style.display = 'none';
		levelInfo.style.display = 'none';
		fieldId.style.display = 'block';
		fieldShower();
	}, 700);
}

function completeCheck(){
	var winMassage = document.getElementsByClassName('win-massage')[0];

	

	if (snake.bodyCoords.length == snake.maxLength){
		
		document.onkeydown = function(){
			return false;
		}
		
		clearInterval(timer);
		clearField();
		startMenu.style.display = 'block';
		fieldId.style.display = 'none';

		
		if (levelCounter == levels.length - 1){
			winMassage.style.display = 'block';
			
		}else{
			levelCounter++;
			levelsInfo[1].innerHTML =  levelCounter;
			nextLevel.style.display = 'block';	
		}
	}
}

function loseMassageShower(){
	
	var loseMassage = document.getElementsByClassName('lose-massage')[0];
	
		clearInterval(timer);
		clearField();
		fieldId.style.display = 'none';
		startMenu.style.display = 'block';
		loseMassage.style.display = 'block';

		
}

function nextLevelGo(){
	
	levelsInfo[0].innerHTML++;
	
	nextLevel.style.display = 'none';
	levelInfo.style.display = 'block';	
	
	setTimeout(function(){
		startMenu.style.display = 'none';
		levelInfo.style.display = 'none';
		fieldId.style.display = 'block';
		fieldShower();
		snake.startPosition();
		document.onkeydown = movingControl;
	}, 700);
	
	
};

function clearField(){

	classRemover(foodCoords[0], foodCoords[1], 'food');
	
	for (var i = 0; i < snake.bodyCoords.length; i++){
		classRemover (snake.bodyCoords[i][0], snake.bodyCoords[i][1], 'snake-body');
		if ( i== snake.bodyCoords.length -1 ){
			classRemover (snake.bodyCoords[i][0], snake.bodyCoords[i][1], 'snake-head');
		}
	}
	snake.bodyCoords = [];
	
	for ( i = 0; i < levels[levelCounter].length; i++){
		classRemover (levels[levelCounter][i][0], levels[levelCounter][i][1], 'obstraction');
	}
	
}

function pauseMaker(){
	
	if(!isPause){
		pause.style.display = 'block';
		clearInterval(timer);
		isPause = true;
	}else{
		pause.style.display = 'none';
		timer = setInterval(function(){
			lastMovingFunction();
		 }, snake.moving.speed);
		isPause = false;	
	}
	
}


function movingControl(e){
	if (e.keyCode == 27 && startMenu.style.display === 'none' && snake.moving.firstMove) {
		pauseMaker();
	}
	if(!isPause){
		snakeMoving(e);
	}	
	
}

///////////////////////////////////////////////////////////////////////////////////EVENT HANDLER BLOCK///////////////////////////////////////////////////////////////////////////

document.onkeydown = movingControl; 

startButton[0].onclick = startGame;



startButton[1].onclick = nextLevelGo;


startButton[2].onclick = startButton[3].onclick = function(){
		document.location.reload(true);
}

startButton[4].onclick = pauseMaker;

