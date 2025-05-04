import {
  // dedupExchange,
  // suspenseExchange,
  cacheExchange,
  createClient,
  fetchExchange,
} from "@urql/core";
const client = createClient({
  url: 'http://localhost:4000/', // GraphQLエンドポイントを指定
  fetch: typeof window !== 'undefined' ? fetch : undefined, // SSRの場合はfetchを使用
  exchanges: [
    // dedupExchange,
    // suspenseExchange, // ←これを加える
    cacheExchange,
    fetchExchange,
  ],
  fetchOptions: {
    headers: {
      // Authorization: `Bearer YOUR_TOKEN`, // 必要に応じてトークンを設定
    },
    credentials: 'same-origin', // 必要に応じて変更
    // 例: 'same-origin'、'include'、'omit'
    // ただし、'include'はCORSリクエストでのみ有効
  },
  requestPolicy: 'cache-first', // デフォルトのリクエストポリシー
  // 必要に応じて変更
  // e.g., 'network-only', 'cache-and-network', etc.

});

export default client;
