interface backendResponse{
  success: boolean,
  data?: {
    user?: Record<string,any>,
    todoList: []
  },
  message?: string
}

async function readTodo(): Promise<backendResponse> {
  const rawResponse = await fetch("http://localhost:3000/api/todo", {headers : { "Content-Type" : "application/json" }});
  const result:backendResponse = await rawResponse.json();
  return result;
}

async function createTodo(userId: string, content:string): Promise<backendResponse>{
  const body = {userId, content};
  const rawResponse = await fetch("http://localhost:3000/api/todo", {
    method: "post",
    body: JSON.stringify(body),
    headers : { "Content-Type" : "application/json" }
  })
  const response:backendResponse = await rawResponse.json();
  return response;
}

async function updateTodo(id: string, content: string): Promise<backendResponse>{
  const body = {content}
  const rawRasponse = await fetch(`http://localhost:3000/api/todo/${id}`, {
    method : "put",
    body: JSON.stringify(body),
    headers : { "Content-Type" : "application/json" }
  })
  const result:backendResponse = await rawRasponse.json()
  console.log({result});
  return result;

}

async function deleteTodo(id: string):Promise<backendResponse>{
  const rawResponse = await fetch(`http://localhost:3000/api/todo/${id}`,{
    method: "delete",
    headers: { "Content-Type":"application/json" }
  })
  const result:backendResponse = await rawResponse.json()
  return result;
}

export const todos = { readTodo, createTodo, updateTodo, deleteTodo };
