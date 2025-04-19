'use client'
import { useState, useEffect, useLayoutEffect } from 'react';
import Link from "next/link"
import { MdAddTask } from "react-icons/md"
import Spinner from '@/components/Spinner/Spinner';
// shadcn-ui
import { Button } from "@/components/ui/button"
import TaskCard from '@/components/TaskCard/TaskCard';
import DialogTask from '@/components/DialogTask/DialogTask';
import { IoMdAddCircle } from "react-icons/io";

interface Task {
  id: string;
  task_name: string;
  task_detail: string;
  status: string;
  update_date: string;
  created_date: string;
}

export default function CompletedPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 初期表示時にタスクリストをタスクリストを取得
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    // 非同期で取得する。
    try {
      const params = new URLSearchParams({ status: 'completed' });
      const response = await fetch(`/api/completedTasks?${params.toString()}`, { 
        method: 'GET'
      });
      // console.log(params.toString()); 「status=completed」のようなパラメータが生成される。
      // console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      // console.log(response.url);
      const data = await response.json();
      // console.log(data);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const editTask = (id: string) => {
    const editTask = tasks.find(t => t.id === id);
    if (editTask) {
      setTask(editTask);
      setIsDialogOpen(true);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      // 編集 API Call
      const response = await fetch('/api/completedTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          action: 'delete'
        })
      });
    } catch {
    } finally {
      const deleteTask = tasks.filter(item => item.id !== id);
      setTasks(deleteTask);
    }
  }

  // タスク保存の処理
  const saveTask = async (data: { name: string; detail: string, status: string }) => {
    try {
      // 編集 API Call
      const response = await fetch('/api/completedTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          id: task?.id ?? '',
          task_name: data.name,
          task_detail: data.detail,
          status: data.status,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update task');
      }
      fetchTasks(); // タスクリストを再取得
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsDialogOpen(false);
    }
  };


  return (
    <div className="text-gray-800 p-8 h-full overflow-auto pb-24">
      <h1 className="text-2xl font-bold flex items-center">Completed Tasks</h1>
      {
        isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className='flex justify-center items-start h-[calc(20%)]'>
            <div className='flex justify-center items-center gap-2'>
              <Spinner /><span className="">Loading...</span>
            </div>
          </div>
        </div>
        )
      }
      {!isLoading && 
      (
        <main className="mt-4 flex flex-wrap gap-4">
          {
            tasks
              .sort((a, b) => new Date(b.update_date).getTime() - new Date(a.update_date).getTime())
              .map((task) => (
                <TaskCard 
                  key={task.id}
                  id={task.id}
                  name={task.task_name}
                  detail={task.task_detail}
                  status={task.status}
                  update_date={task.update_date}
                  created_date={task.created_date}
                  onEdit={editTask}
                  onDelete={deleteTask}
                />
              ))
          }
      </main>
      )}
      <DialogTask 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={task ? { name: task.task_name, detail: task.task_detail, status: task.status } : undefined}
        onSave={saveTask}
      />
    </div>
  );
}
