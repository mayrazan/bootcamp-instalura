import styled, { css } from 'styled-components';
import get from 'lodash/get';
import { TextStyleVariantsMap } from '../../foundation/Text';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import propToStyle from '../../../theme/utils/propToStyle';

const ButtonGhost = css`
  color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
  background: transparent;
`;

const ButtonDefault = css`
  color: white;
  background-color: ${(props) => get(props.theme, `colors.${props.variant}.color`)};
  color: ${(props) => get(props.theme, `colors.${props.variant}.contrastText`)};
`;

const Button = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 26px;
  font-weight: bold;
  opacity: 1;
  border-radius: 8px;
  ${TextStyleVariantsMap.smallestException}
  ${(props) => {
    if (props.ghost) {
      return ButtonGhost;
    }
    return ButtonDefault;
  }}
  transition: opacity ${({ theme }) => theme.transition};
  border-radius: ${(props) => props.theme.borderRadius};
  &:hover,
  &:focus {
    opacity: 0.5;
  }

  ${breakpointsMedia({
    xs: css`
      ${TextStyleVariantsMap.smallestException}
    `,
    md: css`
      ${TextStyleVariantsMap.paragraph1}
    `,
  })}

  ${propToStyle('margin')}
  ${propToStyle('display')}
`;

export default Button;
