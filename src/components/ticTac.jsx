import './ticTack.css';
import { useState } from 'react';
import { Icon } from '@iconify-icon/react';

export default function TicTac() {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
    let [winner, setWinner] = useState(null);  // To keep track of the winner
    let [showModal, setShowModal] = useState(false);  // For modal visibility

    const toggle = (num) => {
        if (lock || data[num] !== "" || winner) {
            return;
        }

        let newData = [...data];
        if (count % 2 === 0) {
            newData[num] = 'x';
        } else {
            newData[num] = 'o';
        }

        setData(newData);
        setCount(count + 1);

        // Check for winner after each move
        checkWinner(newData);
    };

    const checkWinner = (newData) => {
        const winningCombinations = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal (top-left to bottom-right)
            [2, 4, 6]  // Diagonal (top-right to bottom-left)
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                setWinner(newData[a]);  // 'x' or 'o' is the winner
                setLock(true);  // Lock the board once we have a winner
                setShowModal(true);  // Show the modal
                return;
            }
        }

        // Check for a draw (when all boxes are filled and no winner)
        if (!newData.includes("") && !winner) {
            setLock(true);
            setShowModal(true);  // Show the modal for a draw
        }
    };

    const resetGame = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        setWinner(null);  // Reset winner
        setShowModal(false);  // Hide the modal
    };

    return (
        <>
            <div className="container">
                <h1 className="title">
                    X O GAME in <span>React</span>
                </h1>
                <div className="board">
                    <div className="row1">
                        <div className="boxes" onClick={() => toggle(0)}>
                            {data[0] === 'x' && <Icon icon="mynaui:letter-x-solid" width="100" height="100" style={{ color: 'black' }} />}
                            {data[0] === 'o' && <Icon icon="noto:letter-o" width="70" height="70" />}
                        </div>
                        <div className="boxes" onClick={() => toggle(1)}>
                            {data[1] === 'x' && <Icon icon="mynaui:letter-x-solid" width="100" height="100" style={{ color: 'black' }} />}
                            {data[1] === 'o' && <Icon icon="noto:letter-o" width="70" height="70" />}
                        </div>
                        <div className="boxes" onClick={() => toggle(2)}>
                            {data[2] === 'x' && <Icon icon="mynaui:letter-x-solid" width="100" height="100" style={{ color: 'black' }} />}
                            {data[2] === 'o' && <Icon icon="noto:letter-o" width="70" height="70" />}
                        </div>
                    </div>
                    <div className="row2">
                        <div className="boxes" onClick={() => toggle(3)}>
                            {data[3] === 'x' && <Icon icon="mynaui:letter-x-solid" width="100" height="100" style={{ color: 'black' }} />}
                            {data[3] === 'o' && <Icon icon="noto:letter-o" width="70" height="70" />}
                        </div>
                        <div className="boxes" onClick={() => toggle(4)}>
                            {data[4] === 'x' && <Icon icon="mynaui:letter-x-solid" width="100" height="100" style={{ color: 'black' }} />}
                            {data[4] === 'o' && <Icon icon="noto:letter-o" width="70" height="70" />}
                        </div>
                        <div className="boxes" onClick={() => toggle(5)}>
                            {data[5] === 'x' && <Icon icon="mynaui:letter-x-solid" width="100" height="100" style={{ color: 'black' }} />}
                            {data[5] === 'o' && <Icon icon="noto:letter-o" width="70" height="70" />}
                        </div>
                    </div>
                    <div className="row3">
                        <div className="boxes" onClick={() => toggle(6)}>
                            {data[6] === 'x' && <Icon icon="mynaui:letter-x-solid" width="100" height="100" style={{ color: 'black' }} />}
                            {data[6] === 'o' && <Icon icon="noto:letter-o" width="70" height="70" />}
                        </div>
                        <div className="boxes" onClick={() => toggle(7)}>
                            {data[7] === 'x' && <Icon icon="mynaui:letter-x-solid" width="100" height="100" style={{ color: 'black' }} />}
                            {data[7] === 'o' && <Icon icon="noto:letter-o" width="70" height="70" />}
                        </div>
                        <div className="boxes" onClick={() => toggle(8)}>
                            {data[8] === 'x' && <Icon icon="mynaui:letter-x-solid" width="100" height="100" style={{ color: 'black' }} />}
                            {data[8] === 'o' && <Icon icon="noto:letter-o" width="70" height="70" />}
                        </div>
                    </div>
                </div>
                <button className="reset" onClick={resetGame}>Reset</button>
            </div>

            {/* Modal to show winner or draw */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        {winner ? (
                            <>
                                <h2>Player {winner.toUpperCase()} Wins!</h2>
                                <div className="icon-wrapper">
                                    {winner === 'x' && (
                                        <Icon className="icon" icon="mynaui:letter-x-solid" width="100" height="100" style={{ color: 'black' }} />
                                    )}
                                    {winner === 'o' && (
                                        <Icon className="icon" icon="noto:letter-o" width="70" height="70" />
                                    )}
                                </div>
                            </>
                        ) : (
                            <h2>It's a Draw!</h2>
                        )}
                        <button onClick={resetGame}>Play Again</button>
                    </div>
                </div>
            )}
        </>
    );
}
