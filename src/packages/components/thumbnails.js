//@flow
import React from 'react';
import Thumbnail from './thumbnail';
import type { ThumbnailType } from '../types';

type Props = { files: File[], size: string };
type State = { files: File[], fileObjects: ThumbnailType[], size: string };

export default class Thumbnails extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            files: props.files,
            fileObjects: [],
            size: props.size
        };
        this.readAsFiles(props.files);
    }
    componentWillReceiveProps(props: Props) {
        this.readAsFiles(props.files);
    }
    readAsFiles(files: File[]) {
        for (let index = 0; index < files.length; index++) {
            let file = files[index];
            const blob = new FileReader();
            blob.onload = (e) => {
                let { fileObjects } = this.state;
                fileObjects = fileObjects.slice(0, files.length);
                fileObjects[index] = { name: file.name, size: file.size, src: e.target.result };
                this.setState({
                    fileObjects
                });
            }
            blob.readAsDataURL(file);
        };
    }
    render() {
        return <div className={"thumbnails-wrapper row"}>
            {
                this.state.fileObjects.map((item, ind) => (
                    <Thumbnail key={ind} size={item.size} name={item.name} src={item.src} />
                ))
            }
        </div>
    }
};
