interface Item {
    label: string
    onClick: Function
}
interface Props {
    items: Item[],
    title: string
}
export default function MyDropdownMenu({ items, title }: Props) {
    const [dropDown, setDropDown] = useState(false)
    return (
        <section>
            <div className="border-2 bg-green-500 border-black rounded-full text-center cursor-pointer" onClick={() => { setDropDown(!dropDown) }}>{title}</div>
            {
                dropDown &&
                <ul className="bg-red-100 w-[94%] mx-auto">
                    {
                        items.map(i => {
                            return (
                                <li className="w-full flex flex-col justify-center items-center mb-1 border-b-2 border-black" key={i.label} onClick={() => i.onClick()}>
                                    <a className="block data-[focus]:bg-blue-100" href='#'>
                                        {i.label}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </section>
    )
}