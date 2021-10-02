/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import styled, { css } from 'styled-components';
import propToStyle from '../../../theme/utils/propToStyle';
import breakpointsMedia from '../../../theme/utils/breakpointsMedia';
import Link from '../../commons/Link';
import { WebsitePageContext } from '../../wrappers/WebsitePage/context';

export const TextStyleVariantsMap = (name) => {
  if (name) {
    return css`
      ${({ theme, bold }) => css`
        font-size: ${theme.typographyVariants[name].fontSize};
        font-weight: ${bold
    ? 'bold'
    : theme.typographyVariants[name].fontWeight};
        line-height: ${theme.typographyVariants[name].lineHeight};
      `}
    `;
  }
};

const TextBase = styled.span`
  ${(props) => TextStyleVariantsMap[props.variant]}
  ${({ variant }) => {
    if (typeof variant === 'string') {
      return TextStyleVariantsMap(variant);
    }
    return breakpointsMedia({
      xs: css`
        ${TextStyleVariantsMap(variant.xs)}
      `,
      md: css`
        ${TextStyleVariantsMap(variant.md)}
      `,
    });
  }}
  color: ${(props) => get(props.theme, `colors.${props.color}.color`)};
  ${propToStyle('textAlign')}
  ${propToStyle('marginBottom')}
  ${propToStyle('margin')}
  ${propToStyle('maxWidth')}
  ${propToStyle('wordBreak')}
  ${propToStyle('display')}
  ${propToStyle('gap')}
  ${propToStyle('alignItems')}
`;

export default function Text({
  variant,
  children,
  tag,
  href,
  cmsKey,
  bold,
  ...props
}) {
  const websitePageContext = React.useContext(WebsitePageContext);

  const componentContent = cmsKey
    ? websitePageContext.getCMSContent(cmsKey)
    : children;

  if (href) {
    return (
      <TextBase as={Link} variant={variant} href={href} bold={bold} {...props}>
        {componentContent}
      </TextBase>
    );
  }

  return (
    <TextBase as={tag} variant={variant} bold={bold} {...props}>
      {componentContent}
    </TextBase>
  );
}

Text.propTypes = {
  tag: PropTypes.string,
  variant: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
  href: PropTypes.string,
  cmsKey: PropTypes.string,
  bold: PropTypes.bool,
};

Text.defaultProps = {
  tag: 'span',
  variant: 'paragraph1',
  children: null,
  href: '',
  cmsKey: undefined,
  bold: false,
};
