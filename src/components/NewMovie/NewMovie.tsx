import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  description?: string;
};


type Props = {
  onAdd: (movie: Movie) => void;
  };

const URL_PATTERN = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');
  const [count, setCount] = useState(0);

  const [isImgUrlValid, setIsImgUrlValid] = useState(true);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(true);

  const handleTitleChange = (newValue: string) => {
  setTitle(newValue);
  };
  const handleImgUrlChange = (newValue: string) => {
    setImgUrl(newValue);
    setIsImgUrlValid(newValue.trim() === '' || URL_PATTERN.test(newValue));
  };

  const handleImdbUrlChange = (newValue: string) => {
    setImdbUrl(newValue);

    setIsImdbUrlValid(newValue.trim() === '' || URL_PATTERN.test(newValue));

  };
  const handleImdbIdChange = (newValue: string) => {
  setImdbId(newValue);
  };
  const handleDescriptionChange = (newValue: string) => {
  setDescription(newValue);
  };
  const isFormValid =
    title.trim() !== '' &&
    imgUrl.trim() !== '' &&
    imdbUrl.trim() !== '' &&
    imdbId.trim() !== '' &&
    isImgUrlValid &&
    isImdbUrlValid;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const newMovie = {
        title: title,
        imgUrl: imgUrl,
        imdbUrl: imdbUrl,
        imdbId: imdbId,
      }

     if (!isFormValid) {
      return;
    }
      onAdd(newMovie);
      setTitle('')
      setImgUrl('')
      setImdbUrl('')
      setImdbId('')
      setDescription('')
      setIsImgUrlValid(true);
      setIsImdbUrlValid(true);
      setCount(prevCount => prevCount + 1);
    }
  }



  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
