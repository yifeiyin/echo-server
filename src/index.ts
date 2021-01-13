import http from "http"

const handler = (req: http.IncomingMessage, res: http.ServerResponse) => {
    const rawHeaders = req.rawHeaders
    const formattedHeaders = rawHeaders.reduce(
        (prev, curr, index) =>
            index % 2 === 0 ?
            prev + curr
            : prev + ': ' + curr + '\n',
        '')

    const url = req.url
    const method = req.method

    res.write(`${method} ${url}\n`)
    res.write(formattedHeaders)
    res.end()
}

const server = http.createServer((req, res) => {
    try {
        handler(req, res)
    } catch {
        res.statusCode = 500
        res.end()
    }
})

server.listen(1234)
