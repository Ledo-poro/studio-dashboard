import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const themes = ["light", "dark"] as const;
const languages = ["en", "ar", "es", "fr"] as const;

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const preferences = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { theme: true, language: true },
    });

    return NextResponse.json(preferences ?? { theme: "light", language: "en" });
  } catch (error) {
    console.error("Preferences fetch error:", error);
    return NextResponse.json({ theme: "light", language: "en" });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let body: { theme?: unknown; language?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    if (!themes.includes(body.theme as (typeof themes)[number]) || !languages.includes(body.language as (typeof languages)[number])) {
      return NextResponse.json({ error: "Invalid theme or language" }, { status: 400 });
    }

    const preferences = await prisma.user.update({
      where: { id: session.user.id },
      data: { theme: body.theme as string, language: body.language as string },
      select: { theme: true, language: true },
    });

    return NextResponse.json(preferences);
  } catch (error) {
    console.error("Preferences update error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}