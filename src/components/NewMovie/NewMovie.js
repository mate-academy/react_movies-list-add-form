import React, { Component } from 'react';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

    onLabelChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  
  //roma

  onSubmit = (e) => {
    
    e.preventDefault();

    if(this.state.title == '' ||
      this.state.description == '' ||
      this.state.imgUrl=='' ||
      this.state.imdbUrl=='' ||
      this.state.imdbId == '')
      
     {
      return;
    }
      // if(this.state.label === '') {

    //     this.setState({
    //       inputValue: 'true',
    //       emptyValue: 'true'
  
    //     });
    //     return;
    //   }
    //   this.setState({
    //     emptyValue: 'true'

    //   });
   
    //   return;
    // };

    // if(this.state.label === '') {
    //   this.setState({
    //     inputValue: 'true'

    //   });
    //   return;
    // }
    this.props.onItemAdded(this.state.title,
                           this.state.description,
                           this.state.imgUrl,
                           this.state.imdbUrl,
                           this.state.imdbId);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: ''
    });
    this.setState({
      emptyValue: false,
      inputValue: false
    });
  };

  render() {
    return (
      <>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" aria-describedby="emailHelp"
           onChange={this.onLabelChange}
           placeholder="Enter movie title"
           value={this.state.title} />
            <small id="emailHelp" class="form-text text-muted show">
              Enter the required information
            </small>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea class="form-control" id="description" rows="3"
          onChange={this.onLabelChange}
          placeholder="Enter movie description"
           value={this.state.description}></textarea>
           <small id="emailHelp" class="form-text text-muted show">Enter the required information</small>
        </div>
        <div className="form-group">
          <label for="imgUrl">Img Url</label>
          <input type="text" class="form-control show1" id="imgUrl" aria-describedby="emailHelp" 
          onChange={this.onLabelChange}
          placeholder="Enter an illustration for the movie"
           value={this.state.imgUrl}/>
            <small id="emailHelp" class="form-text text-muted show">Enter the required information</small>
        </div>
        <div className="form-group">
          <label for="imdbUrl">Imdb Url</label>
          <input type="text" class="form-control" id="imdbUrl" aria-describedby="emailHelp" 
          onChange={this.onLabelChange}
          placeholder="Enter an URL for the movie"
           value={this.state.imdbUrl}/>
            <small id="emailHelp" class="form-text text-muted show">Enter the required information</small>
        </div>
        <div className="form-group">
          <label for="imdbId">Imdb Id</label>
          <input type="text" class="form-control" id="imdbId" aria-describedby="emailHelp" 
          onChange={this.onLabelChange}
          placeholder="Enter a code for the movie"
           value={this.state.imdbId}/>
            <small id="emailHelp" class="form-text text-muted show">Enter the required information</small>
        </div>
              <button type="submit" class="btn btn-primary">Add movie</button>
      </form>
      </>
    );
  }
}
