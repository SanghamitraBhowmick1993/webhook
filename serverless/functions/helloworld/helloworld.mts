// import { Context, HandlerEvent } from "@netlify/functions";
// import fs from "fs/promises";
// import path from "path";

// interface WebhookPayload {
//   [key: string]: any;
// }

// interface JsonObject {
//   [key: string]: string | number | boolean | null | JsonObject | JsonArray;
// }

// interface JsonArray
//   extends Array<string | number | boolean | null | JsonObject | JsonArray> {}

// const handler = async (event: HandlerEvent,request: Request, context: Context) => {
//   const { httpMethod } = event;
//   console.log("events ", JSON.stringify(event));
//   console.log("request ", JSON.stringify(request));
//   console.log("context ", JSON.stringify(context));

//   if (httpMethod === "POST") {
//     try {
//       const payload: WebhookPayload = JSON.parse(event.body || "{}");

//       const timestamp = Date.now();
//       const filename = `webhook_${timestamp}.json`;
//       const filePath = path.join(__dirname, "data", filename);

//       try {
//         await fs.mkdir(path.join(__dirname, "data"));
//       } catch (mkdirErr: any) {
//         if (mkdirErr.code !== "EEXIST") {
//           console.error("Error creating data directory:", mkdirErr);
//           return new Response(
//             JSON.stringify({ error: "Failed to create data directory" }),
//             { status: 500 }
//           );
//         }
//       }

//       await fs.writeFile(filePath, JSON.stringify(payload, null, 2));

//       console.log(`Webhook data saved to ${filePath}`);

//       return new Response(
//         JSON.stringify({ message: "Webhook received and stored successfully" }),
//         { status: 200 }
//       );
//     } catch (error) {
//       console.error("Error processing webhook:", error);
//       return new Response(
//         JSON.stringify({ error: "Failed to process webhook" }),
//         { status: 500 }
//       );
//     }
//   } else if (httpMethod === "GET") {
//     try {
//       const files = await fs.readdir(path.join(__dirname, "data"));
//       const webhookData: JsonObject[] = [];

//       for (const file of files) {
//         if (file.endsWith(".json")) {
//           const filePath = path.join(__dirname, "data", file);
//           const fileData = await fs.readFile(filePath, "utf8");

//           try {
//             const parsedData: JsonObject = JSON.parse(fileData);
//             webhookData.push(parsedData);
//           } catch (parseError) {
//             console.error(`Error parsing JSON in ${file}:`, parseError);
//             continue;
//           }
//         }
//       }

//       return new Response(JSON.stringify(webhookData), { status: 200 });
//     } catch (error) {
//       console.error("Error retrieving webhook data:", error);
//       return new Response(
//         JSON.stringify({ error: "Failed to retrieve webhook data" }),
//         { status: 500 }
//       );
//     }
//   } else {
//     try {
//       const url = new URL(request.url);
//       const subject = url.searchParams.get("name") || "World";
//       return new Response(`Hello ${subject}`);
//     } catch (error) {
//       return new Response(error.toString(), { status: 500 });
//     }
//   }
// };

// export default handler;

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  console.log("events ", JSON.stringify(event));
  console.log("context ", JSON.stringify(context));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};

export { handler };
