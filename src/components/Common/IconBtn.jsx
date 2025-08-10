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
      className={`flex items-center 
        ${outline 
          ? "border border-yellow-50 bg-transparent"  // Outline style
          : "bg-yellow-50"                             // Filled style
        } 
        cursor-pointer gap-x-2 rounded-md py-2 px-5 
        font-semibold text-richblack-900 ${customClasses}`} // Common styles

      // Sets HTML button type ("submit", "button", "reset")
      type={type}
    >
      {children ? (
        // If 'children' (like an icon) exists, render both text + icon
        <>
          <span className={`${outline && "text-yellow-50"}`}>{text}</span>
          {children}
        </>
      ) : (
        // If no 'children', just show text
        text
      )}
    </button>
  )
}
