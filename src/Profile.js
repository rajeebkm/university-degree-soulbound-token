import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button, Card, ListGroup, Col } from 'react-bootstrap'
import { Buffer } from 'buffer';
// import { create as ipfsHttpClient } from 'ipfs-http-client'
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


const App = ({ contract }) => {
    const [address, setAddress] = useState('')
    const [degreeReceived, setDegreeReceived] = useState('')
    const [loading, setLoading] = useState()
   
    const claimDegree = async () => {
        let tokenURI = "tokenURI";
        setLoading(true)
        let address = await contract.signer.getAddress()
        setAddress(address)
        try {
            let claimDegrees = await (await contract.claimDegree(tokenURI)).wait();
            console.log(claimDegrees);
            window.alert(`Congratulations!! Degree is succefully claimed by you.  We wish you all the best for your future endeavours. Your degree URI is: ${tokenURI}`)
            setLoading(false)
            } catch(error) {
            window.alert("Failed, degree is already claimed or not issued by the University", error)
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
                        <h3 className='text-center text-info'>Claim Degree (Batch 2022-23)</h3>
                            <Row className="g-4">
                                <Form.Control onChange={(e) => setDegreeReceived(e.target.value)} size="lg" required type="text" placeholder="Please mention/paste the exact Degree URI received from the University" />
                                <div className="d-grid px-0">
                                    <Button onClick={claimDegree} variant="secondary" size="lg">
                                        Claim Degree
                                    </Button>
                                </div>
                            </Row>
                        </div>
                    </main>
                </div>
        )
}

export default App;