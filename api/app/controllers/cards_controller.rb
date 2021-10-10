class CardsController < ApplicationController
  def update
    @card = Card.find(params[:id])
    if params[:correct]
      @card.level += 1 unless @card.level == 5
    else
      @card.level = 1
    end

    if @card.save
      render json: @card, status: 200
    else
      render json: {}, status: 400
    end
  end

  def new
    @box = Box.find(params[:box_id])
    @card = Card.create!(
      language_code: params[:language_code],
      box: @box,
      from: params[:from],
      to: params[:to],
      color: rand(1..5),
      level: 1
    )
    render json: { card: @card }
  end
end
