import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { NoticeModel } from "@/models/Notice";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (id) {
      const item = await NoticeModel.findById(id).lean();
      return NextResponse.json(item);
    }

    if (slug) {
      // In a real app, we might need a slug field in the model. 
      // For now, we'll search by title match or use ID.
      // But usually slugs are generated from titles.
      const items = await NoticeModel.find().lean();
      const item = items.find(n => {
        const generatedSlug = n.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        return generatedSlug === slug;
      });
      return NextResponse.json(item);
    }

    const items = await NoticeModel.find().sort({ date: -1, createdAt: -1 }).lean();
    return NextResponse.json(items);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch notices.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const created = await NoticeModel.create({
      title: body.title,
      subject: body.subject ?? "",
      body: body.body ?? "",
      refNo: body.refNo ?? "",
      signatory: body.signatory ?? "Principal,\nLPS English Medium School",
      category: body.category,
      date: body.date ? new Date(body.date) : new Date(),
      isNew: body.isNew ?? true,
      link: body.link ?? "",
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create notice.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "Notice ID is required." }, { status: 400 });
    }

    const updated = await NoticeModel.findByIdAndUpdate(
      body.id,
      {
        title: body.title,
        subject: body.subject ?? "",
        body: body.body ?? "",
        refNo: body.refNo ?? "",
        signatory: body.signatory ?? "Principal,\nLPS English Medium School",
        category: body.category,
        date: body.date ? new Date(body.date) : new Date(),
        isNew: body.isNew ?? true,
        link: body.link ?? "",
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Notice not found." }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update notice.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "Notice ID is required." }, { status: 400 });
    }

    const deleted = await NoticeModel.findByIdAndDelete(body.id);

    if (!deleted) {
      return NextResponse.json({ error: "Notice not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete notice.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
