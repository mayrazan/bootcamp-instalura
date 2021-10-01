import React, { useState } from 'react';
import Logo from '../../../theme/Logo';
import MenuWrapper, { TextFieldStyled, ListStyled, ImgStyled } from './style';
import Link from '../../commons/Link';
import { useUserService } from '../../../infra/hooks/useUserService';

export default function Header() {
  const [search, setSearch] = useState('');
  const handleChange = (event) => setSearch(event.target.value);
  const { user } = useUserService();

  return user.loading ? (
    <div>carregando</div>
  ) : (
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
                icon: '/icons/postIcon.svg',
                url: '/app/modal',
              },
              {
                id: 2,
                icon: '/icons/home.svg',
                url: '/app/feed',
              },
              {
                id: 3,
                icon: '/icons/heart.svg',
                url: '/app/like',
              },
              {
                id: 4,
                icon: `https://github.com/${user.data.username}.png`,
                url: '/app/profile',
              },
            ].map((item) => (
              <li key={item.id}>
                <Link href={item.url}>
                  {item.id === 4 ? (
                    <ImgStyled src={item.icon} alt="" />
                  ) : (
                    <img src={item.icon} alt="" />
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
