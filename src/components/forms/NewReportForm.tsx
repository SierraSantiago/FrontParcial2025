"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/common/Button";

const StatusEnum = z.enum(["resistance", "intel", "incident"]).optional();

const schema = z.object({
  content: z.string().min(4, "Contenido demasiado corto"),
  status: StatusEnum,                
  anonymous: z.boolean(),
  attachmentsCsv: z.string().optional(),   
  victimId: z.string().uuid().optional().or(z.literal("")),
  reportUserId: z.string().uuid().optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export default function NewReportForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
      status: undefined,
      anonymous: false,
      attachmentsCsv: "",
      victimId: "",
      reportUserId: "",
    },
  });

  async function onSubmit(values: FormData) {
    setServerError(null);

    const attachments = (values.attachmentsCsv ?? "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      content: values.content,
      anonymous: values.anonymous,
      status: values.status,                 
      attachments: attachments.length ? attachments : undefined,
      victimId: values.victimId || undefined, 
      reportUserId: values.reportUserId || undefined,
    };

    const r = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const data = await r.json().catch(() => ({}));
      const msg = Array.isArray(data?.message) ? data.message.join(", ") : data?.message || "Error creando reporte";
      setServerError(msg);
      return;
    }

    form.reset();
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenido</FormLabel>
              <FormControl><Textarea rows={5} placeholder="Describe qué ocurrió..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado (opcional)</FormLabel>
              <FormControl>
                <select
                  className="border rounded-md h-10 px-3"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value || undefined)}
                >
                  <option value="">(sin estado)</option>
                  <option value="resistance">RESISTANCE</option>
                  <option value="intel">INTEL</option>
                  <option value="incident">INCIDENT</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="anonymous"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3">
              <FormLabel className="m-0">Enviar como anónimo</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachmentsCsv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adjuntos (CSV, opcional)</FormLabel>
              <FormControl>
                <Input placeholder="url1, url2, id3..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <details className="rounded-lg border p-3">
          <summary className="cursor-pointer text-sm font-medium">Campos avanzados (opcional)</summary>
          <div className="grid gap-3 mt-3">
            <FormField
              control={form.control}
              name="victimId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Victim ID (UUID)</FormLabel>
                  <FormControl><Input placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reportUserId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report User ID (UUID)</FormLabel>
                  <FormControl><Input placeholder="(normalmente lo coloca el backend)" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </details>

        <div className="flex justify-end">
          <Button type="submit">Enviar reporte</Button>
        </div>
      </form>
    </Form>
  );
}
