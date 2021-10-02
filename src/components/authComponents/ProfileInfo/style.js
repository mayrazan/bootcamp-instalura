import styled, { css } from 'styled-components';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';

export const ProfileImage = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;

  border: 10.0723px solid #f2f2f2;

  ${breakpointsMedia({
    md: css`
      width: 188px;
      height: 188px;
    `,
  })}
`;

export const Grid = styled.section`
  width: 100%;
  display: grid;
  grid-template-areas:
    'profileAreaLeft profileAreaCenter'
    'profileAreaAbout profileAreaAbout';
  grid-template-columns: 1fr 6fr;
  grid-template-rows: auto;
  align-items: center;
  column-gap: 29px;

  ${breakpointsMedia({
    md: css`
      grid-template-columns: 3fr 2fr 1fr;
      grid-template-rows: 1fr 0fr 1fr;
      column-gap: 50px;
      grid-template-areas:
        'profileAreaLeft profileAreaCenter profileAreaCenter'
        'profileAreaLeft profileAreaAbout profileAreaAbout'
        'profileAreaLeft profileAreaAbout profileAreaAbout';
    `,
  })}
`;

export const AreaLeft = styled.div`
  grid-area: profileAreaLeft;
  display: flex;

  ${breakpointsMedia({
    md: css`
      justify-self: end;
    `,
  })}
`;

export const AreaCenter = styled.div`
  grid-area: profileAreaCenter;
  display: flex;
`;

export const AreaAbout = styled.div`
  grid-area: profileAreaAbout;
  align-self: baseline;
`;
