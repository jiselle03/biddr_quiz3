class Bid < ApplicationRecord
  belongs_to :user
  belongs_to :auction

  validates :price, presence: true, numericality: { greater_than: :current_price }

end
