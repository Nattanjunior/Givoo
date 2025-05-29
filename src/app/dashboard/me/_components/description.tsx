'use client'

import { useState, useRef } from "react"
import { debounce } from 'lodash'
import { toast } from "sonner"
import { changeDescription } from "../_actions/change-bio"

export function Description({ description }: { description: string }) {
    const [initialDescription, setInitialDescription] = useState(description)
    const [originalDescription] = useState(description)

    const debounceSaveName = useRef(
        debounce(async (currentDescription: string) => {
            if (currentDescription.trim() === "") {
                setInitialDescription(originalDescription)
                return;
            }

            if (currentDescription !== initialDescription) {
                try {
                    const response = await changeDescription({ description: currentDescription })
                    if (response.error) {
                        toast.error("Erro ao alterar a biografia");
                        setInitialDescription(originalDescription);
                        return;
                    }

                    toast.success("Biografia alterada com sucesso!");

                } catch (error) {
                    console.log(error)
                }
            }
        }, 500)
    ).current

    function handleChangeName(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value
        setInitialDescription(value)

        debounceSaveName(value);

    }

    return (
        <textarea
            className="text-base bg-gray-50 border-gray-100 rounded-md outline-none p-2 w-full max-w-2xl my-3 h-40 resize-none"
            value={initialDescription}
            onChange={handleChangeName}
        />
    )
}