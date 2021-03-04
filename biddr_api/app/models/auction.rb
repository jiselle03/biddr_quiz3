class Auction < ApplicationRecord
  belongs_to :user

  has_many :bids, dependent: :destroy

  before_validation :default_price
  before_save :capitalize_title

  validates :title, presence: true, uniqueness: { case_sensitive: false }
  validates :description, presence: true, length: { minimum: 10 }, uniqueness: { scope: :title}
  validates :reserve_price, numericality: { greater_than: 0 }

  private

  def default_price
      self.reserve_price ||= 1.00       
  end

  def capitalize_title
      self.title.capitalize!
  end
end
