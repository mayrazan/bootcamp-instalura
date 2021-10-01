import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import TextField from '../../forms/TextField';

const MenuWrapper = styled.header`
  font-family: 'Rubik', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 15px 0;
  background-color: #f2f2f2;
  border: 1px solid #d5d5d5;
  min-height: 48px;
  ${breakpointsMedia({
    md: css`
      width: 100%;
      padding: 0 16px;
      min-height: 96px;
      justify-content: space-around;
      background-color: white;
    `,
  })}
`;

MenuWrapper.LeftSide = styled.div`
  padding: 0;
  margin: 0;
  ${breakpointsMedia({
    md: css`
      width: 131px;
      height: 32px;
      order: initial;
      padding-right: 16px;
    `,
  })}
`;

MenuWrapper.RightSide = styled.div`
  display: none;
  ${breakpointsMedia({
    md: css`
      padding: 0;
      margin: 0;
      display: flex;
    `,
  })}
`;

export const TextFieldStyled = styled(TextField)`
  border-radius: 12px;
  min-width: 288px;
  align-self: center;
`;

export const ListStyled = styled.ul`
  display: flex;
  list-style-type: none;
  align-items: center;
  margin: 0;
  gap: 32px;
`;

export const ImgStyled = styled.img`
  border-radius: 50%;
  width: 32px;

  ${({ isActive }) => isActive
    && css`
      border: 3px solid #d7385e;
    `}
`;

export default MenuWrapper;
