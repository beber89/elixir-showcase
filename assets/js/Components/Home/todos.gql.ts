import { gql } from "@apollo/client";
const GET_TODOS = gql`
    query GetTodos($session: String!) {
        items_for_session(session: $session) {
            id
            content
            isCompleted
        }
    }
`;

const CREATE_TODO = gql`
  mutation createTodoItem($session: String!, $content: String!) {
    createTodoItem(session: $session, content: $content)
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