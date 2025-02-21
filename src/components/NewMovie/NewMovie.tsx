import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

interface OnAdd {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: OnAdd) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [imgUrlValid, setImgUrlValid] = useState(false);
  const [imdbUrlValid, setImdbUrlValid] = useState(false);

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  function validationCheck() {
    if (title && imgUrl && imdbUrl && imdbId && imgUrlValid && imdbUrlValid) {
      return false;
    }

    return true;
  }

  function reset() {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    onAdd({ title, description, imgUrl, imdbUrl, imdbId });
    setCount(count + 1);
    reset();
  }

  return (
    <form className="NewMovie" key={count} onSubmit={submit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={text => setTitle(text)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={text => setDescription(text)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={url => {
          setImgUrl(url);

          if (pattern.test(url)) {
            setImgUrlValid(true);
          } else {
            setImgUrlValid(false);
          }
        }}
        required
        isUrlValid={imgUrlValid}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={url => {
          setImdbUrl(url);

          if (pattern.test(url)) {
            setImdbUrlValid(true);
          } else {
            setImdbUrlValid(false);
          }
        }}
        required
        isUrlValid={imdbUrlValid}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={id => setImdbId(id)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={validationCheck()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
