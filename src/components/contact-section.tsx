'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AnimatedBlock } from './animated-block';
import { useTranslation } from '@/context/language-context';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

export default function ContactSection() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const FormSchema = z.object({
    name: z.string().min(2, {
      message: t('contact.form.errors.name'),
    }),
    email: z.string().email({
      message: t('contact.form.errors.email'),
    }),
    source: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      source: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    const subject = encodeURIComponent(t('contact.email.subject'));
    const body = encodeURIComponent(
      `${t('contact.email.body.name')}: ${values.name}\n` +
      `${t('contact.email.body.email')}: ${values.email}\n` +
      `${t('contact.email.body.source')}: ${values.source || t('contact.email.body.sourceNotSpecified')}`
    );
    const mailtoLink = `mailto:robluna.mkt@gmail.com?subject=${subject}&body=${body}`;

    toast({
      title: t('contact.form.successMessage.title'),
      description: t('contact.form.successMessage.description'),
    });

    window.location.href = mailtoLink;
    form.reset();
  }
  
  const sourceOptions = t('contact.form.source.options', { returnObjects: true }) as { value: string; label: string }[];

  return (
    <section className="py-24 sm:py-32 bg-secondary text-foreground">
      <div className="container mx-auto px-4">
        <AnimatedBlock animationType="slide-in-up">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 text-foreground">
            {t('contact.title')}
          </h2>
        </AnimatedBlock>
        <AnimatedBlock animationType="slide-in-up" delay={150}>
          <p className="text-xl md:text-2xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </AnimatedBlock>
        <AnimatedBlock delay={300} animationType="zoom-in">
          <div className="max-w-xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.name.label')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.name.placeholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.email.label')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.email.placeholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.form.source.label')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('contact.form.source.placeholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sourceOptions && sourceOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center">
                    <Button
                        type="submit"
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-200 hover:scale-105 rounded-full px-8 py-6 text-lg"
                    >
                        <Mail className="mr-2 h-5 w-5" />
                        {t('contact.form.submitButton')}
                    </Button>
                </div>
              </form>
            </Form>
          </div>
        </AnimatedBlock>
      </div>
    </section>
  );
}
