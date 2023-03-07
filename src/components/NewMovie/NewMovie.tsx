import { useState, useEffect } from 'react';
import { TextField } from '../TextField';

type AddType = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const NewMovie = ({
  onAdd,
}: {
  onAdd: React.Dispatch<React.SetStateAction<AddType[]>>;
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleName, setTitleName] = useState('');
  const [descriptionName, setDescriptionName] = useState('');
  const [imgUrlName, setImgUrlName] = useState('');
  const [imdbUrlName, setImdbUrlName] = useState('');
  const [imdbIdName, setImdbIdName] = useState('');

  const [isDisabledButton, isDisabledButtonEdit] = useState(true);

  useEffect(() => {
    const isCanSubmit
      = titleName !== ''
      && imgUrlName !== ''
      && imdbUrlName !== ''
      && imdbIdName !== '';

    if (isCanSubmit) {
      isDisabledButtonEdit(false);
    } else {
      isDisabledButtonEdit(true);
    }
  }, [titleName, descriptionName, imgUrlName, imdbUrlName, imdbIdName]);

  const clearForm = () => {
    setTitleName('');
    setDescriptionName('');
    setImgUrlName('');
    setImdbUrlName('');
    setImdbIdName('');
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const newFilm = {
      title: titleName,
      description: descriptionName,
      imgUrl: imgUrlName,
      imdbUrl: imdbUrlName,
      imdbId: imdbUrlName,
    };

    setCount((oldCount) => oldCount + 1);

    onAdd((viewFilm) => [...viewFilm, newFilm]);
    clearForm();

    return false;
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleName}
        onChange={setTitleName}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionName}
        onChange={setDescriptionName}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlName}
        onChange={setImgUrlName}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlName}
        onChange={setImdbUrlName}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdName}
        onChange={setImdbIdName}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleSubmit}
            disabled={isDisabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
