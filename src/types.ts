
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
  key1: String;
  handleBoxClick: Function;
  content: BoardText;
};

export type RowProps = {
  row: number;
  handleBoxClick: Function;
  content: [BoardText, BoardText, BoardText];
};

export type ServerError = {
  log: String;
  status: number;
  message: {err: String};
};