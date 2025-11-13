import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

// Register Chart.js modules so Pie chart works
Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  // ================================
  // 1️⃣ State to track which chart to show
  // ================================
  // "students" → shows students enrolled in each course
  // "income" → shows income generated from each course
  const [currChart, setCurrChart] = useState("students")

  // ================================
  // 2️⃣ Function to generate random colors for the pie chart slices
  // ================================
  // - This helps visually differentiate each course
  // - Generates a random RGB value for each data point
  const generateRandomColors = (numColors) => {
    return Array.from({ length: numColors }, () =>
      `rgb(${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)})`
    )
  }

  // ================================
  // 3️⃣ Data for "Students" chart
  // ================================
  // labels → course names
  // data → number of students enrolled
  // backgroundColor → random colors for each slice
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // ================================
  // 4️⃣ Data for "Income" chart
  // ================================
  // labels → course names
  // data → total income from each course
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  }

  // ================================
  // 5️⃣ Chart options
  // ================================
  // maintainAspectRatio → false allows custom height/width
  // responsive → makes it resize automatically
  // legend.position → moves legend to bottom for better fit
  // legend.labels.color → makes text white for dark theme
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
        },
      },
    },
  }

  // ================================
  // 6JSX UI
  // ================================
  // - Outer box has dark background and padding
  // - Buttons let user toggle between "Students" & "Income" chart
  // - Chart is contained in fixed square area so it doesn’t overflow
  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6 overflow-hidden">
      {/* Section title */}
      <p className="text-lg font-bold text-richblack-5">Visualize</p>

      {/* Toggle buttons */}
      <div className="space-x-4 font-semibold">
        {/* Students Button */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>

        {/* Income Button */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>

      {/* Chart container */}
      {/* Fixed height & width so chart stays inside box */}
      <div className="relative mx-auto h-[300px] w-full max-w-[300px]">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  )
}
// needs options and data bas

