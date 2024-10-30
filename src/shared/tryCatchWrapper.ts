import type { AxiosError } from 'axios';
import { showErrorNotification } from './notifications';

export const tryCatchWrapper = async (tryCb: () => Promise<void>) => {
  try {
    await tryCb();
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const { message } = axiosError.response.data as {
        error: string;
        message: string;
        statusCode: number;
      };
      showErrorNotification(message);
    }
  }
};
