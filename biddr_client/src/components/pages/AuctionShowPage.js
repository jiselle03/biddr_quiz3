import React, { useState, useEffect } from 'react';

import { BidList } from '../BidList';
import { Auction } from '../../api/auction';
import { Spinner } from '../Spinner';

export const AuctionShowPage = props => {
    const [auction, setAuction] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkReserve = auction => {
        auction.bids.filter(bid => {
            if (bid >= auction.reserve_price) {
                return "The reserve price for this product has been met."
            };
            return "The reserve price for this product has not been met."
        });
    };

    useEffect(() => {
        Auction.one(props.match.params.id).then(auction => { 
            setAuction(auction);
            setIsLoading(false);
        });
    }, [props.match.params.id]);

    if(isLoading) {
      return(
        <Spinner message="Loading item" />
      );
    };

    const { title, owner, description, ends_at, created_at } = auction;

    return (
      <main>
        <h1 className="ui header">{title}</h1>
        <p>Added by {owner.full_name} on {created_at}</p>
        <p>Description: {description}</p>
        <p>Ends at: {ends_at}</p>
        <p>{checkReserve(auction)}</p>

        <BidList bids={auction.bids} />

      </main>
    );
};
