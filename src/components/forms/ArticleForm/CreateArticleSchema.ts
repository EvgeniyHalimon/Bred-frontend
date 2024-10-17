import * as yup from 'yup';

const article = {
  title: {
    min: 1,
    max: 200
  },
  text: {
    min: 1,
    max: 50000
  }
};

export const CreateArticleSchema = yup.object().shape({
  title: yup
    .string()
    .min(
      article.title.min,
      `The title is too short. It must contain at least ${article.title.min} character.`
    )
    .max(
      article.title.max,
      `The title is too long. It must not exceed ${article.title.max} characters.`
    )
    .required('Required field'),
  text: yup
    .string()
    .min(
      article.text.min,
      `The text is too short. It must contain at least ${article.text.min} character.`
    )
    .max(
      article.text.max,
      `The text is too long. It must not exceed ${article.text.max} characters.`
    )
    .required('Required field')
});
