export default function PromoBar(props) {
  const { messages } = props;

  return (
    <div className="z-[50] bg-blue-300 p-1 flex items-center justify-center overflow-x-hidden text-slate-900 w-screen">
    <div className="flex gap-2 animate-marquee whitespace-nowrap">
      {messages.split(",").map((message, index) => {
        return <span key={index}>{message} &#8226;</span>;
      })}
    </div>
    </div>
  );
}
