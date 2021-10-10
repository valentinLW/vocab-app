class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.references :box, null: false, foreign_key: true
      t.integer :color
      t.integer :level
      t.string :from
      t.string :to
      t.string :audio
      t.string :language_code

      t.timestamps
    end
  end
end
