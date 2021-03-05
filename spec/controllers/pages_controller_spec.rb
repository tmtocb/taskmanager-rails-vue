require 'rails_helper'

describe PagesController do

  describe "GET about" do
    subject { get :home }

    it "renders the about template" do
      subject
      expect(response).to render_template(:home)
    end

    it "returns http success response" do
      subject
      expect(response).to have_http_status(:success)
    end
  end
end 