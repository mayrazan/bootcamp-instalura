import { isStagingEnv } from '../../infra/env/isStagingEnv';
import { HttpClient } from '../../infra/http/HttpClient';
import { authService } from '../auth/authService';

const BASE_URL = isStagingEnv
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  : 'https://instalura-api-git-master-omariosouto.vercel.app'; // https://instalura-api.omariosouto.vercel.app

// const EXTERNAL_URL = 'https://instalura-api.vercel.app';

export const userService = {
  async getProfilePage(ctx) {
    const url = `${BASE_URL}/api/users/posts`;
    try {
      const token = await authService(ctx).getToken();
      const response = await HttpClient(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return {
        user: {
          totalLikes: 100,
        },
        posts: response.data,
      };
    } catch (err) {
      throw new Error('Não conseguimos pegar os posts');
    }
  },

  async getGithubInfo(user) {
    const url = `https://api.github.com/users/${user}`;
    const userInfo = await fetch(url)
      .then((response) => response.json())
      .then((res) => res)
      .catch((error) => error);

    if (userInfo.login) {
      return {
        url: userInfo.html_url ? userInfo.html_url : 'www.github.com',
        avatar: userInfo.avatar_url ? userInfo.avatar_url : '/icons/avatar.png',
        name: userInfo.name ? userInfo.name : '',
        followers: userInfo.followers ? userInfo.followers : 0,
        following: userInfo.following ? userInfo.following : 0,
        username: userInfo.login ? userInfo.login : '',
        bio: userInfo.bio ? userInfo.bio : '',
      };
    }
    return userInfo.message;
  },

  async getProfileInfo(ctx) {
    const auth = authService(ctx);
    const session = await auth.getSession();
    const profilePage = await userService.getProfilePage(ctx);
    const github = await userService.getGithubInfo(session.username);
    return {
      user: {
        ...session,
        ...profilePage.user,
        ...github,
      },
    };
  },

  async setLike(id) {
    const url = `${BASE_URL}/api/posts/${id}/like`;
    try {
      const token = await authService().getToken();
      const response = await HttpClient(url, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {},
      });

      if (response.data) {
        return response.data;
      }
      return undefined;
    } catch (err) {
      return undefined;
    }
  },

  async handleUsers() {
    const url = `${BASE_URL}/api/users`;
    const userInfo = await fetch(url)
      .then((response) => response.json())
      .then((res) => res)
      .catch((error) => {
        console.error(error);
      });
    return userInfo.data;
  },
};
