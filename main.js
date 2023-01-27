// const NETWORK = 'https://phantom-phantom-f0ad.mainnet.rpcpool.com/';
const NETWORK = 'https://api.devnet.solana.com/'
console.log('Test');
window.Buffer = buffer.Buffer;
let publicKey, resp;

const getProvider = () => {
    if('phantom' in window) {
        const provider = window.phantom?.solana;
        if(provider?.isPhantom)
            return provider;
    }

    window.open('https://phantom.app/', '_blank');
}

const connect = async () => {
    const provider = getProvider();
    try{
        const resp = await provider.connect();
        publicKey = resp.publicKey;
    } catch (err) {
        console.log(err)
    }
}

const walletAction = async () => {
    const provider = getProvider();
    try{
        resp = await provider.connect();
        publicKey = resp.publicKey;
    } catch (err) {
        console.log(err);
    }
    const connection = new solanaWeb3.Connection(NETWORK, {commitment: 'confirmed'});
    // console.log(await connection.getVersion());
    const transaction = await createTransaction(publicKey, connection);
    // const { signature } = await provider.signAndSendTransaction(transaction);
    // console.log(signature);
    // await connection.getSignatureStatus(signature);
}

const createTransaction = async (pubKey, conn) => {
    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: pubKey,
            toPubKey: pubKey,
            lamports: 100,
        })
    );
    transaction.feePayer = pubKey;
    transaction.recentBlockhash = (await conn.getLatestBlockhash({
        Headers: {
            'Access-Control-Allow-Headers': 'Content-type'
        }
    })).blockhash;
    return transaction;
}
