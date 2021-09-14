import { useContext } from 'react';
import Menu from './components/Menu';
import Board from './components/Board';
import Header from './components/Header';
import Footer from './components/Footer';
import { Context } from './components/Context';

export default function Minesweeper() {
  const { isInMenu } = useContext(Context);
  return (
    <div className="Minesweeper">
      {isInMenu ? (
        <Menu />
      ) : (
        <>
          <Header />
          <Board />
          <Footer />
        </>
      )}
    </div>
  );
}
