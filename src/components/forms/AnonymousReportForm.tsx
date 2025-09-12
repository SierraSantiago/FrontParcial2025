
"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/common/Button";

const StatusEnum = z.enum(["INCIDENT", "RESISTANCE", "INTEL"]).optional();

const schema = z.object({
  content: z.string().min(6, "Por favor describe con más detalle."),
  status: StatusEnum,
  attachmentsCsv: z.string().optional(),
  victimId: z.string().uuid().optional().or(z.literal("")),
  consent: z.boolean().refine(value => value === true, { message: "Requerido" }),
});

type FormData = z.infer<typeof schema>;

export default function AnonymousReportForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
      status: "RESISTANCE",
      attachmentsCsv: "",
      victimId: "",
      consent: false,
    },
  });

  async function onSubmit(values: FormData) {
    setServerError(null);
    setOk(false);

    const attachments = (values.attachmentsCsv ?? "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      content: values.content,
      status: values.status,         
      anonymous: true,                
      attachments: attachments.length ? attachments : undefined,
      victimId: values.victimId || undefined,
    };

    const r = await fetch("api/report/public", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const data = await r.json().catch(() => ({}));
      const msg = Array.isArray(data?.message) ? data.message.join(", ") : data?.message || "No se pudo enviar";
      setServerError(msg);
      return;
    }

    form.reset({ content: "", status: "RESISTANCE", attachmentsCsv: "", victimId: "", consent: false });
    setOk(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        {ok && <p className="text-sm text-green-600">Gracias, tu reporte fue recibido.</p>}
        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenido del reporte</FormLabel>
              <FormControl><Textarea rows={6} placeholder="Describe lo ocurrido…" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <select
                    className="border rounded-md h-10 px-3"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value || undefined)}
                  >
                    <option value="RESISTANCE">RESISTANCE</option>
                    <option value="INCIDENT">INCIDENT</option>
                    <option value="INTEL">INTEL</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attachmentsCsv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adjuntos (CSV, opcional)</FormLabel>
                <FormControl><Input placeholder="url1, url2, id3" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="victimId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Victim ID (UUID, opcional)</FormLabel>
              <FormControl><Input placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <label className="text-sm flex items-center gap-2">
                <input type="checkbox" checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                Confirmo que esta información es verídica y no contiene datos sensibles innecesarios.
              </label>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Enviar anónimo</Button>
        </div>
      </form>
    </Form>
  );
}
