/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '../../src/components/layout/Box';
import Grid from '../../src/components/layout/Grid';
import websitePageLoggedHOC from '../../src/components/wrappers/WebsitePage/loggedArea/hoc';
import { authService } from '../../src/services/auth/authService';
import { userService } from '../../src/services/user/userService';
import FeedPost from '../../src/components/authComponents/FeedPost';
import FeedUsers from '../../src/components/authComponents/FeedUsers';
import Text from '../../src/components/foundation/Text';
import useWindowSize from '../../src/infra/hooks/useWindowSize';
import UserCard from '../../src/components/authComponents/UserCard';
import { useContextLoggedArea } from '../../src/components/wrappers/WebsitePage/loggedArea';

function Feed({ posts, user }) {
  const { isDesktop } = useWindowSize();
  const { filter, userSearch } = useContextLoggedArea();
  return userSearch ? (
    filter.map((item) => (
      <UserCard
        src="/icons/avatar.png"
        url={`https://github.com/${item.username}`}
        user={item}
        key={item.username}
      />
    ))
  ) : (
    <Box
      padding={{ xs: '0', md: '24px 0 0' }}
      marginBottom="auto"
      display="flex"
    >
      {!posts.length ? (
        <Box
          display="flex"
          justifyContent="center"
          marginTop="50px"
          width="100%"
        >
          <Text tag="h4" textAlign="center" margin="0" variant="titleXS">
            Não há posts ainda.
          </Text>
        </Box>
      ) : (
        <Grid.Container
          paddingRight={{ xs: 0 }}
          paddingLeft={{ xs: 0 }}
          marginRight={{ xs: 0, md: 'auto' }}
          marginLeft={{ xs: 0, md: 'auto' }}
          initial="initial"
        >
          <Grid.Row marginRight={{ xs: 0 }} marginLeft={{ xs: 0 }}>
            <Grid.Col
              value={{ xs: 12, md: 5 }}
              offset={{ xs: 0, md: 1 }}
              display="flex"
              justifyContent="center"
              flexDirection="column"
              gap={{ xs: '23px', md: '30px' }}
              paddingRight={{ xs: 0, md: '16px' }}
              paddingLeft={{ xs: 0, md: '16px' }}
            >
              {posts.map((item) => (
                <FeedPost post={item} key={item._id} user={user} />
              ))}
            </Grid.Col>
            {isDesktop && (
              <Grid.Col
                value={{
                  xs: 0,
                  md: 6,
                }}
              >
                <FeedUsers user={user} />
              </Grid.Col>
            )}
          </Grid.Row>
        </Grid.Container>
      )}
    </Box>
  );
}

Feed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default websitePageLoggedHOC(Feed, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Feed',
    },
    pageBoxProps: {
      backgroundColor: '#F2F2F2',
    },
    menuProps: {
      isFeed: true,
    },
    footerProps: {
      display: true,
    },
  },
});

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);
  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const profilePage = await userService.getProfilePage(ctx);
    const profileInfo = await userService.getProfileInfo(ctx);
    const currentUser = profilePage.posts.filter(
      (item) => item.user === profileInfo.user.id,
    );

    return {
      props: {
        user: profileInfo.user,
        posts: currentUser,
        postsNumber: currentUser.length,
        isAuth: hasActiveSession,
        username: profileInfo.user.username,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/app/login' });
  ctx.res.end();

  return {
    props: {},
  };
}
