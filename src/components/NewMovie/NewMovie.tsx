import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const onChange = (inputType: string) => {
    switch (inputType) {
      case 'title': {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value);
        };
      }

      case 'description': {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(event.target.value);
        };
      }

      case 'imgUrl': {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
          setImgUrl(event.target.value);
        };
      }

      case 'imdbUrl': {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
          setImdbUrl(event.target.value);
        };
      }

      case 'imdbId': {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
          setImdbId(event.target.value);
        };
      }

      default: throw new Error('undefined statement');
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(prev => prev + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={onChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={onChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={onChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={onChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={onChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !title.trim() || !imgUrl.trim()
              || !imdbUrl.trim() || !imdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
