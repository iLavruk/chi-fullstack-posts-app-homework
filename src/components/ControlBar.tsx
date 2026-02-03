import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/userSlice';

const ControlBar = () => {
  const dispatch = useAppDispatch();

  return <button onClick={() => dispatch(logout())}>Logout</button>;
};

export default ControlBar;