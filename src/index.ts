import http from 'http';

String.prototype.toTitleCase = function (): string {
  function capitalize(str: String) {
    return (
      str.charAt(0).toUpperCase() + str.substring(1, str.length).toLowerCase()
    );
  }

  function titleCase(str: String) {
    return str.replace(/[^ /\-_]+/g, capitalize);
  }

  return titleCase(this);
};

const handler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { method, url, headers } = req;

  const plainText =
    [
      '---- TCP Info ----',
      req.socket.remoteFamily,
      req.socket.remoteAddress,
      req.socket.remotePort,
      ,
      '---- HTTP Request ----',
      method + ' ' + url,
      ,
      'Body Length: ' + req.readableLength,
      ,
      Object.entries(headers)
        .map(([k, v]) => `:: ${k.toTitleCase()} ::\n${v}`)
        .join('\n\n'),
      ,
      '---- Server Time ----',
      new Date(),
      ,
      Date.now(),
      ,
      new Date().toJSON(),
      ,
    ].join('\n') + '\n';

  res.write(plainText);
  res.end();
};

const server = http.createServer((req, res) => {
  try {
    handler(req, res);
  } catch {
    res.statusCode = 500;
    res.write('Internal Error');
    res.end();
  }
});

server.listen(1234);
