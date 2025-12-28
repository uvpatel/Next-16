import books from "@/app/api/db"
import { NextResponse } from "next/server"

export async function GET() {
    return NextResponse.json(books)
}

export async function POST(request: Request) {
    const book = await request.json()
    books.push(book)

    return NextResponse.json(books)
}