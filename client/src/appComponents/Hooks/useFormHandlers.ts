import { UserData } from '../Interfaces/types';

export const handleEmailChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  userData: UserData,
  setUserData: React.Dispatch<React.SetStateAction<UserData>>,
  userDataError: UserData,
  setUserDataError: React.Dispatch<React.SetStateAction<UserData>>
) => {
  const value = e.target.value;
  setUserData({ ...userData, email: value });

  if (value.length < 10)
  {
    setUserDataError({
      ...userDataError,
      email: 'Email must be at least 10 characters long',
    });
  }
  else
  {
    setUserDataError({
      ...userDataError,
      email: '',
    });
  }
};

export const handlePasswordChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  userData: UserData,
  setUserData: React.Dispatch<React.SetStateAction<UserData>>,
  userDataError: UserData,
  setUserDataError: React.Dispatch<React.SetStateAction<UserData>>
) => {
  const value = e.target.value;
  setUserData({ ...userData, password: value });

  if (value.length < 8)
  {
    setUserDataError({
      ...userDataError,
      password: 'Password must be at least 8 characters long',
    });
  }
  else
  {
    setUserDataError({
      ...userDataError,
      password: '',
    });
  }
};
