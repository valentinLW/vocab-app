file = open(Rails.root.join('db', 'tools', 'translations.json'))
json = file.read

translations = JSON.parse(json)['words']

from = 'de'
to = 'es'
langcode = "#{from}-#{to}"

b = Box.create!(name: 'deutsch-spanisch 1', language: langcode)

translations.each do |t|
  Card.create!(box: b, level: 1, from: t[from], to: t[to], color: rand(1..5), language_code: langcode)
end
