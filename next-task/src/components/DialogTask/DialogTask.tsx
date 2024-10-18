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

  const excu = () => {
    onSave({ name, detail, status });
    onOpenChange(false);
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
              <Label className="mb-1">Task Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid items-center">
              <Label className="mb-1">Task Detail</Label>
              <Textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder=""/>
            </div>
          </div>
          <DialogFooter>
            <Button variant="lightgray" onClick={() => onOpenChange(false)}>キャンセル</Button>
            <Button variant="red" onClick={excu}>決定</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DialogTask
