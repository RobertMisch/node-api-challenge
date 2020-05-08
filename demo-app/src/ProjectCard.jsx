import React from 'react'

const ProjectCard=(props)=>{
    console.log(props.item)
    return(
    <div>
        <div>{props.item.id}</div>
        <div>{props.item.name}</div>
        <div>{props.item.description}</div>
        <div>{props.item.completed}</div>
    </div>
    )
}

export default ProjectCard