import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [data, setData] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isFormInvalid =
    !data.title.trim() ||
    !data.imgUrl.trim() ||
    !data.imdbUrl.trim() ||
    !data.imdbId.trim() ||
    !pattern.test(data.imgUrl) ||
    !pattern.test(data.imdbUrl);

  function reset() {
    setData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isFormInvalid) {
      return;
    }

    onAdd(data);
    reset();
    setCount(prev => prev + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={data.title}
        onChange={value => {
          setData(prev => ({ ...prev, title: value }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={data.description}
        onChange={value => {
          setData(prev => ({ ...prev, description: value }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={data.imgUrl}
        onChange={value => {
          setData(prev => ({ ...prev, imgUrl: value }));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={data.imdbUrl}
        onChange={value => {
          setData(prev => ({ ...prev, imdbUrl: value }));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={data.imdbId}
        onChange={value => {
          setData(prev => ({ ...prev, imdbId: value }));
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFormInvalid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
