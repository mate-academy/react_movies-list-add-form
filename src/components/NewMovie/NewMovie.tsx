import { FC } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { Button } from '../Button';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: FC<Props> = ({ onAdd }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={Yup.object({
      title: Yup.string()
        .required(),
      description: Yup.string(),
      imgUrl: Yup.string()
        .url()
        .required(),
      imdbUrl: Yup.string()
        .url()
        .required(),
      imdbId: Yup.string()
        .required(),
    })}
    onSubmit={(values) => {
      onAdd(values);
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
