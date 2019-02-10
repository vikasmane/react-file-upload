//@flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { FileUpload } from './packages';
import type { Options } from './packages/types';
// $FlowFixMe
import './app.scss';

const Header = () => (
    <div>Header1</div>
)

const fileOptions: Options = {
    panel: true,
    retro: {
        heading: "Browse Files from your Computer"
    },
    dnd: {

    }
}

class App extends React.Component<{}, {}> {
    render() {
        return <div className="app container">
            <FileUpload options={fileOptions} />
        </div>
    }
};
const root = document.getElementById('root');

if (root !== null) {
    ReactDOM.render(<App />, root)
}
