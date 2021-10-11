en = %w[time year people way day man thing woman life child world school state family student group country problem hand part place case week company system program question work government number night point home water room mother area money story fact month lot right study book eye job word business issue side kind head house service friend father power hour game line end member law car city community name president team minute idea kid body information back parent face others level office door health person art war history party result change morning reason research girl guy moment air teacher force education]

pt = %w[tempo ano pessoas caminho dia homem coisa mulher vida criança mundo escola estado família estudante grupo país problema mão parte lugar caso semana empresa sistema programa pergunta trabalho governo número noite ponto home água sala mãe área dinheiro história fato mês lote direita estudo livro olho emprego palavra negócios edição lado tipo cabeça casa serviço amigo pai energia hora jogo linha fim membro lei carro cidade comunidade nome presidente equipe minuto idéia miúdo corpo informações voltar pai face outros nível escritório porta saúde pessoa arte guerra história festa resultado mudar manhã razão pesquisa menina gajo momento ar professor força educação]

de = %w[Zeit Jahr Menschen Weg Tag Mann Sache Frau Leben Kind Welt Schule Staat Familie schüler Gruppe Land Problem Hand Teil Ort Fall Woche unternehmen system programm frage Arbeit regierung nummer nacht punkt Zuhause Wasser Zimmer Mutter Bereich Geld Geschichte Tatsache Monat Grundstück Recht studieren buch Auge arbeit Wort Geschäft Ausgabe Seite Art Kopf Haus Dienstleistung Freund Vater Strom Stunde Spiel Zeile Ende Mitglied gesetz Auto stadt gemeinde name Präsident Mannschaft Minute idee Kind Körper Informationen Rücken Eltern Gesicht andere Ebene Büro Tür Gesundheit Person Kunst Krieg Geschichte Partei ergebnis ändern Morgen Grund forschung Mädchen Kerl Moment Luft lehrer Kraft bildung]

es = %w[tiempo año gente manera día hombre cosa mujer vida niño mundo escuela estado familia estudiante grupo país problema mano parte lugar caso semana empresa sistema programa pregunta trabajo gobierno número noche punto casa agua habitación madre zona dinero historia hecho mes lote derecho estudio libro ojo trabajo palabra negocio tema lado tipo cabeza casa servicio amigo padre poder hora juego línea fin miembro ley coche ciudad comunidad nombre presidente equipo minuto idea niño cuerpo información espalda padre cara otros nivel oficina puerta salud persona arte guerra historia partido resultado cambiar mañana razón investigación chica chico momento aire profesor fuerza educación]

require 'json'

a = []
100.times do |i|
  a << {
    en: en[i],
    pt: pt[i],
    es: es[i],
    de: de[i].capitalize
  }
end

words = { words: a }

File.open('translations.json', 'w') do |f|
  f.write(JSON.pretty_generate(words))
end
