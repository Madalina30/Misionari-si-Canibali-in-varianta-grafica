export default function TopMenuSimpleRoad(props){
    return(
        <div className="buttons">
            <p className="select-category__txt">Choose what you do:</p>
            <div className="clear-buttons">
            <button className="clear-walls" onClick={ // CLEAR WALLS
                (e)=>{
                console.log(e.target)
                }
            }>Clear walls</button>
            <button className="clear-path" onClick={ // CLEAR PATH
                (e)=>{
                console.log(e.target)
                }
            }>Clear path</button>
            <button className="reset-all">Reset</button>
            <button className="search-road">Search</button>
            </div>
        </div>
    )
} 