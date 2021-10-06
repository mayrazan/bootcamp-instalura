import { useEffect, useState } from 'react';
import { userService } from '../../../services/user/userService';

export const useUserSearch = () => {
  const [users, setUsers] = useState({
    data: null,
    loading: true,
    error: null,
  });
  const [userSearch, setUserSearch] = useState('');
  const [filter, setFilter] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const getUsers = () => {
    userService
      .handleUsers()
      .then((res) => {
        setUsers((prevState) => ({
          ...prevState,
          data: res,
          loading: false,
          error: null,
        }));
        setFilter((prevState) => ({
          ...prevState,
          data: res,
          loading: false,
          error: null,
        }));
      })
      .catch(() => {
        setUsers((prevState) => ({
          ...prevState,
          error: 'Nenhum usuário encontrado',
          loading: false,
          data: null,
        }));
        setFilter((prevState) => ({
          ...prevState,
          error: 'Nenhum usuário encontrado',
          loading: false,
          data: null,
        }));
      });
  };

  const searchUser = () => {
    if (!userSearch) {
      setFilter((prevState) => ({ ...prevState, data: users.data }));
    }
    const search = users.data?.filter((item) => item.username.includes(userSearch));
    setFilter((prevState) => ({ ...prevState, data: search }));
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setUserSearch(value);
  };

  useEffect(() => {
    searchUser();
  }, [userSearch]);

  useEffect(() => {
    getUsers();
  }, []);
  return {
    getUsers,
    users,
    handleChange,
    filter,
    userSearch,
  };
};
