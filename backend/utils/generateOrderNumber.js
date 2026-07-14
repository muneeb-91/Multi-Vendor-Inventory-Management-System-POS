import Counter from "../models/counter.model.js";

export const generateOrderNumber = async () => {
  const year = new Date().getFullYear();
  const counter = await Counter.findByIdAndUpdate(
    `order_${year}`,
    {
      $inc: {
        sequence: 1,
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return `INV-${year}-${String(counter.sequence).padStart(4, "0")}`;
};
