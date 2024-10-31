import * as yup from 'yup';
import { userFieldLengths } from '@/shared';

export const SignUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(
      userFieldLengths.firstName.max,
      `Maximum ${userFieldLengths.firstName.max} characters required`
    )
    .required('First name is required'),
  lastName: yup
    .string()
    .max(
      userFieldLengths.lastName.max,
      `Maximum ${userFieldLengths.lastName.max} characters required`
    )
    .required('Last name is required'),
  email: yup
    .string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Please enter a valid email, e.g., q@example.com'
    )
    .email('Must be a valid email!')
    .required('Email is required'),
  password: yup
    .string()
    .min(
      userFieldLengths.password.min,
      `Minimum ${userFieldLengths.password.min} characters required`
    )
    .required('Password is required'),
  bio: yup
    .string()
    .min(userFieldLengths.bio.min, `Minimum ${userFieldLengths.bio.min} characters required`)
    .max(userFieldLengths.bio.max, `Maximum ${userFieldLengths.bio.max} characters required`)
    .required('Bio is required')
});

export default SignUpValidationSchema;
