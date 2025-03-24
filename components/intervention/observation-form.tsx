"use client";
import { ElementRef, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { updateObservation } from "@/action/intervention/update-observation";

export const ObservationForm = ({
  observation,
  id
}: {
  observation: string | null | undefined;
  id: string | undefined;
}) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [text, setText] = useState(observation);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
    setText(observation);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  const onSubmit = (formData: FormData) => {
    const observe = formData.get("observation") as string;
    console.log(observe);
    updateObservation(id, observe).then(() => {
      setIsEditing(false);
    });
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex flex-col items-start gap-x-2 space-y-2"
      >
        <Textarea
          ref={inputRef}
          id="observation"
          onBlur={onBlur}
          defaultValue={text ? text : ""}
          onChange={(e) => setText(e.target.value)}
          name="observation"
          className="h-7 border bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
        />
        <div className="flex justify-center gap-x-3">
          <Button type="submit" variant={"secondary"}>
            Enregistrer
          </Button>
          <Button variant={"danger"} onClick={disableEditing}>
            Annuler
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div
      className="w-full p-5 italic cursor-pointer hover:dark:bg-zinc-600/15 hover:bg-zinc-200/30 rounded-md"
      role="button"
      onClick={enableEditing}
    >
      {text ? text : "vide"}
    </div>
  );
};
