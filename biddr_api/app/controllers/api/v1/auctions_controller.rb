class Api::V1::AuctionsController < Api::ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    before_action :find_auction, only: [:show]

    def create
        auction = Auction.new auction_params
        auction.user = current_user
        if auction.save
            render json: { id: auction.id }
        else
            render(
                json: { errors: auction.errors },
                status: 422 #unproceesable entity
            )
        end
    end

    def index
        auctions = Auction.order(created_at: :desc)
        render json: auctions
    end

    def show
        render json: @auction, include: [ :owner, {bids: [ :bidder ]} ]
    end

    private

    def auction_params
        params.require(:auction).permit(:title, :description, :ends_at, :reserve_price)
    end

    def find_auction
        @auction = Auction.find(params[:id])
    end
end
