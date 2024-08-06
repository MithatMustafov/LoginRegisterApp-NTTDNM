import {API_ENDPOINTS} from './APIs';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export const API_Login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: email,
            password: password,
        }),
    });

    if (!response.ok) 
    {
        throw new Error('Network response was not ok');
    }

    const data: LoginResponse = await response.json();
    return data;
};

export default API_Login;
