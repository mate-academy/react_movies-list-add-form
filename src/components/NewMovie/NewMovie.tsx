import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { urlValidate } from '../../services/validate';
import { PostUrls } from '../../types/PostUrls';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imageUrlValue, setImageUrlValue] = useState('');
  const [imbdbUrlValue, setImbdbUrlValue] = useState('');
  const [imbdbIdValue, setImbdbIdValue] = useState('');

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title: titleValue,
      description: descriptionValue,
      imgUrl: imageUrlValue,
      imdbUrl: imbdbUrlValue,
      imdbId: imbdbIdValue,
    });

    setTitleValue('');
    setDescriptionValue('');
    setImageUrlValue('');
    setImbdbUrlValue('');
    setImbdbIdValue('');
    setCount(count + 1);
  };

  const isDisabled = !(
    titleValue.trim() && imageUrlValue.trim()
    && imbdbUrlValue.trim() && imbdbIdValue.trim()
    && !urlValidate(imageUrlValue, PostUrls.image)
    && !urlValidate(imbdbUrlValue, PostUrls.imdb)
  );

  return (
    <form className="NewMovie" key={count} onSubmit={handleSumbit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        required
        onChange={(newValue: string) => setTitleValue(newValue)}
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={(newValue: string) => setDescriptionValue(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrlValue}
        onChange={(newValue: string) => setImageUrlValue(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imbdbUrlValue}
        onChange={(newValue: string) => setImbdbUrlValue(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imbdbIdValue}
        onChange={(newValue: string) => setImbdbIdValue(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
