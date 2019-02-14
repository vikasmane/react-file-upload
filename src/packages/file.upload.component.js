//@flow
import * as React from 'react';
import FileUploadControl from './components/file.upload';
// $FlowFixMe
import './file.upload.scss';
import type { Options } from './types';

type Props = {
    options: Options
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
    }
};

class FileUpload extends React.Component<Props, State> {
    static defaultProps: Object;
    constructor(props: Props) {
        super(props);
        this.state = {
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
        };
    }
    render() {
        let { options: { retro: { heading, component: Component } }, options } = this.state;
        console.log(options)
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
                                <Component multiple={options.multiple} />
                            </div>
                        </div>

                        {options.dnd && <div className="upload-drop-zone" id="drop-zone">
                            Just drag and drop files here
                        </div>}

                        {options.progress && <div className="progress">
                            <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: "20%" }} >
                                <span className="sr-only">20% Complete</span>
                            </div>
                        </div>}
                        <div className="btn-group">
                            <button type="submit" className="btn btn-sm btn-primary" id="upload-submit">Upload files</button>
                        </div>

                    </form>
                </div>

            </div>
        </div >
    }
};

FileUpload.defaultProps = defaultProps;

export default FileUpload;