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

export {GET_TODOS, CREATE_TODO, DELETE_TODO}