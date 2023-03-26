export const Notification = ({message}) => {
    if(message === null){
        return null
    }

    const notificationStyles = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 15,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={notificationStyles}>
            {message}
        </div>
    )
}