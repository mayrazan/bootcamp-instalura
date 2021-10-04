import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../foundation/Text';
import Box from '../../layout/Box';
import {
  ProfileImage, AreaAbout, AreaCenter, AreaLeft, Grid,
} from './style';

export default function ProfileInfo({ posts, user }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={{ md: 'center' }}
      flex="1"
    >
      <Grid>
        <AreaLeft>
          <div>
            <ProfileImage src={user.avatar} alt="" />
          </div>
        </AreaLeft>
        <AreaCenter>
          <Box display="flex" gap={{ xs: '20px', md: '40px' }}>
            <Box display="flex" flexDirection="column">
              <Text variant={{ xs: 'profileSM', md: 'profile' }}>{posts}</Text>
              <Text
                color="tertiary.light"
                variant={{ xs: 'profileTextSM', md: 'paragraph1' }}
              >
                Publicações
              </Text>
            </Box>
            <Box display="flex" flexDirection="column">
              <Text variant={{ xs: 'profileSM', md: 'profile' }}>{user.following}</Text>
              <Text
                color="tertiary.light"
                variant={{ xs: 'profileTextSM', md: 'paragraph1' }}
              >
                Seguindo
              </Text>
            </Box>

            <Box display="flex" flexDirection="column">
              <Text variant={{ xs: 'profileSM', md: 'profile' }}>{user.followers}</Text>
              <Text
                color="tertiary.light"
                variant={{ xs: 'profileTextSM', md: 'paragraph1' }}
              >
                Seguidores
              </Text>
            </Box>
          </Box>
        </AreaCenter>
        <AreaAbout>
          <Box
            display="flex"
            flexDirection="column"
            padding={{ xs: '0 0 0 13px', md: '0' }}
          >
            <Text variant={{ xs: 'profileSM', md: 'profile' }}>
              {user.name}
            </Text>
            <Text
              color="tertiary.light"
              variant={{ xs: 'profileTextSM', md: 'paragraph1' }}
              wordBreak="break-word"
              maxWidth="80%"
            >
              {user?.bio
                ? user.bio
                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Crasmaximus.'}
            </Text>
          </Box>
        </AreaAbout>
      </Grid>
    </Box>
  );
}

ProfileInfo.propTypes = {
  posts: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
  }).isRequired,
};
