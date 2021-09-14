import React, { Component } from 'react';
import { AddMovieForm } from '../AddMovieForm';
import 'bootstrap/dist/css/bootstrap.min.css';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  resetState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <AddMovieForm
        title={title}
        description={description}
        imgUrl={imgUrl}
        imdbUrl={imdbUrl}
        imdbId={imdbId}
        onChange={this.handleChange}
        onAdd={this.props.onAdd}
        onReset={this.resetState}
      />
    );
  }
}
