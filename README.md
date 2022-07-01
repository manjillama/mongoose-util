## Project Introduction

Easy lightweight mongoose utility helper functions to query your entity list.

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
const { getAll } = require("@manjiltamang/mongoose-util");
const Lyric = require("./models/Lyric"); // Your mongoose model

app.get("/lyrics", async (req, res) => {
  const [lyrics, total, size] = await getAll(Lyric, req.query).exec();

  res.status(200).json({
    status: "success",
    data: {
      lyrics,
      total,
      size,
    },
  });
});
```

```
GET /api/lyrics?artist=jindabaad&page=2&limit=30&fields=lyric,artist,album&sort=-releaseYear&ratings[gte]=3&ratings[lte]=5
```

Above request will fetch second page of lyrics with size `30` per page `jindabaad` as artist name, , selecting only `lyrics, artist and album` attributes and sorted by `release year` in descending order with ratings of `3` to `5`.

**Date Range**

```
GET /api/songs?artist=jindabaad&releaseYear[gte]=2012-01-01&releaseYear[lte]=2020-10-30
```

Get all songs from the artist `Jindabaad` that has been released between date `2012-01-01` and `2020-10-30`

**Wildcard**

```
GET /api/songs?artist[match]=baad
```

Similar to `LIKE` operator in SQL. The `match` operator will fetch all the songs from artists containing `baad` (case in-sensitive) in their name.

**Populate**

```javascript
const [lyrics, total, size] = await getAll(Lyric, req.params)
  .populate("artist")
  .exec();
```

You can add sorting, filters, paginations, field limiting by adding the request params to the request.

| Request Params Fields                               | Values                                                                    |
| --------------------------------------------------- | ------------------------------------------------------------------------- |
| Filter (Optional)                                   | Filter value (Using same field multiple times will result in union query) |
| page (Optional)                                     | Page number (default value is 1)                                          |
| limit (Optional)                                    | Size of response list per page (default value is 40)                      |
| sort (Optional)                                     | Sort by i.e. -createAt (Sort by created date in descending order)         |
| fields (Optional)                                   | i.e. name, album, etc. (Fetch provided fields only)                       |
| Mongoose operators i.e. [gt], [lt], etc. (Optional) | Operator value                                                            |

## Contributing guide

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

## License

Licensed under the [MIT License](./LICENSE).
