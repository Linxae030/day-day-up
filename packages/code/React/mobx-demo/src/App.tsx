import { useEffect, useState } from 'react'
import './App.css'
import TestStore from './store/TestStore'
import { observer } from 'mobx-react'

const App = observer(() => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        console.log('effect');
        TestStore.initData()
    }, [])


    return (
        <div className="App">
            <span>{TestStore.count}</span>
            <button onClick={() => TestStore.increment()}>+</button>

            <button onClick={() => TestStore.decrement()}>-</button>

        </div>
    )
})

export default App
