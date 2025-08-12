exports.checkWinner = ({ board }) => {
    try {

        // Logic to check for a winner

        // row check
        for (let row = 0; row < 3; row++) {
            let flag = 0;
            for (let col = 0; col < 2; col++) {
                if (board[row][col] !== '' && board[row][col] == board[row][col + 1]) {
                    flag++;
                }
            }

            if (flag == 2) {
                // window.alert(`${activeUser.name} is the winner`);
                // resetGame()
                // break;
                return { statusCode: 200, foundWinner: true }

            }
        }

        // column check
        for (let col = 0; col < 3; col++) {
            let flag = 0;
            for (let row = 0; row < 2; row++) {
                if (board[row][col] !== '' && board[row][col] == board[row + 1][col]) {
                    flag++;
                }
            }

            if (flag == 2) {
                return { statusCode: 200, foundWinner: true }


            }
        }

        // Check diagonals
        if (
            board[0][0] !== '' &&
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2]
        ) {
            return { statusCode: 200, foundWinner: true }

        }
// Check right-to-left diagonal
        if (
    board[0][2] !== '' &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
) {
    return { statusCode: 200, foundWinner: true }
}
        return { statusCode: 200, foundWinner: false }

    } catch (error) {
        return { statusCode: 409 }
    }

}

exports.checkIsDraw = ({board})=>{

    // Returns true if every cell is NOT empty
    const isFull = board.every(row => row.every(cell => cell !== ''));
    return isFull;

}