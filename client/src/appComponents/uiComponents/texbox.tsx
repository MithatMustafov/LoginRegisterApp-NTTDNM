import React, { InputHTMLAttributes } from 'react';

interface TextBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const TextBox: React.FC<TextBoxProps> = ({ label, errorMessage, ...props }) => {
  return (
    <div className='w-[300px] flex flex-col'>
      {label && (
        <label className='mb-2 text-gray-700 text-xl'>
          {label}
        </label>
      )}
      <input
        className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
          errorMessage ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {errorMessage && (
        <p className='mt-1 text-red-500 text-sm'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default TextBox;