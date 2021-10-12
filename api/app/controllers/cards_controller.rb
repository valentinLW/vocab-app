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
    @card = Card.new(
      language_code: @box.language,
      box: @box,
      from: params[:from],
      to: params[:to],
      color: rand(1..5),
      level: 1
    )

    if @card.save
      render json: @card, status: 200
    else
      render json: {:errors => @card.errors.full_messages}, status: 400
    end
  end
end
