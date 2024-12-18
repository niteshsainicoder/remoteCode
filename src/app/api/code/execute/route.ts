import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { codeContent, language } = body;

  if (!codeContent || !language) {
    return NextResponse.json(
      { message: "Please provide code", error: true },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      `
      ${process.env.SERVER_URL}run`,
      { language, codeContent },
      {
        headers: { "x-api-key": process.env.API_KEY },
        timeout:90000
      }
    );

    return NextResponse.json(
      {
        output: response.data.output,
        error: !response.data.success,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal server error", error: error, output: false },
      { status: 500 }
    );
  }
}
