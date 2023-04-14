import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

export type AddMovieFunction = (movie: Movie) => void;

export const NewMovie = ({ onAdd }: { onAdd: AddMovieFunction }) => {
  // onAdd is a function here that sets a new state being called in onSumbit handler
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovieObj, setNewMovieObj] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  // now I need to form an object from all values in my form and wrap it in an obj

  const getFieldValue = (name: string) => (value: string) => {
    // function returns another function
    setNewMovieObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const getFieldValue2 = (name: string) => {
  //   // name='title'
  //   return function(value) {
  //     setNewMovieObj((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   };
  // };

  // const handleOnChange = (value) => {
  //   setNewMovieObj((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const isDisabled = !newMovieObj.imdbId
          || !newMovieObj.imdbUrl
          || !newMovieObj.imgUrl
          || !newMovieObj.title;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovieObj);
    setNewMovieObj({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovieObj.title}
        onChange={getFieldValue('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovieObj.description}
        onChange={getFieldValue('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovieObj.imgUrl}
        onChange={getFieldValue('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovieObj.imdbUrl}
        onChange={getFieldValue('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovieObj.imdbId}
        onChange={getFieldValue('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isDisabled}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
