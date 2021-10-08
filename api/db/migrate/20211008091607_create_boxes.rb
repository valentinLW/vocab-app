class CreateBoxes < ActiveRecord::Migration[6.0]
  def change
    create_table :boxes do |t|
      t.string :name
      t.string :language

      t.timestamps
    end
  end
end
