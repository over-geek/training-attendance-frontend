"use client";
import { Button } from '../ui/button'
import { Input } from '@chakra-ui/react'
import { z } from 'zod';
import { cn } from "@/lib/utils"
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Check, ChevronsUpDown } from "lucide-react";
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Checkbox } from '../ui/checkbox';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast.ts";

import { 
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useEffect } from 'react';
import { addTraining } from '../filter_table/data/trainingData';


const formSchema = z.object({
  facilitator: z.string().min(2, {
    message: 'Facilitator name must be at least 2 characters long'
  }),
  name: z.string({
    required_error: 'Please select a training'
  }).optional(),
  date: z.date({
    required_error: 'Please select a date of training'
  }),
  type: z.enum(["Staff Training", "Staff Forum"], {
    required_error: "Please select a type",
  }),
  otherCheckbox: z.boolean().default(false),
  others: z.string().optional(),
  duration: z.number({
    required_error: "Please enter a duration",
    invalid_type_error: "Duration must be a number",
  }).min(1, {
    message: "Duration must be at least 1 hour",
  }),
  startTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format",
  })
}).refine((data) => {
  return ((!!data.name && !data.otherCheckbox) || (data.otherCheckbox && !!data.others && !data.name))
}, {
  message: "Either select a training or specify other training details",
  path: ["name"]
})

const trainings = [
  { label: "Risk and Opportunity Assessment Training", value: "Risk and Opportunity Assessment Training" },
  { label: "ISO 9001:2015 Awareness", value: "ISO 9001:2015 Awareness" },
  { label: "Internal Security Training", value: "Internal Security Training" },
  { label: "Data Protection Training", value: "Data Protection Training" },
  { label: "Bomb Awareness Training", value: "Bomb Awareness Training" },
  { label: "Internal Security Training - Security Guards", value: "Internal Security Training - Security Guards" },
  { label: "ISO 14297 Awareness", value: "ISO 14297 Awareness" },
  { label: "Fire Awareness", value: "Fire Awareness" },
  { label: "Health And Safety Training", value: "Health And Safety Training" },
  { label: "PCI Awareness", value: "PCI Awareness" },
] as const

const TrainingForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facilitator: '',
      otherCheckbox: false,
      others: '',
      name: '',
    }
  });

  const otherCheckbox = form.watch('otherCheckbox')
  const selectedTraining = form.watch('name')
  const { toast } = useToast()

  useEffect(() => {
    if (otherCheckbox) {
      form.setValue('name', '')
    } else {
      form.setValue('others', '')
    }
  }, [otherCheckbox, form])

  useEffect(() => {
    if (selectedTraining) {
      form.setValue("otherCheckbox", false)
      form.setValue("others", "")
    }
  }, [selectedTraining, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { otherCheckbox, others, ...rest } = values;
    const submissionData = {
      ...rest,
      name: (otherCheckbox ? others : values.name) ?? '',
      date: format(values.date, "yyyy-MM-dd"),
    };

    const success = await addTraining(submissionData)
    if (success) {
      toast({
        variant: 'success',
        description: 'Training added successfully'
      })
    } else {
      toast({
        variant: 'destructive',
        description: 'Failed to add training'
      })
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>
          <FormField
            control={form.control}
            name='facilitator'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facilitator</FormLabel>
                <FormControl>
                  <Input placeholder='facilitator name...' {...field} className='px-3 border' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>training</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      disabled={otherCheckbox}
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? trainings.find(
                            (training) => training.value === field.value
                          )?.label
                        : "Select training"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search training..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>training not found.</CommandEmpty>
                      <CommandGroup>
                        {trainings.map((training) => (
                          <CommandItem
                            value={training.label}
                            key={training.value}
                            onSelect={() => {
                              form.setValue("name", training.value)
                            }}
                          >
                            {training.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                training.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
          />
          <FormField
            control={form.control}
            name='otherCheckbox'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!!selectedTraining}
                  />
                </FormControl>
                <FormLabel>others</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='others'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='others...'
                    {...field}
                    disabled={!form.getValues('otherCheckbox')}
                    className='px-3 border'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Training Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Staff Training" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Staff training
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Staff Forum" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Staff Forum
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Training</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "MM/dd/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date.getTime() < new Date().getTime() || date.getTime() < new Date().setHours(0, 0, 0, 0)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="duration in hours"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    className='px-3 border w-[150px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    placeholder="ime of training"
                    {...field}
                    className='border px-3 w-[150px]'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default TrainingForm