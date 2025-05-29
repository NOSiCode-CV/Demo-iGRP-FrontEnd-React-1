interface HeadlineProps {
  icon?: any; // LucideIcon; // Optional icon
  title: string;
  description?: React.ReactNode;
  className?: string;
}

function HeadlineCustom({
  Icon,
  title,
  description,
  className,
}: HeadlineProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Icon && <Icon className="h-5 w-5 text-primary" />}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}

export { HeadlineCustom };
