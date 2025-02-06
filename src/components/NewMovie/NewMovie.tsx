import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// import moviesFromServer from './api/movies.json';

type newMovieProps = {
  onAdd: (movie: Movie) => void;
}


export const NewMovie: React.FC<newMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isFormValid = title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(prev => prev + 1);
  }

  const urlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const validateUrl = (value: string) => {
    return urlRegex.test(value);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue: string) => {setTitle(newValue)}}
        required
      />

      <TextField
      name="description"
      label="Description"
      value={description}
      onChange={(newValue: string) => {setDescription(newValue)}}/>


      <TextField
      name="imgUrl"
      label="Image URL"
      value={imgUrl}
      onChange={(newValue: string) => {setImgUrl(newValue)}}
      required
      validation={validateUrl}
      />

      <TextField
      name="imdbUrl"
      label="Imdb URL"
      value={imdbUrl}
      onChange={(newValue: string) => {setImdbUrl(newValue)}}
      required
      validation={validateUrl}/>

      <TextField
      name="imdbId"
      label="Imdb ID"
      value={imdbId}
      onChange={(newValue: string) => {setImdbId(newValue)}}
      required/>

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
