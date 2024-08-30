import qs from "qs";
import { flattenAttributes } from "@/lib/utils";
import { HeroSection } from "@/components/custom/HeroSection";

const homePageQuery = qs.stringify({
  // populate: ["blocks.link", "blocks.image"],
  // /api/home-pages?populate[blocks][on][layout.hero-section][populate][image][fields][0]=url&populate[blocks][on][layout.hero-section][populate][link]=true
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
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = "http://localhost:1337";
  const url = new URL(path, baseUrl);
  url.search = homePageQuery;
  // console.log(url.href);

  try {
    // fetch data
    /*
     * Khi nào sử dụng cache: "no-store"
     * Khi data thời gian thực, thông tin chứng khoán, giá cả, tin tức cần cập nhật liên tục
     * Do nó không lưu trữ hoặc tái sử dụng kết quả của request trước đó, đảm bảo mỗi khi request
     * data sẽ mới và không sử dụng data trong cache
     */
    const response = await fetch(url.href, { cache: "no-store" }); // baseUrl + path + search
    const data = await response.json(); // format json
    const flattenedData = flattenAttributes(data);

    return flattenedData;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-pages");
  // console.dir(strapiData, { depth: null });

  const { blocks } = strapiData.data[0];
  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}
