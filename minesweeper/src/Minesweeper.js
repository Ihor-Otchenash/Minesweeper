import { useContext } from 'react';
import styled from 'styled-components';
import Menu from './components/Menu';
import Board from './components/Board';
import Header from './components/Header';
import Footer from './components/Footer';
import { Context } from './components/Context';

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ isGameOn }) => (isGameOn ? 'space-between' : 'center')};
  align-items: center;
  background-color: lightblue;
  font-size: 1rem;
  height: 100vh;
`;

export default function Minesweeper() {
  const { isGameOn } = useContext(Context);
  return (
    <StyledMainContainer isGameOn={isGameOn} className="Minesweeper">
      {isGameOn ? (
        <>
          <Header />
          <Board />
          <Footer />
        </>
      ) : (
        <Menu />
      )}
    </StyledMainContainer>
  );
}
