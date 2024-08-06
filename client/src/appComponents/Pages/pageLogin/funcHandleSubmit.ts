import { FormEvent } from 'react';
import { UserData } from '../../interfaces/types';
import {API_Login} from '../../utils/api/apiLogin';

export const handleSubmit = async (
    event: FormEvent,
    userData: UserData,
    setUserData: React.Dispatch<React.SetStateAction<UserData>>,
    setUserDataError: React.Dispatch<React.SetStateAction<UserData>>
): Promise<void> => {
    event.preventDefault();

    const { email, password } = userData;

    try
    {
        const data = await API_Login(email, password);
        console.log('Login successful:', data);
    }
    catch (error)
    {
        console.error('Login failed:', error);
        
        setUserDataError({
            email: 'Invalid email or password',
            password: 'Invalid email or password',
        });
    }
};