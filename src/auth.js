export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    // console.log(res);
    return res;
  })
  // .then((data) => {
  //   console.log(data.status);
  //   console.log(data.message);
  //   return data
  // })
  .catch((err) => console.error(err));
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
  })
  .catch(err => console.error(err))
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    return data;
  })
};
