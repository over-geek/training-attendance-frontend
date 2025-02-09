import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Input, Stack } from '@chakra-ui/react'
import { Field } from '../ui/field'
import { 
  DialogActionTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogBody,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import TrainingForm from './TrainingForm'
import { Plus } from 'lucide-react'

const NewTrainingDialog = () => {

  return (
    <DialogRoot placement="center" closeOnInteractOutside={false}>
      <DialogTrigger asChild>
        <Button variant="outline">
          New training
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='px-5 py-5'>
        <DialogHeader className='mb-3'>
          <DialogTitle className='text-lg font-semibold'>Create Training</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <TrainingForm />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default NewTrainingDialog