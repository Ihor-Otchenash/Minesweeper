import { useContext } from 'react';
import Menu from './components/Menu';
import Board from './components/Board';
import { Context } from './components/Context';

export default function Minesweeper() {
  const { isGameOn } = useContext(Context);
  return <div className="Minesweeper">{isGameOn ? <Board /> : <Menu />}</div>;
}
