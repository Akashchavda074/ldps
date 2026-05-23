import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { EventModel } from "@/models/Event";

export async function GET() {
  try {
    await connectToDatabase();
    const items = await EventModel.find().sort({ date: -1, createdAt: -1 }).lean();
    return NextResponse.json(items);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch events.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const created = await EventModel.create({
      title: body.title,
      description: body.description ?? "",
      imageUrl: body.imageUrl ?? "",
      date: body.date ? new Date(body.date) : null,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create event.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "Event ID is required." }, { status: 400 });
    }

    const updated = await EventModel.findByIdAndUpdate(
      body.id,
      {
        title: body.title,
        description: body.description ?? "",
        imageUrl: body.imageUrl ?? "",
        date: body.date ? new Date(body.date) : null,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update event.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "Event ID is required." }, { status: 400 });
    }

    const deleted = await EventModel.findByIdAndDelete(body.id);

    if (!deleted) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete event.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
