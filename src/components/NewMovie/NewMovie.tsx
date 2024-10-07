import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

const DEFAULT_FORM_VALUES = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formValues, setFormValues] = useState<Movie>({
    ...DEFAULT_FORM_VALUES,
  });

  const handleFormValueChange = (newValue: string, formFieldTitle: string) => {
    setFormValues(prevState => {
      return {
        ...prevState,
        [formFieldTitle]: newValue,
      };
    });
  };

  const isErrorsInForm =
    formValues.title &&
    formValues.imdbId &&
    formValues.imgUrl &&
    formValues.imdbUrl;

  const handleClearForm = () => {
    setFormValues({ ...DEFAULT_FORM_VALUES });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isErrorsInForm) {
      return;
    }

    onAdd({ ...formValues });
    setCount(prevState => prevState + 1);
    handleClearForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={(newValue: string, formTitle: string) =>
          handleFormValueChange(newValue.trimStart(), formTitle)
        }
        required
      />

      <TextField
        onChange={(newValue: string, formTitle: string) =>
          handleFormValueChange(newValue.trimStart(), formTitle)
        }
        name="description"
        label="Description"
        value={formValues.description}
      />

      <TextField
        onChange={(newValue: string, formTitle: string) =>
          handleFormValueChange(newValue.trimStart(), formTitle)
        }
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        required
      />

      <TextField
        onChange={(newValue: string, formTitle: string) =>
          handleFormValueChange(newValue.trimStart(), formTitle)
        }
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        required
      />

      <TextField
        onChange={(newValue: string, formTitle: string) =>
          handleFormValueChange(newValue.trimStart(), formTitle)
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
