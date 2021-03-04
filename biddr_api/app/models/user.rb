class User < ApplicationRecord
    has_many :auctions, dependent: :destroy
    has_many :bids, dependent: :destroy

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true, uniqueness: true,
    format: /\A([\w+\-]\.?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
    has_secure_password

    def full_name
        "#{first_name.titleize} #{last_name.titleize}".strip.squeeze
    end 
end
