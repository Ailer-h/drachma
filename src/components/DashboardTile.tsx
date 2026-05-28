interface DashboardTileProps {

    children?: React.ReactNode,
    gridArea?: string,
    className?: string

}

const DashboardTile = ({ children, gridArea, className }: DashboardTileProps) => {

    return <>
        <div className={`grid-box${className ? ` ${className}` : ""}`} style={{"gridArea": gridArea}}>
            {children}
        </div>
    </>


}

export default DashboardTile