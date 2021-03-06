class Api::V1::BidsController < Api::ApplicationController
    before_action :authenticate_user!

    def create
        auction = Auction.find params[:auction_id]
        
        if current_user != auction.user
            bid = Bid.new bid_params
            bid.user = current_user
            bid.auction = auction

            if bid.save
                render json: { id: auction.id }
                redirect_to product_path(@product)
            else
                render(
                    json: { errors: bid.errors },
                    status: 422 #unproceesable entity
                )
            end
        else
            render(
                render json: { status: 401 }, 
                status: 401 #unauthorized
            )
        end
    end

    private

    def bid_params
        params.require(:bid).permit(:price, :current_price)
    end

end
