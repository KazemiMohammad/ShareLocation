import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1100;
  width: 420px;
  outline: 0;

  @media (max-width: 420px) {
    width: 90vw;
  }
`;
export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(256, 256, 256, 0.9);
  z-index: 1001;
`;
export const StyledModal = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: auto;
  border-radius: 8px;
  border: solid 1px rgb(68, 139, 201);
`;
export const Header = styled.div`
  border-radius: 7px 7px 0 0;
  background-color: rgb(68, 139, 201);
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;
export const HeaderText = styled.div`
  color: #fff;
  font-weight: 500;
  align-self: center;
`;
export const CloseButton = styled.button`
  color: #fff;
  font-size: 0.8rem;
  border: none;
  border-radius: 3px;
  margin-left: 0.5rem;
  background: none;
  :hover {
    cursor: pointer;
  }
`;
export const Content = styled.div`
  padding: 10px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
`;
