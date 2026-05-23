import { model, models, Schema, type InferSchemaType } from "mongoose";

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },
    date: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export type EventDocument = InferSchemaType<typeof EventSchema> & { _id: string };

export const EventModel = models.Event || model("Event", EventSchema);
