"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import imgBackgroundLoginA1 from '../../Images/imgBackgroundLoginA4.jpg';
import TextBox from '../../UI Components/texbox'; 
import '../../cssTextFonts/fonts.css'
const PageLogin: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value.length < 10)
    {
      setEmailError('Email must be at least 10 characters long');
    }
    else
    {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8)
    {
      setPasswordError('Password must be at least 8 characters long');
    } 
    else
    {
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
        <div className='w-full h-full'>
          <div className='w-full h-full absolute bg-black opacity-60'></div>
          <div className='w-full h-full absolute flex flex-col justify-center items-center'>
            <p className='text-white font-PlayfairDisplay text-2xl'>
              “Life is really simple, but we insist on making it complicated.”
            </p>
            <p className='text-white font-PlayfairDisplay text-2xl'>
              - Confucius
            </p>
          </div>
        </div>
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
        
        <div className="w-[300px] flex mt-4">
              <div className="flex">
                <input type="checkbox" />
                <div className="px-1 text-1xl textCS-stylishRegular">Remember me</div>
              </div>

              <div className="w-[160px] flex justify-end">
                <div className="px-1 text-1xl textCS-stylishRegular">Don't have accout?</div>
              </div>
        </div>

        <button
          type='submit'
          className='w-[300px] mt-4 px-4 py-2 bg-[#a3716e] text-white rounded'
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default PageLogin;
