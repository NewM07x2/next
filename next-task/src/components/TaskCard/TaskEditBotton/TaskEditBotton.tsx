import React from 'react'
import { FaPen } from 'react-icons/fa'

interface TaskEditBottonProps {
  id: string
  onEdit: (id: string) => void;
}

const TaskEditBotton = ({ id, onEdit }: TaskEditBottonProps) => {
  return (
    <>
    <button onClick={() => onEdit(id)}>
      <FaPen className='hover:text-gray-700 text-lg cursor-pointer'/>
    </button>
    </>
  )
}

export default TaskEditBotton
