import client from '../api/client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  success: boolean;
  pre_context_token: string;
  user: {
    id: number;
    email: string;
    full_name: string;
  };
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loginApi = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const cleanPayload = {
    email: payload.email.trim().toLowerCase(),
    password: payload.password.trim(),
  };

  try {
    console.log('LOGIN PAYLOAD:', cleanPayload);

    const response = await client.post('/auth/login', cleanPayload);
    console.log('LOGIN RESPONSE:', response.data);

    return response.data;
  } catch (error: any) {
    console.log('Retrying login after delay...');

    await delay(3000);

    const retry = await client.post('/auth/login', cleanPayload);
    console.log('RETRY RESPONSE:', retry.data);

    return retry.data;
  }
};
