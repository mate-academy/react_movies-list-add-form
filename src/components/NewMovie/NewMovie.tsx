import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd?: (newMovie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({
  onAdd = () => {},
}) => {
  const [newFilm, setnewFilm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [count] = useState(0);

  const clearFields = () => {
    setnewFilm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const areFieldsFilled = () => {
    return newFilm.title.trim() && newFilm.imgUrl.trim()
    && newFilm.imdbUrl.trim() && newFilm.imdbId.trim();
  };

  const addNewFilm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const newFilmAdd: Movie = {
      title: newFilm.title,
      description: newFilm.description,
      imgUrl: newFilm.imgUrl,
      imdbUrl: newFilm.imdbUrl,
      imdbId: newFilm.imdbId,
    };

    event.preventDefault();

    clearFields();

    return newFilmAdd;
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newFilm.title}
        onChange={(value) => {
          setnewFilm({
            ...newFilm,
            title: value,
          });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newFilm.description}
        onChange={(value) => {
          setnewFilm({
            ...newFilm,
            description: value,
          });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newFilm.imgUrl}
        onChange={(value) => {
          setnewFilm({
            ...newFilm,
            imgUrl: value,
          });
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newFilm.imdbUrl}
        onChange={(value) => {
          setnewFilm({
            ...newFilm,
            imdbUrl: value,
          });
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newFilm.imdbId}
        onChange={(value) => {
          setnewFilm({
            ...newFilm,
            imdbId: value,
          });
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!areFieldsFilled()}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={(event) => {
              onAdd(addNewFilm(event));
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
