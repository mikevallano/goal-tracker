FactoryBot.define do
  factory :win do
    title { FFaker::Lorem.word }
    description { FFaker::Lorem.word }
    association :user
    association :category
    happened_at { nil }
  end
end
