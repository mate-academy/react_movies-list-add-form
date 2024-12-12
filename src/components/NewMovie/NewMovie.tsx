import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(() => count + 1);
    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });
  }

  type Input = [string, string, string, (value: string) => void, boolean];

  const inputList: Input[] = [
    ['title', 'Title', title, setTitle, true],
    ['description', 'Description', description, setDescription, false],
    ['imgUrl', 'Image URL', imgUrl, setImgUrl, true],
    ['imdbUrl', 'Imdb URL', imdbUrl, setImdbUrl, true],
    ['imdbId', 'Imdb ID', imdbId, setImdbId, true],
  ];

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      {inputList.map(field => {
        return (
          <TextField
            key={field[0]}
            name={field[0]}
            label={field[1]}
            value={field[2]}
            handleChange={field[3]}
            required={field[4]}
          />
        );
      })}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
