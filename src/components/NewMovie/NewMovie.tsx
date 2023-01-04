import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, IncreaseCount] = useState(0);

  const defaultMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [fields, setFields] = useState(defaultMovie);

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isEnable = Object.entries(fields)
    .filter(field => field[0] !== 'description')
    .every(field => field[1].trim().length > 0);

  const fieldsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof Movie,
  ) => {
    setFields({
      ...fields,
      [field]: event.target.value,
    });
  };

  const handleClickButton = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const isValidImgUrl = fields.imgUrl.match(pattern);
    const isValidImdbUrl = fields.imdbUrl.match(pattern);

    if (!isValidImgUrl) {
      setFields({
        ...fields,
        imgUrl: 'Invalid URL',
      });

      return;
    }

    if (!isValidImdbUrl) {
      setFields({
        ...fields,
        imdbUrl: 'Invalid IMDB URL',
      });

      return;
    }

    onAdd(fields);

    setFields(defaultMovie);

    IncreaseCount(count + 1);
  };

  const {
    title,
    description,
    imgUrl,
    imdbId,
    imdbUrl,
  } = fields;

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => fieldsChange(event, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => fieldsChange(event, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => fieldsChange(event, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => fieldsChange(event, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => fieldsChange(event, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleClickButton}
            disabled={!isEnable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
