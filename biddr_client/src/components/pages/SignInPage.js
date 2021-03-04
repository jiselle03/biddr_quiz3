import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Session } from '../../api/session';

export const SignInPage = props => {
    const [errors, setErrors] = useState([]);

    const createSession = event => {
        event.preventDefault();
        const { currentTarget: form } = event;
        const fd = new FormData(form);
        
        Session.create({
            email: fd.get("email"),
            password: fd.get("password")
        }).then(data => {
            if (data.status === 404) {
                setErrors([...errors, { message: "Wrong email or password"}]);
            } else {
                props.history.push("/");
                if (typeof props.onSignIn === "function") {
                    props.onSignIn();
                };
            };
        });
    };

    return (
        <div className="ui clearing segment User-Form">
            <div>
                <h1 className="ui center aligned header">Sign In</h1>
                <form className="ui large form" onSubmit={createSession}>
                { errors.length > 0 ? (
                    <div className="ui negative message">
                        <div className="header">Failed to sign in</div>
                            <p>{ errors.map(error => error.message).join(", ") }</p>
                    </div>
                ): "" }
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" required />
                    </div>
                    <div className="field">
                        <label htmlFor="password"></label>
                        <input type="password" name="password" id="password" required />
                    </div>
                    
                    <div className="submit-button">
                        <input 
                            className="ui orange button"
                            type="submit"
                            value="Sign In"
                        />
                    </div>
                </form>
            </div>
            <div>
                <br />
                <hr />
                <br />
                <p>Don't have an account? 
                    <Link to="/sign_up"> SIGN UP HERE</Link>.
                </p>
            </div>
        </div>
    );
};
