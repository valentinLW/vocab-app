class SlotsController < ApplicationController
  def update
    @slot = Slot.find(params[:id])
    @slot.quiztype = params[:quiztype]

    if @slot.save
      render json: @slot, status: 200
    else
      render json: {}, status: 400
    end
  end
end
