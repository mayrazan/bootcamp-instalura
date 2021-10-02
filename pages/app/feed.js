/* eslint-disable no-console */
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
    const session = await auth.getSession();
    const profilePage = await userService.getProfilePage(ctx);
    const url = 'https://instalura-api-git-master-omariosouto.vercel.app/api/users';
    const userInfo = await fetch(url)
      .then((response) => response.json())
      .then((res) => res)
      .catch((error) => {
        console.error(error);
      });
    const { name } = userInfo.data.filter(
      (item) => item.username === session.username,
    )[0];
    return {
      props: {
        user: {
          ...session,
          ...profilePage.user,
          name,
        },
        posts: profilePage.posts,
        isAuth: hasActiveSession,
      },
    };
  }

  ctx.res.writeHead(307, { location: '/app/login' });
  ctx.res.end();

  return {
    props: {},
  };
}
