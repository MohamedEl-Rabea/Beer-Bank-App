import React, { Component } from 'react';
import BeerItem from './beerItem';

class itemsRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getRowItems = () => {
        let { items, favoriteList, handleFavoriteClick, handleItemClick } = this.props;
        let itemsResult = [];
        for (let index = 0; index < items.length; index++) {
            let currentItem = items[index];
            let isFavorite = favoriteList.findIndex(item => item.id === currentItem.id) > -1 ? true : false
            itemsResult.push(
                <BeerItem
                    key={currentItem.id}
                    item={currentItem}
                    handleFavoriteClick={handleFavoriteClick}
                    handleItemClick={handleItemClick}
                    isFavorite={isFavorite}
                />
            );
        }
        return itemsResult;
    }

    render() {
        return (
            <div className="row">
                {
                    this.getRowItems()
                }
            </div>
        );
    }
}

export default itemsRow;