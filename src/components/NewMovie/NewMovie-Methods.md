// clickOnTextarea = (event: React.MouseEvent<HTMLTextAreaElement>) => {
//   if (event.currentTarget.name === 'title') {
//     return this.setState({ isTitleEmpty: false });
//   }

//   if (event.currentTarget.name === 'description') {
//     return this.setState({ isDescriptionEmpty: false });
//   }

//   if (event.currentTarget.name === 'imgUrl') {
//     return this.setState({ isimgUrlEmpty: false });
//   }

//   if (event.currentTarget.name === 'imdbUrl') {
//     return this.setState({ isimdbUrlEmpty: false });
//   }

//   if (event.currentTarget.name === 'imdbId') {
//     return this.setState({ isimdbIdEmpty: false });
//   }

//   return '';
// };

// addMovieInfo = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//   const movieAtribut: MovieAtribut = event.target.name;

//   if (event.target.name === 'title') {
//     return this.setState({ [event.target.name]: event.target.value });
//   }

//   if (event.currentTarget.name === 'description') {
//     return this.setState({ description: event.currentTarget.value });
//   }

//   if (event.currentTarget.name === 'imgUrl') {
//     return this.setState({ imgUrl: event.currentTarget.value });
//   }

//   if (event.currentTarget.name === 'imdbUrl') {
//     return this.setState({ imdbUrl: event.currentTarget.value });
//   }

//   if (event.currentTarget.name === 'imdbId') {
//     return this.setState({ imdbId: event.currentTarget.value });
//   }

//   return '';
// };
