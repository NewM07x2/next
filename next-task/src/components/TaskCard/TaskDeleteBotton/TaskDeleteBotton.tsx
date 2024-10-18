import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

interface TaskDeleteBottonProps {
  id: string,
  onDelete: (id: string) => void;
}

const TaskDeleteBotton = ({ id, onDelete }: TaskDeleteBottonProps) => {
  return (
    <>
      <button onClick={() => onDelete(id)}>
        <FaTrashAlt className='hover:text-gray-700 text-lg cursor-pointer'/>
    </button>
    </>
  )
}

export default TaskDeleteBotton
