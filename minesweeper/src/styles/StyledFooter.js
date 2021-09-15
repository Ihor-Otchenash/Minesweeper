import styled from 'styled-components';

const StyledFooter = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;

  button {
    display: block;
    margin: 0 1rem;
    font-size: 1rem;
    font-weight: 300;
    border-radius: 0.25rem;
    padding: 0.5rem 0.25rem;
    min-width: 10rem;
    cursor: pointer;
    border: 1px solid #ffffff;
    color: #ffffff;
    outline: none;
    background: none;
  }

  img {
    height: 2rem;
    width: 2rem;
    margin: 0 0.5rem;
  }
`;

export default StyledFooter;
