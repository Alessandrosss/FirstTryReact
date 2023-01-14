import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Button,
  Icon,
  Input,
  Message,
  Segment,
  Grid,
} from "semantic-ui-react";
import { todos } from "../lib/todos";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLIn, errors, setErrors } = useContext(AppContext);
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  /* CHECK IF USER IS LOGGED IN */
  if (!isLIn) navigate("/login");

  /* RENDER LIST */
  if(isLIn){
    useEffect(() => {
      todos.readTodo().then((res) => {
        if (res.data) {
          setTodoList(res.data.todoList);
        }
      });
    }, []);
  }

  /* HANDLE CHANGE INPUT VALUE */
  function handleOnChange(event, props) {
    const { value } = props;
    setInputValue(value);
  }

  /* HANDLE CLICK ADD BUTTON */
  function handleClick() {
    todos.createTodo(user._id, inputValue).then((res) => {
      if (res.message) setErrors(res.message)
      if (res.data) {
        setTodoList(res.data.todoList);
        setErrors("")
      }
    });
  }

  /* HANDLE CLICK TRASH BUTTON */
  function handleDelete(todoId) {
    todos.deleteTodo(todoId).then((res) => {
      if (res.message) setErrors(res.message);
      if (res.data) {
        setTodoList(res.data.todoList);
        setErrors("")
      }
    });
  }

  /* HANDLE CLICK UPDATE BUTTON */
  function handleUpdate(id, content) {
    todos.updateTodo(id, content).then((res) => {
      if (res.message) setErrors(res.message)
      if (res.data) {
        setTodoList(res.data.todoList);
        setErrors("")
      }
    });
  }

  return (
    <Segment inverted vertical textAlign="center">
      <Container>
        <Grid>
          <Grid.Column width={14}>
            <Input
              fluid
              size="massive"
              onChange={handleOnChange}
              name="title"
              placeholder="New Todo"
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <Button inverted size="massive" onClick={handleClick} icon>
              <Icon name="plus" />
            </Button>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={14}>
            {errors && <Message negative>{errors}</Message>}
          </Grid.Column>
        </Grid>
        <Grid>
          {todoList &&
            todoList.map(({ title, _id }) => {
              return (
                  <Card fluid>
                    <Card.Content key={_id}>
                      <Card.Description as="h5">{title}</Card.Description>
                    </Card.Content>
                    <Button.Group>
                      <Button onClick={() => handleDelete(_id)} icon>
                        <Icon name="trash" />
                      </Button>
                      <Button
                        onClick={() => handleUpdate(_id, inputValue)}
                        icon
                      >
                        <Icon name="undo" />
                      </Button>
                    </Button.Group>
                  </Card>
              );
            })}
        </Grid>
      </Container>
    </Segment>
  );
};

export default Dashboard;
