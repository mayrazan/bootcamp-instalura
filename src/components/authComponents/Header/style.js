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
  background-color: ${({ theme }) => theme.colors.background.main.color};
  border: 1px solid ${({ theme }) => theme.colors.borders.secondary.color};
  min-height: 48px;
  position: sticky;
  z-index: 9999;
  top: 0;
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

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.borders.main.color};
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #ddd;
  }

  .dropdown:hover .dropdown-content,
  .dropdown:focus .dropdown-content {
    display: block;
  }
`;

export const ImgStyled = styled.img`
  border-radius: 50%;
  width: 32px;

  ${({ isActive }) => isActive
    && css`
      border: 3px solid  ${({ theme }) => theme.colors.primary.main.color};
    `}
`;

export default MenuWrapper;
