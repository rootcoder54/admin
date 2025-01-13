"use client";
import "./styles.scss";
import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Strikethrough,
  ImageIcon,
  Undo2,
  Redo2,
  Pilcrow,
  MessageSquareQuote,
  ListOrdered,
  List,
  Heading6,
  Heading5,
  Heading4,
  Heading3,
  Heading2,
  Heading1,
  SeparatorVertical,
  Edit
} from "lucide-react";
import { UpdateReponse } from "@/action/ask/updated-reponse";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group space-x-2 flex flex-wrap">
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
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
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
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
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
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
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
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
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
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
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
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
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
  );
};

const Tiptap = ({
  isAdmin,
  id,
  content
}: {
  isAdmin: boolean;
  id?: string | null;
  content?: string | null;
}) => {
  const router = useRouter();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle
    ],
    content: content || "<p>Enregistrer une reponse...</p>",
    autofocus: true,
    editable: false
  });

  const saveContent = () => {
    const html = editor?.getHTML();
    if (id && html) {
      UpdateReponse(id, html).then((data) => {
        if (data !== "Failed to update.") {
          toast.success("Reponse Modifier");
          disenable();
        }
      });
    }
  };

  const [isEditing, SetEditing] = useState(false);

  const enable = () => {
    SetEditing(true);
    editor?.setEditable(true);
  };
  const disenable = () => {
    SetEditing(false);
    editor?.setEditable(false);
  };

  return (
    <div className="editor-container space-y-4">
      {isEditing ? (
        <div className="flex gap-3">
          <Button variant="outline" onClick={saveContent}>
            Sauvegarder
          </Button>
          <Button variant={"destructive"} onClick={disenable}>
            Annuller
          </Button>
        </div>
      ) : (
        <EditBtn onClick={enable} admin={isAdmin} />
      )}
      {isEditing && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};

export default Tiptap;

const EditBtn = ({
  admin,
  onClick
}: {
  admin: boolean;
  onClick: () => void;
}) => {
  if (!admin) {
    return null;
  }
  return (
    <Button variant="secondary" onClick={onClick}>
      <Edit /> Editer
    </Button>
  );
};
