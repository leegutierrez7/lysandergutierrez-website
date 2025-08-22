export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-800"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
                </div>
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Loading...</h2>
                <p className="text-gray-500 dark:text-gray-400">Please wait while we load the content</p>
            </div>
        </div>
    )
}
