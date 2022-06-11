import React, { useState } from 'react';

import './NewMovie.scss';

interface Props {
  addMovie: (moviesList: Movie[]) => void;
  movies: Movie[];
}

export const NewMovie: React.FC<Props> = ({ addMovie, movies }) => {
  const [title, setTitle] = useState('');
  const [titleIsEmpty, setTitleIsEmpty] = useState(false);

  const [description, setDescription] = useState('');
  const [descriptionIsEmpty, setDescriptionIsEmpty] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlIsEmpty, setImgUrlIsEmpty] = useState(false);
  const [imgUrlIsValid, setImgUrlIsValid] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbUrlIsEmpty, setImdbUrlIsEmpty] = useState(false);
  const [imdbUrlIsValid, setImdbUrlIsValid] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [imdbIdIsEmpty, setImdbIdIsEmpty] = useState(false);

  const onAdd = (event: React.FormEvent) => {
    event.preventDefault();

    function validURL(str: string) {
      // eslint-disable-next-line max-len
      const pattern = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/); // fragment locator

      return !!pattern.test(str);
    }

    if (!title) {
      setTitleIsEmpty(true);
    }

    if (!description) {
      setDescriptionIsEmpty(true);
    }

    if (!imgUrl) {
      setImgUrlIsEmpty(true);
    }

    if (imgUrl !== '' && validURL(imgUrl)) {
      setImgUrlIsValid(true);
    }

    if (!imdbUrl) {
      setImdbUrlIsEmpty(true);
    }

    if (imdbUrl !== '' && validURL(imdbUrl)) {
      setImdbUrlIsValid(true);
    }

    if (!imdbId) {
      setImdbIdIsEmpty(true);
    }

    if (title
      && description
      && imgUrl
      && imgUrlIsValid
      && imdbUrl
      && imdbUrlIsValid
      && imdbId) {
      const mowieToAdd = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      const newListOfMovies = [mowieToAdd, ...movies];

      addMovie(newListOfMovies);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImgUrlIsValid(false);
      setImdbUrlIsValid(false);
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <>
      <form
        className="add-movie-form"
        onSubmit={onAdd}
      >
        <input
          type="text"
          name="title"
          className={`
          input
          ${titleIsEmpty
            && 'is-danger is-outlined empty-field'}`}
          placeholder="Enter the title here"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setTitleIsEmpty(false);
          }}
        />

        <textarea
          name="description"
          className={`
          textarea
          ${descriptionIsEmpty
            && 'is-danger is-outlined empty-field'}`}
          placeholder="Enter description here"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setDescriptionIsEmpty(false);
          }}
        />

        <input
          type="text"
          name="imgUrl"
          className={`
          input
          ${imgUrlIsEmpty
            && 'is-danger is-outlined empty-field'}`}
          placeholder="Enter poster link here"
          value={imgUrl}
          onChange={(event) => {
            setImgUrl(event.target.value);
            setImgUrlIsEmpty(false);
          }}
        />

        <input
          type="text"
          name="imdbUrl"
          className={`
          input
          ${imdbUrlIsEmpty
            && 'is-danger is-outlined empty-field'}`}
          placeholder="Enter url link to movie here"
          value={imdbUrl}
          onChange={(event) => {
            setImdbUrl(event.target.value);
            setImdbUrlIsEmpty(false);
          }}
        />

        <input
          type="text"
          name="imdbId"
          className={`
          input
          ${imdbIdIsEmpty
            && 'is-danger is-outlined empty-field'}`}
          placeholder="Enter imdb ID here"
          value={imdbId}
          onChange={(event) => {
            setImdbId(event.target.value);
            setImdbIdIsEmpty(false);
          }}
        />

        <button
          type="submit"
          className="
          button
          is-primary
          is-outlined"
        >
          Add movie
        </button>
      </form>

      <section
        className="section"
      >
        <p>
          Hello! Here you can simply find a link to try adding a new movie.
          Or you can go straight to the IMDB site and grab links from there.
          If you enter at least one invalid link, the movie card will not be
          added, but I am still thinking how to show you the link error.
        </p>

        <p>
          Title:
          <span className="has-text-info">{' Notting Hill'}</span>
        </p>

        <p>
          Description:
          <span
            className="has-text-info"
          >
            {' The life of a simple bookshop owner changes when he meets'
              + 'the most famous film star in the world.'}
          </span>
        </p>

        <p>
          URL link to Poster:
          <span
            className="has-text-info"
          >
            {' https://m.media-amazon.com/images/M/MV5BMTE5OTkwYzYtNDhlNC00M'
              + 'zljLTk1YTktY2IxZjliZmNjMjUzL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVy'
              + 'MTQxNzMzNDI@._V1_.jpg'}
          </span>
        </p>

        <p>
          URL link to movie:
          <span
            className="has-text-info"
          >
            {' https://www.imdb.com/title/tt0125439/?ref_=tt_sims_tt_i_3'}
          </span>
        </p>

        <p>
          ID:
          <span
            className="has-text-info"
          >
            {' tt0125439'}
          </span>
        </p>
      </section>
    </>
  );
};
