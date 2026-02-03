export const Spinner = () => {
  return (
    <div className="flex items-center flex-col justify-center w-screen h-screen text-zinc-700 bg-linear-to-bl from-indigo-500 to-teal-400">
      <div className="w-4 h-4 rounded-full animate-[mulShdSpin_1.3s_infinite_linear]"></div>
      <div className="mt-20">Данные загружаются...</div>
    </div>
  );
};
