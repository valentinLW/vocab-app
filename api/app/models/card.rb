AWS_SETTINGS = {
  'pt' => {
    name: 'Camila',
    engine: 'neural',
    langcode: 'pt-BR'
  },
  'es' => {
    name: 'Lupe',
    engine: 'neural',
    langcode: 'es-US'
  },
  'en' => {
    name: 'Joanna',
    engine: 'neural',
    langcode: 'en-US'
  },
  'de' => {
    name: 'Vicki',
    engine: 'neural',
    langcode: 'de-DE'
  }
}

class Card < ApplicationRecord
  belongs_to :box

  before_create do
    client = Aws::Polly::Client.new
    to_lang = language_code.split('-').last
    aws_config = AWS_SETTINGS[to_lang]
    resp = client.start_speech_synthesis_task(
      {
        engine: aws_config[:engine],
        language_code: aws_config[:language_code],
        output_format: 'mp3',
        output_s3_bucket_name: 'flashcards0674766209',
        text: to,
        text_type: 'text',
        voice_id: aws_config[:name]
      }
    )
    self.audio = resp.to_h[:synthesis_task][:output_uri]
  end
end
