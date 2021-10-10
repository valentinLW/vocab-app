en = %w[time year people way day man thing woman life child world school state family student group country problem hand
        part place case week company system program question work government number night point home water room mother
        area money story fact month lot right study book eye job word business issue side kind head house service friend
        father power hour game line end member law car city community name president team minute idea kid body
        information back parent face others level office door health person art war history party result change morning
        reason research girl guy moment air teacher force education]

pt = %w[tempo ano pessoas caminho dia homem coisa mulher vida criança mundo escola estado família estudante grupo país
        problema mão parte lugar caso semana empresa sistema programa pergunta trabalho governo número noite ponto home
        água sala mãe área dinheiro história fato mês lote direita estudo livro olho emprego palavra negócios edição
        lado tipo cabeça casa serviço amigo pai energia hora jogo linha fim membro lei carro cidade comunidade nome
        presidente equipe minuto idéia miúdo corpo informações voltar pai face outros nível escritório porta saúde
        pessoa arte guerra história festa resultado mudar manhã razão pesquisa menina gajo momento ar professor força
        educação]

b = Box.create!(name: 'english-portugese 1', language: 'en-pt')

en.count.times do |i|
  Card.create!(box: b, level: rand(1..5), from: en[i], to: pt[i], color: rand(1..5), language_code: 'pt-BR')
end
