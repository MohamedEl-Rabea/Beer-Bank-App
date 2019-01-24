import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BeerItem from './beerItem';

const Modal = ({ handleClose, show, modalData }) => {

    let recommenedItems = [];
    let { recommenedList = [], clickedItem = {} } = modalData ? modalData : {};
    for (let index = 0; index < recommenedList.length; index++) {
        let currentItem = recommenedList[index];
        recommenedItems.push(
            <BeerItem
                key={currentItem.id}
                item={currentItem}
                showFavoriteIcon={false}
            />)
    }

    return (
        <div className={show ? "modal display-block" : "modal display-none"} onClick={handleClose}>
            <section className="modal-main" onClick={(event) => event.stopPropagation()}>
                <div className="container">
                    <div className="close-icon">
                        <FontAwesomeIcon icon="times" onClick={handleClose} />
                    </div>
                    <div className="row popup-beer-info-margin">
                        <div className="col-sm-2">
                            <img
                                height="80%"
                                width="120"
                                src={clickedItem.image_url}
                                alt={clickedItem.name} />
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-9">
                            <h3 className="title-color">
                                <strong>{clickedItem.name}</strong>
                            </h3>
                            <p className="card-text subtitle-color">{clickedItem.tagLine}</p>
                            <hr className="seperator" />
                            <p className="header-popup-beer-info">
                                <strong>IBU:</strong><small>{clickedItem.ibu}</small>
                                <strong>ABV:</strong><small>{clickedItem.abv}</small>
                                <strong>EBC:</strong><small>{clickedItem.ebc}</small>
                            </p>
                            <p className="subtitle-color">
                                {
                                    clickedItem.description
                                }
                            </p>
                            <h5 className="subtitle-color">
                                <strong>Best served with:</strong>
                            </h5>
                            <ul className="subtitle-color">
                                {
                                    clickedItem.food_pairing && clickedItem.food_pairing.map(item => <li>{item}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h3 className="title-color">
                                <strong>You might also like:</strong>
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        {
                            recommenedItems
                        }
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Modal;