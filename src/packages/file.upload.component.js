//@flow
import * as React from 'react';
import FileUploadControl from './components/file.upload';
// $FlowFixMe
import './file.upload.scss';
import type { Options } from './types';

type Props = {
    options: Options,
    onSubmit: Function
};
type State = {
    options: Object
};
const RETRO_NO_COMPONENT = {
    heading: "Select Files from your Computer",
    component: FileUploadControl
}
const defaultProps: Object = {
    options: {
        retro: RETRO_NO_COMPONENT,
        multiple: false,
        panel: false
    },
    onSubmit: () => { }
};

class FileUpload extends React.Component<Props, State> {
    showThumbnails: Function;
    uploadCallback: Function;
    static defaultProps: Object;
    fileInputRef: { current: HTMLInputElement | null };

    constructor(props: Props) {
        super(props);
        this.state = {
            ...defaultProps,
            ...{
                options: {
                    ...defaultProps.options,
                    ...this.props.options,
                    ...{
                        ...{
                            retro: {
                                ...RETRO_NO_COMPONENT,
                                ...props.options.retro
                            }
                        }
                    },
                }
            }
        };
        this.uploadCallback = this.uploadCallback.bind(this);
        this.showThumbnails = this.showThumbnails.bind(this);
        this.fileInputRef = React.createRef<HTMLInputElement>();
    }
    uploadCallback(e: Object) {
        e.preventDefault();
        let { onSubmit, options } = this.props;
        if (this.fileInputRef.current) {
            onSubmit(this.fileInputRef.current.files);
        }
    }
    showThumbnails() {

    }
    render() {
        let { options: { retro: { heading, component: Component } }, options } = this.state;

        return <div className="container file-upload">
            <div className={options.panel ? "panel panel-default" : ""}>
                {options.panel && <div className="panel-heading">
                    <h3>{(typeof options.panel == 'boolean') ? "File Upload Control" : options.panel["heading"]}</h3>
                </div>}
                <div className={options.panel ? "panel-body" : ""}>
                    <h4>{options.retro ?
                        heading ? heading : RETRO_NO_COMPONENT.heading
                        : RETRO_NO_COMPONENT.heading}
                    </h4>
                    <form action="" id="upload-form">
                        <div className="form-inline">
                            <div className="form-group">
                                <Component
                                    ref={this.fileInputRef}
                                    multiple={options.multiple}
                                    accept={options.allow}
                                />
                            </div>
                        </div>

                        {options.dnd && <div className="drop-zone-container">
                            <h4>Drag and Drop Below</h4>
                            <div className="upload-drop-zone" id="drop-zone">
                                {

                                    "Just drag and drop files here"
                                }
                            </div>
                        </div>}

                        {options.progress && <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "20%" }} >
                                <span className="sr-only">20% Complete</span>
                            </div>
                        </div>}
                        <div className="btn-group">
                            <button type="submit" className="btn btn-sm btn-primary" id="upload-submit" onClick={this.uploadCallback}>Upload files</button>
                        </div>

                    </form>
                </div>

            </div>
        </div >
    }
};

FileUpload.defaultProps = defaultProps;

export default FileUpload;