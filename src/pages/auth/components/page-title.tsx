interface Props {
    title: string
    subtitle: string
}

export const PageTitle = ({title, subtitle}: Props) => {
    return <div className="flex flex-col gap-2 items-center max-w-[450px] text-center">
        <p className="text-4xl font-semibold text-slate-gray">{title}</p>
        <p className="text-gray-500 text-center font-light">{subtitle}</p>
    </div>
}