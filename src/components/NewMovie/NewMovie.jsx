/* eslint-disable default-case */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// eslint-disable-next-line
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgValid: true,
    imdbValid: true,
  };

  buttonCheck = Object.values(this.state).some(
    value => !value,
  );

  validateImgUrl = () => (
    this.setState(prevState => ({
      imgValid: regex.test(prevState.imgUrl),
    }))
  )

  validateImdbUrl = () => (
    this.setState(prevState => ({
      imdbValid: regex.test(prevState.imdbUrl),
    }))
  )

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });

    switch (name) {
      case 'imgUrl':
        this.validateImgUrl();
        break;

      case 'imdbUrl':
        this.validateImgUrl();
        break;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { addMovie } = this.props;

    const newMovie = {
      ...this.state,
    };

    addMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      imgValid,
      imdbValid,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Grid
          container
          spacing={2}
          direction="column"
        >
          <Grid item>
            <TextField
              name="title"
              required
              value={title}
              onChange={this.handleChange}
              id="standard-required"
              placeholder="Enter movie title"
            />
          </Grid>
          <Grid item>
            <TextField
              name="description"
              required
              value={description}
              onChange={this.handleChange}
              id="standard-required"
              placeholder="Enter movie description"
            />
          </Grid>
          <Grid item>
            <TextField
              name="imgUrl"
              required
              value={imgUrl}
              error={!imgValid && imgUrl !== ''}
              helperText={
                !imgValid
                && imgUrl !== ''
                && 'incorrect image URL'
              }
              onChange={this.handleChange}
              id="standard-required"
              placeholder="Enter image URL"
            />
          </Grid>
          <Grid item>
            <TextField
              name="imdbUrl"
              required
              value={imdbUrl}
              error={!imdbValid && imdbUrl !== ''}
              helperText={
                !imdbValid
                && imdbUrl !== ''
                && 'incorrect IMDB URL'
              }
              onChange={this.handleChange}
              id="standard-required"
              placeholder="Enter IMDB URL"
            />
          </Grid>
          <Grid item>
            <TextField
              name="imdbId"
              required
              value={imdbId}
              onChange={this.handleChange}
              id="standard-required"
              placeholder="Enter IMDB ID"
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={this.buttonCheck}
            >
              Add movie!
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: propTypes.func.isRequired,
};
