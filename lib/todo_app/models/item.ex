defmodule TodoApp.Models.Item do
  use Ecto.Schema
  import Ecto.Changeset

  schema "items" do
    field :completed_at, :utc_datetime
    field :content, :string
    field :session, :string

    timestamps()
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:content, :completed_at, :session])
    |> validate_required([:content, :session])
  end
end
