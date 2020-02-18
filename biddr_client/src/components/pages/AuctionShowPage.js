import React, { useState, useEffect } from 'react';

import { Bid } from '../../api/bid';
import { BidList } from '../BidList';
import { Auction } from '../../api/auction';
import { Spinner } from '../Spinner';
import { FormErrors } from '../FormErrors';

export const AuctionShowPage = props => {
    const [auction, setAuction] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    const createBid = event => {
      event.preventDefault();
      const { currentTarget } = event;
      const fd = new FormData(currentTarget);

      const newBid = {
          price: fd.get("price"),
          auction_id: auction.id
      };

      Bid.create(newBid).then(data => {
          if (!data.errors) {
              props.history.push(`/auctions/${data.auction_id}`);  
          } else {
              setErrors(data.errors);
          };
      });
      
      currentTarget.reset();
      window.location.reload();
  };

  const currentPrice = auction => {
    let currentPrice = 0;
    auction.bids.forEach(bid => {
      if (bid.price > currentPrice) {
        currentPrice = bid.price;
      };
    });
    return currentPrice;
  };

  const checkReserve = auction => {
    const check = auction.bids.filter(bid => bid.price >= auction.reserve_price);
    if (check.length > 0) {
      return "The reserve price for this product has been met."
    } else {
      return "The reserve price for this product has NOT been met."
    }; 
  };

  const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [month, day, year].join('/');
  };

  useEffect(() => {
      Auction.one(props.match.params.id).then(auction => { 
          setAuction(auction);
          setIsLoading(false);
      });
  }, [props.match.params.id]);

  if (isLoading) {
    return(
      <Spinner message="Loading item" />
    );
  };

  const { title, owner, description, ends_at, created_at } = auction;

  return (
    <main>
      <h1 className="ui header">{title}</h1>
      <p className="auction-item">Added by {owner.full_name} on {formatDate(created_at)}</p>
      
      <h4 className="ui header">Description:</h4>
      <p className="auction-item">{description}</p>

      <h4 className="ui header">Ends At:</h4>
      <p className="auction-item">{formatDate(ends_at)}</p>

      <h4 className="ui header">Current Price:</h4>
      <p className="auction-item">${currentPrice(auction)}.00</p>

      <p className="auction-item">{checkReserve(auction)}</p>

      <form 
        className="ui form" 
        onSubmit={createBid}
      >
        <div className="field">
            <label htmlFor="price">Price</label>
            <FormErrors errors={errors} forField="reserve_price" />
            <input 
                type="number" 
                name="price" 
                id="price" 
                placeholder={currentPrice(auction)} 
                step="1"
            />
          </div>
          <button className="ui orange button" type="submit">
                Bid
          </button>
      </form>

      <BidList bids={auction.bids} />

    </main>
  );
};
