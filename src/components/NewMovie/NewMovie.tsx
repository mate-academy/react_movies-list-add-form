import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (currentState: Movie) => void,
};

export const NewMovie:React.FC<Props> = ({
  onAdd,
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [objMovie, setObjMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const areAllFieldsFilledIn = (obj: Movie) => {
    if (
      obj.title.trim() === ''
      || obj.imdbId.trim() === ''
      || obj.imdbUrl.trim() === ''
      || obj.imgUrl.trim() === '') {
      return true;
    }

    return false;
  };

  const onSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (areAllFieldsFilledIn(objMovie)) {
      return;
    }

    setCount(count + 1);

    setObjMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    onAdd(objMovie);
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
        value={objMovie.title}
        onChange={title => setObjMovie(
          (prevState) => ({ ...prevState, title }),
        )}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={objMovie.description}
        onChange={description => setObjMovie(
          (prevState) => ({ ...prevState, description }),
        )}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={objMovie.imgUrl}
        onChange={imgUrl => setObjMovie(
          (prevState) => ({ ...prevState, imgUrl }),
        )}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={objMovie.imdbUrl}
        onChange={imdbUrl => setObjMovie(
          (prevState) => ({ ...prevState, imdbUrl }),
        )}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={objMovie.imdbId}
        onChange={imdbId => setObjMovie(
          (prevState) => ({ ...prevState, imdbId }),
        )}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={areAllFieldsFilledIn(objMovie)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
