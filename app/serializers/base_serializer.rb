class BaseSerializer
  def self.call!(**args)
    new(**args).call!
  end
end
