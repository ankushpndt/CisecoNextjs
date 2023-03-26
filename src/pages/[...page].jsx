import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import {
  BuilderComponent,
  builder,
  useIsPreviewing,
  Builder,
  withChildren,
} from "@builder.io/react";

import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "../styles/index.scss";
import "rc-slider/assets/index.css";
import "../app/globals.css";

import CommonClient from "../app/CommonClient";
import Footer from "@/shared/Footer/Footer";
import SiteHeader from "@/app/SiteHeader";
import DiscoverMoreSlider from "../components/DiscoverMoreSlider";
import CardCategory3 from "../components/CardCategories/CardCategory3";
import dynamic from "next/dynamic";

import img1 from "../images/collections/1.png";
import img2 from "../images/collections/5.png";
import img3 from "../images/collections/4.png";
import img4 from "../images/collections/3.png";

// Initialize the Builder SDK with your organization's API Key
// Find the API Key on: https://builder.io/account/settings
builder.init("4dd684c28ac74d259def9eb31a7054f9");

export async function getStaticPaths() {
  //  Fetch all published pages for the current model.
  //  Using the `fields` option will limit the size of the response
  //  and only return the `data.url` field from the matching pages.
  const pages = await builder.getAll("page", {
    fields: "data.url", // only request the `data.url` field
    options: { noTargeting: true },
    limit: 0,
  });

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // Fetch the first page from Builder that matches the current URL.
  // Use the `userAttributes` field for targeting content.
  // For more, see https://www.builder.io/c/docs/targeting-with-builder
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
}

export default function Page({ page }) {
  const router = useRouter();
  //  This flag indicates if you are viewing the page in the Builder editor.
  const isPreviewing = useIsPreviewing();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  //  Add your error page here to return if there are no matching
  //  content entries published in Builder.
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        {/* Add any relevant SEO metadata or open graph tags here */}
        <title>{page?.data.title}</title>
        <meta name="description" content={page?.data.descripton} />
      </Head>
      {/* <SiteHeader /> */}

      {/* Render the Builder page */}
      <BuilderComponent model="page" content={page} />

      {/* <CommonClient /> */}
      {/* <Footer /> */}
    </>
  );
}

//  This is an example of registering a custom component to be used in Builder.io.
//  You would typically do this in the file where the component is defined.

//  This is a minimal example of a custom component, you can view more complex input types here:

//  https://www.builder.io/c/docs/custom-react-components#input-types

const DiscoverMoreSliderWithChildren = withChildren(DiscoverMoreSlider);

Builder.registerComponent(DiscoverMoreSliderWithChildren, {
  name: "DiscoverMoreSlider",
  inputs: [
    {
      name: "data",
      type: "list",
      subFields: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "desc",
          type: "string",
        },
        {
          name: "featuredImage",
          type: "file",
        },
        {
          name: "color",
          type: "string",
        },
      ],
      defaultValue: [
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
    },
  ],
});

// Builder.registerComponent(CardCategory3, {
//   name: "CardCategory3",
//   inputs: [
//     {
//       name: "name",
//       type: "string",
//       defaultValue: "Explore new arrivals",
//     },
//     {
//       name: "desc",
//       type: "string",
//       defaultValue: "Shop the latest <br /> from top brands",
//     },
//     {
//       name: "featuredImage",
//       type: "file",
//       defaultValue: img1,
//     },
//     {
//       name: "color",
//       type: "string",
//       defaultValue: "bg-yellow-50",
//     },
//   ],
// });
// Register a custom insert menu to organize your custom componnets
// https://www.builder.io/c/docs/custom-components-visual-editor#:~:text=than%20this%20screenshot.-,organizing%20your%20components%20in%20custom%20sections,-You%20can%20create
Builder.register("insertMenu", {
  name: "My Components",
  items: [{ name: "DiscoverMoreSlider", name: "CardCategory3" }],
});
