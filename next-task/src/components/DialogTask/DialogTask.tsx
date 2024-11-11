'use client'
import React from 'react'
import { useState, useEffect } from 'react';

// shadcn-ui
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


// ★ Propsに初期データと保存処理を追加
interface DialogTaskProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: { name: string; detail: string, status: string };
  onSave: (data: { name: string; detail: string, status: string }) => void;
}

const statusOptions = [
  { value: "new", label: "New" },
  { value: "progress", label: "Progress" },
  { value: "completed", label: "Completed" }
];

const DialogTask = ({ open, onOpenChange, initialData, onSave }: DialogTaskProps) => {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDetail(initialData.detail);
      setStatus(initialData.status);
    } else {
      setName('');
      setDetail('');
      setStatus('');
    }
  }, [initialData, open]);

  const fixed = () => {
    onSave({ name, detail, status });
    onOpenChange(false);
  };

  const cancel = () => {
    onOpenChange(false);
  };

  const isDisabled = () => {
    if (!name) {
      return true
    }
    return false
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
          <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Task' : 'Add Task'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-1">
            <div className="grid items-center ">
              <Label className="mb-1"><span className='text-red-500'>*</span>Task Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid items-center">
              <Label className="mb-1">Task Detail</Label>
              <Textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder=""/>
            </div>
            <div className="grid items-center">
              <Label className="mb-1">Task Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="lightgray" onClick={cancel}>キャンセル</Button>
            <Button variant="red" onClick={fixed} disabled={isDisabled()}>決定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogTask
