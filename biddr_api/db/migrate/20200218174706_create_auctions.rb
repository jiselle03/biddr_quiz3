class CreateAuctions < ActiveRecord::Migration[6.0]
  def change
    create_table :auctions do |t|
      t.string :title
      t.text :description
      t.datetime :ends_at
      t.integer :reserve_price
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
