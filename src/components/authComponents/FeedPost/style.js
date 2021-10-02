import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import Button from '../../commons/Button';

export const ProfileIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  gap: 12px;
  ${breakpointsMedia({
    md: css`
      padding: 25px 30px;
      gap: 19px;
    `,
  })}
`;

export const PostImage = styled.img`
  width: 100%;
  min-height: 320px;
  min-width: 375px;
  ${breakpointsMedia({
    md: css`
      max-height: 500px;
      min-width: auto;
    `,
  })}
`;

export const ContainerInfo = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  ${breakpointsMedia({
    md: css`
      padding: 25px 30px;
    `,
  })}
`;

export const ContainerIcons = styled.div`
  gap: 12px;
  display: flex;
  align-items: center;
  ${breakpointsMedia({
    md: css`
      gap: 8px;
    `,
  })}
`;

export const ButtonStyled = styled(Button)`
  padding: 0;
  font-weight: normal;
  border-radius: normal;
`;

export const LikeWrapper = styled.div`
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
