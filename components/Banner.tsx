import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Movie } from '../typings'
import { baseUrl } from '../constants/movie'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/outline'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  return (
    <div className="mb-20">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
        />
      </div>

      <div className="mt-20 ml-4 sm:mt-28 md:ml-4 lg:mt-48 lg:ml-10">
        <h1 className="text-2xl font-bold md:text-4xl  lg:text-7xl">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="mt-4 max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl">
          {movie?.overview}
        </p>
        <div className="mt-8 flex space-x-3">
          <button className="bannerButton bg-white text-black">
            <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
            Play
          </button>

          <button
            className="bannerButton bg-[gray]/70"
            onClick={() => {
              setCurrentMovie(movie)
              setShowModal(true)
            }}
          >
            <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More
            Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
