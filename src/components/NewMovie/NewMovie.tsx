import { Button, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  isFieldRequired, isValidUrl, minSymbol,
} from '../../utilities/validation';

type Props = {
  addMovie: (obj: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Movie>({
    defaultValues: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  });

  const onSubmit = handleSubmit((data: Movie) => {
    addMovie(data);
    reset();
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <Controller
        rules={{ required: isFieldRequired, minLength: minSymbol(4) }}
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
        rules={{ required: isFieldRequired, minLength: minSymbol(24) }}
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
            multiline
            rows={3}
            fullWidth
            required
            error={Boolean(errors.description)}
            helperText={errors.description ? errors.description.message : ''}
          />
        )}
      />

      <Controller
        rules={{ required: isFieldRequired, pattern: isValidUrl }}
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
        rules={{ required: isFieldRequired, pattern: isValidUrl }}
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
