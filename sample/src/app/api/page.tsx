'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import Link from 'next/link';

export default function ApiPage() {
  const count = useSelector((state: RootState) => state.counter.value);
  return (
    <>
      <p className="text-4xl api-title">API Page</p>
      <Link href="/api/get-api" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">GetAPI</Link>
    </>
  );
}
