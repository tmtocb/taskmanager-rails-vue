require 'rails_helper'

RSpec.describe Task, type: :model do

  describe '#attributes' do
    it { should have_db_column(:name) }
    it { should have_db_column(:completed) }
    it { should have_db_column(:description) }
  end
end 