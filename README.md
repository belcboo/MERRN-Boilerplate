# MERRN-Boilerplate

A boilerplate for MERRN [Mongo, Express, React, Redux, Node].

##### NOTE: You should be able to use the backend in this repo with any other JS Framework, the only thing you need to do is eliminte the client folder and then use the endpoints in the API detailed below to point your choosed JS Framework.

# IMPORTANT:

In order to run this repo you need to create a file called **default.json** inside the folder **config**, this file must contain the MongoURI and the Secret that JWT is gonna use. Example:

```json
{
  "mongoURI": "yourMongoURI",
  "jwtSecret": "yourSecretForJWT
}
```

## INDEX

- [API Documentation](#api-documentation)
  - [Introduction](#introduction)
  - [Registering new user](#registering-a-user)
    - [API Answer on success](#api-answer-on-success)
    - [API Answer on wrong inputs](#api-answer-on-wrong-inputs)
    - [API Answer on duplicated user](#api-answer-on-duplicated-user)
    - [API Answer in server/other errors](#api-answer-on-system-errors)

# API Documentation

## Introduction

This API allows you to have a prebuilt app that uses JWT to register and generate tokens for the login of the users. The goal is to have a simple and quick way to start a MERN project, for that reason this API also has all the configuration for Node, Express, Mongo and React.

## Registering a user:

- Route: api/users/new
- Route type: POST
- Description: New user creation
- Access: Public
- Expenting Object:

```json
{
  "name": "Test Tester",
  "email": "test@test.com",
  "password": "12345678"
}
```

### API answer on success:

On success you're gonna receive a token,you can use this token to authenticate the user that you just registered.

- Return status: 200 Ok
- JSON Response example:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWNmNzQ4NGU5YThhZmYwYzQ1MjA2NTRiIiwicm9sZSI6IlVzZXIifSwiaWF0IjoxNTU5NzA5Nzc0LCJleHAiOjE1NjAwNjk3NzR9.bEpQsT-BkjAKFu_QJ2tMPDTBJ6bRUcEHH1c_A2xGPmo"
}
```

### API answer on wrong inputs:

If any of the fields does not comply with the validation checks defined in the route you can receive one or more of the following errors. The goal in sending this object as response from the API in case of errors in the inputs is that you can provide feedback to your users when something is wrong. You can customize this validations and messages in the file: **/routes/api/users.js**

- Return status: 400 Bad Request
- JSON Response example:

```json
{
  "errors": [
    {
      "location": "body",
      "param": "name",
      "value": "",
      "msg": "Name is required"
    },
    {
      "location": "body",
      "param": "email",
      "value": "",
      "msg": "Please enter a valid email"
    },
    {
      "location": "body",
      "param": "password",
      "value": "",
      "msg": "Password must contain at least 8 letters/symbols/numbers"
    }
  ]
}
```

### API answer on duplicated user:

The API check if an email is already registered, if that's positive you will receive an object error. This is the same goal as the past answer, be able to provide feedback messages to the user.

- Return status: 400 Bad Request
- JSON Response example:

```json
{
  "errors": [
    {
      "msg": "User already exists"
    }
  ]
}
```

### API answer on system errors:

- Return status: 500 Internal Server Error
- JSON Response example:

```
Server Error
```
