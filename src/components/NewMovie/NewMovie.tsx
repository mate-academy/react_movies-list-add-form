import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie: React.FC<{ onAdd?: (movie: Movie) => void }> = ({
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [formKey, setFormKey] = useState(0);

  const isFormValid = Boolean(
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim(),
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedImgUrl = imgUrl.trim();
    const trimmedImdbUrl = imdbUrl.trim();
    const trimmedImdbId = imdbId.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedImgUrl || !trimmedImdbUrl || !trimmedImdbId) {
      return;
    }

    onAdd?.({
      title: trimmedTitle,
      description: trimmedDescription,
      imgUrl: trimmedImgUrl,
      imdbUrl: trimmedImdbUrl,
      imdbId: trimmedImdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
    setFormKey(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

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
