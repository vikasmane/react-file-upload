//@flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { FileUpload } from './packages';
import type { Options } from './packages/types';
// $FlowFixMe
import './app.scss';

const fileOptions1: Options = {
    panel: true,
    multiple: true,
    retro: {
        heading: "Browse Files from your Computer"
    },
    dnd: {
        thumbnails: {
            extentions: true,
            size: 'small'
        }
    },
    progress: {
        position: 'BOTTOM'
    }
}

const fileOptions2: Options = {

}

class App extends React.Component<{}, {}> {
    render() {
        return <div className="app container">
            <div className="row">
                <div className="col">
                    <label htmlFor="">Comprehensive Options</label>
                    <FileUpload options={fileOptions1} />
                </div>
                <div className="col">
                    <label htmlFor="">Minimal Options</label>
                    <FileUpload options={fileOptions2} />
                </div>
            </div>

        </div>
    }
};
const root = document.getElementById('root');

if (root !== null) {
    ReactDOM.render(<App />, root)
}
