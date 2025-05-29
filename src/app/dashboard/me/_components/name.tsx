'use client'

import { useState, useRef } from "react"
import { debounce } from 'lodash'
import { changeName } from '../_actions/change-name'
import { toast } from "sonner"

export function Name({ name }: { name: string }) {
    const [initialName, setInitialName] = useState(name)
    const [originalName] = useState(name)

    const debounceSaveName = useRef(
        debounce(async (currentName: string) => {
            if (currentName.trim() === "") {
                setInitialName(originalName)
                return;
            }

            if (currentName !== initialName) {
                try {
                    const response = await changeName({ name: currentName })
                    if (response.error) {
                        toast.error("Erro ao alterar o nome");
                        setInitialName(originalName);
                        return;
                    }

                    toast.success("Nome alterado com sucesso!");

                } catch (error) {
                    console.log(error)
                }
            }
        }, 500)
    ).current

    function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setInitialName(value)

        debounceSaveName(value);

    }

    return (
        <input
            className="text-xl md:text-2xl font-bold bg-gray-50 border-gray-100 rounded-md outline-none p-2 w-full max-w-2xl text-center my-3"
            value={initialName}
            onChange={handleChangeName}
        />
    )
}