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
    <Link
      href={href}
      className="inline-block text-sm font-medium text-salmon-600 hover:text-salmon-700"
    >
      {title} 시작하기
    </Link>
  </div>
);

export default Card;
