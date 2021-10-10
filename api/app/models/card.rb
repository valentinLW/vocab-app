class Card < ApplicationRecord
  belongs_to :box

  before_create do
    client = Aws::Polly::Client.new
    resp = client.start_speech_synthesis_task(
      {
        engine: 'neural',
        language_code: "pt-BR", #params[:language_code],
        output_format: 'mp3',
        output_s3_bucket_name: 'flashcards0674766209',
        text: self.to,
        text_type: 'text',
        voice_id: 'Camila'
      }
    )
    self.audio = resp.to_h[:synthesis_task][:output_uri]
  end
end
