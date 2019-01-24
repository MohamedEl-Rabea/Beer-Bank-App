import React, { Component } from 'react';
import Header from './header';
import Container from './container';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from './modal';
import { BrowserRouter, Route } from "react-router-dom";


library.add(faStar, faTimes);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.filterText = '';
    this.state.modalData = {};
    this.state.showFavorite = false;

  }
  handleSearchTextChange = (value) => {
    this.setState({ filterText: value });
  }

  handleItemClick = (clickedItem, recommenedList) => {
    this.setState({ showModal: true, modalData: { clickedItem, recommenedList } })
  }

  hideModal = (event) => {
    event.stopPropagation()
    this.setState({ showModal: false });
  }
  handleLinkClick = (isFavorite) => {
    this.setState({ showFavorite: isFavorite });
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header handleSearchTextChange={this.handleSearchTextChange} handleLinkClick={this.handleLinkClick} />
          {
            this.state.showFavorite ?
              <Container
                filterText={this.state.filterText}
                handleItemClick={this.handleItemClick}
                showFavorite={this.state.showFavorite}
              />
              :
              <Container
                filterText={this.state.filterText}
                handleItemClick={this.handleItemClick}
              />
          }
          <Modal
            show={this.state.showModal}
            handleClose={this.hideModal}
            modalData={this.state.modalData} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
