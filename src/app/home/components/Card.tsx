import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const Card: React.FC<CardProps> = ({ title, description, icon, href }) => (
  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-md shadow-sm flex flex-col justify-between p-4">
    <div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-4">{description}</p>
    </div>
    <div className="flex justify-center mb-4">{icon}</div>
    <div className="flex justify-center">
      <Link
        href={href}
        className="inline-block px-8 py-2 text-base font-semibold text-white bg-salmon-600 rounded-lg hover:bg-salmon-700 transition-colors"
        prefetch={true}
      >
        {title} 시작하기
      </Link>
    </div>
  </div>
);

export default Card;
