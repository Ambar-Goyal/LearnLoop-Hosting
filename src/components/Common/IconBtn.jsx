// A reusable Button component that supports icons, text, and multiple styles
export default function IconBtn({
  text,           // Text to display on the button
  onclick,        // Function to run when the button is clicked
  children,       // Any extra elements (like an icon) passed inside the button
  disabled,       // Whether the button should be disabled
  outline = false,// Style variant: if true, show outline button instead of filled
  customClasses,  // Additional CSS classes for custom styling
  type,           // Button type: "button", "submit", etc.
}) {
  return (
    <button
      // Disables the button if 'disabled' prop is true
      disabled={disabled}

      // Click handler for button
      onClick={onclick}

      // Dynamically set CSS classes based on props
      className={`flex items-center justify-center
        ${outline 
          ? "border border-yellow-50 bg-transparent hover:bg-yellow-50 hover:text-richblack-900"
          : "bg-yellow-50 hover:bg-yellow-100"
        } 
        cursor-pointer gap-x-2 rounded-lg py-2 sm:py-3 px-4 sm:px-6 
        font-semibold text-richblack-900 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${customClasses}`}

      // Sets HTML button type ("submit", "button", "reset")
      type={type}
    >
      {children ? (
        // If 'children' (like an icon) exists, render both text + icon
        <>
          <span className={`${outline && "text-yellow-50"} text-sm sm:text-base`}>{text}</span>
          {children}
        </>
      ) : (
        // If no 'children', just show text
        <span className="text-sm sm:text-base">{text}</span>
      )}
    </button>
  )
}
