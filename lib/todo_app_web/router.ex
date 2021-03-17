defmodule TodoAppWeb.Router do
  use TodoAppWeb, :router
  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end
  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api" do
    pipe_through :api

    get "/", Absinthe.Plug.GraphiQL, schema: TodoApp.Graphql.Schema , interface: :playground
    post "/", Absinthe.Plug, schema: TodoApp.Graphql.Schema
  end
  scope "/", TodoAppWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/home", PageController, :index
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: TodoAppWeb.Telemetry
    end
  end
end
