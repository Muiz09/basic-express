const express = require('express')
const joi = require('joi')
const fs = require('fs')
const app = express()
const port = 3000

const database = './database/db.json';
const data = JSON.parse(fs.readFileSync(database));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const handleServerError = (res) => {
  return res.status(500).json({ message: 'Internal Server Error' })
}
const handleClientError = (res, status, message) => {
  return res.status(status).json({ message });
}

// GET ALL freestore OR phonestore
app.get('/all/:type', (req, res) => {
  try {
    const { type } = req.params;
    const listType = ['freestore', 'phonestore'];
    if (!listType.includes(type)) {
      return handleClientError(res, 404, 'URL Not Found');
    }
    return res.status(200).json({ data: data[type], status: 'Success' });
  } catch {
    // res.send('Hello World!')
    return handleServerError(res);
  }
})

// GET ALL PRODUCT BY TITLE (FILTER)
app.get('/all/:type/:title', (req, res) => {
  try {
    const { type, title } = req.params;
    const listType = ['freestore', 'phonestore'];
    if (!listType.includes(type) || !data[type].find((el) => el.title.toLowerCase() === title.toLowerCase())) {
      return handleClientError(res, 404, 'Data Not Found');
    }
    const selectedName = data[type].filter((el) => el.title.toLowerCase() === title.toLowerCase());
    res.status(200).json({ data: selectedName[0], message: 'Success' })
  } catch (error) {
    return handleServerError(res);
  }
})

// CREATE PRODUCT
app.post('/create/:type', (req, res) => {
  try {
    const { type } = req.params;
    const newData = req.body;
    const scheme = joi.object({
      title: joi.string().min(5).required(),
      description: joi.string().required(),
      price: joi.string().required(),
      discountPercentage: joi.string().required(),
      rating: joi.string().required(),
      stock: joi.string().required(),
      brand: joi.string().required(),
      category: joi.string().required(),
    })

    const { error } = scheme.validate(newData);
    if (error) {
      res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }

    if (data[type].find((el) => el.title.toLowerCase() === newData.title.toLowerCase())) {
      return handleClientError(res, 400, 'Data Already Existed');
    }

    data[type].push(newData);

    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(201).json({ data: data[type], status: 'Success' })

  } catch (error) {
    return handleServerError(res);
  }
});

// UPDATE PRODUCT
app.put('/all/:type/:title', (req, res) => {
  try {
    const { type, title } = req.params;
    const newData = req.body;

    const scheme = joi.object({
      title: joi.string().min(5).required(),
      description: joi.string().required(),
      price: joi.string().required(),
      discountPercentage: joi.string().required(),
      rating: joi.string().required(),
      stock: joi.string().required(),
      brand: joi.string().required(),
      category: joi.string().required(),
    })


    const { error } = scheme.validate(newData);
    if (error) {
      res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }

    if (!data[type].find((el) => el.title.toLowerCase() === title.toLowerCase())) {
      return handleClientError(res, 404, 'Data Not Found');
    }

    const filtered = data[type].filter((el) => el.title.toLowerCase() !== title.toLowerCase());
    filtered.push(newData);

    data[type] = filtered;

    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(200).json({ data: data[type], message: 'Success' })

  } catch (error) {
    return handleServerError(res);
  }
})

// DELETE PRODUCT
app.delete('/:type/:title', (req, res) => {
  try {
    const { type, title } = req.params;

    if (!data[type].find((el) => el.title.toLowerCase() === title.toLowerCase())) {
      return handleClientError(res, 404, 'Data Not Found');
    }

    const filtered = data[type].filter((el) => el.title.toLowerCase() !== title.toLowerCase());
    data[type] = filtered;
    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(200).json({ data: data[type], message: 'Success' })
  } catch (error) {
    return handleServerError(res)
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})