import { MaterialPhoto } from '/src/style.jsx'

export default function Materials({ materials }){
    const Materials = [];
    for (var i=0;i< materials.length;i++) {
        Materials.push(
            <div key={i}>
                <div style={{ textAlign: 'center' }}>{materials[i].name}</div>
                <MaterialPhoto src={materials[i].src} />
            </div>
        );
    }
    return (
        <div style={{ display:'flex', flexDirection:'row', justifyContent:'center',gap:'50px'}} >
            {Materials}
        </div>
    )
}



