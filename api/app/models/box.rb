class Box < ApplicationRecord
  has_many :cards, dependent: :delete_all
end
