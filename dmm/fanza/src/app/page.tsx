"use client";
import { useEffect, useMemo } from 'react'
import { useQuery } from 'urql';
import { useGetUserQuery, useGetNoteQuery } from '../generates/graphql';
// import { useFetch } from '../hooks/useFetch';
import useStore from '../store/useStore';

import Loading from './loading';
import Error from './error';

// const GRAPHQL_QUERY = `
//   query {
//     message
//     note {
//       id
//       memo
//     }
//   }
// `;

export default function HomePage() {
  const { count, increment, decrement } = useStore();

  // GraphQLデータの取得(第一引数に結果、第二引数に再実行用クエリを指定)
  // const [result, reExecute] = useQuery({ 
  //   query: GRAPHQL_QUERY,
  //   pause: false, // trueにするとクエリを実行しない});
  // });

  // codegenで生成されたクエリを使用
  const result = useGetNoteQuery();

  console.log('result', result);
  // 取得データ状況
  // const { fetching, error } = result;
  // クエリ結果をuseMemoでメモ化
  const graphqlData = useMemo(() => result.data?.note, [result.data]);

  // if (fetching) return <Loading />;
  // if (error) return <Error />;

  return (
    <div>
      <h1>GraphQL Notes</h1>
      <ul>
        {graphqlData ? (
          graphqlData.map((note: { id: string; memo: string }) => (
            <li key={note.id}>{note.memo}</li>
          ))
        ) : (
          <li>No notes available</li>
        )}
      </ul>

      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button type="button" onClick={increment}>Increment</button>
      <button type="button" onClick={decrement}>Decrement</button>
    </div>
  );
}