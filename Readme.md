# Basic Express

Basic express.js project with basic routes:
* Express
* Joi
* Fs

---

## URL

_Server_
```
http://localhost:3000
```
---


## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## RESTful endpoints

### POST /create/:type/:species

> Create freestore or phonestore

_Request Header_
```
not needed
```

_Request Body_
```
{
  "title" : "<name>",
  "description" : "<description>",
  "price" : "<price>",
  "discountPercentage" : "<discountPercentage>",
  "rating" : "<rating>",
  "stock" : "<stock>",
  "brand" : "<brand>",
  "category" : "<category>"

}
```

_Response (200)_
```
{
    "data": [<data_product>],
    "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"title\" is required"
}
```

---

### GET /all/:type

> Get all by type

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{

    "data": {
        "<data_type>": [
	        <data_product>
	       ]
        },

    "status": "Success"

}
```

---

### GET /all/:type/:title

 > Get by name

_Request Params_

```
<type_name>/<freestore_or_phonestore>

```

_Request Header_

```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "title" : "<name>",
        "description" : "<description>",
        "price" : "<price>",
        "discountPercentage" : "<discountPercentage>",
        "rating" : "<rating>",
        "stock" : "<stock>",
        "brand" : "<brand>",
        "category" : "<category>"
    },
    "message": "Success"
}
```

_Response (404)_
```
{
    "message": "Data Not Found"
}
```

---
### PUT /all/:type/:name

> Update by name

_Request Params_
```
<type_name>/<freestore_or_phonestore>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
 "title" : "<name>",
  "description" : "<description>",
  "price" : "<price>",
  "discountPercentage" : "<discountPercentage>",
  "rating" : "<rating>",
  "stock" : "<stock>",
  "brand" : "<brand>",
  "category" : "<category>"
}
```

_Response (200)_
```
{
    "data": [
        <data_product>
    ],
    "message": "Success"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" length must be at least 5 characters long"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---

### DELETE /all/:type/:title

> Delete by name

_Request Params_
```
/<type_name>/<title>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [<data_product>],
    "message": "Success"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---