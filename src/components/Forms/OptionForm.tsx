import { createOptionFormModel } from "@/lib/models"
import { optionSchema } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { MdOutlineDone } from "react-icons/md";

const defaultVales: createOptionFormModel = {
    title: '',
    source: 'image',
    src: ''
}

const OptionForm: React.FC<{ initialValues?: createOptionFormModel, onAdd: (val: createOptionFormModel) => boolean, editMode?: boolean, type: 'image' | 'video', cancelHandler: () => void }> = ({ initialValues = defaultVales, onAdd, editMode, type, cancelHandler }) => {
    initialValues.source = type;
    const form = useForm<createOptionFormModel>({
        resolver: zodResolver(optionSchema),
        values: initialValues
    })
    const submitHandler = (values: createOptionFormModel) => {
        // check if title exists
        const wasValid = onAdd(values);
        // valid, clear
        if (wasValid) {
            form.setValue('src', '');
            form.setValue('title', '');
        }
        else {
            form.setError('title', { message: 'title already exists !' });
        }
    }

    return (
        <Form {...form}>
            <form onReset={cancelHandler} onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input maxLength={40} placeholder="Enter title" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='src'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Source</FormLabel>
                            <FormControl>
                                <Input maxLength={400} placeholder="Enter source url" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                {editMode ?
                    <div className="flex items-center gap-2  justify-end w-full">
                        <Button size='icon' type='reset' variant='outline'>X</Button>
                        <Button size='icon' type="submit"  ><MdOutlineDone /></Button>
                    </div>

                    :
                    <Button type="submit" >Add</Button>}
            </form>
        </Form>
    )
}

export default OptionForm