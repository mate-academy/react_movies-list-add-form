import React, { ChangeEvent, useState } from 'react';
import { Movie, FieldType } from '../../types/typedefs';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void
};

const initialState = {
  [FieldType.TITLE]: '',
  [FieldType.DESCRIPTION]: '',
  [FieldType.IMAGEURL]: '',
  [FieldType.IMDBURL]: '',
  [FieldType.IMDBID]: '',
};

type FieldsState = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type UrlsState = {
  imgUrl: boolean;
  imdbUrl: boolean;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `FieldType`s
  const [count, increaseCount] = useState(0);
  const [buttonDisabled, disableButton] = useState(true);

  const [textFields, changeField] = useState(initialState);

  const [validUrls, setUrlValid] = useState({
    [FieldType.IMAGEURL]: false,
    [FieldType.IMDBURL]: false,
  });

  const isDataValid = (
    fieldsState: FieldsState,
    urlsState: UrlsState,
  ): boolean => {
    const { title, imdbId } = fieldsState;
    const { imdbUrl, imgUrl } = urlsState;

    return Boolean(title && imdbId && imdbUrl && imgUrl);
  };

  const handleUrlValidation = (fieldName: string, status: boolean): void => {
    setUrlValid((state) => {
      const newState = {
        ...state,
        [fieldName]: status,
      };

      const isValid = isDataValid(textFields, newState);

      disableButton(!isValid);

      return newState;
    });
  };

  const handleTextField = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    changeField((state) => {
      const newState = {
        ...state,
        [name]: value,
      };

      const isValid = isDataValid(newState, validUrls);

      disableButton(!isValid);

      return newState;
    });
  };

  const submitForm = () => {
    onAdd({
      ...textFields,
    });

    changeField(initialState);
    increaseCount(prev => prev + 1);
    disableButton(true);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        submitForm();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name={FieldType.TITLE}
        label="Title"
        value={textFields[FieldType.TITLE]}
        onChange={handleTextField}
        required
      />

      <TextField
        name={FieldType.DESCRIPTION}
        label="Description"
        value={textFields[FieldType.DESCRIPTION]}
        onChange={handleTextField}
      />

      <TextField
        name={FieldType.IMAGEURL}
        label="Image URL"
        value={textFields[FieldType.IMAGEURL]}
        isValid={validUrls[FieldType.IMAGEURL]}
        onChange={handleTextField}
        onValidation={handleUrlValidation}
        required
      />

      <TextField
        name={FieldType.IMDBURL}
        label="Imdb URL"
        value={textFields[FieldType.IMDBURL]}
        isValid={validUrls[FieldType.IMDBURL]}
        onChange={handleTextField}
        onValidation={handleUrlValidation}
        required
      />

      <TextField
        name={FieldType.IMDBID}
        label="Imdb ID"
        value={textFields[FieldType.IMDBID]}
        onChange={handleTextField}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={buttonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
