import * as React from 'react'

interface IProps {
    name: string,
    age: number
}

// const Func = ({ age }: IProps) => {
//     return (
//         <div>
//             age: { age }
//         </div>
//     )
// }

const Func: React.FunctionComponent<IProps> = ({ age, name }) => {
    const [myName] = React.useState<string>(name)
    return (
        <div>
            age: { age }<br/>
            myName: { myName }
        </div>
    )
}

export default Func
