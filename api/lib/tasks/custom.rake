namespace :custom do
  task reset_levels: :environment do
    cards = Card.all
    cards.each do |card|
      card.level = 1
      card.save!
    end
  end

  task random_levels: :environment do
    cards = Card.all
    cards.each do |card|
      card.level = rand(1..5)
      card.save!
    end
  end

  task set_type: :environment do
    slots = Slot.all
    slots.each do |slot|
      slot.quiztype = 'choose'
      slot.save!
    end
  end
end
