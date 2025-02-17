# Simple CRUD Node server

First, install the dependencies:

```
npm install
```

Run the server in dev mode:

```
npm run dev
```

To build the server for production use:

```
npm run build
```

To run the built server:

```
npm start
```

## API Endpoints
| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/items` | Retrieve all items.|
| `POST`   | `/api/items` | Create a new item.|
| `GET`    | `/api/items/{uuid}`| Retrieve item by UUID.|
| `PUT`  | `/api/items/{uuid}`| Update data of item by ID.|
| `DELETE`   | `/api/items/{uuid}`| Delete item by UUID.|
| `GET`    | `/api/find/items?description=Book&quantity=1&Name=Harry` | Retrieve an item with the name that includes "Harry", has a quantity of 1 and a description that includes "Book".