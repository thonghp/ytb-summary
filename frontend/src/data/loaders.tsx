import qs from "qs";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

/**
 * Fetch data home page
 * @returns 
 */
export async function getHomePageData() {
  const url = new URL("/api/home-pages", baseUrl);

  url.search = qs.stringify({
    populate: {
      blocks: {
        on: {
          "layout.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              link: true, // populate true, lấy hết thuộc tính
            },
          },
          "layout.features-section": {
            populate: {
              feature: true,
            },
          },
        },
      },
    },
  });

  return await fetchData(url.href);
}

async function fetchData(url: string) {
  const authToken = null; // we will implement this later getAuthToken() later
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}
