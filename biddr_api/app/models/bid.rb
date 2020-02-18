class Bid < ApplicationRecord
  belongs_to :user
  belongs_to :auction

  validates :price, presence: true, numericality: { greater_than: 0 }

  
end
