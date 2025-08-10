export default function Tab({ tabData, field, setField }) {
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="flex bg-richblack-800 p-1 gap-x-1 my-4 sm:my-6 rounded-full w-full sm:max-w-max mx-auto"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "bg-richblack-900 text-richblack-5"
              : "bg-transparent text-richblack-200"
          } py-2 sm:py-3 px-4 sm:px-6 lg:px-8 rounded-full transition-all duration-200 font-medium text-sm sm:text-base flex-1 sm:flex-none`}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
