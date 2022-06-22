import { useState } from "react";
import './Tooltip.css';

function Tooltip(props) {
    const [isTooltipShown, setIsTooltipShown] = useState(false)

    const showTooltip = () => {
        setIsTooltipShown(true)
        console.log('tooltip mouse over')
    }
    
    const hideTooltip = () => {
        setIsTooltipShown(false)
    }

    return(
        <div className='tooltip' onMouseOver={showTooltip} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {isTooltipShown && 
            <>
                TOOLTIP 
                {props.message}
            </>
            }
        </div>
    )
}

export default Tooltip;