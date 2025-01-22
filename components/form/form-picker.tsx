"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { defaultImages } from "@/constants/images";

import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

interface ImageData {
  id: string;
  url: string;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<ImageData[]>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Remplacez par votre logique d'API réelle si nécessaire.
        setImages(defaultImages);
      } catch (error) {
        console.error("Erreur lors du chargement des images :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75",
              pending && "cursor-auto opacity-50 hover:opacity-50"
            )}
            onClick={() => {
              if (!pending) setSelectedImageId(image.id);
            }}
            aria-label={`Sélectionner l'image ${image.id}`}
          >
            <input
              type="radio"
              id={`${id}-${image.id}`}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              readOnly
              disabled={pending}
              value={image.url}
            />
            <Image
              src={image.url}
              alt={`Image ${image.id}`}
              className="rounded-sm object-cover"
              fill
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.url}
              target="_blank"
              className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
            >
              {image.url}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
