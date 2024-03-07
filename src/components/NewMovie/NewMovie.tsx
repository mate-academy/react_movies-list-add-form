import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [newCard, setNewCard] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [neccesarlyField, setNeccesarlyField] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(newCard);
    setCount(count + 1);
    setNeccesarlyField({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  function cheeckBeforeSubmit() {
    if (Object.values(neccesarlyField).some(item => item.trim() === '')) {
      return true;
    }

    return false;
  }

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value=""
        onChange={newValue => {
          setNewCard(prevState => ({
            ...prevState,
            title: newValue,
          }));
          setNeccesarlyField(prevState => ({
            ...prevState,
            title: newValue,
          }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value=""
        onChange={newValue => {
          setNewCard(prevState => ({
            ...prevState,
            description: newValue,
          }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value=""
        required
        onChange={newValue => {
          setNewCard(prevState => ({
            ...prevState,
            imgUrl: newValue,
          }));
          setNeccesarlyField(prevState => ({
            ...prevState,
            imgUrl: newValue,
          }));
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value=""
        required
        onChange={newValue => {
          setNewCard(prevState => ({
            ...prevState,
            imdbUrl: newValue,
          }));
          setNeccesarlyField(prevState => ({
            ...prevState,
            imdbUrl: newValue,
          }));
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value=""
        required
        onChange={newValue => {
          setNewCard(prevState => ({
            ...prevState,
            imdbId: newValue,
          }));
          setNeccesarlyField(prevState => ({
            ...prevState,
            imdbId: newValue,
          }));
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={cheeckBeforeSubmit()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
