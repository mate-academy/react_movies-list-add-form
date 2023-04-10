import { useState, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

enum MovieField {
  Title = 'title',
  Description = 'description',
  ImgUrl = 'imgUrl',
  ImdbUrl = 'imdbUrl',
  ImdbId = 'imdbId',
}

const emptyMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [{
    title, description, imgUrl, imdbUrl, imdbId,
  }, setFormFields] = useState<Movie>(emptyMovie);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const isURLValid = (url: string): boolean => pattern.test(url);
  const handleChange = (name: MovieField, newValue: string) => {
    const updatedFormFields = {
      title, description, imgUrl, imdbUrl, imdbId, [name]: newValue,
    };
    const isTitleValid = updatedFormFields.title.length > 0;
    const isImgUrlValid = isURLValid(updatedFormFields.imgUrl);
    const isImdbUrlValid = isURLValid(updatedFormFields.imdbUrl);
    const isImdbIdValid = updatedFormFields.imdbId.length > 0;

    setFormFields(updatedFormFields);
    setIsFormValid(
      isTitleValid && isImgUrlValid && isImdbUrlValid && isImdbIdValid,
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({
      title, description, imgUrl, imdbUrl, imdbId,
    });
    setFormFields(emptyMovie);
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>
      <TextField
        name={MovieField.Title}
        label="Title"
        value={title}
        onChange={(newValue) => handleChange(MovieField.Title, newValue)}
        required
      />
      <TextField
        name={MovieField.Description}
        label="Description"
        value={description}
        onChange={(newValue) => handleChange(MovieField.Description, newValue)}
      />
      <TextField
        name={MovieField.ImgUrl}
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => handleChange(MovieField.ImgUrl, newValue)}
        required
      />
      <TextField
        name={MovieField.ImdbUrl}
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => handleChange(MovieField.ImdbUrl, newValue)}
        required
      />
      <TextField
        name={MovieField.ImdbId}
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => handleChange(MovieField.ImdbId, newValue)}
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
