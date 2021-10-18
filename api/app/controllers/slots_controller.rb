class SlotsController < ApplicationController
  def update
    @slot = Slot.find(params[:id])
    @slot.quiztype = params[:quiztype] if params[:quiztype]
    @slot.interval = params[:interval].to_i if params.key?(:interval)

    if @slot.save
      render json: @slot, status: 200
    else
      render json: {}, status: 400
    end
  end
end
