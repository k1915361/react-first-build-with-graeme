import { useState } from "react";
import './Tooltip.css';

function Tooltip(props) {
    // Hooks
    const [isTooltipShown, setIsTooltipShown] = useState(false)

    // Methods
    const showTooltip = () => {
        setIsTooltipShown(true)
    }
    
    const hideTooltip = () => {
        setIsTooltipShown(false)
    }

    // View
    return(
        <div className='tooltip' onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
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