import connectDB from "@/config/database";
import Items from "@/models/Items";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectDB();

    const items = await Items.find({});

    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new Response("Something went wrong", { status: 500 });
  }
};
