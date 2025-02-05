import { NowRequest, NowResponse } from '@vercel/node';

export default async function handler(req: NowRequest, res: NowResponse) {
  if (req.method === 'POST') {
    console.log("POST received");
    res.status(200).json({ message: "Hello from test!" });
  } else {
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}