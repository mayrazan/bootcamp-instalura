import React from 'react';
import websitePageLoggedHOC from '../../src/components/wrappers/WebsitePage/loggedArea/hoc';
import { authService } from '../../src/services/auth/authService';
import { userService } from '../../src/services/user/userService';

function Feed() {
  return <div style={{ margin: 'auto' }} />;
}

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

    return {
      props: {
        user: profileInfo.user,
        posts: profilePage.posts,
        postsNumber: profilePage.posts.length,
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
