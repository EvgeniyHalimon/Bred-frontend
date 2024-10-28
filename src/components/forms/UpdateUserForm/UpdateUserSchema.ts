import { userFieldLengths } from '@/shared/constants';
import * as yup from 'yup';

export const UpdateUserSchema = yup.object().shape({
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
  bio: yup
    .string()
    .min(userFieldLengths.bio.min, `Minimum ${userFieldLengths.bio.min} characters required`)
    .max(userFieldLengths.bio.max, `Maximum ${userFieldLengths.bio.max} characters required`)
    .required('Bio is required')
});

export default UpdateUserSchema;
