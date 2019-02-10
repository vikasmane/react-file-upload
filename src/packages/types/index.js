import * as React from 'react';
type RETRO = {
    heading: string,
    component: Class<Object> | React.Node
}
export type Options = {
    retro?: Class<Object> | Object,
    panel: boolean | Object
}