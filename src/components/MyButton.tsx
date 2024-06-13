interface Props {
    label:string,
    style:string,
    onClick:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}
export default function MyButton({ label, style, onClick }: Props) {
    return (
        <button className={`${style} p-5 rounded-sm`} onClick={onClick}>{label}</button>
    )
}