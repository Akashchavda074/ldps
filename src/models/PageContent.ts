import { model, models, Schema, type InferSchemaType } from "mongoose";

const SectionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: [String], default: [] },
});

const PageContentSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    group: {
      type: String,
      trim: true,
    },
    sections: {
      type: [SectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export type PageContentDocument = InferSchemaType<typeof PageContentSchema> & { _id: string };

export const PageContentModel = models.PageContent || model("PageContent", PageContentSchema);
