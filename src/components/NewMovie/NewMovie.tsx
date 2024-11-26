import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie | undefined) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  function isFilled(a: string, b: string, c: string, d: string): boolean {
    if (
      a.trim().length > 0 &&
      b.trim().length > 0 &&
      c.trim().length > 0 &&
      d.trim().length > 0
    ) {
      return false;
    }

    return true;
  }

  function handleSubmit(
    title: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,
    description: string = '',
  ): Movie | undefined {
    if (!isFilled(titleValue, imgUrlValue, imdbUrlValue, imdbIdValue)) {
      setTitleValue('');
      setDescriptionValue('');
      setImgUrlValue('');
      setImdbUrlValue('');
      setImdbIdValue('');
      setCount(curCount => curCount + 1);

      return {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };
    }

    return;
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={e => {
        e.preventDefault();
        onAdd(
          handleSubmit(
            titleValue,
            imgUrlValue,
            imdbUrlValue,
            imdbIdValue,
            descriptionValue,
          ),
        );
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={setTitleValue}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={setDescriptionValue}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={setImgUrlValue}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={setImdbUrlValue}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={setImdbIdValue}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFilled(
              titleValue,
              imgUrlValue,
              imdbUrlValue,
              imdbIdValue,
            )}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
