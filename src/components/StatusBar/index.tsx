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
                height: '50px',
                width: '350px',
                overflow: 'auto',
                padding: '20px',
                textAlign: 'center'
            }}
        >
            <div style={{ float: 'left', paddingRight: '40px'}}>
                <div style={{ fontWeight: 'bold', float: 'left', paddingRight: '15px' }}>
                    <img src="/images/icon-trees.svg" height={40} alt="two trees" title="Anzahl Bäume im aktuellen Ausschnitt"/>
                </div>
                <div style={{ paddingTop: 15, float: 'left' }}>{treeCount}</div>
            </div>
            <div style={{ float: 'left', paddingRight: '40px'}}>
                <div style={{ paddingTop: 8, fontWeight: 'bold', float: 'left', paddingRight: '10px' }}>
                    <img src="images/drinking-water.png" height={32} alt="water tap and a can" title="Anzahl Wasserquellen im aktuellen Ausschnitt"/>
                </div>
                <div style={{ paddingTop: 15, float: 'left' }}>{waterSourceCount}</div>
            </div>
            <div style={{ float: 'left', paddingRight: '40px'}}>
                <div style={{ paddingTop: 8, fontWeight: 'bold', float: 'left', paddingRight: '15px' }}>
                    <img src="images/dumpster.png" height={32} alt="dumpsterrepresenting a LeipzigGiesst-Mobile" title="Anzahl Gießmobile im aktuellen Ausschnitt"/>
                </div>
                <div style={{ paddingTop: 15, float: 'left' }}>{mobileCount}</div>
            </div>           
        </div>
    );
}

export default StatusBar;