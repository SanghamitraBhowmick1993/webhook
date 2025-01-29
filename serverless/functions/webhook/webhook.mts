import { Context, HandlerEvent } from "@netlify/functions";

export default (event: HandlerEvent, request: Request, context: Context) => {
  try {
    const { httpMethod } = event;
    const url = new URL(request.url);
    let subject = url.searchParams.get("name") || "World";
    console.log("events ", JSON.stringify(event));
    if (httpMethod === "POST") {
      subject = "POST";
      console.log("Post payload", JSON.stringify(request));
    }
    if (httpMethod === "GET") {
      subject = "GET";

      console.log("Get payload", JSON.stringify(request));
    }

    return new Response(`Hello ${subject}`);
  } catch (error) {
    return new Response(error.toString(), {
      status: 500,
    });
  }
};
