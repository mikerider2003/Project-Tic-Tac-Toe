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



function GameBoard() {
    const gameboard = ["", "", "", "", "", "", "", "", ""];
    let playerturn = player1;

    const renderboard = (boxes) => {
        gameboard.forEach((value, index) => {
            boxes[index].textContent = value;
        });
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
        // Not working yet !!!!!! do not forget to implement !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        const rows = [gameboard.slice(0,3), gameboard.slice(3,6), gameboard.slice(6,10)]
        rows.forEach(element => {
            // console.log(element)
            // console.log(element[0] === element[1] === element[2] && element[0] != "" && element[1] != "" && element[2] != "")
        })
    }

    return {renderboard, addplace}
};

const game = GameBoard();
const boxes = document.querySelectorAll(".box")



boxes.forEach(box => {
    box.addEventListener("click", () => {
        
        game.addplace(Number(box.id[box.id.length - 1]) - 1)
        game.renderboard(boxes)

    })  
});