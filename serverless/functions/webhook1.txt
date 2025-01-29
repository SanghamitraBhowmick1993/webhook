// serverless/functions/webhook.ts
import { NowRequest, NowResponse } from '@vercel/node';
import fs from 'fs/promises';
import path from 'path';

interface WebhookPayload {
  [key: string]: any;
}

interface JsonObject {
  [key: string]: string | number | boolean | null | JsonObject | JsonArray;
}

interface JsonArray extends Array<string | number | boolean | null | JsonObject | JsonArray>{}

export default async function handler(req: NowRequest, res: NowResponse) {
  if (req.method === 'POST') {
    try {
      const payload: WebhookPayload = req.body; // No type assertion needed

      const timestamp = Date.now();
      const filename = `webhook_${timestamp}.json`;
      const filePath = path.join(__dirname, 'data', filename);

      try {
        await fs.mkdir(path.join(__dirname, 'data')); // Create 'data' directory
      } catch (mkdirErr: any) {
        if (mkdirErr.code !== 'EEXIST') {
          console.error("Error creating data directory:", mkdirErr);
          return res.status(500).json({ error: 'Failed to create data directory' });
        }
      }

      await fs.writeFile(filePath, JSON.stringify(payload, null, 2));

      console.log(`Webhook data saved to ${filePath}`);

      res.status(200).json({ message: 'Webhook received and stored successfully' });

    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ error: 'Failed to process webhook' });
    }
  } else if (req.method === 'GET') {
    try {
      const files = await fs.readdir(path.join(__dirname, 'data'));
      const webhookData: JsonObject[] = []; // Use JsonObject[]

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(__dirname, 'data', file);
          const fileData = await fs.readFile(filePath, 'utf8');

          try {
            const parsedData: JsonObject = JSON.parse(fileData);
            webhookData.push(parsedData);
          } catch (parseError) {
            console.error(`Error parsing JSON in ${file}:`, parseError);
            continue; // Skip to the next file
          }
        }
      }

      res.status(200).json(webhookData);
    } catch (error) {
      console.error('Error retrieving webhook data:', error);
      res.status(500).json({ error: 'Failed to retrieve webhook data' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}