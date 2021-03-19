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
    , Checkbox
    , Paper
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import {useQuery, useMutation} from '@apollo/client';
import {GET_TODOS
    , CREATE_TODO
    , DELETE_TODO
    , EDIT_TODO
    , TOGGLE_TODO
} from './todos.gql';
import {v4 as uuidv4} from 'uuid';

interface TodoItem {
    id: number;
    content: string;
    isCompleted: boolean;
}
type ItemsDtoT =  {
    items_for_session: TodoItem[]
}

interface EditingProps {
    modalOpen: boolean;
    content?: string;
    id?: number;
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
    const [session, setSession] = React.useState("");
    const [modalOpen, setModalOpen] = React.useState(false);
    const [textEntry, setTextEntry] = React.useState("");
    const [userEditing, setUserEditing] = 
      React.useState<EditingProps>({modalOpen: false});



    const {loading, error, data: itemsDto, refetch} = 
      useQuery<ItemsDtoT>(GET_TODOS, {variables: {session: session}});
    const [createTodoItem] = useMutation(CREATE_TODO, {update: () => refetch()});
    const [ deleteTodoItem] = useMutation(DELETE_TODO, {update: () => refetch()});
    const [editTodoItem] = useMutation(EDIT_TODO, {update: () => refetch()});
    const [toggleTodoItem] = useMutation(TOGGLE_TODO, {update: () => refetch()});

    React.useEffect(()=>{
        let session_no = window.localStorage.getItem("session_for_elixir_showcase");
        if (session_no != null) setSession(session_no);
        else setSession(uuidv4());
    }, [])


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
                            createTodoItem({variables: { content: textEntry, session:  session }});
                            setTextEntry("");
                        }
                        setModalOpen(false);
                    }}><DoneIcon/></Button>}}
                />
                </div>
            </Modal>

            <Modal
            open={userEditing.modalOpen}
            onClose={()=>{setUserEditing({modalOpen: false})}}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                <TextField
                    rows = {5}
                    multiline
                    defaultValue = {userEditing.content}
                    onChange = {(e) => setUserEditing({...userEditing, content: e.target.value})}
                    InputProps={{endAdornment: <Button onClick={() => {
                        if (userEditing.content != ""){
                            editTodoItem({variables: { content: userEditing.content, id: userEditing.id  }});
                        } else {
                            deleteTodoItem({variables: {id: userEditing.id}});
                        }
                        setUserEditing({modalOpen: false});
                        refetch();
                    }}><DoneIcon/></Button>}}
                />
                </div>
            </Modal>
            <Grid item xs={12} md={6}>
            <Paper className={classes.demo}>
                <List>
                    {console.log(itemsDto)}
                    {itemsDto?.items_for_session.filter(a => !a.isCompleted).slice().sort((a, b) => a.id - b.id) .map ( todoItem => 
                    <ListItem key={uuidv4()}>
                        <ListItemAvatar>
                            <Checkbox
                            onChange = {() => {
                                toggleTodoItem({variables: {id: todoItem.id}});
                                refetch();
                            }}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </ListItemAvatar>
                        <ListItemText onDoubleClick ={()=>setUserEditing({modalOpen: true, content: todoItem.content, id: todoItem.id})}
                            primary={todoItem.content}
                        />
                        <ListItemSecondaryAction>
                            <IconButton  edge="end" aria-label="delete" onClick = {
                                () => { deleteTodoItem({variables: {id: todoItem.id}}) }  
                            }>
                            <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>  
                    )}
                </List>
                <List style={{backgroundColor: "grey"}}>
                    {itemsDto?.items_for_session.filter(a => a.isCompleted).slice().sort((a, b) => a.id - b.id) .map ( todoItem => 
                    <ListItem key={uuidv4()}>
                        <ListItemAvatar>
                            <Checkbox
                            defaultChecked={true}
                            onChange = {() => {
                                toggleTodoItem({variables: {id: todoItem.id}});
                                refetch();
                            }}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </ListItemAvatar>
                        <ListItemText style={{textDecoration: "line-through"}}
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
                </List>
            </Paper>
            </Grid>
        </Container>
        );
    }
    
    export default Home;
    