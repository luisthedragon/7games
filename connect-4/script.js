const matrix = (rows, cols) => new Array(rows).fill(0).map((o, i) => new Array(cols).fill(0))

p1Img = 'img/castorcito.jpg';
p2Img = 'img/shiffman.jpg';
p1_turn = true;
nrows = 9;
ncols = 7;
state = matrix(nrows, ncols);
lastAvailableRows = new Array(ncols).fill(nrows-1);
// console.log(lastAvailableRows)

function drop_token(col){
	if (lastAvailableRows[col] >= 0){
		let row = lastAvailableRows[col]
		if (p1_turn){
			state[row][col] = 1;
			document.querySelector(`tr:nth-child(${row + 1}) td:nth-child(${col+1})`).style.backgroundImage = `url(${p1Img})`;
		}
		else{
			state[row][col] = 2;
			document.querySelector(`tr:nth-child(${row + 1}) td:nth-child(${col+1})`).style.backgroundImage = `url(${p2Img})`;
		}
		if (check_winning_state([row, col])){
			if (p1_turn)
				displayGameOverMsg('PLAYER 1')
			else
				displayGameOverMsg('PLAYER 2')
		}
		p1_turn = !p1_turn;
		lastAvailableRows[col] -= 1;
	}
}

function displayGameOverMsg(winner){
	document.querySelector('#winner').innerHTML = winner;
	document.querySelector('#final-message').style.display = 'block';
}

// uses the state and the last move
function check_winning_state(last_move){
	let [row, col] = last_move
	
	pid = 1;
	if (!p1_turn){
		pid = 2;
	}
	
	// verifica la fila
	let i = 1;
	counter = 1;
	while(state[row][col-i] == pid && i<4){
		counter += 1;
		i+=1;
	}
	if(counter >= 4){
		console.log('win');
		return true;
	}
	i=1;
	while(state[row][col+i] == pid && i<4){
		counter += 1;
		i+=1;
	}
	if(counter >= 4){
		console.log('win');
		return true;
	}
	console.log(`row:${counter}`);
	//verifica la columna
	i=1;
	counter = 1;
	while(state[row+i] && state[row+i][col] == pid && i<4){
		counter += 1;
		i+=1;
	}
	if(counter >= 4){
		console.log('win');
		return true;
	}
	console.log(`column:${counter}`);
	// verifica la diagonal principal
	i=1;
	counter = 1;
	while(state[row-i] && state[row-i][col-i] == pid && i<4){
		counter += 1;
		i+=1;
	}
	if(counter >= 4){
		console.log('win');
		return true;
	}
	i=1;
	while(state[row+i] && state[row+i][col+i] == pid && i<4){
		counter += 1;
		i+=1;
	}
	if(counter >= 4){
		console.log('win');
		return true;
	}
	console.log(`princ:${counter}`);
	// verifica la otra diagonal
	i=1;
	counter = 1;
	while(state[row+i] && state[row+i][col-i] == pid && i<4){
		counter += 1;
		i+=1;
	}
	if(counter >= 4){
		console.log('win');
		return true;
	}
	i=1;
	while(state[row-i] && state[row-i][col+i] == pid && i<4){
		counter += 1;
		i+=1;
	}
	if(counter >= 4){
		console.log('win');
		return true;
	}
	console.log(`second:${counter}`);
}


document.querySelectorAll('tr').forEach(
	item => [...item.cells].forEach(
		(cell, col) => cell.addEventListener(
			'click',
			() => drop_token(col)
			)
		)
	);
// document.querySelectorAll('td:nth-child(1)').forEach(item => item.addEventListener('click', () => console.log('ga')));
