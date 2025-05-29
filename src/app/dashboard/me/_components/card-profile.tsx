import Image from "next/image";
import { Name } from "./name";
import { Description } from "./description";

interface CardProfileProps {
    user: {
        id: string;
        name: string | null;
        email: string | null;
        username: string | null;
        bio: string | null
        image: string | null;
    }
}


export default function CardProfile({ user }: CardProfileProps) {
    return (
        <section>
            <div className="flex flex-col items-center justify-center">
                <Image
                    src={user.image || "https://github.com/nattanjunior.png"}
                    alt="Foto de perfil"
                    width={96}
                    height={96}
                    className="rounded-xl bg-gray-50 object-cover border-4 border-white hover:shadow-xl duration-300"
                    priority
                    quality={100}
                />
            </div>

            <div>
                <Name
                    name={user.name ?? "Digite seu nome..."}
                />

                <Description
                    description={user.bio ?? "Digite sua biografia..."}
                />
            </div>

        </section>
    )
}