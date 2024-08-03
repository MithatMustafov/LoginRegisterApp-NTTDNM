import Image from 'next/image';
import React, { useState } from 'react';
import imgBackgroundLoginA1 from '../../Images/imgBackgroundLoginA4.jpg';
import TextBox from '../../UI Components/texbox'; 

const PageLogin: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value.length < 10) {
      setEmailError('Email must be at least 10 characters long');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className='w-screen h-screen flex'>
      <div className='relative w-[65%] h-full'>
        <Image 
          src={imgBackgroundLoginA1} 
          alt='Background for login page'
          layout='fill'
          objectFit='cover' 
        />
      </div>
      <div className='w-[35%] h-full flex flex-col justify-center items-center bg-white'>
        <p className='text-2xl mb-6 font-semibold'>Sign in</p>
        <TextBox
          label='Email'
          value={email}
          onChange={handleEmailChange}
          errorMessage={emailError}
          placeholder='Enter your email address'
          type='email'
        />
        <TextBox
          label='Password'
          value={password}
          onChange={handlePasswordChange}
          errorMessage={passwordError}
          placeholder='Enter your password'
          type='password'
        />
        <button
          type='submit'
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default PageLogin;
