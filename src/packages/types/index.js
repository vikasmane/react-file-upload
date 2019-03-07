//@flow
import * as React from 'react';
export type FileUploadControlProps = {
    multiple: boolean,
    accept: boolean | string[]
}
type RETRO = {
    heading: string,
    component?: Class<Object> | React.Node | React$AbstractComponent<any, HTMLInputElement>
}
type Progress = {
    max?: number,
    value?: number
}
export type Options = {
    retro?: Class<Object> | RETRO,
    panel?: boolean | Object,
    dnd?: boolean | Object,
    progress?: boolean | Progress,
    allowedMimeTypes: boolean | string[]
}

export type ThumbnailType = {| name: string, size: number, src: string |};