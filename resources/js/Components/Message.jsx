export default function Message({ message }) {
    return (
        <div className="p-5 border-2 border-green-600 bg-green-300 rounded-md">
            <p className="text-green-600">{message}</p>
        </div>
    );
}
