export default function Board() {
  const rows = 6;
  const cols = 5;

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="w-14 h-14 border-2 border-gray-600 flex items-center justify-center text-2xl font-bold uppercase"
            >
              {/* letter will go here later */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}