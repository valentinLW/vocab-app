class BoxesController < ApplicationController
  def index
    @boxes = Box.all
    render json: { boxes: @boxes }
  end

  def show
    @box = Box.find(params[:id])
    @cards = Card.where(box: @box)
    @slots = Slot.where(box: @box)
    render json: { box: @box, cards: @cards, slots: @slots }
  end

  def new
    @box = Box.new(name: params[:name], language: params[:language])
    if @box.save
      render json: { box: @box }, status: 200
    else
      render json: {}, status: 400
    end
  end
end
