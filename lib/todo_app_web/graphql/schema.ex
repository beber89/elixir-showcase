defmodule TodoApp.Graphql.Schema do
  use Absinthe.Schema

  object :item_dto do
    field :id, non_null(:id)  #ID!
    field :content, non_null(:string)
    field :is_completed, non_null(:boolean) do
      resolve fn %{completed_at: completed_at}, _, _ ->
        {:ok, !is_nil(completed_at)}
      end
    end
  end



  mutation do
    @doc """
    Create a new Todo Item

    ## How to use
        mutation {createTodoItem {content: $content}}
    """
    field :create_todo_item, non_null(:boolean) do
      arg :content, non_null(:string)

      resolve fn %{content: content}, _ ->
        case TodoApp.Models.create_item(%{content: content}) do
          {:ok, %TodoApp.Models.Item{}} ->
            {:ok, true}
          _ ->
            {:ok, false}
        end
      end
    end
      @doc """
    Create a edit content of Todo Item

    ## How to use
        mutation {createTodoItem {content: $content}}
    """
    field :edit_todo_item, :item_dto do
      arg :id, non_null(:id)
      arg :content, non_null(:string)

      resolve fn %{id: item_id, content: content}, _ ->
        TodoApp.Models.edit_todo_item(item_id, content)
      end
    end
    @doc """
    Toggle value (DONE|TODO) in the todo Item

    ## How to use
        mutation {toggleItem {id: $id}}
    """
    field :toggle_item, :item_dto do
      arg(:id, non_null(:id))
      resolve(fn %{id: item_id}, _ ->
        case TodoApp.Models.toggle_todo_item(item_id) do
          {:ok, item} -> {:ok, item}
          _ -> {:ok, nil}
        end
      end)
    end
  end

  query do
    field :items_dto, non_null(list_of(:item_dto)) do # [TodoItem!]!
      resolve fn _, _ ->
        {:ok, TodoApp.Models.list_items()}
      end
    end
  end
end
