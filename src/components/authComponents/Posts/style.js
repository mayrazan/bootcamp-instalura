import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';

export const PostImage = styled.img`
  width: 112px;
  height: 112px;

  ${breakpointsMedia({
    md: css`
      width: 248.89px;
      height: 248.89px;
    `,
  })}
`;

export const ContainerImage = styled.div`
  position: relative;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:hover span {
    cursor: pointer;
    opacity: 1;
    visibility: visible;
  }
`;

export const LikeStyled = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: black;
  visibility: hidden;
  opacity: 0;
  font-size: 40px;
  text-align: center;
  margin: auto;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #6d626287;
  height: 100%;
`;
