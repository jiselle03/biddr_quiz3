import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuctionShowPage } from './pages/AuctionShowPage';
import { AuctionNewPage } from './pages/AuctionNewPage';
import { AuctionIndexPage } from './pages/AuctionIndexPage';
import { WelcomePage } from './pages/WelcomePage.js';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { NavBar } from './NavBar';
import { User } from '../api/user';
import { Session } from '../api/session';
import { AuthRoute } from './AuthRoute';
import { Spinner } from './Spinner';

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getUser = useCallback(() => {
        User.current().then(data => {
        if (typeof data.id !== "number") {
            setCurrentUser(null);
            setIsLoading(false);
        } else {
            setCurrentUser(data);
            setIsLoading(false);
        };
        });
    }, []);

    const destroySession = () => {
        Session.destroy().then(setCurrentUser(null));
    };

    useEffect(() => {
        getUser();
    }, [getUser]);

    if(isLoading) {
        return(
            <Spinner message="Loading..." />
        );
    };
      
    return (
        <BrowserRouter>
            <div className="ui container segment">
            <header>
                <NavBar 
                currentUser={currentUser} 
                onSignOut={destroySession} 
                />
            </header>
            <Switch>
                <Route exact path="/" component={WelcomePage} />
                <Route exact path="/auctions" component={AuctionIndexPage} />
                <AuthRoute 
                    isAllowed={!!currentUser}
                    component={AuctionNewPage}
                    path = "/auctions/new"
                    exact
                />
                <AuthRoute 
                    isAllowed={!!currentUser}
                    component={AuctionShowPage}
                    path="/auctions/:id"
                />
                <Route 
                    path="/sign_in"
                    render={routeProps => (
                        <SignInPage {...routeProps} onSignIn={getUser} />
                    )}  
                />
                <Route 
                    path="/sign_up"
                    render={routeProps => (
                        <SignUpPage {...routeProps} onSignUp={getUser} />
                    )}  
                />
                <Route component={NotFoundPage} />
            </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
