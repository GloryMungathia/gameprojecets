type KeyboardProps = {
    onKeyPress: (key: string) => void;
};

const ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

export default function Keyboard({ onKeyPress }: KeyboardProps) {
    return (
        <div className="flex flex-col gap-2 mt-8">
            {ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1">
                    {row.map((key) => (
                        <button
                            key={key}
                            onClick={() => onKeyPress(key)}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold rounded px-3 py-4 text-sm uppercase"
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}