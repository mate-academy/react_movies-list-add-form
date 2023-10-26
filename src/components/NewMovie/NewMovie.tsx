import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newValue: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // const [title, setTitle] = useState('');
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  // const [description, setDescription] = useState('');

  // const [imgUrl, setImgUrl] = useState('');

  // const [imdbUrl, setImdbUrl] = useState('');

  // const [imdbId, setImdbId] = useState('');

  // const initialValues = {
  //   title: '',
  //   description: '',
  //   imgUrl: '',
  //   imdbUrl: '',
  //   imdbId: '',
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const ifEmptyFields = () => {
    if (
      !newMovie.title.trim()
      || !newMovie.imgUrl.trim()
      || !newMovie.imdbUrl.trim()
      || !newMovie.imdbId.trim()
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !newMovie.title.trim()
      || !newMovie.imgUrl.trim()
      || !newMovie.imdbUrl.trim()
      || !newMovie.imdbId.trim()
    ) {
      return;
    }

    setCount(count + 1);
    onAdd(newMovie);
    // onAdd({
    //   title: newMovie.title,
    //   description: newMovie.description,
    //   imgUrl: newMovie.imgUrl,
    //   imdbUrl: newMovie.imdbUrl,
    //   imdbId: newMovie.imdbId,
    // });

    // resetMovieValues();
    setNewMovie((prev) => ({
      ...prev,
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));
    // setCount(count + 1);
    // setTitle('');
    // setDescription('');
    // setImgUrl('');
    // setImdbUrl('');
    // setImdbId('');
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(v) => {
          handleChange(v);
          ifEmptyFields();
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(v) => handleChange(v)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(v) => {
          handleChange(v);
          ifEmptyFields();
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(v) => {
          handleChange(v);
          ifEmptyFields();
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(v) => {
          handleChange(v);
          ifEmptyFields();
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
