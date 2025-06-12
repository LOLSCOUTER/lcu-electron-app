interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => (
  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md shadow-sm flex flex-col justify-between p-4">
    <div className="flex items-center gap-2 text-base font-semibold">
      <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-salmon-500 text-white hover:bg-salmon-600">
        {number}
      </span>
      {title}
    </div>
    <p className="text-xs text-muted-foreground py-2">{description}</p>
  </div>
);

export default Step;
