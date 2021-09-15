import styled from 'styled-components';

const StyledCell = styled.div`
  border-width: 1px;
  border-color: ${({ isMine, isFlag, isOpen }) =>
    (isMine && isOpen && '#EA3E6C') ||
    (isOpen && '#985C5C') ||
    (isFlag && '#35D3D0')};
  border-style: solid;
  border-radius: ${({ isMine, isOpen }) =>
    (isMine && isOpen && '50%') || '0.25rem'};
  margin: 0.375rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  font-weight: 300;

  &::after {
    content: '';
    display: ${({ isFlag }) => (isFlag ? 'block' : 'none')};
    width: 0.5rem;
    height: 0.5rem;
    border: 1px solid #35d3d0;
    border-radius: 50%;
  }
`;

export default StyledCell;
