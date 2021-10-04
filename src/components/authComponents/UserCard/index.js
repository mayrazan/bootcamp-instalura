import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../foundation/Text';
import {
  ContainerInfo,
  GithubContainer,
  ProfileContainerText,
  ProfileImage,
  ProfileWrapper,
} from './style';

export default function UserCard({
  user, width, height, src, url,
}) {
  return (
    <ContainerInfo>
      <ProfileWrapper>
        <ProfileImage
          src={user.avatar || src}
          alt=""
          width={width}
          height={height}
        />

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
          href={user.url || url}
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
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  src: PropTypes.string,
  url: PropTypes.string,
};

UserCard.defaultProps = {
  width: '48px',
  height: '48px',
  src: null,
  url: null,
};
