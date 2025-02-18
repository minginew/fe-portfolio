import { useState } from 'react';
import Logo2 from '../../assets/images/Logo2.svg?react';
import { useAddDispatch } from '../../redux/redux';
const LoginPage = () => {
  const dispatch = useAddDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {};

  return (
    <div className='flex h-svh w-full flex-col items-center justify-center bg-[url(src/assets/images/background_white.jpg)] pb-10'>
      <Logo2 className='fill-main-blue mb-4 h-auto w-[55%]' />
      <div className='flex h-36 w-72 flex-col items-center justify-center gap-2'>
        <input
          className='border-main-gray-200 focus:outline-main-blue focus:border-main-blue bg-main-gray-100 h-12 w-full rounded-xl border-2 pl-4 focus:outline-1'
          type='email'
          placeholder='Email'
          onChange={handleFormChange}
        />
        <input
          className='border-main-gray-200 focus:outline-main-blue focus:border-main-blue bg-main-gray-100 h-12 w-full rounded-xl border-2 pl-4 focus:outline-1'
          type='password'
          placeholder='Password'
          onChange={handleFormChange}
        />
      </div>
      <div
        className='text-main-gray-100 bg-main-blue flex h-12 w-72 cursor-pointer items-center justify-center rounded-xl text-xl font-medium opacity-60'
        onClick={handleLogin}
      >
        <span>Sign in</span>
      </div>
    </div>
  );
};
export default LoginPage;
