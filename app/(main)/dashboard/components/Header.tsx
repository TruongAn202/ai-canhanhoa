export default function Header() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search..."
          className="bg-white text-black border border-gray-300 rounded px-3 py-1 w-64"
        />
      </div>
      {/* duong ke ngang */}
      <hr className="mt-4 border-t border-gray-300" /> 
    </div>
  );
}
