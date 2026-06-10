import "../stylesheets/Table.css"

export interface Column<T> {
    header: string
    render: (row: T) => React.ReactNode
    className?: string
}

interface TableProps<T> {
    columns: Column<T>[]
    data: T[]
    keyExtractor: (row: T) => string | number
    loading?: boolean
    emptyMessage?: string
}

const Table = <T,>({ columns, data, keyExtractor, loading = false, emptyMessage = "No data" }: TableProps<T>) => {
    return (
        <table className="data-table">
            <thead>
                <tr>
                    {columns.map((col, i) => (
                        <th key={i} className={col.className}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr><td colSpan={columns.length}>Loading...</td></tr>
                ) : data.length === 0 ? (
                    <tr><td colSpan={columns.length}>{emptyMessage}</td></tr>
                ) : (
                    data.map((row) => (
                        <tr key={keyExtractor(row)}>
                            {columns.map((col, j) => (
                                <td key={j} className={col.className}>{col.render(row)}</td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}

export default Table
