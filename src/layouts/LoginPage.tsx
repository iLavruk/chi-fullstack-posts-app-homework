import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/slices/userSlice';


const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(loginUser(values));
  };
  return (
    <div>
      <h1>Login Page</h1>
      <p>Please enter your credentials to log in.</p>
      <button onClick={() => handleSubmit({ email: 'username123', password: 'password123' })}>as
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default LoginPage;