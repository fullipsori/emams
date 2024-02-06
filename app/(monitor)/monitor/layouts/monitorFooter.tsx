import React from 'react';

const footer_start= '핵심 모니터링 지표 |'
const footer_end ="Developed by epozen"
const MonitorFooter = () => {
    return (
        <React.Fragment>
                <div className="text-nowrap text-light mb-4 mb-md-0">{footer_start} </div>
                <div className="flex-column text-light gap-1 flex-md-row gap-md-3 ms-md-auto " style={{ rowGap: "0 !important" }}>
                    {footer_end}
                            </div>
        </React.Fragment>
    );
};

export default MonitorFooter;
