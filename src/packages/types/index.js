import * as React from 'react';
export type FileUploadControlProps = {
    multiple: boolean,
    accept: string[]
}
type RETRO = {
    heading: string,
    component?: Class<Object> | React.Node
}
export type Options = {
    retro?: Class<Object> | RETRO,
    panel?: boolean | Object,
    dnd?: boolean | Object,
    progress?: boolean | Object,
    allow: string[]
}