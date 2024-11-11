'use server'
import { NextResponse } from 'next/server';
import { executeSql } from '../api/utils/dbUtils';

// deleteAction関数は、指定されたIDのタスクを削除する非同期関数です。
export const deleteAction = async (id: string) => {
  try {
    // 結果を格納する変数を初期化
    var result = null;
    // タスクを削除するSQLクエリを定義
    const deleteSql = `
      DELETE FROM task
      WHERE id = $1
    ;`;
    // SQLクエリを実行し、結果を取得
    result = await executeSql(deleteSql, [id]);
    // 削除された行が0行の場合、タスクが見つからなかったエラーを返す
    if (result?.rowCount === 0) {
      return { error: 'Task not found', status: 404 };
    }
    // タスクが正常に削除された場合、成功メッセージを返す
    return { message: 'successfully', status: 200 };

  } catch (err) {
    // 例外が発生した場合、タスクの削除に失敗したエラーを返す
    return { error: 'Failed to update task', details: err, status: 500 };
  }
}
