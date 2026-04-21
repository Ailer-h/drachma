interface DashboardTileProps {

    children?: React.ReactNode,
    gridArea?: string

}

const DashboardTile = ({ children, gridArea }: DashboardTileProps) => {

    return <>
        <div className="grid-box" style={{"gridArea": gridArea}}>
            {children}
        </div>
    </>
    

}

export default DashboardTile