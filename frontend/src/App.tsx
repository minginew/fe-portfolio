import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/router';

function App() {
  return (
    <div className='w-full'>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </div>
  );
}

export default App;
