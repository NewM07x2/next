import { NextResponse } from 'next/server';
import { executeSql } from '../utils/dbUtils';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const sql = `
      SELECT
        id,
        task_name,
        task_detail,
        status,
        to_char(update_date, 'YYYY.MM.DD HH24:MI:SS') AS update_date,
        to_char(created_date, 'YYYY.MM.DD HH24:MI:SS') AS created_date
      FROM
        task
      WHERE
        status = $1
    `;
    const param = [status];
    const result = await executeSql(sql, param);
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('Database connection error:', err);
    return NextResponse.json({ error: 'Failed to fetch tasks', details: err }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, task_name, task_detail, status, action } = await request.json();
    var result = null;
    switch (action) {
      case 'delete':
        const deleteSql = `
          DELETE FROM task
          WHERE id = $1
        ;`;
        result = await executeSql(deleteSql, [id]);
        break;
      case 'update':
        const updateSql = `
          UPDATE task
          SET 
            task_name = $1,
            task_detail = $2,
            status = $3
          WHERE
            id = $4
        ;`
        const updateValues = [task_name, task_detail, status, id];
        result = await executeSql(updateSql, updateValues);
        break;
      default:
        throw new Error('Invalid action');
    }
    if (result?.rowCount === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'successfully' }, { status: 200 });

  } catch (err) {
    console.error('Error updating task:', err);
    return NextResponse.json({ error: 'Failed to update task', details: err }, { status: 500 });
  }
}
