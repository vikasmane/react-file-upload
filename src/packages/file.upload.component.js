//@flow
import * as React from 'react';
import FileUploadControl from './components/file.upload';
// $FlowFixMe
import './file.upload.scss';
import type { Options } from './types';
import Thumbnails from './components/thumbnails';

type Props = {
    options: Options,
    onSubmit: Function,
    uploadedFiles: File[]
};
type State = {
    options: Object,
    uploadedFiles: File[]
};
const RETRO_NO_COMPONENT = {
    heading: "Select Files from your Computer",
    component: FileUploadControl
}
const defaultProps: Props = {
    options: {
        retro: RETRO_NO_COMPONENT,
        multiple: false,
        panel: false,
        allowedMimeTypes: false
    },
    onSubmit: () => { },
    uploadedFiles: []
};

const getFilesInArray = (filesList: FileList): File[] => {
    var result: File[] = [];
    for (let i = 0; i < filesList.length; i++) {
        result.push(filesList.item(i));
    }
    return result;
}

class FileUpload extends React.Component<Props, State> {
    uploadCallback: (e: Event) => void;
    showThumbnails: () => void;
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
                        retro: {
                            ...RETRO_NO_COMPONENT,
                            ...props.options.retro
                        }
                    },
                }
            }
        };
        this.uploadCallback = this.uploadCallback.bind(this);
        this.showThumbnails = this.showThumbnails.bind(this);
        this.fileInputRef = React.createRef<HTMLInputElement>();
    }
    uploadCallback(e: Event) {
        e.preventDefault();
        let { options } = this.state;
        let { onSubmit } = this.props;
        if (options.progress) {
            options.progress = {
                max: 100,
                value: 0
            }
            this.setState(options);
        }
        if (this.fileInputRef.current) {
            onSubmit(this.fileInputRef.current.files);
        }
    }
    showThumbnails() {
        this.setState(() => (
            {
                ...this.state,
                uploadedFiles: (this.fileInputRef.current ? getFilesInArray(this.fileInputRef.current.files) : [])
            }
        ))
    }
    render() {
        let { options: { retro: { heading, component: Component } }, options, uploadedFiles } = this.state;

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
                                    accept={options.allowedMimeTypes}
                                    showThumbnails={this.showThumbnails}
                                />
                            </div>
                        </div>

                        {options.dnd && <div className="drop-zone-container">
                            <h4>Drag and Drop Below</h4>
                            <div className={options.multiple && this.fileInputRef.current != null && this.fileInputRef.current.files.length > 0 ?
                                "upload-drop-zone thumbnails container" :
                                "upload-drop-zone container"
                            } id="drop-zone">
                                {
                                    options.dnd.thumbnails && this.fileInputRef.current != null && this.fileInputRef.current.files.length > 0 ?
                                        (options.multiple) && <Thumbnails size={options.dnd.thumbnails.size} files={uploadedFiles} />
                                        : <div className="col">Just drag and drop files here</div>
                                }
                            </div>
                        </div>}

                        {options.progress && <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow={options.progress.value} aria-valuemin="0" aria-valuemax={options.progress.max} style={{ width: `${(options.progress.value / options.progress.max * 100)}%` }} >
                                <span className="sr-only">{(options.progress.value / options.progress.max * 100)}% Complete</span>
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