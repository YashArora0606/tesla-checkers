import React, { useEffect, useState } from 'react';
import './Board.scss';

enum BoardValue {
    Empty,
    Red,
    Blue
}

const Board = () => {

    const BOARD_SIZE = 8;

    const [board, setBoard] = useState<number[][]>([[]])

    // eslint-disable-next-line
    useEffect(() => {
        var arr = new Array(BOARD_SIZE).fill(BoardValue.Empty).map(()=> {
            return new Array(BOARD_SIZE).fill(BoardValue.Empty)
        });

        arr[4][4] = BoardValue.Red;
        setBoard(arr);
    });

    return (
        <div>
            <table className="game-board">
                <tbody>
                    {
                        board.map((row, i) => {
                            return (
                                <tr>
                                {row.map((item, j) => {
                                    return (
                                        <td className={
                                            (i + j) % 2 === 0 ? 
                                            "dark-square" : 
                                            "light-square"}
                                            >
                                        {item !== BoardValue.Empty && 
                                        
                                        (item === BoardValue.Red ? 
                                            "RED" : 
                                            "BLUE"
                                        )
                                        }
                                        </td>
                                    )
                                        
                                })}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

};

export default Board;