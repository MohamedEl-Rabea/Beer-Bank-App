import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BeerItem extends Component {

    handleFavoriteClick = () => {
        let { item, handleFavoriteClick } = this.props;
        if (handleFavoriteClick)
            handleFavoriteClick(item);
    }

    handleItemClick = () => {
        let { item, handleItemClick } = this.props;
        if (handleItemClick)
            handleItemClick(item);
    }

    render() {
        let { item, isFavorite, showFavoriteIcon = true } = this.props;
        return (
            <div className="col-lg-4 col-md-6 col-sm-12 card-margin">
                <div className={showFavoriteIcon ? "card" : "card modal-height"}>
                    <div className="favorite-icon">
                        {
                            showFavoriteIcon
                            &&
                            <FontAwesomeIcon
                                onClick={this.handleFavoriteClick}
                                icon="star"
                                color={isFavorite ? "#FFBD33" : ""} />
                        }
                    </div>
                    <img
                        className="card-image"
                        height="225"
                        width="75"
                        src={item.image_url}
                        alt={item.name + ' - ' + item.tagline}
                        onClick={this.handleItemClick}
                    />
                    <div className="card-body text-center">
                        <h6 className={showFavoriteIcon ?
                            "card-title title-color"
                            :
                            "card-title subtitle-color"}>
                            <strong>{item.name}</strong>
                        </h6>
                        {
                            showFavoriteIcon
                            &&
                            <p className="card-text subtitle-color">{item.tagline}</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default BeerItem;