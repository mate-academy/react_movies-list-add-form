import React from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  formValues: Movie;
  count: number;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (title: string, string: string) => void;
  isErrorsInForm: string;
}

export const NewMovieForm: React.FC<Props> = ({
  onChange,
  count,
  onSubmit,
  formValues,
  isErrorsInForm,
}) => {
  return (
    <form className="NewMovie" key={count} onSubmit={event => onSubmit(event)}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={(newValue: string, formTitle: string) =>
          onChange(newValue, formTitle)
        }
        required
      />

      <TextField
        onChange={(newValue: string, formTitle: string) =>
          onChange(newValue, formTitle)
        }
        name="description"
        label="Description"
        value={formValues.description}
      />

      <TextField
        onChange={(newValue: string, formTitle: string) =>
          onChange(newValue, formTitle)
        }
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        required
      />

      <TextField
        onChange={(newValue: string, formTitle: string) =>
          onChange(newValue, formTitle)
        }
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        required
      />

      <TextField
        onChange={(newValue: string, formTitle: string) =>
          onChange(newValue, formTitle)
        }
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isErrorsInForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
