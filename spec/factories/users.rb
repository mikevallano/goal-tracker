FactoryBot.define do
  factory :user do
    sequence(:password) { |n| "test1234#{n}" }
    sequence(:email) { |n| "test#{n}@example.com" }
  end
end
