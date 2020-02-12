import React from 'react';

const CustomLegend = () => {
    return (
        <div>
            <div className="legend-elem-cont">
                <div className="legend-elem">
                    <div className="legend-label">Below Goal</div>
                    <div className="box box-green"></div>
                </div>
                <div className="legend-elem">
                    <div className="legend-label">Above Goal</div>
                    <div className="box box-red"></div>
                </div>
                <div className="legend-elem">
                    <div className="legend-label">Goal</div>
                    <div className="line-cont"><hr className="dotted-line" /></div>
                </div>
            </div>
        </div>
    )
}

export default CustomLegend;
