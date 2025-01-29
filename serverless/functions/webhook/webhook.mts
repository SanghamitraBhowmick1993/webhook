import { Context, HandlerEvent } from "@netlify/functions";

export default (event: HandlerEvent, request: Request, context: Context) => {
  try {
    const { httpMethod } = event;

    if (httpMethod === "POST") {
      console.log("Post payload", JSON.stringify(request));
    }
    if (httpMethod === "GET") {
      console.log("Get payload", JSON.stringify(request));
    }

    const url = new URL(request.url);
    const subject = url.searchParams.get("name") || "World";

    return new Response(`Hello ${subject}`);
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    });
  }
};
