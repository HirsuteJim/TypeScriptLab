
export type Scoreboard = {
  X: number,
  O: number
}

export type Player = 'X' | 'O';

export type BoardText = 'X' | 'O' | '-';

export type BoardContent = [
  [BoardText, BoardText, BoardText],
  [BoardText, BoardText, BoardText],
  [BoardText, BoardText, BoardText]
];

export type BoxProps = {
  handleBoxClick: Function,
  content: BoardText
};

/*
    [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '~', '-'],
    ];
*/