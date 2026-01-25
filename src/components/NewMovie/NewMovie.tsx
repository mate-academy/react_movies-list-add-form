import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie = ({ onAdd }: { onAdd: (movie: Movie) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count] = useState(0);
  const [touchedFields, setTouchedFields] = useState({
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setTouchedFields({
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
        touched={touchedFields.title}
        onTouched={touched =>
          setTouchedFields({ ...touchedFields, title: touched })
        }
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        touched={touchedFields.description}
        onTouched={touched =>
          setTouchedFields({ ...touchedFields, description: touched })
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={setImgUrl}
        touched={touchedFields.imgUrl}
        onTouched={touched =>
          setTouchedFields({ ...touchedFields, imgUrl: touched })
        }
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={setImdbUrl}
        touched={touchedFields.imdbUrl}
        onTouched={touched =>
          setTouchedFields({ ...touchedFields, imdbUrl: touched })
        }
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={setImdbId}
        touched={touchedFields.imdbId}
        onTouched={touched =>
          setTouchedFields({ ...touchedFields, imdbId: touched })
        }
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
