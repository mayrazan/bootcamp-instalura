import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FooterWrapper, { ListStyled, ImgStyled } from './style';
import Link from '../../commons/Link';
import HomeIcon from '../SvgIcons/HomeIcon';
import PostIcon from '../SvgIcons/PostIcon';
import HeartIcon from '../SvgIcons/HeartIcon';
import SearchIcon from '../SvgIcons/SearchIcon';

export default function MobileFooter({ username }) {
  const { pathname } = useRouter();

  return (
    <FooterWrapper>
      <ListStyled>
        {[
          {
            id: 1,
            icon: <HomeIcon isActive={pathname === '/app/feed'} />,
            url: '/app/feed',
          },
          {
            id: 2,
            icon: <SearchIcon />,
            url: '/app/search',
          },
          {
            id: 3,
            icon: <PostIcon size="mobile" />,
            url: '/app/modal',
          },

          {
            id: 4,
            icon: <HeartIcon />,
            url: '/app/like',
          },
          {
            id: 5,
            icon: `${username}`,
            url: '/app/profile',
          },
        ].map((item) => (
          <li key={item.id}>
            <Link href={item.url}>
              {item.id === 5 ? (
                <ImgStyled
                  src={item.icon}
                  alt="Foto de Perfil"
                  isActive={pathname === item.url}
                />
              ) : (
                item.icon
              )}
            </Link>
          </li>
        ))}
      </ListStyled>
    </FooterWrapper>
  );
}

MobileFooter.propTypes = {
  username: PropTypes.string.isRequired,
};
