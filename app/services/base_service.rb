class BaseService
  def self.call!(**args)
    new(**args).call!
  end

  private

  def success(**data)
    OpenStruct.new(success?: true, failure?: false, **data)
  end

  def failure(error_message:, **data)
    OpenStruct.new(success?: false, failure?: true, error_message:, **data)
  end
end
