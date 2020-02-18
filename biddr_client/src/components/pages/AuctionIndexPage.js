import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Auction } from '../../api/auction';
import { Spinner } from '../Spinner';

export const AuctionIndexPage = () => {
    const [auctions, setAuctions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Auction.all().then(auctions => { 
            setAuctions(auctions);
            setIsLoading(false);
        });
    }, []);

    if(isLoading) {
      return(
        <Spinner message="Loading items..." />
      );
    };

    return (
      <main>
        <h1 className="ui header">Auctions</h1>

        {auctions.map(auction => (
          <>
          <h3 className="ui header" key={auction.id}>
            <Link to={`/auctions/${auction.id}`} className="ui link" href="">
              <strong>{auction.title}</strong><br />
            </Link>
          </h3>
          <p>Added {auction.created_at.toLocaleString()}</p>
          </>
        ))}

      </main>
    );
};
