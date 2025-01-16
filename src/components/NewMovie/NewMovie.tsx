import React, { useState } from 'react';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [errors, setErrors] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const validateField = (fieldName: string, value: string) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: !value.trim(),
    }));
  };

  const handleBlur = (fieldName: string, value: string) => {
    validateField(fieldName, value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setTitle(newValue);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;

    setDescription(newValue);
  };

  const handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setImgUrl(newValue);
  };

  const handleImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setImdbUrl(newValue);
  };

  const handleImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setImdbId(newValue);
  };

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    setCount(count + 1);
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
    setTitle('');
  };

  const isSubmitDisabled = !title || !imgUrl || !imdbUrl || !imdbId;

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue =>
          handleTitleChange({
            target: { value: newValue },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        onBlur={() => handleBlur('title', title)}
        error={errors.title}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue =>
          handleDescriptionChange({
            target: { value: newValue },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newValue =>
          handleImgUrlChange({
            target: { value: newValue },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        onBlur={() => handleBlur('imgUrl', imgUrl)}
        error={errors.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newValue =>
          handleImdbUrlChange({
            target: { value: newValue },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        onBlur={() => handleBlur('imdbUrl', imdbUrl)}
        error={errors.imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newValue =>
          handleImdbIdChange({
            target: { value: newValue },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        onBlur={() => handleBlur('imdbId', imdbId)}
        error={errors.imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
