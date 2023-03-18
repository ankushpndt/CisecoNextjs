import dynamic from "next/dynamic";
import { Builder, builder } from "@builder.io/react";

const LazyCardCategory3 = dynamic(async () => {
  return (await import("./CardCategories/CardCategory3")).default;
});

import img1 from "@/images/collections/1.png";
import img2 from "@/images/collections/5.png";
import img3 from "@/images/collections/4.png";
import img4 from "@/images/collections/3.png";

builder.init("4dd684c28ac74d259def9eb31a7054f9");

Builder.registerComponent(LazyCardCategory3, {
  name: "CardCategory3",
  inputs: [
    {
      name: "Explore new arrivals",
      desc: "Shop the latest <br /> from top brands",
      featuredImage: img1,
      color: "bg-yellow-50",
    },
    {
      name: "Digital gift cards",
      desc: "Give the gift <br /> of choice",
      featuredImage: img2,
      color: "bg-red-50",
    },
    {
      name: "Sale collection",
      desc: "Up to <br /> 80% off retail",
      featuredImage: img3,
      color: "bg-blue-50",
    },
    {
      name: "Sale collection",
      desc: "Up to <br /> 80% off retail",
      featuredImage: img4,
      color: "bg-green-50",
    },
  ],
});
