import { FC, FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { trimValues } from '../../components/utils/trimValues';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  // const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };

  const handleImageUrlChange = (newValue: string) => {
    setImgUrl(newValue);
  };

  const handleImdbUrlChange = (newValue: string) => {
    setImdbUrl(newValue);
  };

  const handleImdbIdChange = (newValue: string) => {
    setImdbId(newValue);
  };

  const invalidValidation = !title || !imgUrl || !imdbUrl || !imdbId;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (invalidValidation) {
      return;
    }

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(trimValues(newMovie));
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    // setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      // key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImageUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={invalidValidation}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
