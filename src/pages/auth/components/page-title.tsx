interface Props {
    title: string
    subtitle: string
}

export const PageTitle = ({title, subtitle}: Props) => {
    return <div className="flex flex-col gap-1.5 items-center">
        <p className="text-4xl font-semibold text-slate-gray">{title}</p>
        <p className="text-gray-500 font-normal">{subtitle}</p>
    </div>
}