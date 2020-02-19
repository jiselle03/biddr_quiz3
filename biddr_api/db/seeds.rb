Bid.delete_all
Auction.delete_all
User.delete_all

PASSWORD = "supersecret";

super_user = User.create( 
    first_name: "Padme", 
    last_name: "Amidala", 
    email: "padme@naboo.gov", 
    password: PASSWORD,
    is_admin: true
) 

20.times do 
    full_name = Faker::Movies::StarWars.character.split(' ')
    first_name = full_name[0]
    last_name = full_name[1]
    User.create( 
        first_name: first_name, 
        last_name: last_name,  
        email: "#{first_name}.#{last_name}@#{Faker::Movies::StarWars.planet}.com", 
        password: PASSWORD 
    )  
end 

users = User.all 
puts Cowsay.say("Created #{users.count} users.", :dragon)  
puts "Login with #{super_user.email} and password of '#{PASSWORD}'."

25.times do
    random_date = Faker::Date.backward(days:365 * 3)
    a = Auction.create(
        title: Faker::Commerce.product_name,
        description: Faker::Movies::StarWars.quote,
        ends_at: Faker::Date.forward(days: 60),
        reserve_price: Faker::Number.within(range: 1..10000),
        created_at: random_date,
        updated_at: random_date,
        user: users.sample
    )
    # if a.valid?
    #     a.bids = rand(0..15).times.map do
    #         random_date = Faker::Date.backward(days:365 * 3)
    #         Bid.new(
    #             price: Faker::Number.within(range: 1..10000),
    #             created_at: random_date,
    #             updated_at: random_date,
    #             user: users.sample
    #         )
    #     end
    # end
end

puts Cowsay.say("Generated #{Auction.count} auctions.", :frogs)
# puts Cowsay.say("Generated #{Bid.count} bids.", :frogs)