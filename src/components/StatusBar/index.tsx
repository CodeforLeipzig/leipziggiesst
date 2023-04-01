import React from "react";
import { isMobile } from 'react-device-detect';

const StatusBar = ({ treeCount, waterSourceCount, mobileCount }) => {
    const desktop = () => {
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
                { treeCount >=0 &&
                    <div style={{ float: 'left', paddingRight: '40px'}}>
                        <div style={{ fontWeight: 'bold', float: 'left', paddingRight: '15px' }}>
                            <img src="/images/icon-trees.svg" height={40} alt="two trees" title="Anzahl Bäume im aktuellen Ausschnitt"/>
                        </div>
                        <div style={{ paddingTop: 15, float: 'left' }}>{treeCount}</div>
                    </div>
                }
                <div style={{ float: 'left', paddingRight: '40px'}}>
                    <div style={{ paddingTop: 8, fontWeight: 'bold', float: 'left', paddingRight: '10px' }}>
                        <img src="images/drinking-water.png" height={32} alt="water tap and a can" title="Anzahl Wasserquellen im aktuellen Ausschnitt"/>
                    </div>
                    <div style={{ paddingTop: 15, float: 'left' }}>{waterSourceCount}</div>
                </div>
                <div style={{ float: 'left'}}>
                    <div style={{ paddingTop: 8, fontWeight: 'bold', float: 'left', paddingRight: '15px' }}>
                        <img src="images/dumpster.png" height={32} alt="dumpsterrepresenting a LeipzigGiesst-Mobile" title="Anzahl Gießmobile im aktuellen Ausschnitt"/>
                    </div>
                    <div style={{ paddingTop: 15, float: 'left' }}>{mobileCount}</div>
                </div>
            </div>
        );
    }
    const mobile = () => {
        return (
            <div
                className="absolute z-50"
                style={{
                    backgroundColor: 'white',
                    opacity: 1,
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    marginRight: '1px',
                    height: '160px',
                    width: '100px',
                    overflow: 'auto',
                    padding: '20px',
                    textAlign: 'left'
                }}
            >
                <div style={{ width: "50%", float:"left" }}>
                    { treeCount >=0 &&
                        <div style={{ paddingBottom: 20 }}>
                            <img src="/images/icon-trees.svg" height={40} alt="two trees" title="Anzahl Bäume im aktuellen Ausschnitt"/>
                        </div>
                    }
                        <div style={{ paddingBottom: 20, paddingLeft: 5 }}>
                            <img src="images/drinking-water.png" height={32} alt="water tap and a can" title="Anzahl Wasserquellen im aktuellen Ausschnitt"/>
                        </div>
                    <div>
                        <div style={{ paddingLeft: 8 }}>
                            <img src="images/dumpster.png" height={32} alt="dumpsterrepresenting a LeipzigGiesst-Mobile" title="Anzahl Gießmobile im aktuellen Ausschnitt"/>
                        </div>
                    </div>
                </div>
                <div style={{ width: "50%", float:"right", textAlign: 'right' }}>
                    { treeCount >=0 &&
                        <div style={{ paddingBottom: 20, paddingTop: 15 }}>{treeCount}</div>
                    }
                    <div style={{ paddingBottom: 20, paddingTop: 20 }}>{waterSourceCount}</div>
                    <div style={{ paddingTop: 15 }}>{mobileCount}</div>
                </div>
            </div>
        );
    }


    return isMobile ? mobile() : desktop();
}

export default StatusBar;