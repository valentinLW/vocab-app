class BoxesController < ApplicationController
  def index
    @boxes = Box.all
    render json: { boxes: @boxes }
  end

  def show
    @box = Box.find(params[:id])
    @cards = Card.where(box: @box)
    render json: { box: @box, cards: @cards }
  end
end
