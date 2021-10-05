import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FooterWrapper, { ListStyled, ImgStyled } from './style';
import Link from '../../commons/Link';
import HomeIcon from '../SvgIcons/HomeIcon';
import PostIcon from '../SvgIcons/PostIcon';
import HeartIcon from '../SvgIcons/HeartIcon';
import SearchIcon from '../SvgIcons/SearchIcon';
import Button from '../../commons/Button';

export default function MobileFooter({ username, toggleModalPost }) {
  const { pathname } = useRouter();

  return (
    <FooterWrapper>
      <ListStyled>
        <li>
          <Link href="/app/feed">
            <HomeIcon isActive={pathname === '/app/feed'} />
          </Link>
        </li>
        <li>
          <Link href="/app/search">
            <SearchIcon isActive={pathname === '/app/search'} />
          </Link>
        </li>
        <li>
          <Button ghost onClick={toggleModalPost} padding="0">
            <PostIcon size="mobile" />
          </Button>
        </li>
        <li>
          <Link href="/app/feed">
            <HeartIcon />
          </Link>
        </li>
        <li>
          <Link href="/app/profile">
            <ImgStyled
              src={`${username}`}
              alt="Foto de Perfil"
              isActive={pathname === '/app/profile'}
            />
          </Link>
        </li>
      </ListStyled>
    </FooterWrapper>
  );
}

MobileFooter.propTypes = {
  username: PropTypes.string.isRequired,
  toggleModalPost: PropTypes.func.isRequired,
};
