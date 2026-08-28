import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { showToast } from '../store/slices/uiSlice';
import Button from '../components/ui/Button';

const inputStyle = "p-3 bg-bg-secondary border border-border-stong rounded-[8px] text-text text-4 w-full border-box";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await dispatch(login({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(showToast(`Welcome back, ${result.payload.name.split(' ')[0]}!`, 'ok'));
      navigate('/');
    } else {
      setError(result.payload || 'Login failed');
    }
  };

  return (
    <div className='w-105 my-10 mx-auto'>
      <h1 
      className='font-display text-4xl text-text mb-2 text-center'
      >Welcome back</h1>
      <p className='text-text-secondary text-center mb-8'>Sign in to your Shophive account</p>

      <form onSubmit={handleSubmit} 
      className='flex flex-col gap-4 border border-border-strong rounded-xl p-7.5 '
      >
        <input className={inputStyle} type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={inputStyle} type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />



        {error && <p className='text-danger text-sm'>{error}</p>}
        <Button type="submit" disabled={status === "loading"} className={`border-0 ${status === "loading" ? "opacity-50" : "opacity-100"}`}>
{status === 'loading' ? 'Signing in…' : 'Sign In'}
        </Button>
   


      </form>

      <p className='text-center text-text-secondary mt-5'>
        New here? <Link to="/register" className='text-primary font-bold'>Create an account</Link>
      </p>
    </div>
  );
}