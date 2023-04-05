import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (currentState: any) => void,
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
      obj.title === ''
      || obj.imdbId === ''
      || obj.imdbUrl === ''
      || obj.imgUrl === '') {
      return true;
    }

    return false;
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
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
      }}
    >
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={objMovie.title}
        onChange={titleOnInput => setObjMovie((currentState: Movie) => {
          return {
            ...currentState,
            title: titleOnInput,
          };
        })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={objMovie.description}
        onChange={titleOnInput => setObjMovie((currentState: Movie) => {
          return {
            ...currentState,
            description: titleOnInput,
          };
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={objMovie.imgUrl}
        onChange={titleOnInput => setObjMovie((currentState: Movie) => {
          return {
            ...currentState,
            imgUrl: titleOnInput,
          };
        })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={objMovie.imdbUrl}
        onChange={titleOnInput => setObjMovie((currentState: Movie) => {
          return {
            ...currentState,
            imdbUrl: titleOnInput,
          };
        })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={objMovie.imdbId}
        onChange={titleOnInput => setObjMovie((currentState: Movie) => {
          return {
            ...currentState,
            imdbId: titleOnInput,
          };
        })}
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
