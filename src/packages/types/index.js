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
export type Options = {
    retro?: Class<Object> | RETRO,
    panel?: boolean | Object,
    dnd?: boolean | Object,
    progress?: boolean | Object,
    allowedMimeTypes: boolean | string[]
}

export type ThumbnailType = {| name: string, size: number, src: string |};