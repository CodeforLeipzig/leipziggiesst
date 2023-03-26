import React from "react";

const StatusBar = ({ treeCount, waterSourceCount, mobileCount }) => {

    return (
        <div
            className="absolute z-50"
            style={{
                backgroundColor: 'white',
                opacity: 1,
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: '1px',
                height: '30px',
                width: '550px',
                overflow: 'auto',
                padding: '20px',
                textAlign: 'center'
            }}
        >
            <div style={{ float: 'left', paddingRight: '20px'}}>
                <div style={{ fontWeight: 'bold', float: 'left', paddingRight: '10px' }}>Bäume:</div>
                <div style={{ float: 'left' }}>{treeCount}</div>
            </div>
            <div style={{ float: 'left', paddingRight: '20px'}}>
                <div style={{ fontWeight: 'bold', float: 'left', paddingRight: '10px' }}>Wasserquellen:</div>
                <div style={{ float: 'left' }}>{waterSourceCount}</div>
            </div>
            <div style={{ float: 'left', paddingRight: '20px'}}>
                <div style={{ fontWeight: 'bold', float: 'left', paddingRight: '10px' }}>LEIPZIG GIESST-Mobile:</div>
                <div style={{ float: 'left' }}>{mobileCount}</div>
            </div>           
        </div>
    );
}

export default StatusBar;