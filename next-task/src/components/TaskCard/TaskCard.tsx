import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import TaskEditBotton from './TaskEditBotton/TaskEditBotton'
import TaskDeleteBotton from './TaskDeleteBotton/TaskDeleteBotton'

interface TaskEditBottonProps {
  id: string,
  name: string,
  detail: string,
  status: string,
  update_date: string,
  created_date: string,
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ id, name, detail, status, update_date, created_date, onEdit, onDelete }: TaskEditBottonProps) => {
  return (
    <div id='card' className='w-72'>
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          {/* <CardDescription>タスクの詳細</CardDescription> */}
        </CardHeader>
        <CardContent>
          <p className="overflow-hidden text-ellipsis h-6">{detail}</p>
        </CardContent>
        <CardFooter className='w-full'>
          <div className='flex flex-col w-full'>
            <p className='mb-1'>{ update_date ? `更新日：${update_date}` : `作成日：${created_date}` }</p>
            <div className='flex justify-between items-center'>
              <div className={`flex items-center justify-center text-sm text-white rounded-full px-3 py-0 h-7 ${status === 'completed' ? 'bg-gray-800': status === 'progress' ? 'bg-blue-500': 'bg-green-400'}`}>{status === 'completed' ? '完了': status === 'progress' ? '対応中': '新規'}</div>
              <div className='flex gap-4'>
                <TaskEditBotton id={id} onEdit={onEdit}/>
                <TaskDeleteBotton id={id} onDelete={onDelete}/>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default TaskCard
