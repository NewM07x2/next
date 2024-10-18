import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// データベース接続設定
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
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
    `;
    const result = await client.query(sql);
    client.release();
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('Database connection error:', err);
    return NextResponse.json({ error: 'Failed to fetch tasks', details: err }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, task_name, task_detail, status } = await request.json();
    const client = await pool.connect();
    if (id) {
      console.error('id', id, 'task_name', task_name);
      const sql = `
        UPDATE task
        SET 
          task_name = $1,
          task_detail = $2,
          status = $3
        WHERE
          id = $4
      ;`
      const values = [task_name, task_detail, status, id];
      const result = await client.query(sql, values);
      client.release();
      if (result.rowCount === 0) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Task updated successfully' }, { status: 200 });
    } else {
      console.error('id', id, 'task_name', task_name);
      const sql = `
      INSERT INTO task (task_name, task_detail, status) 
      VALUES ($1, $2, $3)
      ;`
      const values = [task_name, task_detail, status];
      const result = await client.query(sql, values);
      client.release();
      if (result.rowCount === 0) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Task updated successfully' }, { status: 200 });
    }
  } catch (err) {
    console.error('Error updating task:', err);
    return NextResponse.json({ error: 'Failed to update task', details: err }, { status: 500 });
  }
}
