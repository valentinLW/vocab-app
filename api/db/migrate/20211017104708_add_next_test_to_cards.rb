class AddNextTestToCards < ActiveRecord::Migration[6.0]
  def change
    add_column :cards, :next_test, :Datetime, default: DateTime.now
  end
end
