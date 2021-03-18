import React from 'react';
import {TextField
    , Container
    , Grid
    , Button
    , Box
    , Card
    , Modal
    , Typography
    , createStyles
    , makeStyles
    , Theme
    , List
    , ListItem
    , ListItemAvatar
    , ListItemSecondaryAction
    , IconButton
    , ListItemText
    , Checkbox,
    Paper
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import {useQuery, useMutation} from '@apollo/client';
import {GET_TODOS
    , CREATE_TODO
    , DELETE_TODO
} from './todos.gql';
import {v4 as uuidv4} from 'uuid';

interface TodoItem {
    id: number;
    content: string;
    isCompleted: boolean;
}
type ItemsDtoT =  {
    itemsDto: TodoItem[]
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
      marginTop: "1em",
      overflow: "auto",
      height: "50vh"
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
  }),
);

function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

const Home: React.FC = (props: any) => {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [textEntry, setTextEntry] = React.useState("");
    const {loading, error, data: itemsDto, refetch} = useQuery<ItemsDtoT>(GET_TODOS);
    const [todos, setTodos] = React.useState<TodoItem[]>(Array<TodoItem>());

    const [createTodoItem] = useMutation(CREATE_TODO);
    const [deleteTodoItem] = useMutation(DELETE_TODO);


    const classes = useStyles();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("");
      };
    return (
        <Container  
        style={{height: "100%"
        , backgroundColor: "#f5f5f5"
        , padding: "4em"
        }} 
        maxWidth="xl">
            <Button variant="contained" color="primary"  onClick={() => setModalOpen(true)}>
            New
            </Button>
            <Modal
            open={modalOpen}
            onClose={()=>{setModalOpen(false)}}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                <TextField
                    rows = {5}
                    multiline
                    onChange = {(e) => setTextEntry(e.target.value)}
                    id="standard-name"
                    InputProps={{endAdornment: <Button onClick={() => {
                        if (textEntry != ""){
                            createTodoItem({variables: { content: textEntry  }});
                        }
                        setTextEntry("");
                        setModalOpen(false);
                        refetch();
                    }}><DoneIcon/></Button>}}
                />
                </div>
            </Modal>
            <Grid item xs={12} md={6}>
            <Paper className={classes.demo}>
                <List>
                    {itemsDto?.itemsDto.map ( todoItem => 
                    <ListItem key={uuidv4()}>
                        <ListItemAvatar>
                            <Checkbox
                            onChange = {handleChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={todoItem.content}
                        />
                        <ListItemSecondaryAction>
                            <IconButton  edge="end" aria-label="delete" onClick = {
                                () => {
                                    deleteTodoItem({variables: {id: todoItem.id}});
                                    refetch();
                                }
                            }>
                            <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>  
                    )}
                {/* {generate(
                    <ListItem>
                        <ListItemAvatar>
                            <Checkbox
                            onChange = {handleChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Single-line item"
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>,
                )} */}
                </List>
            </Paper>
            </Grid>
        </Container>
        );
    }
    
    export default Home;
    