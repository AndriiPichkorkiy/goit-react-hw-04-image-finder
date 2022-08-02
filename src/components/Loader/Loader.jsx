import { createPortal } from 'react-dom'
import Spiner from '../../imgs/loader.svg'
import { SpinerBackDrop, SpinerImg } from './SpinerBackDrop'


const loaderRoot = document.getElementById('loader')

export function Loader() {
    return createPortal(<SpinerBackDrop>
        <SpinerImg src={Spiner} />
    </SpinerBackDrop>, loaderRoot)
}

