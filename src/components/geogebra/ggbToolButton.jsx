import { GGBButton } from './style.jsx'

export default function GGBToolButton({ tool, ...props }){
    const icon_path = icons[tool]

    return (
        <>
            <GGBButton> <img src={icon_path} style={{height:"30px"}} /> </GGBButton>
        </>
    )
}

const ggb_icons_folder_path = 'src/assets/ggb_toolbar/'
const icons = {
    'point': ggb_icons_folder_path+'Mode_point.svg',
    'join': ggb_icons_folder_path+'Mode_join.svg'
}
