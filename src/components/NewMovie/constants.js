export const required = (name, value) => {
  const isValid = Boolean(value.trim());

  if (isValid) {
    return null;
  }

  return `Field ${name} is required`;
};

export const fields = [
  {
    name: 'title',
    label: 'Movie title',
    placeholder: 'Add new movie title',
    validators: [required],
  },
  {
    name: 'description',
    label: 'Movie description',
    placeholder: 'Add new movie description',
    validators: [required],
  },
  {
    name: 'imgUrl',
    label: 'Movie imgUrl',
    placeholder: 'Add new movie imgUrl',
    validators: [required],
  },
  {
    name: 'imdbUrl',
    label: 'Movie imdbUrl',
    placeholder: 'Add new movie imdbUrl',
    validators: [required],
  },
  {
    name: 'imdbId',
    label: 'Movie imdbId',
    placeholder: 'Add new movie imdbId',
    validators: [required],
  },
];

export const initialValues = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const initialErrors = {
  title: null,
  description: null,
  imgUrl: null,
  imdbUrl: null,
  imdbId: null,
};
