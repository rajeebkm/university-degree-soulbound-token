import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button, Card, ListGroup } from 'react-bootstrap'
// import { create as ipfsHttpClient } from 'ipfs-http-client'
import { Buffer } from 'buffer';
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
const ipfsClient = require('ipfs-http-client');
const projectId = process.env.PROJECT_ID;
const projectSecret = process.env.SECRET_KEY;
const auth =
'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
host: 'infura-ipfs.io',
port: 5001,
protocol: 'https',
headers: {
authorization: auth,
},
});

const Home = ({ contract }) => {
    const [address, setAddress] = useState('')
    const [addressRecipient, setAddressRecipient] = useState('')
    const [loading, setLoading] = useState()
    const issueDegree = async () => {
        setLoading(true)
        let address = await contract.signer.getAddress()
        setAddress(address)
        try {
            let issueDegrees = await (await contract.issueDegree(addressRecipient)).wait();
            console.log(addressRecipient)
            console.log(issueDegrees);
            window.alert(`Degree is succefully issued to : ${addressRecipient}`)
            setLoading(false)
            } catch(error) {
            window.alert(`Failed, only university can issue degree to the students or, degree is already issued to the recipient`, error)
            setLoading(false)
        }
    }
// }

    if (loading) return (
        <div className='text-center'>
            <main style={{ padding: "1rem 0" }}>
                <h2>Loading...</h2>
            </main>
        </div>
    )
    return (
        <div className="row mt-5">
                <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '700px' }}>
                    <div className="content mx-auto">
                        <h3 className='text-center text-success'>Issue Degree to the Students (Batch 2022-23)</h3>
                        <Row className="g-4">
                            <Form.Control onChange={(e) => setAddressRecipient(e.target.value)} size="lg" required type="text" placeholder="Address of Degree Recipient" />
                            <div className="d-grid px-0">
                                <Button onClick={issueDegree} variant="primary" size="lg">
                                    Issue Degree
                                </Button>
                            </div>
                        </Row>
                    </div>
                </main>
            </div>
    )
}
export default Home