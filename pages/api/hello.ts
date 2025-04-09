import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        console.log(88, req.body)
    } else {
        // Handle any other HTTP method
    }
    res.status(200).json({ message: 'Hello from Next.js!' })
}