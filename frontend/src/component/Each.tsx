import { ReactNode } from "react"

type EachProps<T> = {
    data: T[],
    render: (item: T, key: number) => ReactNode
}

const Each = <T,>({ data, render }: EachProps<T>) => (data.map((item, key) => render(item, key)))
export default Each