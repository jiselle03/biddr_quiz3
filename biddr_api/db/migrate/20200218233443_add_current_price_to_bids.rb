class AddCurrentPriceToBids < ActiveRecord::Migration[6.0]
  def change
    add_column :bids, :current_price, :integer, default: 0
  end
end
