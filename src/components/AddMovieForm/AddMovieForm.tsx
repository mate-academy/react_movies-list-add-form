import React from 'react';

import { Input } from '../Input';

interface Props {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (movie: Movie) => void;
  onReset: () => void;
}

export const AddMovieForm: React.FC<Props> = (props) => {
  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
    onChange,
    onReset,
  } = props;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { onAdd } = props;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);
    onReset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Input
        isRequired
        pattern="^[A-Za-z0-9]+$"
        className="rounded border border-secondary mb-2 py-2 w-100"
        placeholder="Title"
        type="text"
        name="title"
        value={title}
        onChange={onChange}
      />

      <Input
        isRequired={false}
        pattern="^[A-Za-z0-9]+$"
        className="rounded border border-secondary mb-2 py-2 w-100"
        placeholder="Description"
        type="text"
        name="description"
        value={description}
        onChange={onChange}
      />

      <Input
        isRequired
        pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
        className="rounded border border-secondary mb-2 py-2 w-100"
        placeholder="Image URL"
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={onChange}
      />

      <Input
        isRequired
        pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
        className="rounded border border-secondary mb-2 py-2 w-100"
        placeholder="IMDB URL"
        type="text"
        name="imdbUrl"
        value={imdbUrl}
        onChange={onChange}
      />

      <Input
        isRequired
        pattern="^[t][t][0-9]{7,9}"
        className="rounded border border-secondary mb-2 py-2 w-100"
        placeholder="IMDB ID"
        type="text"
        name="imdbId"
        value={imdbId}
        onChange={onChange}
      />

      <button
        className="rounded border bg-primary text-light py-2"
        type="submit"
      >
        Add a movie
      </button>
    </form>
  );
};
