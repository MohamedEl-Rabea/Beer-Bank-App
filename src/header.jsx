import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";

class header extends Component {
    handleSearchTextChange = (event) => {
        let { handleSearchTextChange } = this.props;
        let value = event.target.value;
        if (handleSearchTextChange) {
            handleSearchTextChange(value.toLowerCase());
        }
    }

    render() {
        return (
            <nav className="sticky-top custom-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col text-right">
                            <NavLink
                                onClick={() => this.props.handleLinkClick(false)}
                                to='/'
                                className="margin-links"
                            >
                                HOME
                            </NavLink>
                            <NavLink
                                onClick={() => this.props.handleLinkClick(true)}
                                to='/favorite'
                                className="margin-links"
                            >
                                FAVORITE
                            </NavLink>
                        </div>
                    </div>
                    <div className="row text-center">
                        <h2 className="header-title"><strong>The Beer Bank</strong></h2>
                    </div>
                    <div className="row">
                        <small
                            className="header-title">
                            <strong>Find your favorite beer here</strong>
                        </small>
                    </div>
                    <div className="row">
                        <div className="col-md-5 col-sm-12 header-search">
                            <input
                                type="text"
                                onChange={this.handleSearchTextChange}
                                className="form-control"
                                placeholder="Search for beer name" />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default header;