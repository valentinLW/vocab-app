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
end
