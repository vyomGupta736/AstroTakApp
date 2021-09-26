const jRes = (res,errCode, data) => {
    res.contentType = "application/json; charset=utf-8";
    res.statusCode = errCode;
    res.send(data);
}

const searchResult = (query, queryOn) => {
    let body = {
        size: 200,
        from: 0,
        query: {
          wildcard : {
            queryOn : query,
          },
        },
    };
    client
      .search({ index: 'astrodata', body: body, type: 'astrodata' })
      .then((results) => {
          console.log(results);
          return results;
      })
      .catch((err) => {
        console.log(err);
      });
}

module.exports = {jRes, searchResult};