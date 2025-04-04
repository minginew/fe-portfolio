import { useState } from 'react';
import Logo2 from '../../assets/images/Logo2.svg?react';
import { useSignInMutation } from '../../redux/api/authApi';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const navigator = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const result = await signIn({ ...form });
    if (result.error) {
      return;
    }
    navigator('/admin');
  };

  return (
    <div className='flex h-svh w-full flex-col items-center justify-center bg-[url(src/assets/images/background_white.jpg)] pb-10'>
      <Logo2 className='fill-main-blue mb-4 h-auto w-[55%]' />
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
      {isLoading ? (
        <div className='text-main-gray-100 bg-main-blue flex h-12 w-72 cursor-pointer items-center justify-center rounded-xl text-xl font-medium opacity-60'>
          <span>Loaidng...</span>
        </div>
      ) : (
        <div
          className='text-main-gray-100 bg-main-blue flex h-12 w-72 cursor-pointer items-center justify-center rounded-xl text-xl font-medium opacity-60'
          onClick={handleLogin}
        >
          <span>Sign in</span>
        </div>
      )}
    </div>
  );
};
export default LoginPage;
