"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const schema = z.object({
  name: z.string().min(1, { message: "お名前は必須です" }),
  email: z.email({ message: "メールアドレスの形式が正しくありません" }),
  category: z.enum(["question", "feedback", "other"]),
  message: z
    .string()
    .min(1, { message: "お問い合わせ内容は必須です" })
    .max(1000, { message: "1000文字以内で入力してください" }),
  newsletter: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      category: "question",
      newsletter: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("送信データ", data);
    // TODO: fetch("/api/contact", { method: "POST", body: JSON.stringify(data) })

    // テストしやすいよう送信後すぐサンクスページに遷移
    router.push("/contact/thank-you");
  };

  return (
    <>
      <main className="mx-auto max-w-lg space-y-6 px-4 py-12">
        <h1 className="text-2xl font-bold">お問い合わせ</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 名前 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">
                    お名前
                    <span className="ml-1 rounded bg-rose-900 px-1.5 py-0.5 text-xs font-semibold text-white">
                      必須
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      autoComplete="name"
                      placeholder="山田 太郎"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* メール */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">
                    メールアドレス
                    <span className="ml-1 rounded bg-rose-900 px-1.5 py-0.5 text-xs font-semibold text-white">
                      必須
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="taro@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* カテゴリ */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="category-trigger">
                    お問い合わせ種別
                    <span className="ml-1 rounded bg-rose-900 px-1.5 py-0.5 text-xs font-semibold text-white">
                      必須
                    </span>
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger id="category-trigger">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="question">質問</SelectItem>
                      <SelectItem value="feedback">フィードバック</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* お問い合わせ内容（Textarea） */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="message">
                    お問い合わせ内容
                    <span className="ml-1 rounded bg-rose-900 px-1.5 py-0.5 text-xs font-semibold text-white">
                      必須
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="message"
                      autoComplete="off"
                      placeholder="ご質問やご要望を具体的にご記入ください"
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ニュースレター */}
            <FormField
              control={form.control}
              name="newsletter"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                  <FormLabel htmlFor="newsletter" className="mb-0">
                    ニュースレターを受け取る
                  </FormLabel>
                  <FormControl>
                    <Switch
                      id="newsletter"
                      name="newsletter"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* 送信ボタン */}
            <Button type="submit" className="my-4 w-full">
              送信
            </Button>
          </form>
        </Form>
      </main>
      <footer className="flex flex-wrap items-center justify-center px-4 text-xs">
        <p>
          <span>Powered by：</span>
          <a href="https://delogs.jp" target="_blank" rel="noopener noreferrer">
            DELOGs
          </a>
        </p>
      </footer>
    </>
  );
}
