export default function TopHeader({ title }) {
    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center px-8">
            <div className="flex items-center h-full pb-6">
                <h1 className="text-2xl text-[#3C3C3C] font-bold relative inline-block">
                    {title}
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#FF7A5A] rounded-full"></div>
                </h1>
            </div>
        </header>
    );
}
