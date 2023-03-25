import React, { MouseEventHandler } from "react";
import { BaseControl, BaseControlProps } from "react-map-gl";

export interface CustomButtonControlProps extends BaseControlProps {
    className?: string;
    label?: string;
    onClick?: MouseEventHandler;
    style?: React.CSSProperties;
}

export class CustomButtonControl extends BaseControl<CustomButtonControlProps, HTMLDivElement> {

    _render() {
        const { label, className, onClick } = this.props;
        return (
          <div className={`mapboxgl-ctrl mapboxgl-ctrl-group ${className}`}>
            <button className={'mapboxgl-ctrl-icon'} type={'button'}>
                <span style={{ marginTop: '10px' }} className={'mapboxgl-ctrl-icon'} onClick={onClick}>{label}</span>
            </button>
          </div>
        );
      }
}
