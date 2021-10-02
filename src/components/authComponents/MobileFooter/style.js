import styled, { css } from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  min-height: 64px;
  background-color: #ffffff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.04);
  border-radius: 24px 24px 0px 0px;
  position: sticky;
  bottom: 0;
`;

export const ListStyled = styled.ul`
  display: flex;
  list-style-type: none;
  align-items: center;
  margin: 0;
  width: 100%;
  justify-content: space-around;
  padding: 0;
`;

export const ImgStyled = styled.img`
  border-radius: 50%;
  width: 32px;

  ${({ isActive }) => isActive
    && css`
      border: 3px solid #d7385e;
    `}
`;

export default FooterWrapper;
