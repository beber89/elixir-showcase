import { gql } from "@apollo/client";
const GET_TODOS = gql`
    query GetTodos {
        itemsDto {
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

export {GET_TODOS, CREATE_TODO}