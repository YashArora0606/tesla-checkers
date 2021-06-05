import React, { useEffect, useState } from 'react';
import './Board.scss';



const Board = () => {

    const [board, setBoard] = useState<number[][]>([[]])

    // eslint-disable-next-line
    useEffect(() => {
        var arr = new Array(8).fill(0).map(()=>new Array(8).fill(0));
        setBoard(arr);
    });

    return (
        <div>
            <table>
                <tbody>
                    {
                        board.map((row, i) => {
                            return (
                                <tr>
                                {row.map((item, j) => {
                                    return <td>{(i + j) % 2 === 0 ? "B" : "W"}</td>;
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