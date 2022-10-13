import { FC } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { Button } from '../Button';

type Props = {
  onAdd: (movie: Movie) => void;
  movies: Movie[],
};

const initialValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

Yup.addMethod(Yup.string, 'whitespace', function f(message: string) {
  // eslint-disable-next-line react/no-this-in-sfc
  return this.test('whitespace', message, (str: string | undefined) => {
    return str?.trim().length !== 0;
  });
});

export const NewMovie: FC<Props> = ({ onAdd, movies }) => {
  Yup.addMethod(Yup.string, 'unique', function f(message: string) {
    // eslint-disable-next-line react/no-this-in-sfc
    return this.test('unique', message, (str: string | undefined) => {
      return movies.find((movie) => movie.title === str) === undefined;
    });
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string()
          .unique('Already exist!')
          .required('Required!')
          .whitespace('Write some title here not whitespaces!'),
        description: Yup.string(),
        imgUrl: Yup.string()
          .url()
          .required(),
        imdbUrl: Yup.string()
          .url()
          .required(),
        imdbId: Yup.string()
          .required()
          .whitespace('Write some id here!'),
      })}
      onSubmit={(values, { resetForm }) => {
        onAdd(values);
        resetForm();
      }}
    >
      <Form className="NewMovie">
        <h2 className="title">Add a movie</h2>

        <TextField
          name="title"
          label="Title"
        />

        <TextField
          name="description"
          label="Description"
        />

        <TextField
          name="imgUrl"
          label="Image URL"
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
        />

        <TextField
          name="imdbId"
          label="Imdb ID"
        />
        <Button />
      </Form>
    </Formik>

  );
};
