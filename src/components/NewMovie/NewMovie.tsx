import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  setNewFilm: React.Dispatch<React.SetStateAction<Movie | null>>;
};

export const NewMovie: React.FC<Props> = ({ setNewFilm }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleField, setTitleField] = useState('');
  const [descrField, setDescrField] = useState('');
  const [imgUrlField, setImgUrlField] = useState('');
  const [imdbUrlField, setImdbUrlField] = useState('');
  const [imdbIdField, setImbdField] = useState('');
  const [submitReady, setSubmitReady] = useState(false);

  const buttonHandler = () => {
    if (titleField !== ''
      && imgUrlField !== ''
      && imdbUrlField !== ''
      && imdbIdField !== ''
    ) {
      setSubmitReady(true);
    } else {
      setSubmitReady(false);
    }
  };

  useEffect(() => {
    buttonHandler();
  }, [titleField, imgUrlField, imdbUrlField, imdbIdField]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!submitReady) {
      return;
    }

    const newFilm: Movie = {
      title: titleField,
      description: descrField ?? '',
      imgUrl: imgUrlField,
      imdbUrl: imdbUrlField,
      imdbId: imdbIdField,
    };

    setNewFilm(newFilm);

    setTitleField('');
    setDescrField('');
    setImgUrlField('');
    setImdbUrlField('');
    setImbdField('');
    setSubmitReady(false);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={
        handleSubmit
      }
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleField}
        onChange={
          setTitleField
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descrField}
        onChange={
          setDescrField
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlField}
        onChange={
          setImgUrlField
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlField}
        onChange={
          setImdbUrlField
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdField}
        onChange={
          setImbdField
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!submitReady}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
