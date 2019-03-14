//@flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { FileUpload } from './packages';
import type { Options } from './packages/types';
// $FlowFixMe
import './app.scss';
import Axios from 'axios';

const fileOptions1: Options = {
    panel: true,
    multiple: true,
    retro: {
        heading: "Browse Files from your Computer"
    },
    dnd: {
        thumbnails: {
            size: 'small'
        }
    },
    progress: {
        max: 0,
        value: 0
    },
    allowedMimeTypes: [
        "image/*"
    ]
}
const getFilesInArray = (filesList: FileList): File[] => {
    var result: File[] = [];
    for (let i = 0; i < filesList.length; i++) {
        result.push(filesList.item(i));
    }
    return result;
}
const fileOptions2: Options = {
    allowedMimeTypes: [
        "application/pdf"
    ]
}
type State = {
    comp: Options,
    mini: Options
}

class App extends React.Component<{}, State> {
    onCompFilesUploadComplete: (File[])=> void;
    onUploadProgress: (ProgressEvent) => void;
    constructor() {
        super();
        this.state = {
            comp: fileOptions1,
            mini: fileOptions2
        }
        this.onCompFilesUploadComplete = this.onCompFilesUploadComplete.bind(this);
        this.onUploadProgress = this.onUploadProgress.bind(this);
    }
    onUploadProgress(pe: ProgressEvent) {
        let { comp } = this.state;
        if (comp.progress && typeof comp.progress !== "boolean") {
            if (pe.lengthComputable) {
                comp.progress.max = pe.total
                comp.progress.value = pe.loaded
            }
        }

        console.log("Progress event registered :- " + pe.loaded, pe.total);
        this.setState({ comp });
    }
    onCompFilesUploadComplete(files) {
        let formData = new FormData();
        for (var file of files) {
            formData.append("images", file);
        }

        Axios.post("http://localhost:3001/uploadfiles", formData, {
            onUploadProgress: this.onUploadProgress
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        let { comp, mini } = this.state;
        return <div className="app container">
            <div className="row">
                <div className="col">
                    <label htmlFor="">Comprehensive Options</label>
                    <FileUpload options={comp} onSubmit={this.onCompFilesUploadComplete} />
                </div>
                <div className="col">
                    <label htmlFor="">Minimal Options</label>
                    <FileUpload options={mini} onSubmit={this.onCompFilesUploadComplete} />
                </div>
            </div>

        </div>
    }
};
const root = document.getElementById('root');

if (root !== null) {
    ReactDOM.render(<App />, root)
}
