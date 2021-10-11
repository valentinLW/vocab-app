class CreateSlots < ActiveRecord::Migration[6.0]
  def change
    create_table :slots do |t|
      t.integer :order
      t.integer :interval
      t.string :quiztype
      t.references :box, null: false, foreign_key: true

      t.timestamps
    end
  end
end
