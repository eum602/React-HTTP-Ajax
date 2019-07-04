import React, {Component} from 'react'
const asyncComponent = importComponent => { //importComponent => the function
    return class extends Component {
        state={
            component : null
        }
        componentDidMount(){
            importComponent()
            .then(cmp=>{ //cmp => the component we loaded dinamically
                this.setState({component:cmp.default})
            })
        }

        render(){
            const C = this.state.component

            return C ? <C {...this.props}/>:null //passing props so if C needs that can use it, Null isf the component has 
            //not been resolved yet

        }
    }
}

export default asyncComponent