import type { Metadata } from 'next'
import MonitorFooter from './layouts/monitorFooter'
import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import { MonitorHeader } from './layouts/monitorHeader'

export const metadata: Metadata = {
  title: 'Monitor',
  description: 'Generated by create next app',
}

export default function MonitoringLayout(props: {
    children: React.ReactNode
}) {
    return (
        <React.Fragment>
            <div id='monitor-wrapper' className='monitor-wrap overflow-y-auto'>
                <div className='content__boxed'>
                    <MonitorHeader />
                </div>
                <div className='content__boxed'>
                    {props.children}
                </div>
            </div>

                    <MonitorFooter />
            {/* <footer className="mt-auto">
                <div className="content__boxed">
                    <MonitorFooter />
                </div>
            </footer> */}
        </React.Fragment>
    )
}