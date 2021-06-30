export type ToastProps = {
  id?: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
};
