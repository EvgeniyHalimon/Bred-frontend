import * as yup from 'yup';

const comment = {
  min: 1,
  max: 3000
};

export const CreateCommentSchema = yup.object().shape({
  text: yup
    .string()
    .min(
      comment.min,
      `The comment is too short. It must contain at least ${comment.min} character.`
    )
    .max(comment.max, `The comment is too long. It must not exceed ${comment.max} characters.`)
    .required('Required field')
});

export default CreateCommentSchema;
