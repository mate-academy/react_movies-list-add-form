import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie = ({ onAdd }: { onAdd: (movie: Movie) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [errors, setErrors] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleBlur = (field: string, value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: `${field} is required`,
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: '',
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isFormValid =
      title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

    if (!isFormValid) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  const isDisabled =
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(event.target.value)
        }
        onBlur={() => handleBlur('title', title)}
        required
        error={errors.title}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(event.target.value)
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setImgUrl(event.target.value)
        }
        onBlur={() => handleBlur('imgUrl', imgUrl)}
        required
        error={errors.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setImdbUrl(event.target.value)
        }
        onBlur={() => handleBlur('imdbUrl', imdbUrl)}
        required
        error={errors.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setImdbId(event.target.value)
        }
        onBlur={() => handleBlur('imdbId', imdbId)}
        required
        error={errors.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
