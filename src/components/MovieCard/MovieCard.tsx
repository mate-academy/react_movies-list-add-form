import React from 'react';
import './MovieCard.scss';

type Props = Movie;

export const MovieCard: React.FC<Props> = ({
  title, description, imgUrl, imdbUrl,
}) => {
  const titleToUpperCase = title.trim().split(' ')
    .map(word => (word[0].toUpperCase() + word.slice(1)))
    .join(' ');

  let descriptionToUpperCase = description;

  if (description.length > 0) {
    descriptionToUpperCase = description[0].toUpperCase()
      + description.slice(1);
  }

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={imgUrl}
            alt="Film logo"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src="images/imdb-logo.jpeg"
                alt="imdb"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-8">
              {titleToUpperCase}
            </p>
          </div>
        </div>

        <div className="content">
          {descriptionToUpperCase}
          <br />
          <a href={imdbUrl}>IMDB</a>
        </div>
      </div>
    </div>
  );
};
