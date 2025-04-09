import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '3001', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    createServer((req, res) => {
        const apiHandle = (req: any, res: any) => {
            console.log('req', req.method)
            if (req.method === 'POST') {
                // Process a POST request
                console.log('POST')
            } else {
                console.log(' ----POST ---- ')
                // Handle any other HTTP method
            }
        }

        const parsedUrl = parse(req.url!, true)
        console.error(parsedUrl)
        handle(req, res, parsedUrl)
        apiHandle(req, res)
    }).listen(port)

    console.log(
        `> Server listening at http://localhost:${port} as ${
            dev ? 'development' : process.env.NODE_ENV
        }`
    )
})