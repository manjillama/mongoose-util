## Project Introduction

Easy lightweight mongoose utilities helper functions.

## Table of Contents

- [Installation](#installation)
- [API documentation](#api-documentation)
- [Contributing guide](#contributing-guide)
- [License](#license)

## Installation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install --save @manjiltamang/mongoose-util
    $ yarn add @manjiltamang/mongoose-util

## API documentation

Build on top of mongoose you can use the helper functions in your Node.js application to create query with ease for faster development.

### Get all example

A basic usage example for fetching a list.

```javascript
const { getAll } = require('@manjiltamang/mongoose-util');
const Lyric = require('./models/Lyric'); // Your mongoose model

app.get('/lyrics', async (req, res) => {
  const [lyrics, total, size] = await getAll(Lyric, req.query).exec();

  res.status(200).json({
    status: 'success',
    data: {
      lyrics,
      total,
      size,
    },
  });
});
```

```
GET /api/lyrics?artist=jindabaad&page=2&size=30&fields=lyric,artist,album&sort=-releaseYear
```

Above request will fetch second page of lyrics with size `30` per page `jindabaad` as artist name, , selecting only `lyrics, artist and album` attributes and sorted by `release year` in descending order.

Populate

```javascript
const [lyrics, total, size] = await getAll(Lyric, req.params)
  .populate('artist')
  .exec();
```

You can add sorting, filters, paginations, field limiting by adding the request params to the request.

| Request Params Fields | Values                                                                   |
| --------------------- | ------------------------------------------------------------------------ |
| E.g. Field (Optional) | Field value (Using same field multiple times will result in union query) |
| page (Optional)       | Page number (default value is 1)                                         |
| size (Optional)       | Size of response list per page (default is 40)                           |
| sort (Optional)       | -field i.e. -createAt (Sort using created date in descending order)      |
| fields (Optional)     | i.e. name, album, etc. (Fetch provided fields only)                      |

## Contributing guide

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

## License

Licensed under the [MIT License](./LICENSE).
