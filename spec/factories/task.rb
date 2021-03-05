FactoryBot.define do
  factory :task do
    name { Faker::Lorem.word }
    description { Faker::Lorem.word } 
    completed { false }
  end
end