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
      arg :session, non_null(:string)
      arg :content, non_null(:string)

      resolve fn %{content: content, session: session}, _ ->
        case TodoApp.Models.create_item(%{session: session, content: content}) do
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
    Delete a todo item

    ## How to use
        mutation {delete_todo_item {item: $item}}
    """
    field :delete_todo_item, :boolean do
      arg :id, non_null(:id)

      resolve fn %{id: id}, _ ->
        TodoApp.Models.delete_item_by_id(id)
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
    field :items_for_session, non_null(list_of(:item_dto)) do # [TodoItem!]!
      arg(:session, non_null(:string))
      resolve fn %{session: session}, _ ->
        {:ok, TodoApp.Models.list_items(session)}
      end
    end
  end
end
