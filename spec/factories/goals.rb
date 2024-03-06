FactoryBot.define do
  factory :goal do
    name { FFaker::Lorem.words(rand(3..10)).join(' ') }
    description { FFaker::Lorem.words(rand(3..10)).join(' ') }
    archived_at { nil }
    association :user
    association :category
  end
end
