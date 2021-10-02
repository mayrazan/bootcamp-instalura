import React from 'react';
import Text from '../../foundation/Text';
import Box from '../../layout/Box';
import { useContextLoggedArea } from '../../wrappers/WebsitePage/loggedArea';
import {
  ProfileImage, AreaAbout, AreaCenter, AreaLeft, Grid,
} from './style';

export default function ProfileInfo() {
  const { posts, username, user } = useContextLoggedArea();
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
            <ProfileImage src={`https://github.com/${username}.png`} alt="" />
          </div>
        </AreaLeft>
        <AreaCenter>
          <Box display="flex" gap={{ xs: '20px', md: '40px' }}>
            <Box display="flex" flexDirection="column">
              <Text variant={{ xs: 'profileSM', md: 'profile' }}>{posts.length}</Text>
              <Text color="tertiary.light" variant={{ xs: 'profileTextSM', md: 'paragraph1' }}>Publicações</Text>
            </Box>
            <Box display="flex" flexDirection="column">
              <Text variant={{ xs: 'profileSM', md: 'profile' }}>22k</Text>
              <Text color="tertiary.light" variant={{ xs: 'profileTextSM', md: 'paragraph1' }}>Seguindo</Text>
            </Box>

            <Box display="flex" flexDirection="column">
              <Text variant={{ xs: 'profileSM', md: 'profile' }}>134k</Text>
              <Text color="tertiary.light" variant={{ xs: 'profileTextSM', md: 'paragraph1' }}>Seguidores</Text>
            </Box>
          </Box>
        </AreaCenter>
        <AreaAbout>
          <Box
            display="flex"
            flexDirection="column"
            padding={{ xs: '0 0 0 13px', md: '0' }}
          >
            <Text variant={{ xs: 'profileSM', md: 'profile' }}>{user.name}</Text>
            <Text color="tertiary.light" variant={{ xs: 'profileTextSM', md: 'paragraph1' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus.</Text>
          </Box>
        </AreaAbout>
      </Grid>
    </Box>
  );
}
