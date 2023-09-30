import { StepHeading } from '/src/style.jsx'
import html2pdf from 'html2pdf.js'
import { useCallback } from "react";

export default function PDFCreator({ id }){
    var element = document.getElementById(id)
    var options = {
  margin:       1,
  filename:     'myfile.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 2 },
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};

    const handlePDFCreation = useCallback((el,opt)=>{
        html2pdf().set(opt).from(el).save()
    })

    return (
        <>
            <StepHeading style={{border:"solid black 5px",padding:"20px"}} onClick={()=> {return handlePDFCreation(element,options)}}>Geschafft! Drücke um PDF zu speichern.</StepHeading>
        </>
    )
}
