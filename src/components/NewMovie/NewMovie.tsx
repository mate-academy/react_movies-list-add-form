import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import React, { useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  function resetForm(): void {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  function submitHelper(ev: React.FormEvent): void {
    const formObj = { title, description, imgUrl, imdbUrl, imdbId };

    ev.preventDefault();
    onAdd(formObj);
    resetForm();
  }

  function validation(
    currTitle: string,
    currImgUrl: string,
    currImdbUrl: string,
    currImdbId: string,
  ): boolean {
    if (
      !currTitle.trim() ||
      !currImgUrl.trim() ||
      !currImdbUrl.trim() ||
      !currImdbId.trim()
    ) {
      return true;
    }

    return false;
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={ev => {
        submitHelper(ev);
        setCount(count + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newTitle: string) => {
          setTitle(newTitle);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newDescription: string) => {
          setDescription(newDescription);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newImgUrl: string) => {
          setImgUrl(newImgUrl);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newImdbUrl: string) => {
          setImdbUrl(newImdbUrl);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newImdbId: string) => {
          setImdbId(newImdbId);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={validation(title, imgUrl, imdbUrl, imdbId)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
