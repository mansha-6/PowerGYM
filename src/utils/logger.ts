
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type LogLevel = "info" | "warn" | "error";

class Logger {
  private static async log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      level,
      message,
      data: data ? JSON.stringify(data) : null,
      timestamp, // ISO string for local usage
      createdAt: serverTimestamp(), // Server timestamp for sorting
    };

    // 1. Console Log
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, data || "");

    // 2. Firestore Log
    try {
      await addDoc(collection(db, "system_logs"), logEntry);
    } catch (error) {
      console.error("Failed to write log to Firestore:", error);
    }
  }

  static info(message: string, data?: any) {
    this.log("info", message, data);
  }

  static warn(message: string, data?: any) {
    this.log("warn", message, data);
  }

  static error(message: string, data?: any) {
    this.log("error", message, data);
  }
}

export default Logger;
