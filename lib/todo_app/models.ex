defmodule TodoApp.Models do
  @moduledoc """
  The Models context.
  """

  import Ecto.Query, warn: false
  alias TodoApp.Repo

  alias TodoApp.Models.Item

  @doc """
  Returns the list of items.

  ## Examples

      iex> list_items()
      [%Item{}, ...]

  """
  def list_items do
    Repo.all(Item)
  end

  @doc """
  Gets a single item.

  Raises `Ecto.NoResultsError` if the Item does not exist.

  ## Examples

      iex> get_item!(123)
      %Item{}

      iex> get_item!(456)
      ** (Ecto.NoResultsError)

  """
  def get_item!(id), do: Repo.get!(Item, id)

  @doc """
  Creates a item.

  ## Examples

      iex> create_item(%{field: value})
      {:ok, %Item{}}

      iex> create_item(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_item(attrs \\ %{}) do
    %Item{}
    |> Item.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a item.

  ## Examples

      iex> update_item(item, %{field: new_value})
      {:ok, %Item{}}

      iex> update_item(item, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_item(%Item{} = item, attrs) do
    item
    |> Item.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a item.

  ## Examples

      iex> delete_item(item)
      {:ok, %Item{}}

      iex> delete_item(item)
      {:error, %Ecto.Changeset{}}

  """
  def delete_item(%Item{} = item) do
    Repo.delete(item)
  end

  @doc """
  Edit content of Item

  ## Examples

      iex> edit_todo_item(item_id, content)
      {:ok, %Item{}}

  """
  def edit_todo_item(item_id, content)
    when is_binary(item_id) or is_integer(item_id) do
      case Repo.get(Item, item_id) do
        nil ->
          {:ok, nil}
        %Item{} = item ->
          update_item(item, %{content: content})
      end
  end

  @doc """
  Toggle the completetion (DONE | TODO) of todo item

  ## Examples

      iex> toggle_todo_item(item_id)
      {:ok, %Item{}}

  """
  def toggle_todo_item(todo_item_id)
    when is_binary(todo_item_id) or is_integer(todo_item_id) do
      case Repo.get(Item, todo_item_id) do
        nil ->
          {:ok, nil}
        %Item{completed_at: nil} = item ->
          update_item(item, %{completed_at: DateTime.utc_now()})
        %Item{} = item ->
          update_item(item, %{completed_at: nil})
      end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking item changes.

  ## Examples

      iex> change_item(item)
      %Ecto.Changeset{data: %Item{}}

  """
  def change_item(%Item{} = item, attrs \\ %{}) do
    Item.changeset(item, attrs)
  end
end
