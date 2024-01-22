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
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const addTitle = (textInput: string) => {
    setTitle(textInput)
  };

  const addDescription = (textInput: string) => {
    setDescription(textInput);
  };

  const addImgUrl = (textInput: string) => {
    setImgUrl(textInput);
  };

  const addImdbUrl = (textInput: string) => {
    setImdbUrl(textInput);
  };

  const addImdbId = (textInput: string) => {
    setImdbId(textInput);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = title.trim()
    if (!trimmedTitle) { 
      setTitle('');
    
       return;
    } 

    onAdd({
      title: trimmedTitle,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
    setCount(count + 1);
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
        value={title}
        onChange={addTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={addDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={addImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={addImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={addImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          {title !== '' && imgUrl !== ''
          && imdbUrl !== '' && imdbId !== ''
            ? (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
              >
                Add
              </button>
            ) : (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
                disabled
              >
                Add
              </button>
            )}
        </div>
      </div>
    </form>
  );
};
