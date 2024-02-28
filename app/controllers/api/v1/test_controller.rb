module Api
  module V1
    class TestController < Api::BaseController
      def ping
        kits = [
          { name: 'bonksy', color: 'white' },
          { name: 'archie', color: 'stripey' }
        ]
        render json: kits, status: :ok
      end
    end
  end
end
