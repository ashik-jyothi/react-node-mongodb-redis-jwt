# Login, Register Page using JWT

Login and register page using ReactJS NodeJs MongoDB using JWT

## Installation

First clone this repo and install dependencies 

```bash
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
npm install
```
After installing dependencies run the application using
## Usage

```bash

# Run Client and Server
npm start

# Run only client
npm run client

# Run only server
npm run server
```

## API Reference

#### Get list of tokens of the logged user

```http
  GET /dashboard/login_list
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Auth Token` | `string` | **Required**. Your JWT Token in request Authorization header |

#### Get details of the logged user

```http
  GET /dashboard/user_details
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth Token`      | `string` | **Required**. Your JWT Token in request Authorization header |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[ISC](https://choosealicense.com/licenses/ISC/)