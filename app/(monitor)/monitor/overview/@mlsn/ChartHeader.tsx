"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, Navbar, NavbarToggler, UncontrolledButtonDropdown } from "reactstrap";
import { useRouter } from "next/navigation";
import { dataSourceType } from "../../common/data/DataSource";
import { useAppDispatch, useAppSelector } from "@/hook/hook";
import { MonitorQueueState, updateValueMode } from "@/redux/slices/monitoring-queue/reducer";
import { createSelector } from "@reduxjs/toolkit";
import { MonitorState } from "@/redux/slices/monitoring/reducer";

interface ChartProps {
    title: string;
    dataSourceType: string;
}

const ChartHeader = (chartProps: ChartProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [isUserDropdown, setUserDropdown] = useState<boolean>(false);
    const toggleDropdown = () => setUserDropdown(!isUserDropdown);
    const selectMonitorState = createSelector(
        (state: any) => state.MonitoringReducer,
        (monitoringData: MonitorState) => ({ nodeState: monitoringData.curNode })
    )
    const monitorNodeState = useAppSelector(selectMonitorState);

    const selectPendingMonitoringData = createSelector(
        (state: any) => state.MonitoringQueueReducer,
        (monitoringData: MonitorQueueState) => ({ valueMode: monitoringData.pendingValueMode })
    )
    const pendingValueMode = useAppSelector(selectPendingMonitoringData);
    const selectTpsMonitoringData = createSelector(
        (state: any) => state.MonitoringQueueReducer,
        (monitoringData: MonitorQueueState) => ({ valueMode: monitoringData.tpsValueMode })
    )
    const tpsValueMode = useAppSelector(selectTpsMonitoringData);

    const [yAxisMode, setYAxisMode] = useState<string|null>((chartProps.dataSourceType === dataSourceType.PENDING? pendingValueMode.valueMode : (chartProps.dataSourceType === dataSourceType.THROUGHPUT)? tpsValueMode.valueMode : null));
    const handleYAxisMode= (mode: string) => {
        if (yAxisMode!== mode) {
            dispatch(updateValueMode({dataSourceType: chartProps.dataSourceType, valueMode: mode}));
            setYAxisMode(mode);
        }
    };

    const onChangeChartPeriod = (item: string) => {
        switch(item) {
            case "detail":
                router.push(`/monitor/${chartProps.dataSourceType}`);
                break;
            default:
                console.log("under");
        }
    }

    return (
        <React.Fragment>
            <div className="d-flex justify-content-between">
                <h6 className="mb-0 fw-bolder"><i className="psi-retro align-middle fs-5 me-2 "></i>{chartProps.title}
                    {
                        (monitorNodeState.nodeState &&  (chartProps.dataSourceType === dataSourceType.PENDING || chartProps.dataSourceType === dataSourceType.THROUGHPUT)) 
                            && <span style={{textDecoration: (yAxisMode === "count")? "underline" : ""}} onClick={() => handleYAxisMode("count")}>{'[건수'}</span>
                    }
                    {
                        (monitorNodeState.nodeState && (chartProps.dataSourceType === dataSourceType.PENDING || chartProps.dataSourceType === dataSourceType.THROUGHPUT)) 
                            && <span style={{textDecoration: (yAxisMode === "bytes")? "underline" : ""}} onClick={() => handleYAxisMode("bytes")}>{ '|Bytes]'}</span>
                    }
                </h6>

                <Dropdown className="card-header-dropdown" isOpen={isUserDropdown} toggle={toggleDropdown} direction="start">
                    <DropdownToggle tag="a" className="text-reset dropdown-btn" role="button">
                        <span className="text-muted "><i className="psi-receipt align-middle fs-5"></i></span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end" >
                        <DropdownItem onClick={() => { onChangeChartPeriod("detail"); }}>Detail</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </React.Fragment>
    );
};

export default ChartHeader;
