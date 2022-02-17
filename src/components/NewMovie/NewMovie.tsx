import React, { useState, useEffect } from 'react';

type Props = {
  addMovie: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  // const [titleValidation, setTitleValidation] = useState(false);
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [validationDataFields,
    setIvalidationDataFields,
  ] = useState('');
  const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const enterTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const enterDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const enterImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
  };

  const enterImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
  };

  const enterImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (validationDataFields === 'valid') {
      addMovie(movie);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setIvalidationDataFields('');
    }
  };

  useEffect(() => {
    if ([imgUrl, imdbUrl].every((item) => regex.test(item))) {
      setIvalidationDataFields('valid');
    }
  }, [title, description, imgUrl, imdbUrl, imdbId]);

  return (
    <form
      action="get"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={enterTitle}
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        value={description}
        onChange={enterDescription}
      />
      <input
        type="text"
        name="imgUrl"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={enterImgUrl}
      />
      <input
        type="text"
        name="imdbUrl"
        placeholder="imdbUrl"
        value={imdbUrl}
        onChange={enterImdbUrl}
      />
      <input
        type="text"
        name="imdbId"
        placeholder="imdbId"
        value={imdbId}
        onChange={enterImdbId}
      />
      <button
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
