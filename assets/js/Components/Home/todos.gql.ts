import { gql } from "@apollo/client";
const GET_TODOS = gql`
    query GetTodos {
        itemsDto {
            id
            content
            isCompleted
        }
    }
`;

const CREATE_TODO = gql`
  mutation createTodoItem($content: String!) {
    createTodoItem(content: $content)
  }
`;
const DELETE_TODO = gql`
  mutation deleteTodoItem($id: ID!) {
    deleteTodoItem(id: $id)
  }
`;
const EDIT_TODO = gql`
  mutation editTodoItem($id: ID!, $content: String!) {
    editTodoItem(id: $id, content: $content){id, content}
  }
`;
const TOGGLE_TODO = gql`
  mutation toggleItem($id: ID!) {
    toggleItem(id: $id){id, content}
  }
`;

export {GET_TODOS
  , CREATE_TODO
  , DELETE_TODO
  , EDIT_TODO
  , TOGGLE_TODO
}