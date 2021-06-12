# Welcome to CheckerBot!

## Deployed Application
https://checkerbot.netlify.app/

## Basic Features
- Simple game mechanics, including taking turns, basic moves, and jumping over the enemy checkers to capture them.
- Drag and drop functionality to move checkers to valid squares.
- Highlighting of valid moves on mouse over a checker.
- Move restriction so that if a piece can be captured, the only valid moves are captures.
- Simple AI, finding the first valid move by following the same rules as the human player.
- DOM/CSS board rendering (no images or canvas.
- Stability across Chrome, Safari, Internet Explorer 11, Edge, and Opera.

## Additional Features
- Complex game mechanics, such as ensuring that if another checker can be captured by a piece which has just previously captured a checker, that this piece (and this piece alone) can make an additional move. This is referred to as double-jumping or multi-jumping.
- Game analytics UI, allowing the user to reset the game, or see moves made, time elapsed, current turn, remaining pieces, and the winner.
- King checkers functionality, allowing pieces to move/capture both backwards and forwards if once they have reached opposite side of the board. These can be distinguished from ordinary checkers in the game as they have a white glow around them.

## The Rules of Checkers
- The game begins with pieces arranged as seen in the initial state of the board.
- Pieces can be moved diagonally by one space towards the opposite side of the board.
- A checker can "capture" another checker if it is arranged so that it can jump over the piece, continuing in the same diagonal movement pattern. This means that the square the checker will "jump" to must be within the bounds of the board and unoccupied.
- If you have the ability to capture an enemy piece, you must do.
- If a checker captures a piece and can immediately capture again (with the same checker), it must do so (see "Complex game mechanics" under Additional Features).
- Once a checker reaches the opposite end of the board, it becomes a King. Checkers which are Kings can move and capture both diagonally forwards and backwards.
