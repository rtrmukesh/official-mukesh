import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const targetUrl = req.headers.get("x-api-tester-target-url");
    const targetMethod = req.headers.get("x-api-tester-method") || "GET";
    const encodedHeaders = req.headers.get("x-api-tester-headers");

    if (!targetUrl) {
      return NextResponse.json({ error: "Missing Target URL header" }, { status: 400 });
    }

    // Construct headers to forward from the encoded JSON
    const forwardHeaders = new Headers();
    if (encodedHeaders) {
      try {
        const clientHeaders = JSON.parse(decodeURIComponent(encodedHeaders));
        for (const [key, value] of Object.entries(clientHeaders)) {
          // Avoid setting host/content-length/etc manually if it's already in browser headers
          const lowerKey = key.toLowerCase();
          if (lowerKey !== "host" && lowerKey !== "content-length") {
            forwardHeaders.append(key, value as string);
          }
        }
      } catch (e) {
        console.error("Failed to parse x-api-tester-headers", e);
      }
    }

    let bodyData: any = null;
    if (["POST", "PUT", "PATCH", "DELETE"].includes(targetMethod)) {
      const buffer = await req.arrayBuffer();
      if (buffer.byteLength > 0) {
        bodyData = buffer;
      }
    }

    const response = await fetch(targetUrl, {
      method: targetMethod,
      headers: forwardHeaders,
      body: bodyData,
      redirect: "follow",
    });

    // Forward response headers back
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // Drop encoding and length headers to let Next.js handle it
      if (
        lowerKey !== "content-encoding" &&
        lowerKey !== "content-length" &&
        lowerKey !== "transfer-encoding"
      ) {
        responseHeaders.append(key, value);
      }
    });

    const responseBuffer = await response.arrayBuffer();

    return new NextResponse(responseBuffer, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error("Proxy fetch error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Proxy fetch error",
        details: error.cause ? String(error.cause) : undefined
      },
      { status: 500 }
    );
  }
}

