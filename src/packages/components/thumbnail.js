//@flow
import React from 'react';
import type { ThumbnailType } from '../types';
const fileSizeInReadableFormat = (fileSize: number) => {
    const sizeInKb = (fileSize / 1000);
    return sizeInKb.toFixed() + " Kb";
}
const createImgTag = function (src, alt) {
    return <img src={src} alt={alt} />
}
const getImgTagByType = function (type, src, name) {
    switch (type) {
        case "image/*":
            return createImgTag(src, name);
        case "application/pdf":
            return createImgTag(PDF_FILE, name);
        default:
            return createImgTag(UNKNOWN_FILE, name);
    }
}
const UNKNOWN_FILE = "unknown.png";
const PDF_FILE = "pdf.png";

export default (props: ThumbnailType) => (
    < div className="thumbnail-wrapper col-md-3" >
        {
            props.size ?
                <div className="thumbnail">
                    <div className="preview">
                        {
                            getImgTagByType(props.type, props.src, props.name)
                        }
                    </div>
                    <div className="captions">
                        <div className="title">{props.name}</div>
                        <div>{fileSizeInReadableFormat(props.size)}</div>
                    </div>
                </div> :
                "Just drag and drop files here"
        }
    </div >
)