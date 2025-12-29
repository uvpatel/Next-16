"use server";

import Event from "@/models/event.model";
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });

        if (!event || !event.tags?.length) {
            return [];
        }
        const similarEvents = await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags },
        }).lean();

        return similarEvents;
    } catch(error : any) {
        console.error("getSimilarEventsBySlug error:", error);
        return [];
    }
};


export async function getAllEvents() {
  try {
    await connectDB();
    
    const events = await Event.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}