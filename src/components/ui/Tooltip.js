import { useState } from "react";
import './Tooltip.css';

function Tooltip(props) {
    const [isTooltipShown, setIsTooltipShown] = useState(false)

    const showTooltip = () => {
        setIsTooltipShown(true)
    }
    
    const hideTooltip = () => {
        setIsTooltipShown(false)
    }

    return(
        <div className='tooltip' onMouseOver={showTooltip} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {props.children}
            {isTooltipShown && 
            <div className='message'> 
                {props.message}
            </div>
            }
        </div>
    )
}

export default Tooltip;