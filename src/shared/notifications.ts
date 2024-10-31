import { Notify, type INotifyOptions } from 'notiflix';

const { success, failure } = Notify;

const options: INotifyOptions = {
  timeout: 300000,
  pauseOnHover: true,
  position: 'right-bottom',
  borderRadius: '0px',
  closeButton: true,
  clickToClose: true
};

export const showSuccessNotification = (message: string) => {
  success(message, { ...options, className: 'notification-clip-path success-notification' });
};

export const showErrorNotification = (message: string) => {
  failure(message, { ...options, className: 'notification-clip-path failure-notification' });
};
