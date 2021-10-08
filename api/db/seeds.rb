nouns = {
  "boy": 'menino',
  "woman": 'mulher',
  "man": 'homem',
  "car": 'carro',
  "map": 'mapa',
  "box": 'caixa',
  "house": 'casa',
  "apple": 'maçã',
  "table": 'mesa',
  "toy": 'brinquedo',
  "milk": 'leite',
  "water": 'água',
  "bread": 'pão'
}

b = Box.create!(name: 'english-portugese 1', language: 'en-pt')

nouns.each do |en, pt|
  Card.create!(box: b, level: 1, from: en, to: pt, color:'#FF7E30')
end
