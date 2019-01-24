import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import ItemsRow from './itemsRow';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.data = [];
        this.state.favoriteList = [];
        this.state.isLoading = true;
        this.pageNumber = 1;
        this.pageSize = 12;
        this.lastScrollTop = 0;
    }

    getPageData = (pageNumber, pageSize, filterText = '') => {
        let url = filterText === '' ?
            'https://api.punkapi.com/v2/beers?page=' + pageNumber + '&per_page=' + pageSize
            :
            'https://api.punkapi.com/v2/beers?page=' + pageNumber + '&per_page=' + pageSize
            + '&beer_name=' + filterText;
        fetch(url)
            .then(response => response.text())
            .then((resp) => {
                this.setState(prev => {
                    let data = JSON.parse(resp);
                    if (pageNumber === 1) {
                        return {
                            data: data,
                            isLoading: false,
                            isError: false
                        }
                    } else {
                        return {
                            data: prev.data.concat(data),
                            isLoading: false,
                            isError: false
                        }
                    }
                })
            })
            .catch(err => { this.setState({ error: err, isError: true }) });
    }

    handleScroll = () => {
        if (!this.props.showFavorite) {
            if (
                Math.ceil(window.innerHeight + document.documentElement.scrollTop)
                === document.documentElement.offsetHeight &&
                document.documentElement.scrollTop > this.lastScrollTop
            ) {
                this.pageNumber++;
                this.getPageData(this.pageNumber, this.pageSize, this.props.filterText);
            }
            this.lastScrollTop = document.documentElement.scrollTop;
        }
    }

    handleFavoriteClick = (clickedItem) => {
        this.setState(prev => {
            let itemIndex = prev.favoriteList.findIndex(item => item.id === clickedItem.id);
            if (itemIndex === -1) {
                NotificationManager.success(clickedItem.name + ' is added to favorites');
                return { favoriteList: prev.favoriteList.concat(clickedItem) }
            } else {
                NotificationManager.info(clickedItem.name + ' is removed from favorites');
                return { favoriteList: prev.favoriteList.filter(item => item.id !== clickedItem.id) }
            }
        })
    }

    getContainerRows = () => {
        let { data, favoriteList } = this.state;
        if (this.props.showFavorite === true) {
            data = favoriteList;
        }
        let rowsCount = Math.floor(data.length / 3) + (data.length % 3 > 0 ? 1 : 0);
        let rowsList = [];
        for (let index = 0; index < rowsCount; index++) {
            let startIndex = index * 3;
            let endIndex = startIndex + 3 <= data.length ? startIndex + 3 : data.length;
            rowsList.push(
                <ItemsRow
                    key={index}
                    favoriteList={favoriteList}
                    items={data.slice(startIndex, endIndex)}
                    handleFavoriteClick={this.handleFavoriteClick}
                    handleItemClick={this.handleItemClick}
                />);
        }
        return rowsList;
    }

    handleItemClick = (clickedItem) => {
        //get recommendedList from server by common yeast with the clicked item
        let recommendedList = [];
        fetch('https://api.punkapi.com/v2/beers?page=1&per_page=3&yeast=' + clickedItem.ingredients.yeast)
            .then(response => response.text())
            .then((resp) => {
                recommendedList = JSON.parse(resp);
                this.props.handleItemClick(clickedItem, recommendedList);
            })
            .catch(err => { this.setState({ error: err, isError: true }) });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filterText !== nextProps.filterText && nextProps.showFavorite !== true) {
            let pageNumber = 1;
            this.getPageData(pageNumber, this.pageSize, nextProps.filterText);
        }
    }

    render() {
        return (
            <div className="container container-margin">
                {
                    (
                        this.state.isError
                        &&
                        <div className="alert alert-danger">{this.state.error}</div>
                    )
                    ||
                    (
                        this.props.showFavorite && this.state.favoriteList.length === 0
                        &&
                        <div className="alert alert-info text-center">No items to list</div>
                    )
                    ||
                    (
                        this.state.isLoading
                        &&
                        this.props.showFavorite === false
                        &&
                        <div className="loader"></div>
                    )
                    ||
                    this.getContainerRows()
                }
                <NotificationContainer leaveTimeout={50} required={true} />
            </div>
        );
    }

    componentDidMount() {
        if (this.props.showFavorite !== true)
            this.getPageData(this.pageNumber, this.pageSize);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}

export default Container;