export default function Title({
  title,
  description,
}: Readonly<{ title: string; description: string }>) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
        {title}
      </h2>
      <p className="text-fog max-w-[44ch]">{description}</p>
    </div>
  );
}
