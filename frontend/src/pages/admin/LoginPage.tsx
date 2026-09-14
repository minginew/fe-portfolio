import { useState } from 'react';
import Logo2 from '@images/Logo2.svg?react';
import background from '@images/background_white.jpg';
import { useSignInMutation } from '@redux/api/authApi';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const navigator = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const result = await signIn({ ...form });
    if (result.error) {
      const error = result.error as { message?: unknown };
      setErrorMessage(typeof error.message === 'string' ? error.message : '로그인 실패');
      return;
    }
    navigator('/admin');
  };

  return (
    <div
      className='flex h-svh w-full flex-col items-center justify-center pb-10'
      style={{ backgroundImage: `url(${background})` }}
    >
      <Logo2 className='fill-main-blue mb-10 h-auto w-48 sm:w-72' />
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <div className='flex h-36 w-72 flex-col items-center justify-center gap-2'>
          <input
            className='border-main-gray-200 focus:outline-main-blue focus:border-main-blue bg-main-gray-100 h-12 w-full rounded-xl border-2 pl-4 focus:outline-1'
            type='email'
            name='email'
            placeholder='Email'
            onChange={handleFormChange}
          />
          <input
            className='border-main-gray-200 focus:outline-main-blue focus:border-main-blue bg-main-gray-100 h-12 w-full rounded-xl border-2 pl-4 focus:outline-1'
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleFormChange}
          />
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className='text-main-gray-100 bg-main-blue flex h-12 w-72 cursor-pointer items-center justify-center rounded-xl text-xl font-medium opacity-60 disabled:cursor-default'
        >
          <span>{isLoading ? 'Loading...' : 'Sign in'}</span>
        </button>
        {errorMessage ? (
          <p role='alert' className='mt-3 text-sm text-red-500'>
            {errorMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
};
export default LoginPage;
