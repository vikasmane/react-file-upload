import React, { Component } from 'react';

export default class FileUploadControl extends Component<{}> {
    render() {
        return <div className="input-group">
            <div className="custom-file">
                <input type="file" multiple className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" />
                <label className="custom-file-label" htmlFor="inputGroupFile04">Choose file</label>
            </div>
        </div>
    }
};
