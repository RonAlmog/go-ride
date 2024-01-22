import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("hello");
  return NextResponse.json({ data: "hhh" });
}
