import React, { useState, useEffect } from 'react';
import { EnergyTrading } from '../../../declarations/EnergyTrading';

const App = () => {
    const [tokens, setTokens] = useState([]);
    const [newToken, setNewToken] = useState({ energyAmount: 0, price: 0 });

    useEffect(() => {
        async function loadTokens() {
            const availableTokens = await EnergyTrading.getAvailableTokens();
            setTokens(availableTokens);
        }
        loadTokens();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await EnergyTrading.createToken(newToken.energyAmount, newToken.price);
        setTokens([...tokens, newToken]);
        setNewToken({ energyAmount: 0, price: 0 });
    };

    const buyToken = async (tokenId) => {
        const buyer = "your-principal-id";
        await EnergyTrading.transferToken(tokenId, buyer);
        alert('Token purchased successfully');
    };

    return (
        <div>
            <h1>Energy Trading Platform</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Energy Amount" 
                    value={newToken.energyAmount}
                    onChange={(e) => setNewToken({...newToken, energyAmount: e.target.value})} 
                />
                <input 
                    placeholder="Price" 
                    value={newToken.price}
                    onChange={(e) => setNewToken({...newToken, price: e.target.value})} 
                />
                <button type="submit">Create Energy Token</button>
            </form>

            <h2>Available Energy Tokens</h2>
            <ul>
                {tokens.map((token, index) => (
                    <li key={index}>
                        {token.energyAmount} kWh at {token.price} ICP
                        <button onClick={() => buyToken(token.id)}>Buy</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
