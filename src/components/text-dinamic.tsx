'use client'
import { Typewriter } from 'react-simple-typewriter'

export function TextDinamic() {
  return (
    <h1 className="text-sm font-bold tracking-tight text-gray-900">
      Feito para{' '}

      <Typewriter
        words={[
          'Criadores de conteúdo',
          'YouTubers',
          'Streamers',
          'ONGs',
          'Artistas',
          'Músicos',
          'Podcasters',
          'Escritores',
          'Designers',
          'Projetos sociais',
          'Influenciadores',
          'Todos',
        ]}
        loop={true}
        cursor
        cursorStyle="|"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </h1>
  );
}