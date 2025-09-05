"use client";
import { useEffect } from "react";

export default function MagicCursor() {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const spark = document.createElement("div");
      spark.className = "spark";
      spark.style.left = e.pageX + "px";
      spark.style.top = e.pageY + "px";
      document.body.appendChild(spark);

      setTimeout(() => spark.remove(), 600);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return null;
}
