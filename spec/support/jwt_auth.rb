def authenticate_user(user)
  allow(JsonWebToken).to receive(:decode).and_return({ 'subject' => user.id })
end
