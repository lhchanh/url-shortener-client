import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export const shortenUrlSchema = Yup.object().shape({
  originalUrl: Yup.string()
    .url('Invalid URL')
    .required('URL is required'),
});

export const signupSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
  password_confirmation: Yup.string().required('Required'),
});
