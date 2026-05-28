type HeaderProps = {
  title: string
}

export const Header = ({ title }: HeaderProps) => {
  return <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
}
