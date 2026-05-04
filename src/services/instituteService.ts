// instService.ts
import client from '../api/client';

export const getInstitutes = async (token: string) => {
  try {
    const response = await client.get('/auth/my-institutes-roles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Institutes API response:', response.data);
    return response.data;
  } catch (error: any) {
    console.log('Institutes API Error:', error.response?.data || error.message);
    throw error;
  }
};
