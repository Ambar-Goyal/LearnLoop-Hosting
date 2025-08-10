import React, { useEffect, useState } from "react"
// Importing star icons from react-icons
import {
  TiStarFullOutline,   // Full star icon (⭐)
  TiStarHalfOutline,   // Half star icon (🌗)
  TiStarOutline,       // Empty star icon (☆)
} from "react-icons/ti"

function RatingStars({ Review_Count, Star_Size }) {
  // Initialize state to store number of full, half, and empty stars
  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  })

  useEffect(() => {
    // Get the whole number part of the rating
    const wholeStars = Math.floor(Review_Count) || 0

    // Set the star count based on the rating
    SetStarCount({
      full: wholeStars,                                        // Full stars
      half: Number.isInteger(Review_Count) ? 0 : 1,            // One half star if decimal
      empty: Number.isInteger(Review_Count)
        ? 5 - wholeStars                                       // If whole number, just subtract from 5
        : 4 - wholeStars                                       // Else, 1 space taken by half star
    })
  }, [Review_Count])

  return (
    <div className="flex gap-1 text-yellow-100">
      {/* Render full stars */}
      {[...new Array(starCount.full)].map((_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={Star_Size || 20} />
      ))}

      {/* Render half star (if any) */}
      {[...new Array(starCount.half)].map((_, i) => (
        <TiStarHalfOutline key={`half-${i}`} size={Star_Size || 20} />
      ))}

      {/* Render empty stars */}
      {[...new Array(starCount.empty)].map((_, i) => (
        <TiStarOutline key={`empty-${i}`} size={Star_Size || 20} />
      ))}
    </div>
  )
}

export default RatingStars
