import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const targetUrl = req.headers.get("x-api-tester-target-url");
    const targetMethod = req.headers.get("x-api-tester-method") || "GET";

    if (!targetUrl) {
      return NextResponse.json({ error: "Missing Target URL header" }, { status: 400 });
    }

    // Construct headers to forward
    const forwardHeaders = new Headers();
    req.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // Drop headers that may cause issues or reveal proxy details unnecessarily
      if (
        !lowerKey.startsWith("x-api-tester-") &&
        lowerKey !== "x-forwarded-for" &&
        lowerKey !== "x-forwarded-host" &&
        lowerKey !== "x-forwarded-proto" &&
        lowerKey !== "host" &&
        lowerKey !== "connection" &&
        lowerKey !== "content-length" && 
        lowerKey !== "accept-encoding" // Let fetch handle encodings
      ) {
        forwardHeaders.append(key, value);
      }
    });

    let bodyData: any = null;
    if (["POST", "PUT", "PATCH", "DELETE"].includes(targetMethod)) {
      try {
        const buffer = await req.arrayBuffer();
        if (buffer.byteLength > 0) {
          bodyData = buffer;
        }
      } catch (e) {
        // Body reading failed
      }
    }

    const response = await fetch(targetUrl, {
      method: targetMethod,
      headers: forwardHeaders,
      body: bodyData,
      redirect: "follow",
    });

    // Forward response back
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
    return NextResponse.json(
      { error: error.message || "Proxy fetch error" },
      { status: 500 }
    );
  }
}
