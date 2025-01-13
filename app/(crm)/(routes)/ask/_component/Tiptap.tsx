"use client";
import { Button } from "@/components/ui/button";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import React from "react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  MessageSquareQuote,
  Pilcrow,
  Redo2,
  SeparatorVertical,
  Strikethrough,
  Undo2
} from "lucide-react";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group space-x-1">
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold") ? "bg-zinc-200 dark:bg-zinc-700" : ""
          }
        >
          <Bold />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic") ? "bg-zinc-200 dark:bg-zinc-700" : ""
          }
        >
          <Italic />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike") ? "bg-zinc-200 dark:bg-zinc-700" : ""
          }
        >
          <Strikethrough />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          className={
            editor.isActive("codeBlock") ? "bg-zinc-200 dark:bg-zinc-700" : ""
          }
        >
          <SeparatorVertical />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Clear marks
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          Clear nodes
        </Button>
        <Button
          variant={"outline"}
          onClick={() => {
            const url = window.prompt("Entrez l'URL de l'image");
            if (url) {
              editor
                .chain()
                .focus()
                .insertContent(`<img src="${url}" alt="Image" />`)
                .run();
            }
          }}
        >
          <ImageIcon />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph") ? "bg-zinc-200 dark:bg-zinc-700" : ""
          }
        >
          <Pilcrow />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-zinc-200 dark:bg-zinc-700"
              : ""
          }
        >
          <Heading1 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-zinc-200 dark:bg-zinc-700"
              : ""
          }
        >
          <Heading2 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-zinc-200 dark:bg-zinc-700"
              : ""
          }
        >
          <Heading3 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 })
              ? "bg-zinc-200 dark:bg-zinc-700"
              : ""
          }
        >
          <Heading4 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 })
              ? "bg-zinc-200 dark:bg-zinc-700"
              : ""
          }
        >
          <Heading5 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 })
              ? "bg-zinc-200 dark:bg-zinc-700"
              : ""
          }
        >
          <Heading6 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList") ? "bg-zinc-200 dark:bg-zinc-700" : ""
          }
        >
          <List />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? "bg-zinc-200 dark:bg-zinc-700" : ""
          }
        >
          <ListOrdered />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote") ? "bg-zinc-200 dark:bg-zinc-700" : ""
          }
        >
          <MessageSquareQuote />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Hard break
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo2 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo2 />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "bg-zinc-200 dark:bg-zinc-700"
              : ""
          }
        >
          Purple
        </Button>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    }
  }),
  Image
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

export default () => {
  console.log(content);
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
    ></EditorProvider>
  );
};
