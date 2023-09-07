import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({
  onAdd = () => { },
}) => {
  const [count, setCount] = useState(0);
  const [movieFields, setMovieFields] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const isButtonDisabled = !movieFields.title
    || !movieFields.imgUrl
    || !movieFields.imdbUrl
    || !movieFields.imdbId;

  const handleSubmit = () => {
    setMovieFields({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(currCount => (currCount + 1));

    onAdd(movieFields);
  };

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
        value={movieFields.title}
        onChange={newValue => (
          setMovieFields(currFields => ({
            ...currFields,
            title: newValue,
          })))}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieFields.description}
        onChange={newValue => (
          setMovieFields(currFields => ({
            ...currFields,
            description: newValue,
          })))}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieFields.imgUrl}
        onChange={newValue => (
          setMovieFields(currFields => ({
            ...currFields,
            imgUrl: newValue,
          })))}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieFields.imdbUrl}
        onChange={newValue => (
          setMovieFields(currFields => ({
            ...currFields,
            imdbUrl: newValue,
          })))}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieFields.imdbId}
        onChange={newValue => (
          setMovieFields(currFields => ({
            ...currFields,
            imdbId: newValue,
          })))}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
