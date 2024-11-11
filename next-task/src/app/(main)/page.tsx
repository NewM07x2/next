'use client'
import { useState, useEffect, useLayoutEffect, startTransition, useTransition } from 'react';

// shadcn-ui
import { Button } from "@/components/ui/button"
import TaskCard from '@/components/TaskCard/TaskCard';
import DialogTask from '@/components/DialogTask/DialogTask';
import { IoMdAddCircle } from "react-icons/io";
import Spinner from '@/components/Spinner/Spinner';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../../store/slices/tasksSlice';
import { AppDispatch, RootState } from '../../store/store';
import { deleteAction } from '../serverAction/deleteAction';
interface Task {
  id: string;
  task_name: string;
  task_detail: string;
  status: string;
  update_date: string;
  created_date: string;
}

export default function MainPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // ★ task の型を Task | null に変更
  const [task, setTask] = useState<Task | null>(null);
  // ローディング状態を管理する state を追加
  const [isLoading, setIsLoading] = useState(true);

  const [isPending, startTransition] = useTransition();
  
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const status = useSelector((state: RootState) => state.tasks.status);

  // ★ useEffect を追加してコンポーネントマウント時にタスクを取得
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks()).then(() => {
        setIsLoading(false); // データ取得後にisLoadingをfalseに設定
      });
    } else {
      setIsLoading(false);
    }
  }, [dispatch, status, tasks.length]);

  const sleep = async (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

  // 使用例
  async function example() {
    console.log('開始');
    // await sleep(10000000); // 2秒待機
    console.log('2秒経過');
  }
  

  // ★ タスク取得関数を追加
  const getTasks = async () => {
    // try {
    //   const response = await fetch('/api/allTasks', { method: 'GET' });
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch tasks');
    //   }
    //   const data = await response.json();
    //   setTasks(data);
    // } catch (error) {
    //   console.error('Error fetching tasks:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  // 新規タスク追加の処理
  const showModal = () => {
    setTask(null);
    setIsDialogOpen(true);
  };

  // タスク編集の処理
  const editTask = (id: string) => {
    const taskToEdit = tasks.find(t => t.id === id);
    if (taskToEdit) {
      setTask(taskToEdit);
      setIsDialogOpen(true);
    }
  };
  // タスク編集の処理
  const deleteTask = async (id: string) => {
    
    try {
      startTransition(async () => {
        console.log('status')
        const result = await deleteAction(id);
        console.log('result', result)
        if (result && result.status === 200) {
          // 削除成功後、タスクリストを更新
          dispatch(fetchTasks());
        } else {
        }
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // タスク保存の処理
  const saveTask = async (data: { name: string; detail: string, status: string }) => {
    try {
      // 編集 API Call
      const response = await fetch('/api/allTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: task?.id ? 'update' : 'insert',
          id: task?.id ?? '',
          task_name: data.name,
          task_detail: data.detail,
          status: data.status,
        }),
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update task');
      }

      const res = await response.json();
      dispatch(fetchTasks()).then(() => {
        setIsLoading(false); // データ取得後にisLoadingをfalseに設定
      });
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const actionSaveDBA = () => {}

  return (
    <div className="text-gray-800 p-8 h-full overflow-auto pb-24 flex flex-col">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">All Tasks</h1>
        <Button variant="red" onClick={showModal} className='rounded-full gap-1 bg-blue-600 hover:bg-blue-800 '><IoMdAddCircle />Add Task</Button>
      </header>
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
              [...tasks]
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
        initialData={task ? { name: task.task_name, detail:task.task_detail, status:task.status } : undefined}
        onSave={saveTask}
      />
    </div>
  );
}
