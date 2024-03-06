FactoryBot.define do
  factory :category do
    sequence(:name) { |n| "#{FFaker::Lorem.word}-#{n}" }
    association :user
  end
end
