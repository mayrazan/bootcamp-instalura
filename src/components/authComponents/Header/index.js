import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Logo from '../../../theme/Logo';
import MenuWrapper, { TextFieldStyled, ListStyled, ImgStyled } from './style';
import Link from '../../commons/Link';
import HomeIcon from '../SvgIcons/HomeIcon';
import PostIcon from '../SvgIcons/PostIcon';
import HeartIcon from '../SvgIcons/HeartIcon';

export default function Header({ username }) {
  const [search, setSearch] = useState('');
  const handleChange = (event) => setSearch(event.target.value);
  const { pathname } = useRouter();

  return (
    <MenuWrapper>
      <MenuWrapper.LeftSide>
        <Logo size="medium" />
      </MenuWrapper.LeftSide>

      <MenuWrapper.RightSide>
        <TextFieldStyled
          placeholder="Pesquisar"
          name="search"
          value={search}
          onChange={handleChange}
          type="search"
          margin="0"
        />
        <div>
          <ListStyled>
            {[
              {
                id: 1,
                icon: <PostIcon size="desktop" />,
                url: '/app/modal',
              },
              {
                id: 2,
                icon: <HomeIcon isActive={pathname === '/app/feed'} />,
                url: '/app/feed',
              },
              {
                id: 3,
                icon: <HeartIcon />,
                url: '/app/like',
              },
              {
                id: 4,
                icon: `https://github.com/${username}.png`,
                url: '/app/profile',
              },
            ].map((item) => (
              <li key={item.id}>
                <Link href={item.url}>
                  {item.id === 4 ? (
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
        </div>
      </MenuWrapper.RightSide>
    </MenuWrapper>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
