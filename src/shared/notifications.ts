import { Notify } from 'notiflix';

const { success, failure } = Notify;

export const showSuccessNotification = (message: string) => {
  success(message, {
    timeout: 3000,
    pauseOnHover: true,
    position: 'right-bottom'
  });
};

export const showErrorNotification = (message: string) => {
  failure(message, {
    timeout: 3000,
    pauseOnHover: true,
    position: 'right-bottom'
  });
};
