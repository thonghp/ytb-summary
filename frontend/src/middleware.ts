import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

/**
 * Nó sẽ thao tác trên server trước khi request hoàn thành, mục đích sử dụng ở đây để bảo vệ route
 * vd nếu ta không sử dụng thì khi ta đăng nhập vô được route đó xong lát ta xoá cookie đi thì nó vẫn
 * truy cập được mà không cần token. Còn sử dụng nó thì lúc xoá cookie nó sẽ yêu cầu login
 * @param request 
 * @returns 
 */
export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/dashboard") && user.ok === false) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}