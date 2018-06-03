var fieldId = document.getElementById('field');
var fieldClass = document.getElementsByClassName('field')[0];
var table = [];
var radioInputs = document.forms.difficulty_level.elements;
var skillLevel;
var timer;
var startButton = document.getElementsByClassName('button')[0];
var startMenu = document.getElementById('start-menu');
var filledCells = [];
var mineAmount = document.getElementsByClassName('mine-amount')[0];
var endGameButtons = document.getElementsByClassName('end-game-buttons')[0];
var firstClick = false;
var timerDispalay = document.getElementsByClassName('timer')[0];


//////////////////////////////////////////////////////////////////// Init block //////////////////////////////////////////////////////////////////////////////////////////

function mineSweeperInit(){
	timerDispalay.innerHTML = '0000';
	firstClick = false;
	table = [];
	for (var i = 0; i < radioInputs.length; i++){
		if(radioInputs[i].checked) skillLevel = radioInputs[i].value.split(',');
	}	
	
	startMenu.style.display = 'none';
	fieldId.style.display = 'block';
	mineAmount.innerHTML = skillLevel[1];
	fieldClass.innerHTML = '';
	makeField(); //// Перенести во время нажатия на ячейку
	
document.onclick = function(e){
	var target = e.target;
	
	if (target.classList.contains('cell') && target.getAttribute('status') !== 'dangerous' && !(target.classList.contains('open'))){
		if (target.getAttribute('status') == 'suspect'){
			target.setAttribute('status','innocent');
			target.innerHTML = target.getAttribute('content');
		}
		if (!firstClick){
			firstClick = true;
			
			 while(target.classList.contains('mine')){
				cellCleaner();// нужно сначало очистить поле, а потом заново заполнять
				cellFiller();
			} 
				if (target.innerHTML === ''){
					openingEmptyCells(target);
				}
				target.classList.add('open');
				target.style.color = target.getAttribute('textColor');	
				
				timer = setInterval(function(){
					startTimer();
					if (document.querySelector('.timer').innerHTML == '9999') clearInterval(timer);
				}, 1000);
				
		}else{
			if (target.classList.contains('mine')){
				loseGameMaker(target);
			}else if(target.innerHTML === ''){
				openingEmptyCells(target);
			}else{
				target.classList.add('open');
				target.style.color = target.getAttribute('textColor');
			}
		}
		
		winOverChecker();
		return false;
	}
	
};

document.oncontextmenu = function(e){
	var target = e.target;
	 		
	if (!(target.classList.contains('open')) && target.classList.contains('cell')){	
		switch (target.getAttribute('status')){
			case 'innocent':
				target.classList.add('flag');
				target.setAttribute('status', 'dangerous');
				mineAmount.innerHTML --;
				break;
				
			case 'dangerous':
				target.classList.remove('flag');
				target.classList.add('question');	
				target.innerHTML = '?';
				target.style.color = '#000';
				target.setAttribute('status', 'suspect');
				mineAmount.innerHTML ++;
				break;
				
			case 'suspect':
				target.classList.remove('question');
				target.innerHTML = target.getAttribute('content');
				target.setAttribute('status', 'innocent');
		}
	return false;
	}
}

	
}


function startTimer(){
	var timerNumbers = timerDispalay.innerHTML.split('');
	
	timerNumbers[3]++;
	
	if(timerNumbers[3] > 9){
		timerNumbers[3] = 0;
		timerNumbers[2]++;
	}
	
	if(timerNumbers[2] > 9){
		timerNumbers[2] = 0;
		timerNumbers[1]++;
	}
	
	if(timerNumbers[1] > 9){
		timerNumbers[1] = 0;
		timerNumbers[0]++;
	}


	timerDispalay.innerHTML = timerNumbers.join('');	
}


///////////////////////////////////////////////////////////////////////////////// Field creator ////////////////////////////////////////////////////////////////////////////////////////
function makeField(){
	var k = 0;
	
	fieldClass.style.width = fieldClass.style.height = Math.sqrt(skillLevel[0])*(30 + 1) + 'px';
	
	for(var i = 0; i < skillLevel[0]; i++){
		
		var cell = document.createElement('div');
		cell.className = 'cell';
		fieldClass.appendChild(cell); 

	};


	for(i = 0; i < Math.sqrt(skillLevel[0]); i++){
		
		var columns = [];
		
		for (var j = 0 + k; j < (Math.sqrt(skillLevel[0]) + k); j++){
			cell = document.getElementsByClassName('cell')[j];
			cell.setAttribute('position', [i,j - k]);
			cell.setAttribute('status', 'innocent');
			columns.push(cell);
		}
		
		table.push(columns);
		k+=Math.sqrt(skillLevel[0]);
	}
	
	cellFiller();
	
}

function cellFiller(){
	
	for (var i = 0; i < skillLevel[1]; i++){ mineMaker();}
	
	for (i = 0; i < table.length; i++){
		for (var j = 0; j < table.length; j++){
			if (table[i][j].classList.contains('mine')){
				continue;
			}else{
				mineAmountCreator(i,j);
			}
		}
	}
	
}

function cellCleaner(){
	for (var i = 0; i < filledCells.length; i++){
		if (filledCells[i].classList.contains('mine')){
			filledCells[i].classList.remove('mine');
			filledCells[i].background = '';
		}else{
			filledCells[i].innerHTML = '';
		}
	}
}


///////////////////////////////////////////////////////////////////////////////////// Fill cells block/////////////////////////////////////////////////////////////////////////////////////////// 



function mineMaker(){
	var mineCoords = [];
	mineCoords[0] = Math.round((Math.random() * (table.length-1)));
	mineCoords[1] = Math.round((Math.random() * (table.length-1)));
	var randomCell = table[mineCoords[0]][mineCoords[1]];
	
	while (randomCell.classList.contains('mine')){
		mineCoords[1] = Math.round((Math.random() * (table.length-1)));
		mineCoords[0]  = Math.round((Math.random() * (table.length-1)));
		randomCell = table[mineCoords[0]][mineCoords[1]];
	}
	filledCells.push(randomCell);	
	randomCell.classList.add('mine');
}


function mineAmountCreator(y,x){
	var counter = 0;
	
	for (var i = (y - 1); i <= (y + 1); i++){    
		if (i == -1 || i == table.length){
			continue;
		}else{
			for (var j = (x - 1); j <= (x + 1); j++){
				if(j == -1 || j == table.length) {
					continue;
				}else if (table[i][j].classList.contains('mine')){
					counter++;
				}
			}
		}	
	}
	
	if (counter){
		table[y][x].innerHTML = counter;
		
		switch (counter){
			case 1:
				table[y][x].setAttribute('textColor', '#3f76bf');
				break;
				
			case 2:
				table[y][x].setAttribute('textColor', '#73a341');
				break;
			
			case 3:
				table[y][x].setAttribute('textColor', '#c64d3f');
				break;

			case 4:
				table[y][x].setAttribute('textColor', '#2d2dbc');
				break;
				
			case 5:
				table[y][x].setAttribute('textColor', '#592d72');
				break;
				
			case 6:
				table[y][x].setAttribute('textColor', '#34767c');
				break;
				
			case 7:
				table[y][x].setAttribute('textColor', '#3a5915');
				break;

			case 8:
				table[y][x].setAttribute('textColor', '#4f1a1a');
				break;
		}
		filledCells.push(table[y][x]);
	}
	
	table[y][x].setAttribute('content', table[y][x].innerHTML);
	
} 


///////////////////////////////////////////////////////////////////// Opening empty cells block ///////////////////////////////////////////////////////////////////////

function openingEmptyCells(target){ 
	var targetPosition = target.getAttribute('position').split(',');
	var startPosition = [+targetPosition[0], +targetPosition[1]]
	var cellCoords = startPosition.slice();
	
	var emptyCells = [];
	emptyCells.push(cellCoords);		
	var oldEmptyCellsLength = 0;

	
	function emptyCellsHandler(){
		if(oldEmptyCellsLength != emptyCells.length){			
			for(var i = 0; i < emptyCells.length; i++){
				if (emptyCells[i].length == 2){
					openingCellsAround(emptyCells[i][0],emptyCells[i][1]);
					emptyCells[i][2] = 'was';
				}
			}
			emptyCellsHandler();
		}else{
			return;
		}
	};
	
	function openingCellsAround(y,x){
		for (var i = (y - 1); i <= (y + 1); i++){       
			if (i == -1 || i == table.length){
				continue;
			}else{
				for (var j = (x - 1); j <= (x + 1); j++){
					if(j == -1 || j == table.length) {
						continue;
					}else if (!(table[i][j].innerHTML === '')){
						if (!table[i][j].classList.contains('open')){
							if(table[i][j].getAttribute('status') == 'suspect'){
								table[i][j].setAttribute('status', 'innocent');
								table[i][j].innerHTML = table[i][j].getAttribute('content');								
							}
							if(table[i][j].getAttribute('status') != 'dangerous'){
								table[i][j].classList.add('open');
								table[i][j].style.color = table[i][j].getAttribute('textColor');
							}
						}							
						continue;	
					}else{
						if (!table[i][j].classList.contains('open')){
							
							if(table[i][j].getAttribute('status') == 'suspect'){
								table[i][j].setAttribute('status', 'innocent');
								table[i][j].innerHTML = table[i][j].getAttribute('content');								
							}
							if(table[i][j].getAttribute('status') != 'dangerous'){
								table[i][j].classList.add('open');
								emptyCells.push([i,j]);
							}						
						}
					}
				}
			}	
		}
		oldEmptyCellsLength = emptyCells.length;
	}	
		
	emptyCellsHandler();
}



////////////////////////////////////////////////////////////////////////////// Over conditions block/////////////////////////////////////////////////////
function winOverChecker(){ // отдельно для правого и левого клика
	var closeCellsMine = [];
	var flags = [];
	var openCellsCounter = 0;
	var closeCellsCounter = 0;
	
	for(var i = 0; i < table.length; i++){
		for(var j = 0;  j < table.length; j++){
			if(table[i][j].getAttribute('status') == 'dangerous'){
				flags.push(table[i][j]);
			}	
		}
	}
	
	 for (i = 0; i < flags.length; i++){
		if (!flags[i].classList.contains('mine')) return;
	} 
	
	
		
	for(i = 0; i < table.length; i++){
		for(j = 0;  j < table.length; j++){
			if (table[i][j].classList.contains('mine') && table[i][j].getAttribute('status') != 'dangerous') closeCellsMine.push(table[i][j]);
			if (table[i][j].classList.contains('open')) openCellsCounter++;
			if (!table[i][j].classList.contains('open') && !table[i][j].classList.contains('mine')) closeCellsCounter++;
		}
	}
	
	if(closeCellsMine.length == skillLevel[0] - flags.length - openCellsCounter){

		for(i = 0; i < closeCellsMine.length; i++){
			closeCellsMine[i].setAttribute('status', 'dangerous');
			closeCellsMine[i].classList.add('flag');
			closeCellsMine[i].innerHTML = '';
			flags.length++;
		}
		
		mineAmount.innerHTML  = +mineAmount.innerHTML - closeCellsMine.length;
	}

	
	if (mineAmount.innerHTML == 0 && flags.length == skillLevel[1] && closeCellsCounter == 0){
		clearInterval(timer);		
		endGameButtons.style.visibility = "visible";
		endGameButtons.children[0].style.backgroundColor = '#48b417';
		endGameButtons.children[1].style.backgroundColor = '#48b417';
		eventChanger();
	}
}

function loseGameMaker(target){
	clearInterval(timer);
	
	target.style.backgroundImage = 'url(img/Mine.png)';
	target.style.backgroundColor = 'red';	
	
	for(var i = 0; i < table.length; i++){
		
		for( var j = 0;  j < table.length; j++){
			
			if (table[i][j] == target) continue;
			
			if (table[i][j].classList.contains('mine')){
				table[i][j].style.backgroundImage = 'url(img/Mine.png)';
				table[i][j].style.backgroundColor = '#fff';
			}
			
		}
		
	}
	
	endGameButtons.style.visibility = "visible";
	endGameButtons.children[0].style.backgroundColor = '#e23817';
	endGameButtons.children[1].style.backgroundColor = '#e23817';
	eventChanger();
}


/////////////////////////////////////////////////////////////// Event handler block/////////////////////////////////////////////////////


function eventChanger(){
	
	document.onclick = function(e){
		if(e.target.classList.contains('restart-button')){
			table = [];
			mineSweeperInit();
			endGameButtons.style.visibility = "hidden";
			
		}
		
		if(e.target.classList.contains('change-difficult')){
			startMenu.style.display = 'block';
			fieldId.style.display = 'none';
			endGameButtons.style.visibility = "hidden";			
		}
	}
	
	document.oncontextmenu = function(e){
		if(e.target.classList.contains('restart-button') || e.target.classList.contains('cell') || e.target.classList.contains('change-difficult')){
			return false;
		}
	}
}
	
startButton.onclick = mineSweeperInit;

document.onmousedown = document.onselectstart = function(){
	return false;
}














 

