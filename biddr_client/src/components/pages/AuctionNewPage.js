import React, { useState } from 'react';

import { Auction } from '../../api/auction';
import { FormErrors } from '../FormErrors';

export const AuctionNewPage = props => {
    const [errors, setErrors] = useState([]);

    const createAuction = event => {
        event.preventDefault();
        const { currentTarget } = event;
        const fd = new FormData(currentTarget);

        const newAuction = {
            title: fd.get("title"),
            description: fd.get("description"),
            ends_at: fd.get("ends_at"),
            reserve_price: fd.get("reserve_price")
        };

        Auction.create(newAuction).then(data => {
            if (!data.errors) {
                props.history.push(`/auctions/${data.id}`);
                
            } else {
                setErrors(data.errors);
            };
        });
        
        currentTarget.reset();
    };

    return (
        <form 
            className="ui form" 
            onSubmit={createAuction}
        >
            <div className="field">
                <label htmlFor="title">Title</label>
                <FormErrors errors={errors} forField="title" />
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    placeholder="Product title"
                />
            </div>

            <div className="field">
                <label htmlFor="description">Description</label>
                <FormErrors errors={errors} forField="description" />
                <textarea 
                    name="description" 
                    id="description" 
                    placeholder="Item description" 
                />
            </div>

            <div className="field">
                <label htmlFor="ends_at">Ends At</label>
                <FormErrors errors={errors} forField="ends_at" />
                <input 
                    type="date" 
                    name="ends_at" 
                    id="ends_at" 
                />
            </div>
            
            <div className="field">
                <label htmlFor="reserve_price">Reserve price</label>
                <FormErrors errors={errors} forField="reserve_price" />
                <input 
                    type="number" 
                    name="reserve_price" 
                    id="reserve_price" 
                    placeholder="1.00" 
                    step="1"
                />
            </div>

            <button className="ui orange button" type="submit">
                Auction Item
            </button>
        </form>
    );
};
