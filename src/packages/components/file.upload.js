import * as React from 'react';

const getDerivedMIMEType = function (mimeArray: string[]): string {
    return mimeArray.join('|');
}

// $FlowFixMe
const FileUploadControl = React.forwardRef(
    (props, ref) => (
        <div className="input-group">
            <div className="custom-file">
                <input type="file"
                    ref={ref}
                    multiple={props.multiple && "multiple"}
                    accept={props.accept ? getDerivedMIMEType(props.accept) : ""}
                    onChange={props.showThumbnails}
                    className="custom-file-input"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                />
                <label className="custom-file-label" htmlFor="inputGroupFile04">{props.multiple ? "Choose files" : "Choose file"}</label>
            </div>
        </div>
    )
)

export default FileUploadControl;