/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import ProfilePosts from '../../../src/components/authComponents/ProfilePosts';
import ProfileInfo from '../../../src/components/authComponents/ProfileInfo';
import Box from '../../../src/components/layout/Box';
import websitePageLoggedHOC from '../../../src/components/wrappers/WebsitePage/loggedArea/hoc';
import { authService } from '../../../src/services/auth/authService';
import { userService } from '../../../src/services/user/userService';
import { useContextLoggedArea } from '../../../src/components/wrappers/WebsitePage/loggedArea';
import UserCard from '../../../src/components/authComponents/UserCard';

function ProfilePage({
  posts, username, user, postsNumber,
}) {
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
      padding={{ xs: '24px 16px 0 11px', md: '30px 0 0' }}
      marginBottom="auto"
    >
      <ProfileInfo posts={postsNumber} username={username} user={user} />
      <ProfilePosts posts={posts} />
    </Box>
  );
}

export default websitePageLoggedHOC(ProfilePage, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Perfil',
    },
    pageBoxProps: {
      backgroundColor: '#F2F2F2',
    },
    footerProps: {
      display: true,
    },
  },
});

ProfilePage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  username: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  postsNumber: PropTypes.number.isRequired,
};

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
