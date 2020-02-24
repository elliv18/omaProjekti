import React from 'react'

export default function (props) {
    return (
        props.show
            ? props.children
            : null
    )
}