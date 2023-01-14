interface backendResponse {
  success: boolean;
  data?: Record<string,any>;
  message?: "";
}

async function login(email: string, password: string) : Promise<backendResponse> {
  const body = { email, password };
  const fetchResponse = await fetch("http://localhost:3000/auth/login", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const response:backendResponse = await fetchResponse.json();
  console.log({response});
  return response;
}

async function register(email: string, password: string, repeatPassword: string):Promise<backendResponse> {
  const body = { email, password, repeatPassword };
  console.log({body});

  const fetchResponse = await fetch("http://localhost:3000/auth/register", {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
  
  const response:backendResponse = await fetchResponse.json();
  console.log({response});
  return response;
}

export const auth = { login, register };
