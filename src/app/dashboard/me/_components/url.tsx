'use client'
import { Button } from "@/components/ui/button";
import { createUsername } from "../_actions/create-username";
import { useState } from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";

interface UrlPreviewProps {
    username: string | null;
}

export default function UrlPreview({ username: slug }: UrlPreviewProps) {

    const [error, setError] = useState<null | string>(null);
    const [username, setUsername] = useState(slug);

    async function submitAction(formData: FormData) {
        const username = formData.get("username") as string;
        if (!username || username === "") return;

        const response = await createUsername({ username });

        if (response.success === false) {
            setError(response.message);
            return;
        }

        if (response.data) {
            setUsername(response.data);

        }
    }

    if (!!username) {
        return (
            <div className="flex items-center flex-1 p-2 text-gray-100 justify-between">
                <div className="flex flex-col items-start md:flex-row md:items-center justify-center gap-2">
                    <h3 className="text-lg font-bold">Sua URL: </h3>
                    <Link href={`${process.env.NEXT_PUBLIC_HOST_URL}creator/${username}`}
                        target="_blank"
                    >
                        {process.env.NEXT_PUBLIC_HOST_URL}creator/{username}
                    </Link>
                </div>

                <Link href={`${process.env.NEXT_PUBLIC_HOST_URL}creator/${username}`}
                    target="_blank"
                    className="hidden md:block"
                >
                    <Link2 className="h-5 w-5 text-white" />
                </Link>
            </div>
        )

    }



    return (
        <div className="w-full">
            <div className="flex items-center flex-1 p-2 text-gray-100">
                <form
                    className="flex flex-1 flex-col md:flex-row gap-4"
                    action={submitAction}
                >
                    <div className="flex items-center justify-center w-full">
                        <p
                            className="w-fit h-9 rounded-md flex items-center font-semibold text-white"
                        >
                            {process.env.NEXT_PUBLIC_HOST_URL}creator/
                        </p>
                        <input
                            type="text"
                            placeholder="nome"
                            name="username"
                            className="flex-1 border outline-none h-8 rounded-md border-gray-300 text-black bg-gray-50 px-1 w-full"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="bg-blue-500 h-9 hover:bg-blue-600 w-full md:w-fit text-white px-4 rounded-md cursor-pointer"
                    >
                        Salvar
                    </Button>

                </form>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}