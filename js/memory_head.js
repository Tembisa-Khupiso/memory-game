/* Onload alert this message */
function myFunction() {
	alert("_____________Hello Player, Welcome to Tessa's Memory Game____________ ******************************INSTRUCTIONS****************************** Flip two cards if they are not the same they will both close after 7 seconds, then keep those two in memory and search the cards that match them up until you finish. And when all the cards are fliped, you have won!!________________________________GOODLUCK________________________________");
  }

/* This array is using javascript to dynamically create all the tiles */
var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
/* This is for storing the memory values */
var memory_values = [];
/* This stores the memory tile ids */
var memory_tile_ids = [];
/* This is just for keeping track of how many tiles flipped */
var tiles_flipped = 0;

/* This is a shuffle method that is using prototype property to add it directly to all array objects */
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
	/* The floor() method rounds a number DOWNWARDS to the nearest integer, and returns the result */
	/* Math.random() function. The Math.random() function is used to return a floating-point pseudo-random number between range [0,1] , 0 (inclusive) and 1 (exclusive) */
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
/* This function is for generating a new board */
function newBoard(){
	tiles_flipped = 0; /* This line means the flipped cards go back to 0 everytime the board is shuffled */
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}

function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					alert("Board cleared... generating new board");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = '#e20746';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = '#e20746';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}