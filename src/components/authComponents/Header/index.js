import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Logo from '../../../theme/Logo';
import MenuWrapper, { TextFieldStyled, ListStyled, ImgStyled } from './style';
import Link from '../../commons/Link';
import HomeIcon from '../SvgIcons/HomeIcon';
import PostIcon from '../SvgIcons/PostIcon';
import HeartIcon from '../SvgIcons/HeartIcon';
import Text from '../../foundation/Text';
import { loginService } from '../../../services/login/loginService';
import Button from '../../commons/Button';

export default function Header({ username, value, onChange }) {
  const { pathname, push } = useRouter();

  const handleLogout = async () => {
    await loginService.logout(null).then(() => push('/'));
  };

  return (
    <MenuWrapper>
      <MenuWrapper.LeftSide>
        <Link href="/app/feed" color="secondary.main">
          <Logo size="medium" />
        </Link>
      </MenuWrapper.LeftSide>

      <MenuWrapper.RightSide>
        <TextFieldStyled
          placeholder="Pesquisar"
          name="search"
          value={value}
          onChange={onChange}
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
                url: '/app/feed',
              },
              {
                id: 4,
                icon: `${username}`,
                url: '/app/profile',
              },
            ].map((item) => (
              <li key={item.id} className="dropdown">
                {item.id === 4 ? (
                  <>
                    <ImgStyled
                      src={item.icon}
                      alt="Foto de Perfil"
                      isActive={pathname === item.url}
                    />
                    <div className="dropdown-content">
                      <Text tag="a" href="/app/profile">
                        Meu Perfil
                      </Text>
                      <Button ghost onClick={handleLogout} padding="0">
                        <Text tag="a">
                          Logout
                        </Text>
                      </Button>
                    </div>
                  </>
                ) : (
                  <Link href={item.url}>{item.icon}</Link>
                )}
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
