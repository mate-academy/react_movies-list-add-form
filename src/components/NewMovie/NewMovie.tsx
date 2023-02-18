/* eslint-disable no-alert */
import { useReducer, useState } from 'react';
import { DEFAULT_STATE_VALUE } from '../../constants/default-values';
import {
  IMDB_URL_ERROR_MESSAGE,
  IMG_URL_ERROR_MESSAGE,
} from '../../constants/error-messages';
import { Type } from '../../ENUM/Type';
import { isUrlValid } from '../../helpers/is-url-valid';
import { Movie } from '../../types/Movie';
import { reducer } from '../Reducer/Reducer';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const AddMovieForm: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, dispatch] = useReducer(reducer, DEFAULT_STATE_VALUE);
  const [count, setCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isUrlValid(newMovie.imgUrl) || !isUrlValid(newMovie.imdbUrl)) {
      dispatch({ type: Type.RESET });

      return !isUrlValid(newMovie.imgUrl)
        ? alert(IMG_URL_ERROR_MESSAGE)
        : alert(IMDB_URL_ERROR_MESSAGE);
    }

    onAdd(newMovie);
    dispatch({ type: Type.RESET });

    return setCount(prevCount => prevCount + 1);
  };

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = newMovie;

  const isAddButtonDisabled = (title.trim()
  && imgUrl && imdbUrl && imdbId);

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
        onChange={(text) => {
          dispatch({
            type: Type.TITLE,
            newTitle: text,
          });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(text) => {
          dispatch({
            type: Type.DESCRIPTION,
            newDescription: text,
          });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(text) => {
          dispatch({
            type: Type.IMGURL,
            newImgUrl: text,
          });
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(text) => {
          dispatch({
            type: Type.IMDBURL,
            imdbUrl: text,
          });
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(text) => {
          dispatch({
            type: Type.IMDBID,
            imdbId: text,
          });
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAddButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
