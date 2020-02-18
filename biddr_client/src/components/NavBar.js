import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = ({ currentUser, onSignOut }) => {
    const handleSignOutClick = event => {
        event.preventDefault();
        if (typeof onSignOut === "function") {
            onSignOut();
        }
    };

    return (
        <div className="ui secondary pointing menu">
            <h3 className="item header">Biddr</h3>
            <NavLink exact to="/" className="item right menu">Home</NavLink>
            <NavLink exact to="/auctions" className="item">Auctions</NavLink>
            <NavLink exact to="/auctions/new" className="item">Add</NavLink>
            {!currentUser && (
                <NavLink exact to="/sign_in" className="ui black button">Sign In</NavLink>
            )}
            {currentUser && (
                <>
                    <div className="item">
                        Hello, {currentUser.full_name}
                    </div>
                    <button
                        className="ui inverted red button" 
                        onClick={handleSignOutClick}
                    >
                        Sign Out
                    </button>
                </>
            )}
        </div>
    );
};
