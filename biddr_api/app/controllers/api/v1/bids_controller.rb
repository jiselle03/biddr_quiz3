class Api::V1::BidsController < Api::ApplicationController
    before_action :authenticate_user!

    def create
        auction = Auction.find params[:auction_id]
        bid = Bid.new bid_params
        bid.user = current_user
        bid.auction = auction

        if bid.save
            render json: { id: auction.id }
            redirect_to product_path(@product)
        else
            render(
                json: { errors: auction.errors },
                status: 422 #unproceesable entity
            )
        end
    end

    private

    def bid_params
        params.require(:bid).permit(:price)
    end
end
