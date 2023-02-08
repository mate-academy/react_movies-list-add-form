import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imbdURL, setImbdURL] = useState('');
  const [imbdID, setImbdID] = useState('');

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const validation = (inputField: string) => {
    return pattern.test(inputField);
  };

  const isDisabled
    = title === ''
    || imageURL === ''
    || imbdURL === ''
    || imbdID === ''
    || !validation(imbdURL)
    || !validation(imbdURL);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();

        onAdd({
          title,
          description,
          imgUrl: imageURL,
          imdbUrl: imbdURL,
          imdbId: imbdID,
        });

        setCount(prev => prev + 1);
        setTitle('');
        setDescription('');
        setImageURL('');
        setImbdID('');
        setImbdURL('');
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageURL}
        onChange={setImageURL}
        required
        callbackValidation={validation}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imbdURL}
        onChange={setImbdURL}
        required
        callbackValidation={validation}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imbdID}
        onChange={setImbdID}
        required
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
