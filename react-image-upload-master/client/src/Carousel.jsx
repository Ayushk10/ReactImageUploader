import React, { Component } from 'react';
import './carousel.css';
import Modal from './ModalContainer';

const CarouselLeftArrow=({onClick}) =>{
  return (
    <a
      href="#"
      className="carousel__arrow carousel__arrow--left"
      onClick={onClick}
    >
    </a>
  );
}

const CarouselRightArrow=({onClick}) =>{
  return (
    <a
      href="#"
      className="carousel__arrow carousel__arrow--right"
      onClick={onClick}
    >
    </a>
  );
}

const CarouselIndicator=({index,activeIndex,onClick}) =>{
  return (
    <li>
      <a
        className={
          index === activeIndex
            ? "carousel__indicator carousel__indicator--active"
            : "carousel__indicator"
        }
        onClick={onClick}
      />
    </li>
  );
}

const CarouselSlide=({index,activeIndex,slide,openModal}) =>{
  const handleImageClick = ()=>{
    openModal();
  }
  return (
    <li
      className={
        index === activeIndex
          ? "carousel__slide carousel__slide--active"
          : "carousel__slide"
      }
    >
      <img className="carousel-slide__content" src={slide} onClick={handleImageClick} />
    </li>
  );
}

// Carousel wrapper component
class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  goToSlide =(index)=> {
    this.setState({
      activeIndex: index
    });
  }

  goToPrevSlide=(e)=> {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length;
    if (index < 1) {
      index = slidesLength;
    }
    --index;
    this.setState({
      activeIndex: index
    });
  }

  goToNextSlide=(e)=> {
    e.preventDefault();
    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }
    ++index;
    this.setState({
      activeIndex: index
    });
  }

  render() {
    const {openModal, closeModal, isModalOpen, slides} = this.props;
    return (
      <React.Fragment>
      <div className="carousel">
        <CarouselLeftArrow onClick={e => this.goToPrevSlide(e)} />

        <ul className="carousel__slides">
          {slides.map((slide, index) =>
            <CarouselSlide
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              slide={slide}
              openModal={openModal}
            />
          )}
        </ul>

        <CarouselRightArrow onClick={e => this.goToNextSlide(e)} />

        <ul className="carousel__indicators">
          {this.props.slides.map((slide, index) =>
            <CarouselIndicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              isActive={this.state.activeIndex===index} 
              onClick={e => this.goToSlide(index)}
            />
          )}
        </ul>
      </div>
      <Modal openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen}
      image={slides[this.state.activeIndex]}/>
      </React.Fragment>
    );
  }
}

export default Carousel;