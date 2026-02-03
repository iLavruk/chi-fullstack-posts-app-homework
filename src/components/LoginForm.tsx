import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/slices/userSlice';

const dispatch = useAppDispatch();
const { loading, error } = useAppSelector((s) => s.user);

const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(loginUser(values));
};