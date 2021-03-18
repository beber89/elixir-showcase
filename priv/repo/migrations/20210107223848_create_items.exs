defmodule TodoApp.Repo.Migrations.CreateItems do
  use Ecto.Migration

  def change do
    create table(:items) do
      add :content, :text, null: false
      add :completed_at, :utc_datetime
      add :session, :string, null: false

      timestamps()
    end

  end
end
