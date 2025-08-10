import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"

import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)
  // course here is a section, not the entire course brooo 
  // Accordion state
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])

  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    // useRef se contentEl ko reference mila hai is div ka jise hum scrollHeight padh rahe hain
    // Jab accordion open hota hai (active true), toh div ki actual height ko state me daalte hain
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
      <div>
        <div
          className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
          onClick={() => {
            handleActive(course._id)
          }}
        >
          <div className="flex items-center gap-2">
            {/* rotate that arrow icon down to up or vice versa according to active state */}
            <i
              className={
                isActive.includes(course._id) ? "rotate-180" : "rotate-0"
              }
            >
              <AiOutlineDown />
            </i>
            <p>{course?.sectionName}</p>
          </div>
          <div className="space-x-4">
            <span className="text-yellow-25">
              {`${course.subSection.length || 0} lecture(s)`}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={contentEl}  // useRef se yeh div refer ho raha hai. Isse hum height directly access kar sakte hain
        className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
        style={{
          height: sectionHeight,  // height ko dynamic set kar rahe hain taaki accordion open/close smoothly ho
        }}
      >
        <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
          {course?.subSection?.map((subSec, i) => {
            return <CourseSubSectionAccordion subSec={subSec} key={i} />
          })}
        </div>
      </div>

      {/* 
        Accordion height explanation:

        - Jab accordion close hota hai, hum div ki height 0 set karte hain, isse content chhup jata hai.
        - Jab accordion open hota hai, hum div ki asli content ki height (scrollHeight) set karte hain.
        - CSS transition height property ko smoothly animate karta hai.(transition here is animating the height of the div badi se choti chot ise baid) 
        - Isse accordion smoothly expand/collapse hota hai instead of instant jump.

        Visualize karo:

        Imagine ek box hai jisme content hai.
        - Box ki height 0 = box bilkul chhota, content nahi dikhta.
        - Box ki height content ke barabar = box expand, content dikhne lagta hai.
      */}
    </div>
  )
}

/*
  Meaning of useRef here:

  useRef ek React hook hai jo kisi bhi HTML element ko directly refer karne ke liye use hota hai.
  Iska matlab hai ki hum us element ka reference (pointer) rakhte hain bina React ko re-render karaye.

  Yahan contentEl useRef se div element ko refer kar rahe hain jiska height hum scrollHeight se nikal rahe hain.
  Jab accordion open hota hai, hum us div ki asli height padh ke state me set karte hain, taaki height animation smoothly ho.

  Summary:
  - useRef se hum HTML element ka direct access lete hain.
  - Yeh React ko re-render karne pe effect nahi dalta.
  - Yeh accordion ke content ki height measure karne me madad karta hai for smooth open/close animation.
*/
