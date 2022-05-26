import {useParams} from 'react-router-dom';

const ReceptionPage = () => {
    const {clientId} = useParams("clientId");
    console.log(clientId);
    return (
        <>
            <div>
                <h1>Hanane</h1>
            </div>
        </>
    )
}
export default ReceptionPage;