"use client";

import React, { useState, useEffect, useCallback } from "react";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const EMPTY_CELL = 0;

// Tetris pieces (tetrominoes)
const PIECES: any = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#00f5ff",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#ffff00",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#800080",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "#00ff00",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "#ff0000",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#0000ff",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "#ffa500",
  },
};

const PIECE_TYPES = Object.keys(PIECES);

const createEmptyBoard = () =>
  Array(BOARD_HEIGHT)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL));

const getRandomPiece = () => {
  const type = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
  return {
    type,
    shape: PIECES[type].shape,
    color: PIECES[type].color,
    x:
      Math.floor(BOARD_WIDTH / 2) -
      Math.floor(PIECES[type].shape[0].length / 2),
    y: 0,
  };
};

const rotatePiece = (piece: any) => {
  const rotated = piece.shape[0].map((_: any, i: any) =>
    piece.shape.map((row: any) => row[i]).reverse()
  );
  return { ...piece, shape: rotated };
};

const isValidMove = (
  board: any,
  piece: any,
  newX: any,
  newY: any,
  newShape = piece.shape
) => {
  for (let y = 0; y < newShape.length; y++) {
    for (let x = 0; x < newShape[y].length; x++) {
      if (newShape[y][x]) {
        const boardX = newX + x;
        const boardY = newY + y;

        if (
          boardX < 0 ||
          boardX >= BOARD_WIDTH ||
          boardY >= BOARD_HEIGHT ||
          (boardY >= 0 && board[boardY][boardX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

const placePiece = (board: any, piece: any) => {
  const newBoard = board.map((row: any) => [...row]);
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x] && piece.y + y >= 0) {
        newBoard[piece.y + y][piece.x + x] = piece.color;
      }
    }
  }
  return newBoard;
};

const clearLines = (board: any) => {
  const newBoard = board.filter((row: any) =>
    row.some((cell: any) => cell === EMPTY_CELL)
  );
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  const emptyRows = Array(linesCleared)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL));
  return { board: [...emptyRows, ...newBoard], linesCleared };
};

const getScoreForLines = (lines: any, level: any) => {
  const baseScores = [0, 40, 100, 300, 1200];
  return baseScores[lines] * (level + 1);
};

export default function Tetris() {
  const [board, setBoard] = useState(createEmptyBoard);
  const [currentPiece, setCurrentPiece] = useState(getRandomPiece);
  const [nextPiece, setNextPiece] = useState(getRandomPiece);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const dropTime = Math.max(50, 1000 - level * 100);

  const moveDown = useCallback(() => {
    if (gameOver || isPaused || !gameStarted) return;

    setCurrentPiece((prev) => {
      if (isValidMove(board, prev, prev.x, prev.y + 1)) {
        return { ...prev, y: prev.y + 1 };
      } else {
        // Piece can't move down, place it
        const newBoard = placePiece(board, prev);
        const { board: clearedBoard, linesCleared } = clearLines(newBoard);

        setBoard(clearedBoard);
        setLines((prevLines) => {
          const newLines = prevLines + linesCleared;
          setLevel(Math.floor(newLines / 10));
          return newLines;
        });
        setScore(
          (prevScore) => prevScore + getScoreForLines(linesCleared, level)
        );

        const newPiece = nextPiece;
        setNextPiece(getRandomPiece());

        if (!isValidMove(clearedBoard, newPiece, newPiece.x, newPiece.y)) {
          setGameOver(true);
          return prev;
        }

        return newPiece;
      }
    });
  }, [board, gameOver, isPaused, gameStarted, nextPiece, level]);

  const moveLeft = () => {
    if (gameOver || isPaused || !gameStarted) return;
    setCurrentPiece((prev) => {
      if (isValidMove(board, prev, prev.x - 1, prev.y)) {
        return { ...prev, x: prev.x - 1 };
      }
      return prev;
    });
  };

  const moveRight = () => {
    if (gameOver || isPaused || !gameStarted) return;
    setCurrentPiece((prev) => {
      if (isValidMove(board, prev, prev.x + 1, prev.y)) {
        return { ...prev, x: prev.x + 1 };
      }
      return prev;
    });
  };

  const rotate = () => {
    if (gameOver || isPaused || !gameStarted) return;
    setCurrentPiece((prev) => {
      const rotated = rotatePiece(prev);
      if (isValidMove(board, prev, prev.x, prev.y, rotated.shape)) {
        return rotated;
      }
      return prev;
    });
  };

  const hardDrop = () => {
    if (gameOver || isPaused || !gameStarted) return;
    setCurrentPiece((prev) => {
      let newY = prev.y;
      while (isValidMove(board, prev, prev.x, newY + 1)) {
        newY++;
      }
      return { ...prev, y: newY };
    });
  };

  const startGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPiece(getRandomPiece());
    setNextPiece(getRandomPiece());
    setScore(0);
    setLines(0);
    setLevel(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
  };

  const togglePause = () => {
    if (gameStarted && !gameOver) {
      setIsPaused((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          moveLeft();
          break;
        case "ArrowRight":
          e.preventDefault();
          moveRight();
          break;
        case "ArrowDown":
          e.preventDefault();
          moveDown();
          break;
        case "ArrowUp":
          e.preventDefault();
          rotate();
          break;
        case " ":
          e.preventDefault();
          hardDrop();
          break;
        case "p":
        case "P":
          e.preventDefault();
          togglePause();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [moveDown]);

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const gameLoop = setInterval(moveDown, dropTime);
    return () => clearInterval(gameLoop);
  }, [moveDown, dropTime, gameStarted, gameOver, isPaused]);

  const renderBoard = () => {
    const displayBoard = board.map((row) => [...row]);

    // Add current piece to display board
    if (currentPiece && !gameOver) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x] && currentPiece.y + y >= 0) {
            displayBoard[currentPiece.y + y][currentPiece.x + x] =
              currentPiece.color;
          }
        }
      }
    }

    return displayBoard.map((row, y) => (
      <div key={y} className="flex">
        {row.map((cell, x) => (
          <div
            key={x}
            className="w-6 h-6 border border-gray-600 flex-shrink-0"
            style={{
              backgroundColor: cell || "#1a1a1a",
              borderColor: cell ? "rgba(255,255,255,0.3)" : "#333",
            }}
          />
        ))}
      </div>
    ));
  };

  const renderNextPiece = () => {
    if (!nextPiece) return null;

    return nextPiece.shape.map((row: any, y: any) => (
      <div key={y} className="flex">
        {row.map((cell: any, x: any) => (
          <div
            key={x}
            className="w-4 h-4 border border-gray-700"
            style={{
              backgroundColor: cell ? nextPiece.color : "transparent",
              borderColor: cell ? "rgba(255,255,255,0.2)" : "transparent",
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex gap-8">
        {/* Game Board */}
        <div className="flex flex-col items-center">
          <div className="bg-black border-2 border-gray-600 p-2">
            {renderBoard()}
          </div>

          {/* Controls */}
          <div className="mt-4 text-center">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={moveLeft}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded"
                disabled={!gameStarted || gameOver || isPaused}
              >
                ←
              </button>
              <button
                onClick={rotate}
                className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded"
                disabled={!gameStarted || gameOver || isPaused}
              >
                ↻
              </button>
              <button
                onClick={moveRight}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded"
                disabled={!gameStarted || gameOver || isPaused}
              >
                →
              </button>
              <button
                onClick={moveDown}
                className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded"
                disabled={!gameStarted || gameOver || isPaused}
              >
                ↓
              </button>
              <button
                onClick={hardDrop}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
                disabled={!gameStarted || gameOver || isPaused}
              >
                Drop
              </button>
              <button
                onClick={togglePause}
                className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded"
                disabled={!gameStarted || gameOver}
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
            </div>
            <div className="text-sm text-gray-400">
              Use arrow keys, spacebar for hard drop, P to pause
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="flex flex-col gap-6">
          {/* Game Status */}
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-bold mb-4">TETRIS</h2>
            {!gameStarted ? (
              <button
                onClick={startGame}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded font-bold"
              >
                START GAME
              </button>
            ) : gameOver ? (
              <div>
                <div className="text-red-500 font-bold mb-2">GAME OVER</div>
                <button
                  onClick={startGame}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  NEW GAME
                </button>
              </div>
            ) : isPaused ? (
              <div className="text-yellow-500 font-bold">PAUSED</div>
            ) : (
              <div className="text-green-500 font-bold">PLAYING</div>
            )}
          </div>

          {/* Score */}
          <div className="bg-gray-800 p-4 rounded">
            <div className="mb-2">
              Score: <span className="font-mono">{score.toLocaleString()}</span>
            </div>
            <div className="mb-2">
              Lines: <span className="font-mono">{lines}</span>
            </div>
            <div>
              Level: <span className="font-mono">{level}</span>
            </div>
          </div>

          {/* Next Piece */}
          <div className="bg-gray-800 p-4 rounded">
            <div className="mb-2 font-bold">Next:</div>
            <div className="flex justify-center">
              <div>{renderNextPiece()}</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-800 p-4 rounded text-sm">
            <div className="font-bold mb-2">Controls:</div>
            <div>← → Move</div>
            <div>↑ Rotate</div>
            <div>↓ Soft Drop</div>
            <div>Space: Hard Drop</div>
            <div>P: Pause</div>
          </div>
        </div>
      </div>
    </div>
  );
}
