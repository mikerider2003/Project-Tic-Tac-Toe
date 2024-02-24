function Player(playerName, playerMark){
    const name = playerName;
    const mark = playerMark;
    let score = 0;

    const addScore = () => score++;
    const displayScore = () => score;

    return{name, mark, addScore, displayScore}
}

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");



const GameBoard = (function (){
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const playerscore1 = document.getElementById("score1")
    const playerscore2 = document.getElementById("score2")
    
    let playerturn = player1;

    const renderscore = (selector, player) => {
        selector.textContent = `${player.mark}: ${player.displayScore()}`
    }

    const renderboard = (boxes) => {
        gameboard.forEach((value, index) => {
            boxes[index].textContent = value;
        });

        renderscore(playerscore1, player1)
        renderscore(playerscore2, player2)
    }

    const checkplaceempty = (position) => {
        return gameboard[position] === "";
    }

    const addplace = (position) => {
        if(checkplaceempty(position))
        {
            gameboard[position] = playerturn.mark;
            checkforwinner(playerturn);
            changeplayerturn();
        } else {
            console.log("ALREADY OCOPIED PLACE!")
        }
    }

    const changeplayerturn = () => {
        playerturn === player1 ? playerturn = player2 : playerturn = player1; 
    }

    const checkforwinner = (player) => {
        // Check for rows, columns and diagonals for same symbols

        // Check for the rows
        const rows = [gameboard.slice(0,3), gameboard.slice(3,6), gameboard.slice(6,9)]
        if (rows.some(row => row.every(mark => mark === player.mark))){
            winnerfound()
        }


        // Check for colmuns
        const colmuns = [
            [gameboard[0],gameboard[3], gameboard[6]], 
            [gameboard[1],gameboard[4], gameboard[7]], 
            [gameboard[2],gameboard[5], gameboard[8]]]

        if (colmuns.some(colmun => colmun.every(mark => mark === player.mark))){
            winnerfound()
        }

        // Check for diagonals
        const diagonals = [
            [gameboard[0],gameboard[4], gameboard[8]], 
            [gameboard[2], gameboard[4], gameboard[6]]]

        if (diagonals.some(diagonal => diagonal.every(mark => mark === player.mark))){
            winnerfound()
        }
    }

    const winnerfound = () => {
        playerturn.addScore()
            
            // Disable clicking other boxes
            boxes.forEach(box => {
                box.classList.add("box-disable")
            })

            // Clear the board
            setTimeout(clearboard, 3000);
    }

    const clearboard = () => {
        gameboard = ["", "", "", "", "", "", "", "", ""];

        renderboard(boxes)

        // Re-anable clicking boxes
        boxes.forEach(box => {
            box.classList.remove("box-disable")
        })
    }
    
    return {renderboard, addplace}
})();



const boxes = document.querySelectorAll(".box")

// Initial render of the board
GameBoard.renderboard(boxes)

// Listening for clicks
boxes.forEach(box => {
    box.addEventListener("click", () => {

        GameBoard.addplace(Number(box.id[box.id.length - 1]) - 1)
        GameBoard.renderboard(boxes)

    })  
});