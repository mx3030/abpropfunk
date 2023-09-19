export default WrapperTemplate({children}){
    const [dataSendFromWrapper, setDataSendFromWrapper] = useState(null);
    
    const sendDataToChildFromWrapper = (data) => {  
        setDataSendFromWrapper(data); // if this state is updated, it is also send to wrapped component because the value is a prop
    };

    const sendDataFromChildToWrapper = (data) => {
        console.log('Received data from Child:', data);
    };

    // wrapper renders children, with those props
    // child is defined with those props and inside child component, the actual target is rendered
    const WrappedComponent = (
        <>
            {
                children({
                    dataSendFromWrapper: dataSendFromWrapper,
                    sendDataFromChildToWrapper: sendDataFromChildToWrapper,
                })
            }
        </>
    )

    return (
        <>
            {WrappedComponent}
        </>
    )
}
