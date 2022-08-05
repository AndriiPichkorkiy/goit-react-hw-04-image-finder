import Spiner from '../../imgs/loader.svg'
import { SpinerBackDrop, SpinerImg } from './SpinerBackDrop'

export function Loader() {
    return <SpinerBackDrop>
        <SpinerImg src={Spiner} />
    </SpinerBackDrop>
}