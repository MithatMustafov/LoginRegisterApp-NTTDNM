"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import '../../cssTextFonts/fonts.css'
import Image from 'next/image';
import imgBackgroundLoginA1 from '../../images/imgBackgroundLoginA4.jpg';
import TextBox from '../../uiComponents/texbox'; 
import { UserData } from '../../interfaces/types';
import { handleEmailChange, handlePasswordChange } from '../../utils/useFormHandlers';
import { handleSubmit } from './funcHandleSubmit';

const PageLogin: React.FC = () => {
  
  const router = useRouter();

  const navigateToRegister = () => {
    router.push('/register');
  };

  const [userData, setUserData] = useState<UserData>
  ({ 
    email: '', 
    password: '' 
  });

  const [userDataError, setUserDataError] = useState<UserData>
  ({ 
    email: '', 
    password: '' 
  });

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
              &apos;&apos;Life is really simple, but we insist on making it complicated.&apos;&apos;
            </p>
            <p className='text-white font-PlayfairDisplay text-2xl'>
              - Confucius
            </p>
          </div>
        </div>
      </div>
      <div className='w-[35%] h-full flex flex-col justify-center items-center bg-white'>
        <p className='text-2xl mb-6 font-semibold'>Sign In</p>
        
        <TextBox
          label='Email'
          value={userData.email}
          onChange={(e) => handleEmailChange(e, userData, setUserData, userDataError, setUserDataError)}
          errorMessage={userDataError.email}
          placeholder='Enter your email address'
          type='email'
        />
        
        <TextBox
          label='Password'
          value={userData.password}
          onChange={(e) => handlePasswordChange(e, userData, setUserData, userDataError, setUserDataError)}
          errorMessage={userDataError.password}
          placeholder='Enter your password'
          type='password'
        />
        
        <div className="w-[300px] flex mt-4">
              <div className="flex">
                <input type="checkbox" />
                <div className="px-1 text-1xl textCS-stylishRegular">Remember me</div>
              </div>

              <div className="w-[160px] flex justify-end">
                <div
                  className="px-1 text-1xl textCS-stylishRegular cursor-pointer"
                  onClick={navigateToRegister}
                  >
                    Don't have accout?
                  </div>
              </div>
        </div>

        <button
          className='w-[300px] mt-4 px-4 py-2 bg-[#a3716e] text-white rounded'
          type='submit'
          onClick={(e) => handleSubmit(e, userData, setUserData, setUserDataError)}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default PageLogin;
