function Player(playerName, playerMark){
    const name = playerName;
    const mark = playerMark;
    const score = 0;

    const addScore = () => score++;
    const displayScore = () => score;

    return{name, mark, addScore, displayScore}
}

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");



const GameBoard = (function (){
    const gameboard = ["", "", "", "", "", "", "", "", ""];
    
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
            checkforwinner();
            changeplayerturn();
        } else {
            console.log("ALREADY OCOPIED PLACE!")
        }
    }

    const changeplayerturn = () => {
        playerturn === player1 ? playerturn = player2 : playerturn = player1; 
    }

    const checkforwinner = () => {
        // TO DO: Not working yet !!!!!! do not forget to implement !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // Check for rows, columns and diagonals for same symbols

        const rows = [gameboard.slice(0,3), gameboard.slice(3,6), gameboard.slice(6,10)]
        rows.forEach(element => {
            // console.log(element)
            // console.log(element[0] === element[1] === element[2] && element[0] != "" && element[1] != "" && element[2] != "")
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