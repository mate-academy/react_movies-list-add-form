import { Button, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { isFieldRequired } from '../../utilities/validation';

type AddMovie = (obj: Movie) => void;

type Props = {
  addMovie: AddMovie,
};

interface IFormData {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({
    defaultValues: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  });

  const onSubmit = handleSubmit((data: IFormData) => {
    addMovie(data);
    reset();
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <Controller
        rules={{ required: isFieldRequired }}
        control={control}
        name="title"
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
            required
            error={Boolean(errors.title)}
            helperText={errors.title ? errors.title.message : ''}
          />
        )}
      />

      <Controller
        rules={{ required: isFieldRequired }}
        control={control}
        name="description"
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
            required
            error={Boolean(errors.description)}
            helperText={errors.description ? errors.description.message : ''}
          />
        )}
      />

      <Controller
        rules={{ required: isFieldRequired }}
        control={control}
        name="imgUrl"
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            label="Image Url"
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
            required
            error={Boolean(errors.imgUrl)}
            helperText={errors.imgUrl ? errors.imgUrl.message : ''}
          />
        )}
      />

      <Controller
        rules={{ required: isFieldRequired }}
        control={control}
        name="imdbUrl"
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            label="Imdb Url"
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
            required
            error={Boolean(errors.imdbUrl)}
            helperText={errors.imdbUrl ? errors.imdbUrl.message : ''}
          />
        )}
      />

      <Controller
        rules={{ required: isFieldRequired }}
        control={control}
        name="imdbId"
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-basic"
            label="Imdb Id"
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
            required
            error={Boolean(errors.imdbId)}
            helperText={errors.imdbId ? errors.imdbId.message : ''}
          />
        )}
      />
      <Button
        variant="contained"
        size="small"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        Add movie
      </Button>
    </form>
  );
};
