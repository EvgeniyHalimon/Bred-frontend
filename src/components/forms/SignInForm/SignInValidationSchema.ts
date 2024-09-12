import * as yup from 'yup';

export const SignInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email format. Please enter a valid email address with an '@' symbol and a domain, e.g., user@example.com"
    )
    .email('Must be a valid email!')
    .required('Required field'),
  password: yup.string().required('Required field')
});

export default SignInValidationSchema;
