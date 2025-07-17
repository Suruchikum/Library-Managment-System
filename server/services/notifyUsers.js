import cron from "node-cron";
import { sendEmail } from "../utils/sendEmail.js";
import Borrow from "../models/borrowModel.js";

export const notifyUsers = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

      // Find all overdue books not returned and not yet notified
      const borrowers = await Borrow.find({
        dueDate: { $lt: oneDayAgo },
        returnDate: null,
        notified: false,
      }).populate("user"); // user model must have email and name fields

      for (const borrow of borrowers) {
        const user = borrow.user;

        if (user?.email && user?.name) {
          await sendEmail({
            email: user.email,
            subject: "📚 Book Return Reminder",
            message: `Hello ${user.name},\n\nThis is a reminder that the book you borrowed is overdue. Please return it as soon as possible.\n\nThank you.`,
          });

          // mark as notified
          borrow.notified = true;
          await borrow.save();

          console.log(`✅ Email sent to ${user.email}`);
        }
      }
    } catch (error) {
      console.error("❌ Error occurred while notifying users:", error);
    }
  });
};
