import React, { ChangeEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void
};

enum FieldType {
  TITLE = 'title',
  DESCRIPTION = 'description',
  IMAGEURL = 'imgUrl',
  IMDBURL = 'imdbUrl',
  IMDBID = 'imdbId',
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `FieldType`s
  const [count, increaseCount] = useState(0);
  const [buttonDisabled, disableButton] = useState(true);

  const [textFields, changeField] = useState({
    [FieldType.TITLE]: '',
    [FieldType.DESCRIPTION]: '',
    [FieldType.IMAGEURL]: '',
    [FieldType.IMDBURL]: '',
    [FieldType.IMDBID]: '',
  });

  const [validUrls, setUrlValid] = useState({
    [FieldType.IMAGEURL]: false,
    [FieldType.IMDBURL]: false,
  });

  const isDataValid = (): boolean => {
    const { title, imdbId } = textFields;
    const { imdbUrl, imgUrl } = validUrls;

    return Boolean(title && imdbId && imdbUrl && imgUrl);
  };

  const handleUrlValidation = (fieldName: string, status: boolean): void => {
    setUrlValid({
      ...validUrls,
      [fieldName]: status,
    });
  };

  const handleTextField = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    changeField({
      ...textFields,
      [name]: value,
    });

    disableButton(!isDataValid());
  };

  const submitForm = () => {
    onAdd({
      title: textFields[FieldType.TITLE],
      description: textFields[FieldType.DESCRIPTION],
      imgUrl: textFields[FieldType.IMAGEURL],
      imdbUrl: textFields[FieldType.IMDBURL],
      imdbId: textFields[FieldType.IMDBID],
    });

    changeField({
      [FieldType.TITLE]: '',
      [FieldType.DESCRIPTION]: '',
      [FieldType.IMAGEURL]: '',
      [FieldType.IMDBURL]: '',
      [FieldType.IMDBID]: '',
    });

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
