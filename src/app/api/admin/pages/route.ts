import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { PageContentModel } from "@/models/PageContent";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const item = await PageContentModel.findOne({ slug }).lean();
      return NextResponse.json(item);
    }

    const items = await PageContentModel.find().sort({ title: 1 }).lean();
    return NextResponse.json(items);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch page content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const created = await PageContentModel.create({
      slug: body.slug,
      title: body.title,
      group: body.group,
      sections: body.sections || [],
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create page content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.id && !body.slug) {
      return NextResponse.json({ error: "ID or Slug is required." }, { status: 400 });
    }

    const query = body.id ? { _id: body.id } : { slug: body.slug };

    const updated = await PageContentModel.findOneAndUpdate(
      query,
      {
        title: body.title,
        group: body.group,
        sections: body.sections || [],
      },
      { new: true, runValidators: true, upsert: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update page content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "Page ID is required." }, { status: 400 });
    }

    const deleted = await PageContentModel.findByIdAndDelete(body.id);

    if (!deleted) {
      return NextResponse.json({ error: "Page not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete page content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
