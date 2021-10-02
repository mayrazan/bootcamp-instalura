/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text from '../../foundation/Text';
import Box from '../../layout/Box';
import {
  GithubContainer,
  ProfileContainerText,
  ProfileImage,
  ProfileWrapper,
  ContainerInfo,
} from './style';

export default function FeedUsers({ user }) {
  const [users, setUsers] = useState([]);
  const handleUsers = async () => {
    const url = 'https://instalura-api.vercel.app/api/users';
    const userInfo = await fetch(url)
      .then((response) => response.json())
      .then((res) => res)
      .catch((error) => {
        console.error(error);
      });
    return userInfo.data;
  };

  useEffect(() => {
    handleUsers().then((res) => setUsers(res.slice(0, 4).map((item) => item)));
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <ContainerInfo>
        <ProfileWrapper>
          <ProfileImage src={user.avatar} alt="" width="64px" height="64px" />

          <ProfileContainerText>
            <Text variant="profileSM">{user.username}</Text>
            <Text variant="paragraph2" color="tertiary.light">
              {user.name}
            </Text>
          </ProfileContainerText>
        </ProfileWrapper>

        <GithubContainer>
          <Text
            tag="a"
            href={user.url}
            color="secondary.main"
            gap="8px"
            display="flex"
            alignItems="end"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/github.svg" alt="" />
            Github
          </Text>
        </GithubContainer>
      </ContainerInfo>

      <Text variant="profileSM" color="tertiary.light" textAlign="center">
        Projetos da Galera
      </Text>

      {users.map((item) => (
        <ContainerInfo key={item._id}>
          <ProfileWrapper>
            <ProfileImage
              src={
                item.username
                  ? `https://github.com/${item.username}.png`
                  : '/icons/github.svg'
              }
              alt=""
            />

            <ProfileContainerText>
              <Text variant="profileSM">{item.username}</Text>
              <Text variant="paragraph2" color="tertiary.light">
                {item.name}
              </Text>
            </ProfileContainerText>
          </ProfileWrapper>

          <GithubContainer>
            <Text
              tag="a"
              href={`https://github.com/${item.username}`}
              color="secondary.main"
              gap="8px"
              display="flex"
              alignItems="end"
            >
              <img src="/icons/github.svg" alt="github" />
              Github
            </Text>
          </GithubContainer>
        </ContainerInfo>
      ))}
    </Box>
  );
}

FeedUsers.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};
