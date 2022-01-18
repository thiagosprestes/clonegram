import React, { useEffect, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';
import { States } from '~/models/states';
import { User } from '~/models/user';
import { api } from '~/services/api';
import Search from '../Container';

const SearchScreen = () => {
  const [state, setState] = useState(States.loading);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce({ delay: 1000, value: searchTerm });

  const handleOnGetUsers = async () => {
    setState(States.loading);

    try {
      const { data } = await api.get(`/users?username=${searchTerm}&page=${1}`);

      setUsers(data);

      setState(States.default);
    } catch (error: any) {
      console.log(error.response);
      setState(States.error);
    }
  };

  const handleOnChangeSearchInput = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    handleOnGetUsers();
  }, [debouncedSearchTerm]);

  return (
    <Search
      users={users}
      onChangeSearchInput={handleOnChangeSearchInput}
      onRetry={handleOnGetUsers}
      searchTerm={searchTerm}
      state={state}
    />
  );
};

export default SearchScreen;
