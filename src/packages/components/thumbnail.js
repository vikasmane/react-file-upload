//@flow
import React from 'react';
import type { ThumbnailType } from '../types';
const fileSizeInReadableFormat = (fileSize: number) => {
    const sizeInKb = (fileSize / 1000);
    return sizeInKb.toFixed() + " Kb";
}
export default (props: ThumbnailType) => (
    <div className="thumbnail-wrapper col-md-3">
        {
            props.size ?
                <div className="thumbnail">
                    <div className="preview">
                        <img src={props.src} alt={props.name} />
                    </div>
                    <div className="captions">
                        <div className="title">{props.name}</div>
                        <div>{fileSizeInReadableFormat(props.size)}</div>
                    </div>
                </div> :
                "Just drag and drop files here"
        }
    </div>
)