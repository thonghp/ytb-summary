import qs from "qs";
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

const baseUrl = getStrapiURL();

export async function getGlobalData() {
  /*
   * này là 1 function có sẵn của nextjs nó có nhiệm vụ xoá cache mỗi khi cập nhật cái mới
   * nếu không sử dụng khi update thì nextjs nó load lại vì nó fetch data old
   */
  noStore();
  const url = new URL("/api/globals", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });

  return await fetchData(url.href);
}

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
