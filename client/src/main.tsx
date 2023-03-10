import { render } from 'preact'
import Game from './game'
import './index.css'

render(<Game />, document.getElementById('app') as HTMLElement)
