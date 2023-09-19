import WrappedComponent
import WrapperTemplate

export default function SomeComponent(){

    // used to add the necessary additional props
    const WrappedComponentWithAdditionalProps = (dataSendFromWrapper, sendDataFromChildToWrapper)=>{
        return (
            <WrappedComponent
                dataSendFromWrapper={dataSendFromWrapper}
                sendDataFromChildToWrapper={sendDataFromChildToWrapper}
            />
        )
    }

    const WrapperWithComponent = (
        <>
            <WrapperTemplate>
                {
                    ({dataSendFromWrapper, sendDataFromChildToWrapper}) => {
                        <WrappedComponentWithAdditionalProps 
                            dataSendFromWrapper={dataSendFromWrapper}
                            sendDataFromChildToWrapper={sendDataFromChildToWrapper}
                        />
                    }
                }
            </WrapperTemplate>
        </>
    )

    return (
        <>
            {WrapperWithComponent}
        </>
    )
}
