import '@styles/Input.css';
import { useEffect } from 'react';
import { supabase } from '../../util/supabaseClient';
import { Outlet, useNavigate } from 'react-router-dom';
import { getTimeDifference } from '../../hooks/useDate';
import AdminNavbar from '../../components/admin/AdminNavbar';

const AdminPage = () => {
  const navigator = useNavigate();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        if (!session?.access_token) {
          navigator('/signin');
        } else {
          const date = session.user.last_sign_in_at as string;
          if (getTimeDifference(date) > 12) {
            supabase.auth.signOut();
            navigator('/signin');
          }
        }
      } else if (event === 'SIGNED_OUT') {
        navigator('/signin');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div className='bg-main-gray-100 w-full overflow-y-scroll'>
      <AdminNavbar />
      <Outlet />
    </div>
  );
};
export default AdminPage;
