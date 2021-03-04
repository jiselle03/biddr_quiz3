class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :created_at
end
