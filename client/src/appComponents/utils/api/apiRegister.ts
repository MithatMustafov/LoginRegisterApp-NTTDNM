import { API_ENDPOINTS } from './APIs';

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export const API_Register = async (email: string, password: string): Promise<RegisterResponse> => {
    const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    if (!response.ok)
    {
        throw new Error('Network response was not ok');
    }

    const data: RegisterResponse = await response.json();
    return data;
};

export default API_Register;
