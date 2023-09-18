import { ZodDotaId } from '@/utils/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addInputType } from './Dashboard';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

const InputForm = ({
  param,
  onSubmit,
}: {
  param: string;
  onSubmit: addInputType;
}) => {
  const schema = z.object({
    inputId: ZodDotaId(`${param} ID`),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      inputId: '',
    },
  });
  const handleSubmit = async (data: z.infer<typeof schema>) => {
    if (!data.inputId) {
      form.control.setError('inputId', {
        type: 'required',
        message: `${param} ID is required.`,
      });
      return;
    }

    onSubmit(data.inputId);
    form.reset({ inputId: '' });
  };

  return (
    <>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>{`Add ${param}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='space-y-8'
            >
              <FormField
                control={form.control}
                name='inputId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`${param} ID`}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`${param} ID`}
                        {...form.register('inputId', {
                          required: `${param} ID is required.`,
                        })}
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormDescription>
                      This can be found in the input&lsquo;s Dotabuff or
                      OpenDota profile URL.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Add</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default InputForm;
