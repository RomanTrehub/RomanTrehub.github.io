var fieldId = document.getElementById('field');
var lifes = document.getElementsByClassName('life');
var fieldClass = document.getElementsByClassName('field')[0];
var table = [];
var foodCoords = [];
var timer;
var lastCell;
var lastMovingFunction;
//////////////////////////////////////////////////////////////////// Snake constructor ////////////////////////////////////////////////////////////////////////////////////
function Snake(){
	this.bodyCoords = [];
	this.lifes = 3;
	this.maxLength = 10;
	this.moving= {
		canDirection: [true,true],
		speed: 0,
		firstMove: false
	};

	this.startPosition = function(){
		
		for (var i = 0; i < 5; i++){
			if(i == 4) table[0][i].classList.add('snake-head');
			table[0][i].classList.add('snake-body');
			this.bodyCoords.push([0,i,39]); 
		};
		
		this.moving.canDirection = [true,true];
		this.moving.firstMove = false;
		lastCell = this.bodyCoords.length-1;
	}
};
///////////////////////////////////////////////////////////////// Field creator ////////////////////////////////////////////////////////////////////////////////////////
function makeField(){
	var k = 0;
	
	for(var i = 0; i< 625; i++){
		
		var cell = document.createElement('div');
		cell.className = 'cell';
		fieldClass.appendChild(cell);	
	};


	for(var i = 0; i< 25; i++){
		
		var columns = [];
		
		for (var j = 0 + k; j < (25 + k); j++){
			columns.push(document.getElementsByClassName('cell')[j]);
		}
		
		table.push(columns);
		k+=25;
	}
	
}


/////////////////////////////////////////////////////////////// SnakeMoving function block/////////////////////////////////////////////////////
function snakeMoving(e){
	var newLastCell;
	
	if (!((e.keyCode == 37 || e.keyCode == 39) && snake.moving.canDirection[0] || (e.keyCode == 38 || e.keyCode == 40) && snake.moving.canDirection[1])){
		return;
	}else{
	clearInterval(timer);
		switch (e.keyCode){
			case 37:
				if (!snake.moving.firstMove){
					return false;
				}else{
			
					snake.moving.canDirection[0] = false;
					snake.moving.canDirection[1] = true;
					lastMovingFunction = leftMoving;
					
					
					timer = setInterval(function(){
						leftMoving();
					}, snake.moving.speed);
					 
					leftMoving();
				};
				
				break;					
				
			case 38:
				snake.moving.canDirection[1] = false;
				snake.moving.canDirection[0] = true;
				snake.moving.firstMove = true;
				lastMovingFunction = upMoving;
				
				timer = setInterval(function(){
					upMoving();
				}, snake.moving.speed);
				
				upMoving();
				
				break;	
			
			case 39: 
				snake.moving.canDirection[1] = true;
				snake.moving.canDirection[0] = false;
				snake.moving.firstMove = true;
				lastMovingFunction = rightMoving;
				
				timer = setInterval(function(){	
					rightMoving();
				}, snake.moving.speed);

				rightMoving();				 
				 
				break;	
				
			case 40: 
				snake.moving.canDirection[1] = false;
				snake.moving.canDirection[0] = true;
				snake.moving.firstMove = true;
				lastMovingFunction = downMoving;
					
				timer = setInterval(function(){
					downMoving();
				}, snake.moving.speed);	
				 
				downMoving();				 
			 
				break;		
		}
	}	
};



function leftMoving(){	
	lastCell = snake.bodyCoords.length-1;
	
	if( (snake.bodyCoords[lastCell][1] - 1) >= 0){	
	
			classRemover(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');	
			newLastCell = snake.bodyCoords[lastCell].slice();
			newLastCell[1] = snake.bodyCoords[lastCell][1]-1;
			newLastCell[2] = 37;
			snake.bodyCoords.push(newLastCell);	
			snake.bodyCoords.shift();					
			classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-body');	
			classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-head');
			classRemover(snake.bodyCoords[lastCell-1][0], snake.bodyCoords[lastCell-1][1], 'snake-head');
			
		}else{
			
			classRemover(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');
			newLastCell = snake.bodyCoords[lastCell].slice();
			newLastCell[1] = table.length - 1;
			newLastCell[2] = 37;				
			snake.bodyCoords.push(newLastCell);	
			snake.bodyCoords.shift();					
			classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-body');
			classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-head');
			classRemover(snake.bodyCoords[lastCell-1][0], snake.bodyCoords[lastCell-1][1], 'snake-head');
	}
		
	bumpChecker();	
	eatingFood();			
};
				
				

function upMoving(){				
	lastCell = snake.bodyCoords.length-1;
	
	if( (snake.bodyCoords[lastCell][0] - 1) >= 0){	
	
		classRemover(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');
		newLastCell = snake.bodyCoords[lastCell].slice();
		newLastCell[0] = snake.bodyCoords[lastCell][0] - 1;
		newLastCell[2] = 38;				
		snake.bodyCoords.push(newLastCell);	
		snake.bodyCoords.shift();					
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-body');	
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-head');
		classRemover(snake.bodyCoords[lastCell-1][0], snake.bodyCoords[lastCell-1][1], 'snake-head');	
		
	}else{
		
		classRemover(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');
		newLastCell = snake.bodyCoords[lastCell].slice();
		newLastCell[0] = table.length - 1;
		newLastCell[2] = 38;				
		snake.bodyCoords.push(newLastCell);	
		snake.bodyCoords.shift();					
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-body');	
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-head');
		classRemover(snake.bodyCoords[lastCell-1][0], snake.bodyCoords[lastCell-1][1], 'snake-head');						
	}
	
	bumpChecker();
	eatingFood();			
};


function rightMoving(){
	lastCell = snake.bodyCoords.length-1;
	
	if( (snake.bodyCoords[lastCell][1] +1) < table.length){	
	
		classRemover(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');
		newLastCell = snake.bodyCoords[lastCell].slice();
		newLastCell[1] = snake.bodyCoords[lastCell][1] + 1;
		newLastCell[2] = 39;				
		snake.bodyCoords.push(newLastCell);
		snake.bodyCoords.shift();				
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-body');	
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-head');
		classRemover(snake.bodyCoords[lastCell-1][0], snake.bodyCoords[lastCell-1][1], 'snake-head');
		
	}else{
		
		classRemover(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');
		newLastCell = snake.bodyCoords[lastCell].slice();
		newLastCell[1] = 0;
		newLastCell[2] = 39;				
		snake.bodyCoords.push(newLastCell);
		snake.bodyCoords.shift();				
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-body');	
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-head');
		classRemover(snake.bodyCoords[lastCell-1][0], snake.bodyCoords[lastCell-1][1], 'snake-head');						
	}
	
	bumpChecker();
	eatingFood();	
};




function downMoving(){
	lastCell = snake.bodyCoords.length-1;
	
	if( (snake.bodyCoords[lastCell][0]+1) < table.length){
		
		classRemover(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');
		newLastCell = snake.bodyCoords[lastCell].slice();
		newLastCell[0] = snake.bodyCoords[lastCell][0] + 1;
		newLastCell[2] = 40;				
		snake.bodyCoords.push(newLastCell);	
		snake.bodyCoords.shift();					
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-body');	
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-head');
		classRemover(snake.bodyCoords[lastCell-1][0], snake.bodyCoords[lastCell-1][1], 'snake-head');	
		
	}else{
		
		classRemover(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');
		newLastCell = snake.bodyCoords[lastCell].slice();
		newLastCell[0] = 0;
		newLastCell[2] = 40;				
		snake.bodyCoords.push(newLastCell);	
		snake.bodyCoords.shift();
		
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-body');	
		classAppender(snake.bodyCoords[lastCell][0], snake.bodyCoords[lastCell][1], 'snake-head');
		classRemover(snake.bodyCoords[lastCell-1][0], snake.bodyCoords[lastCell-1][1], 'snake-head');	
	}
	
	bumpChecker();
	eatingFood();		
};
//////////////////////////////////////////////////////////////////// Brushing cells /////////////////////////////////////////////////////////////////////////////////////////// 




function classAppender(y, x, className){
	table[y][x].classList.add(className);

}


function classRemover (y, x, className){
	table[y][x].classList.remove(className);

}

///////////////////////////////////////////////////////////////////////////////////EatingFood function block///////////////////////////////////////////////////////////////////////////////

function foodMaker(){
	foodCoords[1] = Math.round((Math.random() * (table.length-1)));
	foodCoords[0] = Math.round((Math.random() * (table.length-1)));
	classAppender(foodCoords[0], foodCoords[1], 'food');
	var food = document.getElementsByClassName('food')[0];
	
		while (food.classList.contains('obstraction') || food.classList.contains('snake-body') || food.classList.contains('snake-head')){
			classRemover(foodCoords[0], foodCoords[1], 'food');
			foodCoords[1] = Math.round((Math.random() * (table.length-1)));
			foodCoords[0]  = Math.round((Math.random() * (table.length-1)));
			classAppender(foodCoords[0], foodCoords[1], 'food');
			food = document.getElementsByClassName('food')[0];
		}
}


 function eatingFood(){
	var head = document.getElementsByClassName('snake-head')[0];
	var newTail = snake.bodyCoords[0].slice();
	
	if (head.classList.contains('food')){
		
		switch (newTail[2]){
			
			case 37:
				newTail[1] ++;
				snake.bodyCoords.unshift(newTail);
				
				if (snake.bodyCoords[0][1] > table.length-1){
					snake.bodyCoords[0][1] = 0;
				}
				
				classAppender(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');
				break;	
				
			case 38:
				newTail[0] ++;
				snake.bodyCoords.unshift(newTail);
				
				if (snake.bodyCoords[0][0] > table.length-1){
					snake.bodyCoords[0][0] = 0;
				}	
				
				classAppender(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');
				break;	
				
			case 39:
				newTail[1] --;
				snake.bodyCoords.unshift(newTail);
				
				if (snake.bodyCoords[0][1] < 0){
					snake.bodyCoords[0][1] = table.length-1;
				}	
				
				classAppender(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');
			break;	
				
			case 40:
				newTail[0] --;
				snake.bodyCoords.unshift(newTail);
				
				if (snake.bodyCoords[0][0] < 0){
					snake.bodyCoords[0][0] = table.length-1;
				}					
				
				classAppender(snake.bodyCoords[0][0], snake.bodyCoords[0][1], 'snake-body');
				break;	
		}
		classRemover(foodCoords[0], foodCoords[1], 'food');
		foodMaker();
		completeCheck();
		
	}
} 

/////////////////////////////////////////////////////////////////////// Bumps with itself and obstractions /////////////////////////////////////////////////////////////////////

function bumpChecker() {
	var snakeCoords = snake.bodyCoords;
	var head = table[snake.bodyCoords.length - 1[0]];
	
	for (var i = 0; i < snakeCoords.length - 1; i++){

		if (snakeCoords[i][0] == snakeCoords[snakeCoords.length - 1][0] && snakeCoords[i][1] == snakeCoords[snakeCoords.length - 1][1]){
			
			snake.lifes --;
			lifes[snake.lifes].style.backgroundColor = '#fff';
			clearInterval(timer);
			
					
			if (snake.lifes == 0){
				loseMassageShower();	
			}else{
				clearField();
				fieldShower();
				snake.startPosition();
			}
		}
	}
	
	if (table[snakeCoords[lastCell][0]][[snakeCoords[lastCell][1]]].classList.contains('obstraction')){
		
		snake.lifes --;
		lifes[snake.lifes].style.backgroundColor = '#fff';
		clearInterval(timer);
		
		if (snake.lifes == 0){
			loseMassageShower();	
		}else{
			clearField();
			fieldShower();
			snake.startPosition();
		}
	}
	
}

/////////////////////////////////////////////////////////// Levels creator ////////////////////////////////////////////////////////////////
function makeObstruction(obstrCoords){
	for (var i = 0; i < obstrCoords.length; i++){
		classAppender(obstrCoords[i][0], obstrCoords[i][1], 'obstraction');
	}
}

makeField();










 

