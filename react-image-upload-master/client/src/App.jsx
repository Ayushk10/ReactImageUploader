import React from 'react';
import Buttons from './Buttons';
import Footer from './Footer';
import Carousel from './Carousel';
import './App.css';

class App extends React.Component {
  state = {
    images: [],
    isModalOpen: false,
  }
  // close modal (set isModalOpen, false)
	closeModal = (e) => {
    e.preventDefault();
    this.setState({
      isModalOpen: false,
    });
  }
	// open modal (set isModalOpen, true)
	openModal = () => {
		this.setState({
			isModalOpen: true
		});
	}

  toast = msg =>{
    alert(msg);
  }
  onChange = e => {
    const errs = [];
    const files = Array.from(e.target.files);
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        images: [...this.state.images, reader.result]
      });
    }

    reader.readAsDataURL(file)

    const types = ['image/png', 'image/jpeg', 'image/gif']
/***File validations for size length format */
    files.forEach((file, i) => {
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`)
      }

      // if (file.size > 150000) {
      //   errs.push(`'${file.name}' is too large, please pick a smaller file`)
      // }
    })

    if (errs.length) {
      return errs.forEach(err => this.toast(err))
    }
  }

  render() {
    const { images } = this.state;
    return (
      <React.Fragment>
        <header>
          <div className="header">Image Uploader App</div>
        </header>
        <div className='container'>
          <div className='buttons'>
          <Buttons onChange={this.onChange} />
          </div>
          {images.length > 0 ?
          <Carousel slides={images} openModal={this.openModal} closeModal={this.closeModal} isModalOpen={this.state.isModalOpen} />
          : <div className="loader"></div>
          }
          <Footer />
        </div>
      </React.Fragment>
    )
  }
}

export default App;