import { useEffect, useState } from 'react';
import { userService } from '../../../services/user/userService';

export const useUserService = () => {
  const [response, setResponse] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const [user, setUser] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const getProfilePage = () => {
    userService
      .getProfilePage()
      .then((res) => setResponse((prevState) => ({
        ...prevState,
        data: res,
        loading: false,
        error: null,
      })))
      .catch((error) => setResponse((prevState) => ({
        ...prevState,
        error: error.message,
        loading: false,
        data: null,
      })));
  };

  const getProfileInfo = () => {
    userService
      .getProfileInfo()
      .then((res) => setUser((prevState) => ({
        ...prevState,
        data: res.user,
        loading: false,
        error: null,
      })))
      .catch((error) => setUser((prevState) => ({
        ...prevState,
        error: error.message,
        loading: false,
        data: null,
      })));
  };

  useEffect(() => {
    getProfilePage();
    getProfileInfo();
  }, []);
  return {
    response,
    getProfilePage,
    getProfileInfo,
    user,
  };
};
