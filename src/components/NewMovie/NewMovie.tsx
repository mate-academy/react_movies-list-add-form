import { FC, FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

const initialForm: Movie = {
  description: '',
  title: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(initialForm);

  const isFormFull =
    formData.title && formData.imgUrl && formData.imdbUrl && formData.imdbId;

  const handleReset = () => {
    setFormData(initialForm);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormFull) {
      return;
    }

    onAdd(formData);
    setCount(current => current + 1);
    handleReset();
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={event =>
          setFormData({ ...formData, title: event.trimStart() })
        }
        required
      />

      <TextField
        onChange={event =>
          setFormData({ ...formData, description: event.trimStart() })
        }
        name="description"
        label="Description"
        value={formData.description}
      />

      <TextField
        onChange={event =>
          setFormData({ ...formData, imgUrl: event.trimStart() })
        }
        required
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
      />

      <TextField
        onChange={event =>
          setFormData({ ...formData, imdbUrl: event.trimStart() })
        }
        required
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
      />

      <TextField
        onChange={event =>
          setFormData({ ...formData, imdbId: event.trimStart() })
        }
        required
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormFull}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
