import { isStagingEnv } from '../../infra/env/isStagingEnv';
import { HttpClient } from '../../infra/http/HttpClient';
import { authService } from '../auth/authService';

const BASE_URL = isStagingEnv
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  : 'https://instalura-api-git-master-omariosouto.vercel.app'; // https://instalura-api.omariosouto.vercel.app

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
      .catch((error) => {
        console.error(error);
      });

    return {
      url: userInfo.html_url,
      avatar: userInfo.avatar_url,
      name: userInfo.name,
      followers: userInfo.followers,
      following: userInfo.following,
      username: userInfo.login,
      bio: userInfo.bio,
    };
  },

  async getProfileInfo(ctx) {
    // const url = `${BASE_URL}/api/users`;
    // const userInfo = await fetch(url)
    //   .then((response) => response.json())
    //   .then((res) => res)
    //   .catch((error) => {
    //     console.error(error);
    //   });
    const auth = authService(ctx);
    const session = await auth.getSession();
    const profilePage = await userService.getProfilePage(ctx);
    const github = await userService.getGithubInfo(session.username);
    // const { name } = userInfo.data.filter(
    //   (item) => item.username === session.username
    // )[0];

    return {
      user: {
        ...session,
        ...profilePage.user,
        ...github,
      },
    };
  },
};
