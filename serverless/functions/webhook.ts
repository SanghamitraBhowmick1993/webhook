import { NowRequest, NowResponse } from '@vercel/node';

export default async function handler(req: NowRequest, res: NowResponse) {
  if (req.method === 'POST') {
    console.log("POST request received"); // Check if the function is even being hit
    res.status(200).json({ message: "Hello from simplified webhook!" });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}