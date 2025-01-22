"use client";
import { UpdateObservation } from "@/action/ask/updated-observation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ElementRef, useRef, useState } from "react";

export const Observation = ({
  observation,
  id
}: {
  observation?: string;
  id: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [obs, setObs] = useState(observation);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const onSubmit = (formData: FormData) => {
    const observation = formData.get("observation") as string;
    UpdateObservation(id, observation).then((data) => {
      if (data && data !== "Failed to update.") {
        setObs(data);
      }
    });
    disableEditing();
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  if (isEditing) {
    return (
      <form action={onSubmit} className="flex flex-col gap-y-2">
        <Textarea
          ref={inputRef}
          id="observation"
          name="observation"
          onBlur={onBlur}
          defaultValue={obs}
          className="h-7 bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
        />
        <div className="flex gap-3">
          <Button variant={"outline"} type="submit">
            Enregistrer
          </Button>
          <Button variant={"destructive"} onClick={disableEditing}>
            Annuler
          </Button>
        </div>
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="ghost"
      className="p-1 px-2 text-lg "
    >
      {obs ? <span>{obs}</span> : <span>Pas d&apos;observation</span>}
    </Button>
  );
};
