export const ErrorMessage = ({error}) => {

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 13,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 3,
        marginBottom: 10
    }

    return (
        <div  style={errorStyle}>
            {error.map((paragraf, i) => <p key={i}>{paragraf}</p>)}
        </div>
    );
};