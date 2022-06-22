import React, { useRef, useState } from 'react'
import Movie from '../typeings.d.ts'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Thumbnail from './Thumbnail'

interface Props {
  title: string
  movies: Movie[]
  // using firebase
  // movie: Movie | DocumentData[]
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="mx-4 mt-8 h-40 space-y-0.5 md:space-y-2 lg:m-10">
      <h2 className="mb-2 ml-4 w-56 cursor-pointer text-base font-semibold text-[#e5e5e5] md:mt-12 md:text-lg ">
        {title}
      </h2>
      <div className="group relative md:-ml-2 ">
        <ChevronLeftIcon
          className={`hover::scale-125 absolute top-0 bottom-0 left-2  z-40 m-auto h-9 w-9 cursor-pointer  opacity-0 transition group-hover:opacity-100 md:left-12 ${
            !isMoved && 'hidden '
          }`}
          onClick={() => handleClick('left')}
        />

        <div
          ref={rowRef}
          className="flex items-center  space-x-2 overflow-x-scroll scrollbar-hide md:space-x-4 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className={`hover::scale-125 absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 md:right-12`}
          onClick={() => handleClick('Right')}
        />
      </div>
    </div>
  )
}

export default Row
